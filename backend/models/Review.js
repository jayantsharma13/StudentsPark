import mongoose from 'mongoose';

// Online Assessment Experience Schema
const oaExperienceSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  topics: [{ type: String }],
  questionsCount: { type: Number },
  timeLimit: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  description: { type: String }
});

// Interview Round Schema
const interviewRoundSchema = new mongoose.Schema({
  roundName: { type: String, required: true },
  duration: { type: String },
  topics: [{ type: String }],
  questionsAsked: [{ type: String }],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  interviewerProfile: { type: String }
});

// Interview Experience Schema
const interviewExperienceSchema = new mongoose.Schema({
  rounds: [interviewRoundSchema]
});

// Main Review Schema
const reviewSchema = new mongoose.Schema({
  // Basic Information
  companyName: { type: String, required: true, trim: true },
  jobRole: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  jobType: { type: String, required: true, enum: ['Full-time', 'Internship', 'Part-time', 'Contract'] },
  
  // Experience Details
  experienceType: { 
    type: String, 
    required: true, 
    enum: ['Online Assessment Only', 'Interview Only', 'Both'] 
  },
  processStages: [{ type: String }],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  duration: { type: String },
  
  // Experiences
  oaExperience: oaExperienceSchema,
  interviewExperience: interviewExperienceSchema,
  
  // Additional Information
  overallExperience: { type: String },
  tips: { type: String },
  wouldRecommend: { type: Boolean },
  rating: { type: Number, min: 1, max: 5, required: true },
  
  // Compensation (optional)
  salary: { type: String },
  
  // Metadata
  tags: [{ type: String }],
  datePosted: { type: String, default: () => new Date().toISOString().split('T')[0] },
  
  // Student Information (anonymous)
  branch: { type: String },
  graduationYear: { type: String }
}, {
  timestamps: true,
  collection: 'reviews'
});

// Indexes for better query performance
reviewSchema.index({ companyName: 1 });
reviewSchema.index({ jobRole: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ datePosted: -1 });
reviewSchema.index({ tags: 1 });
reviewSchema.index({ difficulty: 1 });

// Virtual for formatted date
reviewSchema.virtual('formattedDate').get(function() {
  return new Date(this.datePosted).toLocaleDateString();
});

// Transform function to include virtuals in JSON
reviewSchema.set('toJSON', { virtuals: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
