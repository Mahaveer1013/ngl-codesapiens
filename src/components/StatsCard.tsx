interface StatsCardProps {
    stats: {
      totalSuggestions: number;
      uniqueUsers: number;
      avgPerUser: number;
    };
  }

  export default function StatsCard({ stats }: StatsCardProps) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Community Stats
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Suggestions</p>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalSuggestions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Unique Participants</p>
            <p className="text-3xl font-bold text-indigo-600">{stats.uniqueUsers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Suggestions per User</p>
            <p className="text-3xl font-bold text-indigo-600">
              {stats.avgPerUser.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    );
  }
