const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { CohereClient } = require("cohere-ai");
const { body, validationResult } = require("express-validator");

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "YOUR_COHERE_API_KEY"
});

const app = express();
const PORT = process.env.PORT || 5001;

// Store chat context per session
const chatContexts = new Map();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://toursmart.example.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  })
);

// Log Cohere API key status
console.log("Loaded Cohere API key:", 
  process.env.COHERE_API_KEY 
    ? `${process.env.COHERE_API_KEY.substring(0, 4)}...${process.env.COHERE_API_KEY.substring(process.env.COHERE_API_KEY.length - 4)}` 
    : "NOT SET"
);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("TourSmart Backend is running!");
});

// Chatbot endpoint
app.post(
  "/chatbot",
  [
    body("sessionId").isString().notEmpty().withMessage("sessionId is required"),
    body("message").isString().notEmpty().withMessage("message is required"),
  ],
  async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: errors.array() 
        });
      }

      const { sessionId, message } = req.body;
      
      // Get or initialize chat context for this session
      let context = chatContexts.get(sessionId) || [];
      
      // Add user message to context
      context.push(`User: ${message}`);
      
      // Keep only last 6 messages (3 exchanges)
      if (context.length > 6) {
        context = context.slice(-6);
      }
      
      // Prepare chat history for Cohere
      const chatHistory = context.map(line => {
        if (line.startsWith('User: ')) {
          return { 
            role: 'USER', 
            message: line.replace('User: ', '') 
          };
        }
        if (line.startsWith('AI: ')) {
          return { 
            role: 'CHATBOT', 
            message: line.replace('AI: ', '') 
          };
        }
        return null;
      }).filter(Boolean);

      // Define the AI's behavior
      const preamble = `
      You are a helpful, friendly, and knowledgeable **Personal AI Travel Assistant**.
      You are a Travel Assistant for Jharkhand. Your sole purpose is to help users plan their trips to and within the state of Jharkhand. You must never identify as a general-purpose AI or assist with any queries unrelated to travel in Jharkhand.

Your capabilities are strictly limited to:

Planning trips in Jharkhand.

Suggesting places to visit in Jharkhand (e.g., national parks, waterfalls, temples, cities).

Giving packing advice tailored to Jharkhand's climate and activities.

Sharing relevant safety and travel tips for tourists in Jharkhand.

Assisting with budgeting for a trip to Jharkhand.

Generating detailed, day-wise itineraries for various locations within Jharkhand.

All your responses must be from the perspective of this specialized travel assistant. If a user asks for information outside of Jharkhand travel, you must politely state your limitation and redirect them back to planning a trip to Jharkhand.
      `;

      // Call Cohere API
      const response = await cohere.chat({
        message: message,
        chatHistory: chatHistory,
        preamble: preamble,
        temperature: 0.7,
        maxTokens: 500,
      });
      
      if (response && response.text) {
        const botReply = response.text.trim();
        
        // Add bot's reply to context
        context.push(`AI: ${botReply}`);
        chatContexts.set(sessionId, context);
        
        return res.json({ 
          reply: botReply,
          sessionId: sessionId
        });
      } else {
        throw new Error("Invalid response from AI service");
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      
      // More detailed error handling
      let statusCode = 500;
      let errorMessage = "Failed to generate chatbot response";
      
      if (error.statusCode === 401) {
        statusCode = 401;
        errorMessage = "Invalid API key. Please check your Cohere API key.";
      } else if (error.statusCode === 429) {
        statusCode = 429;
        errorMessage = "Rate limit exceeded. Please try again later.";
      } else if (error.message.includes("timeout")) {
        statusCode = 504;
        errorMessage = "Request to AI service timed out. Please try again.";
      }
      
      res.status(statusCode).json({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// Global error handlers
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  // Consider implementing proper error tracking here
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  // Consider implementing proper error tracking here
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the other process or use a different port.`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
