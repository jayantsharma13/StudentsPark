const demoReviews = [
  {
    companyName: 'Oracle',
    jobRole: 'Software Developer',
    location: 'Bangalore, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', '2 Technical Rounds', 'HR Round'],
    difficulty: 'Medium',
    duration: '6 weeks',
    oaExperience: {
      platform: 'Oracle Online Assessment',
      topics: ['SQL', 'Java', 'Database Design', 'Logic Building'],
      questionsCount: 4,
      timeLimit: '120 minutes',
      difficulty: 'Medium',
      description: 'Focus on SQL queries, Java programming, and logical reasoning.'
    },
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round 1',
          duration: '45 minutes',
          topics: ['Java', 'Database Concepts', 'OOP'],
          questionsAsked: ['Implement HashMap', 'SQL joins explanation', 'Polymorphism in Java'],
          difficulty: 'Medium',
          interviewerProfile: 'Senior Software Engineer'
        },
        {
          roundName: 'Technical Round 2',
          duration: '30 minutes',
          topics: ['System Design', 'Oracle Technologies'],
          questionsAsked: ['Design a library management system', 'Oracle DB features'],
          difficulty: 'Medium',
          interviewerProfile: 'Technical Lead'
        }
      ]
    },
    result: 'Selected',
    salaryOffered: { amount: 420000, currency: 'INR', period: 'yearly' },
    reviewTitle: 'Oracle Software Developer - Great Learning Experience',
    overallExperience: 'Structured and fair interview process with helpful interviewers. Great work culture and growth.',
    preparationTips: 'Revise Java fundamentals, SQL, and basic system design. Understand Oracle technologies.',
    questionsAsked: ['Implement HashMap in Java', 'Complex SQL joins', 'Library management system design', 'Explain polymorphism'],
    adviceForFuture: 'Confidence in Java and SQL is key. Focus on problem-solving.',
    rating: {
      overall: 4, processClarity: 5, interviewerBehavior: 4,
      difficultyRating: 3, wouldRecommend: 4
    },
    reviewerInfo: {
      college: 'NIT Hamirpur', degree: 'B.Tech CSE',
      passingYear: 2024, cgpa: 8.2, previousExperience: 'Fresher'
    },
    tags: ['Oracle', 'Java', 'SQL', 'Database', 'Good Work Culture', 'Selected']
  },

  {
    companyName: 'DE Shaw',
    jobRole: 'Software Developer Engineer',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', '3 Technical Rounds', 'Final Round'],
    difficulty: 'Hard',
    duration: '8 weeks',
    oaExperience: {
      platform: 'DE Shaw Codility',
      topics: ['Advanced DS', 'DP', 'Graph Algorithms', 'Math'],
      questionsCount: 3,
      timeLimit: '150 minutes',
      difficulty: 'Hard',
      description: 'Challenging problems requiring optimal solutions and edge case handling.'
    },
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round 1',
          duration: '60 minutes',
          topics: ['DSA', 'Problem Solving'],
          questionsAsked: ['Implement LRU Cache', 'Find median in data stream', 'Graph traversal problems'],
          difficulty: 'Hard',
          interviewerProfile: 'Senior SDE'
        },
        {
          roundName: 'Technical Round 2',
          duration: '60 minutes',
          topics: ['System Design', 'Scalability'],
          questionsAsked: ['Design URL shortener', 'Database sharding', 'Load balancing'],
          difficulty: 'Hard',
          interviewerProfile: 'Principal Engineer'
        },
        {
          roundName: 'Final Round',
          duration: '45 minutes',
          topics: ['Problem Solving', 'Math Reasoning'],
          questionsAsked: ['Probability problem', 'Optimization puzzle', 'Trading algo design'],
          difficulty: 'Hard',
          interviewerProfile: 'Director of Engineering'
        }
      ]
    },
    result: 'Selected',
    salaryOffered: { amount: 5200000, currency: 'INR', period: 'yearly' },
    reviewTitle: 'DE Shaw SDE - Challenging but Rewarding',
    overallExperience: 'Highly rigorous interview process. Exceptional pay with high expectations.',
    preparationTips: 'Master advanced DSA, system design, and math. Practice regularly.',
    questionsAsked: ['LRU Cache', 'Median in stream', 'URL shortener', 'Probability problem'],
    adviceForFuture: 'Start early. Build speed and precision in solving hard problems.',
    rating: {
      overall: 5, processClarity: 4, interviewerBehavior: 4,
      difficultyRating: 5, wouldRecommend: 5
    },
    reviewerInfo: {
      college: 'NIT Hamirpur', degree: 'B.Tech CSE',
      passingYear: 2024, cgpa: 9.1, previousExperience: 'Fresher'
    },
    tags: ['DE Shaw', 'High Package', 'Algorithms', 'System Design', 'Mathematics', 'Selected']
  }
];
