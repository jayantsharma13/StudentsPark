import type { Review, NewReview } from '../types/review';
import apiService from '../services/apiService';

// Helper function to generate MongoDB-like ObjectId
const generateObjectId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const random = Math.random().toString(16).substring(2, 18);
  return (timestamp + random).padEnd(24, '0').substring(0, 24);
};

// Fallback mock data for offline development
export const mockReviews: Review[] = [
  {
    id: '507f1f77bcf86cd799439011',
    companyName: 'Google',
    jobRole: 'Software Engineer - SDE',
    location: 'Bangalore, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', 'Phone Screen', 'Onsite (4 rounds)', 'Team Matching'],
    difficulty: 'Hard',
    duration: '6 weeks',
    
    oaExperience: {
      platform: 'Google Online Assessment',
      topics: ['Arrays', 'Dynamic Programming', 'Graphs', 'Trees'],
      questionsCount: 2,
      timeLimit: '90 minutes',
      difficulty: 'Hard',
      description: 'Two coding questions - one medium level array problem and one hard DP problem. Clean code and edge cases were important.'
    },
    
    interviewExperience: {
      rounds: [
        {
          roundName: 'Phone Screen',
          duration: '45 minutes',
          topics: ['Data Structures', 'Algorithms'],
          questionsAsked: ['Implement LRU Cache', 'Design discussion on scalability'],
          difficulty: 'Medium',
          interviewerProfile: 'Senior Software Engineer'
        },
        {
          roundName: 'Technical Round 1',
          duration: '45 minutes',
          topics: ['System Design'],
          questionsAsked: ['Design a URL Shortener like bit.ly', 'Discuss trade-offs'],
          difficulty: 'Hard',
          interviewerProfile: 'Staff Engineer'
        }
      ]
    },
    
    result: 'Selected',
    salaryOffered: {
      amount: 5500000,
      currency: 'INR',
      period: 'yearly'
    },
    
    reviewTitle: 'Comprehensive Google SDE Interview Experience',
    overallExperience: 'Overall excellent experience with Google. The process was well-structured and fair. Interviewers were friendly and provided good feedback. The questions were challenging but fair.',
    preparationTips: 'Practice system design thoroughly. Focus on clean code and explaining your thought process clearly. LeetCode hard problems are essential.',
    questionsAsked: ['Implement LRU Cache', 'Design URL Shortener', 'Maximum subarray problem', 'Binary tree traversal'],
    adviceForFuture: 'Start preparing at least 6 months in advance. Focus on fundamentals, system design, and behavioral questions.',
    
    rating: {
      overall: 5,
      processClarity: 5,
      interviewerBehavior: 5,
      difficultyRating: 4,
      wouldRecommend: 5
    },
    
    reviewerInfo: {
      college: 'NIT Hamirpur',
      degree: 'B.Tech CSE',
      passingYear: 2024,
      cgpa: 9.2,
      previousExperience: 'Fresher'
    },
    
    datePosted: '2024-01-15',
    tags: ['Tech Giant', 'High Package', 'Challenging', 'Great Culture', 'Selected']
  },
  {
    id: '507f1f77bcf86cd799439012',
    companyName: 'Microsoft',
    jobRole: 'Software Development Engineer',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', 'Technical Interviews (3 rounds)', 'HR Round'],
    difficulty: 'Medium',
    duration: '4 weeks',
    
    oaExperience: {
      platform: 'Microsoft Codility',
      topics: ['Arrays', 'Strings', 'Dynamic Programming'],
      questionsCount: 3,
      timeLimit: '75 minutes',
      difficulty: 'Medium',
      description: 'Three problems - two easy-medium and one medium level. Focus on optimal solutions and edge cases.'
    },
    
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round 1',
          duration: '60 minutes',
          topics: ['Data Structures', 'Algorithms'],
          questionsAsked: ['Binary Tree traversal variations', 'Dynamic Programming problem'],
          difficulty: 'Medium',
          interviewerProfile: 'Senior SDE'
        },
        {
          roundName: 'Technical Round 2',
          duration: '60 minutes',
          topics: ['System Design', 'Object Oriented Design'],
          questionsAsked: ['Design a parking lot system', 'SOLID principles discussion'],
          difficulty: 'Medium',
          interviewerProfile: 'Principal Engineer'
        }
      ]
    },
    
    result: 'Selected',
    salaryOffered: {
      amount: 3200000,
      currency: 'INR',
      period: 'yearly'
    },
    
    reviewTitle: 'Microsoft SDE Interview - Structured and Fair Process',
    overallExperience: 'Great experience with Microsoft. Very structured process and helpful interviewers. Good work-life balance culture.',
    preparationTips: 'Practice OOPS concepts and system design basics. Microsoft focuses on fundamentals and clean coding practices.',
    questionsAsked: ['Binary Tree problems', 'Design patterns', 'Parking lot design', 'String manipulation'],
    adviceForFuture: 'Focus on fundamentals, be clear in explanations, and practice mock interviews.',
    
    rating: {
      overall: 4,
      processClarity: 5,
      interviewerBehavior: 4,
      difficultyRating: 3,
      wouldRecommend: 4
    },
    
    reviewerInfo: {
      college: 'NIT Hamirpur',
      degree: 'B.Tech CSE',
      passingYear: 2024,
      cgpa: 8.7,
      previousExperience: 'Fresher'
    },
    
    datePosted: '2024-01-10',
    tags: ['Tech Giant', 'Good Package', 'Structured Process', 'Learning Opportunity', 'Selected']
  }
];

// API functions with fallback to mock data
export const getReviews = async (): Promise<Review[]> => {
  try {
    console.log('🔄 Fetching reviews from API...');
    
    // First check if backend is available
    const healthCheck = await apiService.healthCheck();
    if (!healthCheck.success) {
      throw new Error('Backend not available');
    }
    
    const reviews = await apiService.getAllReviews();
    console.log('✅ Successfully fetched reviews from API:', reviews.length);
    return reviews;
    
  } catch (error) {
    console.warn('⚠️ API failed, using fallback mock data:', error);
    return [...mockReviews];
  }
};

export const getReviewById = async (id: string): Promise<Review | null> => {
  try {
    console.log('🔄 Fetching review by ID from API:', id);
    
    // First check if backend is available
    const healthCheck = await apiService.healthCheck();
    if (!healthCheck.success) {
      throw new Error('Backend not available');
    }
    
    const review = await apiService.getReviewById(id);
    console.log('✅ Successfully fetched review from API');
    return review;
    
  } catch (error) {
    console.warn('⚠️ API failed, using fallback mock data:', error);
    return mockReviews.find((review: Review) => review.id === id) || null;
  }
};

export const addReview = async (review: NewReview): Promise<Review> => {
  try {
    console.log('🔄 Creating review via API...');
    
    // First check if backend is available
    const healthCheck = await apiService.healthCheck();
    if (!healthCheck.success) {
      throw new Error('Backend not available');
    }
    
    const newReview = await apiService.createReview(review);
    console.log('✅ Successfully created review via API:', newReview.id);
    return newReview;
    
  } catch (error) {
    console.warn('⚠️ API failed, using fallback mock behavior:', error);
    
    // Fallback: simulate adding to mock data
    const newReview: Review = {
      ...review,
      id: generateObjectId(),
      datePosted: new Date().toISOString().split('T')[0]
    };
    
    mockReviews.push(newReview);
    console.log('✅ Added review to mock data:', newReview.id);
    return newReview;
  }
};