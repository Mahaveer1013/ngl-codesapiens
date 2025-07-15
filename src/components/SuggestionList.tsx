import { format } from 'date-fns';

interface SuggestionListProps {
    suggestions: Array<{
        _id: string;
        message: string;
        createdAt: string;
        userToken?: string;
    }>;
}

export default function SuggestionList({ suggestions }: SuggestionListProps) {
    if (suggestions.length === 0) {
        return (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">No suggestions yet. Be the first to share!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {suggestions.map((suggestion) => (
                <div
                    key={suggestion._id}
                    className="p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                    <p className="text-gray-800 mb-2">{suggestion.message}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>
                            {format(new Date(suggestion.createdAt), 'MMM d, yyyy h:mm a')}
                        </span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                            User #{suggestion.userToken ? suggestion.userToken.slice(0, 4) : 'anon'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
