import SuggestionForm from '../../components/SuggestionForm';
import SuggestionList from '../../components/SuggestionList';
import StatsCard from '../../components/StatsCard';
import UserSuggestions from '../../components/UserSuggestions';
import clientPromise from '../../lib/db';

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const { passwd = '' } = searchParams;

    // Password check
    const adminPass = process.env.ADMIN_PASSWD;
    if (!passwd || passwd !== adminPass) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h1>
                    <p className="text-gray-700">You are not authorized to view this page.</p>
                </div>
            </div>
        );
    }

    const suggestions = await getSuggestions();
    const stats = await getStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 py-8">
            <main className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-indigo-700 mb-4">CodeSapiens Admin</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                Community Suggestions
                            </h2>
                            <SuggestionList suggestions={suggestions} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <StatsCard stats={stats} />
                        <UserSuggestions />
                    </div>
                </div>
            </main>

            <footer className="text-center mt-12 text-gray-500">
                <p>© {new Date().getFullYear()} CodeSapiens. Building better developers together.</p>
            </footer>
        </div>
    );
}

async function getSuggestions() {
    const client = await clientPromise;
    const db = client.db();
    const suggestions = await db
        .collection('suggestions')
        .find()
        .sort({ createdAt: -1 })
        .limit(20)
        .toArray();

    return suggestions.map((s: any) => ({
        _id: s._id.toString(),
        message: s.message,
        createdAt: s.createdAt instanceof Date ? s.createdAt.toISOString() : s.createdAt,
        userToken: s.userToken,
    }));
}

async function getStats() {
    try {
        const client = await clientPromise;
        const db = client.db();

        const [totalSuggestions, uniqueUsers] = await Promise.all([
            db.collection('suggestions').countDocuments(),
            db.collection('suggestions').distinct('userToken')
        ]);

        return {
            totalSuggestions,
            uniqueUsers: uniqueUsers.length,
            avgPerUser: totalSuggestions / uniqueUsers.length || 0
        };
    } catch (e) {
        console.error(e);
        return {
            totalSuggestions: 0,
            uniqueUsers: 0,
            avgPerUser: 0
        };
    }
}
