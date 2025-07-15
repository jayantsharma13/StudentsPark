import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReviewById } from '../data/mockData';
import type { Review } from '../types/review';

export function ReviewDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      if (id) {
        try {
          const reviewData = await getReviewById(id);
          setReview(reviewData);
        } catch (error) {
          console.error('Error fetching review:', error);
          setReview(null);
        }
      }
      setLoading(false);
    };

    fetchReview();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading review...</p>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-4">Episode Not Found</h1>
        <p className="text-gray-400 mb-8">The episode you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-colors"
        >
          ← Back to Episodes
        </button>
      </div>
    );
  }

  const formatSalary = (salary?: Review['salaryOffered']) => {
    if (!salary) return 'Not disclosed';
    const amount = salary.amount.toLocaleString();
    const period = salary.period === 'yearly' ? '/year' : '/month';
    return `${salary.currency} ${amount}${period}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StarRating = ({ rating, label }: { rating: number; label?: string }) => {
    const stars = Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-2xl ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`}>
        ★
      </span>
    ));
    return (
      <div className="flex items-center gap-2">
        <div className="flex">{stars}</div>
        <span className="text-xl font-bold text-white">{rating}</span>
        {label && <span className="text-sm text-gray-400">({label})</span>}
      </div>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Selected': return 'text-green-400';
      case 'Rejected': return 'text-red-400';
      case 'Pending': return 'text-blue-400';
      case 'Withdrew': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="mb-8 flex items-center text-red-400 hover:text-red-300 transition-colors text-lg"
      >
        ← Back to Episodes
      </button>

      <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
        {/* Netflix-style Header */}
        <div className="bg-gradient-to-r from-red-900 via-gray-900 to-black text-white p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-red-600 text-white px-4 py-2 rounded font-bold">
              EPISODE #{review.id}
            </span>
            <span className="text-red-400 font-semibold">Interview Experience</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{review.companyName}</h1>
              <p className="text-2xl text-gray-200 mb-2">{review.jobRole}</p>
              <p className="text-gray-300 text-lg">{review.location} • {review.jobType}</p>
              <div className="flex items-center gap-4 mt-4">
                <span className={`px-4 py-2 rounded-full font-medium ${getDifficultyColor(review.difficulty)}`}>
                  🎯 {review.difficulty}
                </span>
                <span className={`px-4 py-2 rounded-full font-bold ${getResultColor(review.result)}`}>
                  {review.result === 'Selected' ? '✅' : review.result === 'Rejected' ? '❌' : review.result === 'Pending' ? '⏳' : '🚪'} {review.result}
                </span>
              </div>
            </div>
            <div className="text-right">
              <StarRating rating={review.rating.overall} />
              <p className="text-gray-300 text-sm mt-2">Released on {formatDate(review.datePosted)}</p>
              <p className="text-gray-400 text-sm">Duration: {review.duration}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Episode Synopsis */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              📖 Episode Synopsis
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-red-400 mb-4">"{review.reviewTitle}"</h3>
              <p className="text-gray-300 leading-relaxed text-lg">{review.overallExperience}</p>
              
              {review.salaryOffered && (
                <div className="mt-6">
                  <span className="inline-block bg-green-900 text-green-300 px-6 py-3 rounded-full font-bold border border-green-500">
                    💰 Salary Offered: {formatSalary(review.salaryOffered)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Process Breakdown */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">🎬 Process Breakdown</h3>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-red-400 mb-3">Experience Type</h4>
                  <p className="text-gray-300">{review.experienceType}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-400 mb-3">Total Duration</h4>
                  <p className="text-gray-300">{review.duration}</p>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-red-400 mb-3">Process Stages</h4>
              <div className="flex flex-wrap gap-2">
                {review.processStages.map((stage: string, index: number) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full border border-gray-600">
                    {index + 1}. {stage}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Online Assessment Details */}
          {review.oaExperience && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">💻 Online Assessment Experience</h3>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">Platform</h4>
                    <p className="text-gray-300">{review.oaExperience.platform}</p>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">Questions</h4>
                    <p className="text-gray-300">{review.oaExperience.questionsCount}</p>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">Time Limit</h4>
                    <p className="text-gray-300">{review.oaExperience.timeLimit}</p>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">Difficulty</h4>
                    <p className={getDifficultyColor(review.oaExperience.difficulty)}>{review.oaExperience.difficulty}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-red-400 font-semibold mb-3">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {review.oaExperience.topics.map((topic: string, index: number) => (
                      <span key={index} className="bg-purple-900 text-purple-300 px-3 py-1 rounded border border-purple-500">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-red-400 font-semibold mb-3">Description</h4>
                  <p className="text-gray-300 leading-relaxed">{review.oaExperience.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Interview Rounds */}
          {review.interviewExperience && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">🎭 Interview Rounds</h3>
              <div className="space-y-6">
                {review.interviewExperience.rounds.map((round: any, index: number) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-red-400 mb-2">{round.roundName}</h4>
                        <p className="text-gray-400">Duration: {round.duration}</p>
                        <p className="text-gray-400">Interviewer: {round.interviewerProfile}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-medium ${getDifficultyColor(round.difficulty)}`}>
                        {round.difficulty}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-red-400 font-semibold mb-3">Topics Covered</h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {round.topics.map((topic: string, topicIndex: number) => (
                            <span key={topicIndex} className="bg-orange-900 text-orange-300 px-3 py-1 rounded border border-orange-500 text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-red-400 font-semibold mb-3">Questions Asked</h5>
                        <ul className="text-gray-300 space-y-1">
                          {round.questionsAsked.map((question: string, qIndex: number) => (
                            <li key={qIndex} className="flex items-start gap-2">
                              <span className="text-red-400 mt-1">•</span>
                              <span>{question}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Ratings */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">⭐ Detailed Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(review.rating).map(([key, value]: [string, number]) => {
                const labels: Record<string, string> = {
                  overall: 'Overall Experience',
                  processClarity: 'Process Clarity',
                  interviewerBehavior: 'Interviewer Behavior',
                  difficultyRating: 'Difficulty Level',
                  wouldRecommend: 'Would Recommend'
                };
                
                return (
                  <div key={key} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-300">{labels[key]}</span>
                      <span className="font-bold text-white text-xl">{value}/5</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${(value / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Insights */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">💡 Key Insights</h3>
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-green-400 mb-4">🎯 Preparation Tips</h4>
                <p className="text-gray-300 leading-relaxed">{review.preparationTips}</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-blue-400 mb-4">� Advice for Future Candidates</h4>
                <p className="text-gray-300 leading-relaxed">{review.adviceForFuture}</p>
              </div>
              
              {review.questionsAsked.length > 0 && (
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">❓ Key Questions Asked</h4>
                  <ul className="text-gray-300 space-y-2">
                    {review.questionsAsked.map((question: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-red-400 mt-1 font-bold">{index + 1}.</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {review.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">🏷️ Tags</h3>
              <div className="flex flex-wrap gap-3">
                {review.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-blue-900 text-blue-300 px-4 py-2 rounded-full border border-blue-500 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviewer Info */}
          <div className="border-t border-gray-700 pt-8">
            <h3 className="text-2xl font-bold text-white mb-6">👤 About the Reviewer</h3>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <span className="font-semibold text-red-400">College:</span>
                  <p className="text-gray-300 mt-1">{review.reviewerInfo.college}</p>
                </div>
                <div>
                  <span className="font-semibold text-red-400">Degree:</span>
                  <p className="text-gray-300 mt-1">{review.reviewerInfo.degree}</p>
                </div>
                <div>
                  <span className="font-semibold text-red-400">Passing Year:</span>
                  <p className="text-gray-300 mt-1">{review.reviewerInfo.passingYear}</p>
                </div>
                <div>
                  <span className="font-semibold text-red-400">Experience:</span>
                  <p className="text-gray-300 mt-1">{review.reviewerInfo.previousExperience}</p>
                </div>
                {review.reviewerInfo.cgpa && (
                  <div>
                    <span className="font-semibold text-red-400">CGPA:</span>
                    <p className="text-gray-300 mt-1">{review.reviewerInfo.cgpa}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Actions */}
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate('/submit')}
          className="px-8 py-4 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
        >
          🎬 Share Your Story
        </button>
      </div>
    </div>
  );
}
