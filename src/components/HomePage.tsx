import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReviewCard } from '../components/ReviewCard';
import { mockReviews } from '../data/mockData';

export function HomePage() {
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'company'>('date');
  const [filterByRating, setFilterByRating] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort reviews
  const filteredAndSortedReviews = mockReviews
    .filter((review: any) => {
      const matchesSearch = searchTerm === '' || 
        review.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewerInfo.college.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRating = filterByRating === null || 
        Math.floor(review.rating.overall) >= filterByRating;
      
      return matchesSearch && matchesRating;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
        case 'rating':
          return b.rating.overall - a.rating.overall;
        case 'company':
          return a.companyName.localeCompare(b.companyName);
        default:
          return 0;
      }
    });

  const averageRating = mockReviews.reduce((sum: number, review: any) => sum + review.rating.overall, 0) / mockReviews.length;
  const selectedCount = mockReviews.filter((review: any) => review.result === 'Selected').length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Netflix-style Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-red-900 text-white rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-600 text-white px-4 py-2 rounded font-bold text-lg">
              PLACEMENT REVIEWS
            </div>
            <div className="text-red-400 font-semibold">Original Series</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
            Interview Experiences
          </h1>
          <p className="text-xl text-gray-200 mb-6 max-w-3xl leading-relaxed">
            Binge-watch real interview stories, online assessment breakdowns, and placement secrets from students across India. 
            Your next career move starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold text-lg transition-colors flex items-center gap-2"
            >
              ▶ Share Your Story
            </Link>
            <div className="flex gap-8 text-gray-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{mockReviews.length}</div>
                <div className="text-sm">Episodes Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</div>
                <div className="text-sm">⭐ Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{selectedCount}</div>
                <div className="text-sm">Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Netflix-style Filters and Search */}
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 mb-8 border border-gray-800">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-medium text-gray-300 mb-2">🔍 Search Stories</label>
            <input
              type="text"
              placeholder="Search by company, role, location, or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'company')}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="date">📅 Newest Episodes</option>
                <option value="rating">⭐ Top Rated</option>
                <option value="company">🏢 Company A-Z</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Rating</label>
              <select
                value={filterByRating ?? ''}
                onChange={(e) => setFilterByRating(e.target.value ? Number(e.target.value) : null)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Ratings</option>
                <option value="4">⭐⭐⭐⭐+ Highly Rated</option>
                <option value="3">⭐⭐⭐+ Good Stories</option>
                <option value="2">⭐⭐+ Average</option>
                <option value="1">⭐+ All Stories</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active filters display */}
        {(searchTerm || filterByRating) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                🔍 "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-red-200 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {filterByRating && (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                ⭐ {filterByRating}+ Stars
                <button 
                  onClick={() => setFilterByRating(null)}
                  className="text-red-200 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-300 text-lg">
            📺 {filteredAndSortedReviews.length} of {mockReviews.length} episodes available
          </p>
        </div>

      {/* Netflix-style Reviews Grid */}
      {filteredAndSortedReviews.length === 0 ? (
        <div className="text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-red-400 mb-6">
            <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No episodes found</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Looks like this genre is empty! Be the first to create content for this category.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-colors"
          >
            🎬 Create Your Episode
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">🎭 Interview Stories Collection</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAndSortedReviews.map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </>
      )}        {/* Netflix-style Call to Action */}
        {filteredAndSortedReviews.length > 0 && (
          <div className="mt-16 text-center bg-gradient-to-r from-red-900 via-gray-900 to-black rounded-lg p-12 border border-gray-800">
            <div className="bg-red-600 text-white px-4 py-2 rounded font-bold text-sm inline-block mb-4">
              EXCLUSIVE CONTENT
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Share Your Story?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of students who are helping others succeed. Your interview experience could be the next binge-worthy episode!
            </p>
            <Link
              to="/submit"
              className="inline-flex items-center px-12 py-4 bg-red-600 text-white rounded font-bold text-lg hover:bg-red-700 transition-colors"
            >
              🎬 Start Recording
            </Link>
          </div>
        )}
    </div>
  );
}
