import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NewReview } from '../types/review';
import { addReview } from '../data/mockData';

export function SubmitReview() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NewReview>({
    companyName: '',
    jobRole: '',
    location: '',
    jobType: 'Full-time',
    experienceType: 'Both',
    processStages: [],
    difficulty: 'Medium',
    duration: '',
    salaryOffered: {
      amount: 0,
      currency: 'INR',
      period: 'yearly'
    },
    rating: {
      overall: 5,
      processClarity: 5,
      interviewerBehavior: 5,
      difficultyRating: 5,
      wouldRecommend: 5
    },
    reviewTitle: '',
    overallExperience: '',
    preparationTips: '',
    adviceForFuture: '',
    questionsAsked: [],
    reviewerInfo: {
      college: '',
      degree: '',
      passingYear: new Date().getFullYear(),
      previousExperience: 'Fresher'
    },
    result: 'Pending',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const [stageInput, setStageInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof NewReview] as object,
          [child]: parent === 'salaryOffered' && child === 'amount' ? Number(value) : 
                   parent === 'reviewerInfo' && child === 'passingYear' ? Number(value) :
                   parent === 'reviewerInfo' && child === 'cgpa' ? Number(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRatingChange = (category: keyof NewReview['rating'], value: number) => {
    setFormData(prev => ({
      ...prev,
      rating: {
        ...prev.rating,
        [category]: value
      }
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddStage = () => {
    if (stageInput.trim() && !formData.processStages.includes(stageInput.trim())) {
      setFormData(prev => ({
        ...prev,
        processStages: [...prev.processStages, stageInput.trim()]
      }));
      setStageInput('');
    }
  };

  const handleRemoveStage = (stageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      processStages: prev.processStages.filter(stage => stage !== stageToRemove)
    }));
  };

  const handleAddQuestion = () => {
    if (questionInput.trim() && !formData.questionsAsked.includes(questionInput.trim())) {
      setFormData(prev => ({
        ...prev,
        questionsAsked: [...prev.questionsAsked, questionInput.trim()]
      }));
      setQuestionInput('');
    }
  };

  const handleRemoveQuestion = (questionToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      questionsAsked: prev.questionsAsked.filter(question => question !== questionToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newReview = await addReview(formData);
      navigate(`/review/${newReview.id}`);
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error - maybe show a toast or error message
    }
  };

  const RatingInput = ({ label, category, value }: { label: string; category: keyof NewReview['rating']; value: number }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleRatingChange(category, rating)}
            className={`text-2xl ${rating <= value ? 'text-yellow-400' : 'text-gray-600'} hover:text-yellow-400 transition-colors`}
          >
            ★
          </button>
        ))}
        <span className="text-sm text-gray-400 ml-2">{value}/5</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl p-8 border border-gray-800">
      <div className="flex items-center gap-4 mb-8">
        <span className="bg-red-600 text-white px-4 py-2 rounded font-bold">NEW EPISODE</span>
        <span className="text-red-400 font-semibold">Create Your Story</span>
      </div>
      <h1 className="text-3xl font-bold text-white mb-8">🎬 Share Your Interview Experience</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">🏢 Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Role *</label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="City, State/Country"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Type *</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* Experience Details */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Experience Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Experience Type *</label>
              <select
                name="experienceType"
                value={formData.experienceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="Both">Both OA & Interview</option>
                <option value="OA Only">OA Only</option>
                <option value="Interview Only">Interview Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                placeholder="e.g., 4 weeks"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Process Stages */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">📝 Process Stages</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={stageInput}
                onChange={(e) => setStageInput(e.target.value)}
                placeholder="Add a process stage (e.g., Resume Screening, OA, Technical Round)"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStage())}
              />
              <button
                type="button"
                onClick={handleAddStage}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Add Stage
              </button>
            </div>
            {formData.processStages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.processStages.map((stage, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-blue-500"
                  >
                    {stage}
                    <button
                      type="button"
                      onClick={() => handleRemoveStage(stage)}
                      className="text-blue-400 hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Salary Information */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">💰 Salary Information (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
              <input
                type="number"
                name="salaryOffered.amount"
                value={formData.salaryOffered?.amount || 0}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
              <select
                name="salaryOffered.currency"
                value={formData.salaryOffered?.currency || 'INR'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
              <select
                name="salaryOffered.period"
                value={formData.salaryOffered?.period || 'yearly'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">⭐ Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RatingInput label="Overall Rating" category="overall" value={formData.rating.overall} />
            <RatingInput label="Process Clarity" category="processClarity" value={formData.rating.processClarity} />
            <RatingInput label="Interviewer Behavior" category="interviewerBehavior" value={formData.rating.interviewerBehavior} />
            <RatingInput label="Difficulty Rating" category="difficultyRating" value={formData.rating.difficultyRating} />
            <RatingInput label="Would Recommend" category="wouldRecommend" value={formData.rating.wouldRecommend} />
          </div>
        </div>

        {/* Review Content */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">📖 Experience Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Experience Title *</label>
              <input
                type="text"
                name="reviewTitle"
                value={formData.reviewTitle}
                onChange={handleInputChange}
                required
                placeholder="Summarize your experience in one line"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Overall Experience *</label>
              <textarea
                name="overallExperience"
                value={formData.overallExperience}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe your overall interview/OA experience"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preparation Tips *</label>
              <textarea
                name="preparationTips"
                value={formData.preparationTips}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="What preparation tips would you give to future candidates?"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Advice for Future Candidates</label>
              <textarea
                name="adviceForFuture"
                value={formData.adviceForFuture}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any advice for future candidates applying to this company?"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Questions Asked */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">❓ Key Questions Asked</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Add a question that was asked (e.g., Implement LRU Cache, Tell me about yourself)"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddQuestion())}
              />
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Add Question
              </button>
            </div>
            {formData.questionsAsked.length > 0 && (
              <div className="space-y-2">
                {formData.questionsAsked.map((question, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 text-gray-300 px-4 py-3 rounded-md flex items-center justify-between border border-gray-600"
                  >
                    <span>{question}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(question)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviewer Information */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">👤 About You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">College *</label>
              <input
                type="text"
                name="reviewerInfo.college"
                value={formData.reviewerInfo.college}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Degree *</label>
              <input
                type="text"
                name="reviewerInfo.degree"
                value={formData.reviewerInfo.degree}
                onChange={handleInputChange}
                required
                placeholder="e.g., B.Tech CSE, M.Tech"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Passing Year *</label>
              <input
                type="number"
                name="reviewerInfo.passingYear"
                value={formData.reviewerInfo.passingYear}
                onChange={handleInputChange}
                required
                min="2020"
                max="2030"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">CGPA (Optional)</label>
              <input
                type="number"
                name="reviewerInfo.cgpa"
                value={formData.reviewerInfo.cgpa || ''}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                max="10"
                placeholder="e.g., 8.5"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Previous Experience</label>
              <select
                name="reviewerInfo.previousExperience"
                value={formData.reviewerInfo.previousExperience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Result</h2>
          <div className="space-y-3">
            {['Selected', 'Rejected', 'Pending', 'Withdrew'].map((resultOption) => (
              <label key={resultOption} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="result"
                  value={resultOption}
                  checked={formData.result === resultOption}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-300">{resultOption}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">🏷️ Tags</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag (e.g., DSA, System Design, Behavioral)"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Add Tag
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-blue-500"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-400 hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            🎬 Share Your Story
          </button>
        </div>
      </form>
    </div>
  );
}
