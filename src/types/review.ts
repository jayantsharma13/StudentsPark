export interface Review {
  id: string;
  companyName: string;
  jobRole: string;
  location: string;
  jobType: 'Full-time' | 'Internship' | 'Contract' | 'Part-time';
  experienceType: 'Interview' | 'Online Assessment' | 'Both';
  
  // Interview/OA Process Details
  processStages: string[]; // e.g., ['Resume Screening', 'OA', 'Technical Interview', 'HR Round']
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string; // e.g., "2 weeks", "1 month"
  
  // Experience Details
  oaExperience?: {
    platform: string; // e.g., "HackerRank", "Codility", "HackerEarth"
    topics: string[]; // e.g., ["Arrays", "Dynamic Programming", "SQL"]
    questionsCount: number;
    timeLimit: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
  };
  
  interviewExperience?: {
    rounds: {
      roundName: string; // e.g., "Technical Round 1", "Managerial Round"
      duration: string;
      topics: string[];
      questionsAsked: string[];
      difficulty: 'Easy' | 'Medium' | 'Hard';
      interviewerProfile: string; // e.g., "Senior Software Engineer"
    }[];
  };
  
  // Outcome and Details
  result: 'Selected' | 'Rejected' | 'Pending' | 'Withdrew';
  salaryOffered?: {
    amount: number;
    currency: string;
    period: 'yearly' | 'monthly';
  };
  
  // Review Content
  reviewTitle: string;
  overallExperience: string; // Detailed experience description
  preparationTips: string;
  questionsAsked: string[]; // Key questions that were asked
  adviceForFuture: string;
  
  // Ratings
  rating: {
    overall: number;
    processClarity: number;
    interviewerBehavior: number;
    difficultyRating: number;
    wouldRecommend: number;
  };
  
  // Reviewer Info
  reviewerInfo: {
    college: string;
    degree: string; // e.g., "B.Tech CSE", "M.Tech", "MBA"
    passingYear: number;
    cgpa?: number;
    previousExperience: string; // e.g., "Fresher", "2 years experience"
  };
  
  datePosted: string;
  tags: string[];
}

export interface NewReview {
  companyName: string;
  jobRole: string;
  location: string;
  jobType: 'Full-time' | 'Internship' | 'Contract' | 'Part-time';
  experienceType: 'Interview' | 'Online Assessment' | 'Both';
  
  processStages: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  
  oaExperience?: {
    platform: string;
    topics: string[];
    questionsCount: number;
    timeLimit: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
  };
  
  interviewExperience?: {
    rounds: {
      roundName: string;
      duration: string;
      topics: string[];
      questionsAsked: string[];
      difficulty: 'Easy' | 'Medium' | 'Hard';
      interviewerProfile: string;
    }[];
  };
  
  result: 'Selected' | 'Rejected' | 'Pending' | 'Withdrew';
  salaryOffered?: {
    amount: number;
    currency: string;
    period: 'yearly' | 'monthly';
  };
  
  reviewTitle: string;
  overallExperience: string;
  preparationTips: string;
  questionsAsked: string[];
  adviceForFuture: string;
  
  rating: {
    overall: number;
    processClarity: number;
    interviewerBehavior: number;
    difficultyRating: number;
    wouldRecommend: number;
  };
  
  reviewerInfo: {
    college: string;
    degree: string;
    passingYear: number;
    cgpa?: number;
    previousExperience: string;
  };
  
  tags: string[];
}
