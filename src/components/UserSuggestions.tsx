'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function UserSuggestions() {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSuggestions = async () => {
      try {
        const response = await fetch('/api/suggestions/user');
        const data = await response.json();
        setUserSuggestions(data);
      } catch (error) {
        console.error('Failed to fetch user suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSuggestions();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Your Suggestions
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : userSuggestions.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any suggestions yet</p>
      ) : (
        <div className="space-y-3">
          {userSuggestions.map((suggestion: any) => (
            <div key={suggestion._id} className="border-l-4 border-indigo-400 pl-3 py-1">
              <p className="text-gray-800">{suggestion.message}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(suggestion.createdAt), 'MMM d, h:mm a')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
