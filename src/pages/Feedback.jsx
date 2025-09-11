import { useState } from 'react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    experience: '',
    wouldRecommend: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Feedback submitted:', { ...feedback, rating });
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setRating(0);
      setFeedback({
        name: '',
        email: '',
        subject: '',
        message: '',
        experience: '',
        wouldRecommend: null,
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen-main flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your feedback has been submitted successfully. We appreciate your time and valuable input.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen-main bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Share Your Experience</h1>
          <p className="text-xl text-gray-600">We'd love to hear your feedback about your Jharkhand travel experience</p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your overall experience? *
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-3xl focus:outline-none ${
                        (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gray-500">
                    {rating === 0 ? 'Select a rating' : `${rating} star${rating > 1 ? 's' : ''}`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {/* Name */}
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={feedback.name}
                      onChange={handleInputChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={feedback.email}
                      onChange={handleInputChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={feedback.subject}
                      onChange={handleInputChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md"
                      placeholder="Briefly describe your feedback"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="sm:col-span-2">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Your Experience *
                  </label>
                  <div className="mt-1">
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={feedback.experience}
                      onChange={handleInputChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md"
                    >
                      <option value="">Select your experience type</option>
                      <option value="first-time">First time visiting Jharkhand</option>
                      <option value="frequent-visitor">Frequent visitor to Jharkhand</option>
                      <option value="local">Local resident</option>
                      <option value="business">Business traveler</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your Feedback *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={feedback.message}
                      onChange={handleInputChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md"
                      placeholder="Tell us about your experience, suggestions, or concerns..."
                    />
                  </div>
                </div>

                {/* Recommendation */}
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Would you recommend TourSmart Jharkhand to others? *
                  </p>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="wouldRecommend"
                        value="yes"
                        required
                        checked={feedback.wouldRecommend === 'yes'}
                        onChange={() => setFeedback({...feedback, wouldRecommend: 'yes'})}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="wouldRecommend"
                        value="no"
                        required
                        checked={feedback.wouldRecommend === 'no'}
                        onChange={() => setFeedback({...feedback, wouldRecommend: 'no'})}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="wouldRecommend"
                        value="maybe"
                        required
                        checked={feedback.wouldRecommend === 'maybe'}
                        onChange={() => setFeedback({...feedback, wouldRecommend: 'maybe'})}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Maybe</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-3 inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : 'Submit Feedback'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Feedback Options */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Report an Issue',
              description: 'Experiencing technical difficulties? Let us know how we can help.',
              icon: '⚠️',
              link: '#',
            },
            {
              title: 'Feature Request',
              description: "Have an idea to improve our platform? We'd love to hear it!",
              icon: '💡',
              link: '#',
            },
            {
              title: 'Contact Support',
              description: 'Need immediate assistance? Our support team is here to help.',
              icon: '✉️',
              link: '#',
            },
          ].map((item, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={item.link}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Learn more<span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
