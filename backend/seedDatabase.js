import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from './models/Review.js';
import connectToDatabase from './config/database.js';

dotenv.config();

const demoReviews = [
  {
    companyName: 'Oracle',
    jobRole: 'Software Developer',
    location: 'Bangalore, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', 'Technical Interview (2 rounds)', 'HR Round'],
    difficulty: 'Medium',
    duration: '6 weeks',
    
    oaExperience: {
      platform: 'Oracle Online Assessment',
      topics: ['SQL', 'Java', 'Database Design', 'Logic Building'],
      questionsCount: 4,
      timeLimit: '120 minutes',
      difficulty: 'Medium',
      description: 'Focus on SQL queries, Java programming, and logical reasoning. Questions were well-structured and fair.'
    },
    
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round 1',
          duration: '45 minutes',
          topics: ['Java', 'Database Concepts', 'Object Oriented Programming'],
          questionsAsked: ['Implement HashMap', 'SQL joins explanation', 'Polymorphism in Java'],
          difficulty: 'Medium',
          interviewerProfile: 'Senior Software Engineer'
        },
        {
          roundName: 'Technical Round 2',
          duration: '30 minutes',
          topics: ['System Design', 'Oracle Technologies'],
          questionsAsked: ['Design a library management system', 'Oracle database features'],
          difficulty: 'Medium',
          interviewerProfile: 'Technical Lead'
        }
      ]
    },
    
    result: 'Selected',
    salaryOffered: {
      amount: 420000,
      currency: 'INR',
      period: 'yearly'
    },
    
    reviewTitle: 'Oracle Software Developer - Great Learning Experience',
    overallExperience: 'Oracle has a very structured and fair interview process. The interviewers were friendly and gave helpful hints. Good work culture and learning opportunities.',
    preparationTips: 'Focus on Java fundamentals, SQL queries, and basic system design. Practice coding problems and understand Oracle technologies.',
    questionsAsked: ['Implement HashMap in Java', 'Complex SQL joins', 'Library management system design', 'Explain polymorphism'],
    adviceForFuture: 'Be confident with Java and SQL. Oracle values problem-solving skills over just coding ability.',
    
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
      cgpa: 8.2,
      previousExperience: 'Fresher'
    },
    
    tags: ['Oracle', 'Java', 'SQL', 'Database', 'Good Work Culture', 'Selected']
  },
  
  {
    companyName: 'DE Shaw',
    jobRole: 'Software Developer Engineer',
    location: 'Hyderabad, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', 'Technical Interview (3 rounds)', 'Final Round'],
    difficulty: 'Hard',
    duration: '8 weeks',
    
    oaExperience: {
      platform: 'DE Shaw Codility',
      topics: ['Advanced Data Structures', 'Dynamic Programming', 'Graph Algorithms', 'Mathematics'],
      questionsCount: 3,
      timeLimit: '150 minutes',
      difficulty: 'Hard',
      description: 'Very challenging problems requiring strong algorithmic thinking. Focus on optimal solutions and edge cases.'
    },
    
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round 1',
          duration: '60 minutes',
          topics: ['Data Structures', 'Algorithms', 'Problem Solving'],
          questionsAsked: ['Implement LRU Cache', 'Find median in data stream', 'Graph traversal problems'],
          difficulty: 'Hard',
          interviewerProfile: 'Senior SDE'
        },
        {
          roundName: 'Technical Round 2',
          duration: '60 minutes',
          topics: ['System Design', 'Scalability'],
          questionsAsked: ['Design URL shortener', 'Database sharding concepts', 'Load balancing strategies'],
          difficulty: 'Hard',
          interviewerProfile: 'Principal Engineer'
        },
        {
          roundName: 'Final Round',
          duration: '45 minutes',
          topics: ['Problem Solving', 'Mathematical Reasoning'],
          questionsAsked: ['Complex probability problem', 'Optimization puzzle', 'Trading algorithm design'],
          difficulty: 'Hard',
          interviewerProfile: 'Director of Engineering'
        }
      ]
    },
    
    result: 'Selected',
    salaryOffered: {
      amount: 5200000,
      currency: 'INR',
      period: 'yearly'
    },
    
    reviewTitle: 'DE Shaw SDE - Extremely Challenging but Rewarding',
    overallExperience: 'DE Shaw has one of the most rigorous interview processes. Questions are very challenging and require deep understanding of algorithms and system design. High compensation but equally high expectations.',
    preparationTips: 'Master advanced data structures, dynamic programming, and system design. Practice competitive programming regularly. Strong mathematical background is essential.',
    questionsAsked: ['LRU Cache implementation', 'Median finding in stream', 'URL shortener design', 'Complex probability problems'],
    adviceForFuture: 'Start preparation at least 6 months in advance. Focus on problem-solving speed and accuracy. Mathematical reasoning is crucial.',
    
    rating: {
      overall: 5,
      processClarity: 4,
      interviewerBehavior: 4,
      difficultyRating: 5,
      wouldRecommend: 5
    },
    
    reviewerInfo: {
      college: 'NIT Hamirpur',
      degree: 'B.Tech CSE',
      passingYear: 2024,
      cgpa: 9.1,
      previousExperience: 'Fresher'
    },
    
    tags: ['DE Shaw', 'High Package', 'Algorithms', 'System Design', 'Mathematics', 'Challenging', 'Selected']
  },
  
  {
    companyName: 'BNY Mellon',
    jobRole: 'Software Engineer',
    location: 'Pune, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', 'Technical Interview', 'Managerial Round', 'HR Round'],
    difficulty: 'Medium',
    duration: '5 weeks',
    
    oaExperience: {
      platform: 'HackerRank',
      topics: ['Data Structures', 'Algorithms', 'Problem Solving', 'SQL'],
      questionsCount: 3,
      timeLimit: '90 minutes',
      difficulty: 'Medium',
      description: 'Standard algorithmic problems with SQL queries. Fair difficulty level with good problem statements.'
    },
    
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round',
          duration: '60 minutes',
          topics: ['Java', 'Spring Boot', 'Database Concepts', 'Problem Solving'],
          questionsAsked: ['Binary tree problems', 'Spring Boot concepts', 'Database normalization'],
          difficulty: 'Medium',
          interviewerProfile: 'Senior Software Engineer'
        },
        {
          roundName: 'Managerial Round',
          duration: '30 minutes',
          topics: ['Behavioral Questions', 'Project Discussion'],
          questionsAsked: ['Tell about challenging project', 'How do you handle deadlines', 'Leadership examples'],
          difficulty: 'Easy',
          interviewerProfile: 'Engineering Manager'
        }
      ]
    },
    
    result: 'Selected',
    salaryOffered: {
      amount: 650000,
      currency: 'INR',
      period: 'yearly'
    },
    
    reviewTitle: 'BNY Mellon - Good Work-Life Balance and Learning',
    overallExperience: 'BNY Mellon offers a great work environment with focus on employee development. The interview process is fair and not overly stressful. Good for career growth in financial technology.',
    preparationTips: 'Focus on Java, Spring Boot, and database concepts. Practice medium-level algorithmic problems. Prepare behavioral questions well.',
    questionsAsked: ['Binary tree traversal', 'Spring Boot annotations', 'Database design', 'Project challenges'],
    adviceForFuture: 'Be genuine in interviews and showcase your learning attitude. They value cultural fit alongside technical skills.',
    
    rating: {
      overall: 4,
      processClarity: 5,
      interviewerBehavior: 5,
      difficultyRating: 3,
      wouldRecommend: 4
    },
    
    reviewerInfo: {
      college: 'NIT Hamirpur',
      degree: 'B.Tech CSE',
      passingYear: 2024,
      cgpa: 8.5,
      previousExperience: 'Fresher'
    },
    
    tags: ['BNY Mellon', 'FinTech', 'Work-Life Balance', 'Java', 'Spring Boot', 'Good Culture', 'Selected']
  },

  {
    companyName: 'Goldman Sachs',
    jobRole: 'Technology Analyst',
    location: 'Mumbai, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', 'Video Interview', 'Super Day (4 rounds)'],
    difficulty: 'Hard',
    duration: '7 weeks',
    
    oaExperience: {
      platform: 'Goldman Sachs Custom Platform',
      topics: ['Algorithms', 'Data Structures', 'Mathematics', 'Logic'],
      questionsCount: 2,
      timeLimit: '75 minutes',
      difficulty: 'Hard',
      description: 'Challenging algorithmic problems with focus on optimization and mathematical reasoning. Clean code expected.'
    },
    
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round 1',
          duration: '45 minutes',
          topics: ['Data Structures', 'Algorithms'],
          questionsAsked: ['Design data structure for trading system', 'Optimize portfolio calculation'],
          difficulty: 'Hard',
          interviewerProfile: 'Vice President - Technology'
        },
        {
          roundName: 'Technical Round 2',
          duration: '45 minutes',
          topics: ['System Design', 'Financial Systems'],
          questionsAsked: ['Design high-frequency trading system', 'Risk management architecture'],
          difficulty: 'Hard',
          interviewerProfile: 'Managing Director'
        }
      ]
    },
    
    result: 'Selected',
    salaryOffered: {
      amount: 4800000,
      currency: 'INR',
      period: 'yearly'
    },
    
    reviewTitle: 'Goldman Sachs Technology Analyst - Prestigious and Challenging',
    overallExperience: 'Goldman Sachs offers an excellent learning experience in financial technology. Very challenging interview process but great career opportunities. High-pressure environment with excellent compensation.',
    preparationTips: 'Master algorithmic problem solving, understand financial systems basics, and practice system design for high-performance applications.',
    questionsAsked: ['Trading system design', 'Portfolio optimization', 'Risk management systems', 'High-frequency trading concepts'],
    adviceForFuture: 'Prepare thoroughly for both technical and financial domain knowledge. Show passion for finance and technology.',
    
    rating: {
      overall: 5,
      processClarity: 4,
      interviewerBehavior: 4,
      difficultyRating: 5,
      wouldRecommend: 5
    },
    
    reviewerInfo: {
      college: 'NIT Hamirpur',
      degree: 'B.Tech CSE',
      passingYear: 2024,
      cgpa: 9.3,
      previousExperience: 'Fresher'
    },
    
    tags: ['Goldman Sachs', 'Investment Banking', 'High Package', 'FinTech', 'Prestigious', 'Challenging', 'Selected']
  },

  {
    companyName: 'Adobe',
    jobRole: 'Software Development Engineer',
    location: 'Noida, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Assessment', 'Technical Interview (2 rounds)', 'Design Round', 'HR Round'],
    difficulty: 'Medium',
    duration: '6 weeks',
    
    oaExperience: {
      platform: 'Adobe Coding Platform',
      topics: ['Data Structures', 'Algorithms', 'Problem Solving'],
      questionsCount: 2,
      timeLimit: '90 minutes',
      difficulty: 'Medium',
      description: 'Well-designed problems focusing on clean code and efficient algorithms. User experience focused questions.'
    },
    
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round 1',
          duration: '60 minutes',
          topics: ['JavaScript', 'React', 'Frontend Development'],
          questionsAsked: ['Implement autocomplete feature', 'React component optimization', 'DOM manipulation'],
          difficulty: 'Medium',
          interviewerProfile: 'Senior Frontend Engineer'
        },
        {
          roundName: 'Design Round',
          duration: '45 minutes',
          topics: ['System Design', 'User Experience'],
          questionsAsked: ['Design photo editing application', 'Scalable file storage system'],
          difficulty: 'Medium',
          interviewerProfile: 'Principal Engineer'
        }
      ]
    },
    
    result: 'Selected',
    salaryOffered: {
      amount: 2800000,
      currency: 'INR',
      period: 'yearly'
    },
    
    reviewTitle: 'Adobe SDE - Creative Technology Environment',
    overallExperience: 'Adobe provides an excellent creative and innovative work environment. Focus on user experience and clean code. Great learning opportunities in creative technology.',
    preparationTips: 'Strong frontend skills, system design basics, and understanding of user experience principles. Practice building interactive applications.',
    questionsAsked: ['Autocomplete implementation', 'React optimization', 'Photo editing app design', 'File storage systems'],
    adviceForFuture: 'Showcase creativity alongside technical skills. Build projects that demonstrate user experience focus.',
    
    rating: {
      overall: 4,
      processClarity: 4,
      interviewerBehavior: 5,
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
    
    tags: ['Adobe', 'Frontend', 'Creative Tech', 'User Experience', 'Innovation', 'Selected']
  },

  {
    companyName: 'Samsung R&D',
    jobRole: 'Software Engineer',
    location: 'Bangalore, India',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: ['Resume Screening', 'Online Test', 'Technical Interview', 'Technical Manager Round'],
    difficulty: 'Medium',
    duration: '4 weeks',
    
    oaExperience: {
      platform: 'Samsung Online Platform',
      topics: ['C++', 'Data Structures', 'Operating Systems', 'Embedded Systems'],
      questionsCount: 3,
      timeLimit: '120 minutes',
      difficulty: 'Medium',
      description: 'Focus on systems programming and embedded concepts. Good mix of theoretical and practical questions.'
    },
    
    interviewExperience: {
      rounds: [
        {
          roundName: 'Technical Round',
          duration: '45 minutes',
          topics: ['C++', 'Operating Systems', 'Embedded Programming'],
          questionsAsked: ['Memory management in C++', 'Process vs Thread', 'Embedded system design'],
          difficulty: 'Medium',
          interviewerProfile: 'Senior Software Engineer'
        }
      ]
    },
    
    result: 'Selected',
    salaryOffered: {
      amount: 1200000,
      currency: 'INR',
      period: 'yearly'
    },
    
    reviewTitle: 'Samsung R&D - Excellent for Systems Programming',
    overallExperience: 'Samsung R&D offers great exposure to cutting-edge technology and research. Focus on systems programming and embedded systems. Good work-life balance and learning environment.',
    preparationTips: 'Strong C++ fundamentals, operating systems concepts, and basic embedded programming knowledge. Practice system-level programming.',
    questionsAsked: ['C++ memory management', 'Thread synchronization', 'Embedded system architecture', 'Performance optimization'],
    adviceForFuture: 'Focus on core computer science concepts and systems programming. Show interest in research and development.',
    
    rating: {
      overall: 4,
      processClarity: 4,
      interviewerBehavior: 4,
      difficultyRating: 3,
      wouldRecommend: 4
    },
    
    reviewerInfo: {
      college: 'NIT Hamirpur',
      degree: 'B.Tech CSE',
      passingYear: 2024,
      cgpa: 8.0,
      previousExperience: 'Fresher'
    },
    
    tags: ['Samsung', 'R&D', 'Systems Programming', 'Embedded', 'Research', 'Good Learning', 'Selected']
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await connectToDatabase();
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data (optional - remove if you want to keep existing reviews)
    // await Review.deleteMany({});
    // console.log('🗑️ Cleared existing reviews');
    
    // Insert demo data
    const insertedReviews = await Review.insertMany(demoReviews);
    console.log(`✅ Successfully inserted ${insertedReviews.length} demo reviews`);
    
    // Display inserted reviews
    console.log('\n📊 Inserted Reviews:');
    insertedReviews.forEach((review, index) => {
      console.log(`${index + 1}. ${review.companyName} - ${review.jobRole} (${review.result})`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🌐 You can now see these reviews at: http://localhost:5173');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seeding function
console.log('🚀 Starting seeding process...');
seedDatabase().catch(console.error);
