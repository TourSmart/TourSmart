const fallbackARVRData = [
  {
    id: 1,
    title: 'Netarhat - The Queen of Chotanagpur',
    description: 'Experience the breathtaking views and pleasant climate of Netarhat through our immersive 360° virtual tour.',
    image: 'https://via.placeholder.com/800x450?text=Netarhat+360',
    type: '360° Virtual Tour',
    duration: '5-10 min',
    location: { 
      name: 'Netarhat',
      lat: 23.4835, 
      lng: 84.6837 
    },
    tags: ['nature', 'hills', 'viewpoint'],
    media: {
      type: '360',
      url: 'https://example.com/netarhat-360',
      thumbnail: 'https://via.placeholder.com/400x225?text=Netarhat+360'
    },
    featured: true
  },
  {
    id: 2,
    title: 'Betla National Park Safari',
    description: 'Get up close with wildlife in this augmented reality safari experience through Betla National Park.',
    image: 'https://via.placeholder.com/800x450?text=Betla+Safari',
    type: 'AR Experience',
    duration: '8-12 min',
    location: {
      name: 'Betla',
      lat: 23.8871, 
      lng: 84.1849 
    },
    tags: ['wildlife', 'safari', 'nature'],
    media: {
      type: 'ar',
      url: 'https://example.com/betla-ar',
      thumbnail: 'https://via.placeholder.com/400x225?text=Betla+AR'
    },
    featured: true
  },
  {
    id: 3,
    title: 'Hundru Falls',
    description: 'Experience the majestic Hundru Falls through our virtual reality experience that makes you feel like you\'re really there.',
    image: 'https://via.placeholder.com/800x450?text=Hundru+Falls',
    type: 'VR Experience',
    duration: '7-10 min',
    location: {
      name: 'Hundru',
      lat: 23.4867, 
      lng: 85.6096 
    },
    tags: ['waterfall', 'nature', 'adventure'],
    media: {
      type: 'vr',
      url: 'https://example.com/hundru-vr',
      thumbnail: 'https://via.placeholder.com/400x225?text=Hundru+VR'
    },
    featured: true
  },
  {
    id: 4,
    title: 'Jagannath Temple, Ranchi',
    description: 'Explore the architectural marvel of Jagannath Temple in Ranchi through our detailed 3D model.',
    image: 'https://via.placeholder.com/800x450?text=Jagannath+Temple',
    type: '3D Model',
    duration: '3-5 min',
    location: {
      name: 'Ranchi',
      lat: 23.3699, 
      lng: 85.3258 
    },
    tags: ['temple', 'architecture', 'religious'],
    media: {
      type: '3d',
      url: 'https://example.com/jagannath-3d',
      thumbnail: 'https://via.placeholder.com/400x225?text=Jagannath+3D'
    },
    featured: true
  },
  {
    id: 5,
    title: 'Dassam Falls',
    description: 'Witness the beauty of Dassam Falls through an immersive 360° experience.',
    image: 'https://via.placeholder.com/800x450?text=Dassam+Falls',
    type: '360° Virtual Tour',
    duration: '4-6 min',
    location: {
      name: 'Dassam',
      lat: 23.1000, 
      lng: 85.6000 
    },
    tags: ['waterfall', 'nature', 'picnic'],
    media: {
      type: '360',
      url: 'https://example.com/dassam-360',
      thumbnail: 'https://via.placeholder.com/400x225?text=Dassam+360'
    },
    featured: false
  },
  {
    id: 6,
    title: 'Palamu Fort',
    description: 'Explore the historic Palamu Fort through augmented reality.',
    image: 'https://via.placeholder.com/800x450?text=Palamu+Fort',
    type: 'AR Experience',
    duration: '5-8 min',
    location: {
      name: 'Palamu',
      lat: 23.6500, 
      lng: 84.0667 
    },
    tags: ['historical', 'fort', 'architecture'],
    media: {
      type: 'ar',
      url: 'https://example.com/palamu-ar',
      thumbnail: 'https://via.placeholder.com/400x225?text=Palamu+AR'
    },
    featured: false
  }
];

export default fallbackARVRData;
