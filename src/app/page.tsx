import SuggestionForm from '../components/SuggestionForm';

export default async function Home() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 py-8">
            <main className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-indigo-700 mb-4">CodeSapiens Community</h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Help us shape our GitHub sessions and learning resources!
                    </p>
                    <div className="max-w-2xl mx-auto bg-indigo-100 rounded-lg p-4">
                        <p className="text-indigo-800">
                            What topics would you like us to cover? What format works best for you?
                            Share your ideas below!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <SuggestionForm />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center mt-12 text-gray-500">
                <p>© {new Date().getFullYear()} CodeSapiens. Building better developers together.</p>
            </footer>
        </div>
    );
}
