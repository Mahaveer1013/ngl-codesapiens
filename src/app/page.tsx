import SuggestionForm from '../components/SuggestionForm';

export default async function Home() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 py-8">
            <main className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-indigo-700 mb-4">CodeSapiens Community</h1>
                    <p className="text-xl text-green-500 mb-2">
                        Nanbargale Padichitu unga suggesstions sollavum!
                    </p>
                    <p className="text-xl text-gray-600 mb-2">
                        We wanted you to get into your dream companies, We are ready to help you!
                        We just wanted to know what you want from us!
                    </p>
                    <div className="max-w-2xl mx-auto bg-indigo-100 rounded-lg p-4">
                        <p className="text-indigo-800">
                            What topics would you like us to cover? What format works best for you?
                            Share your ideas below!
                            Enna venumo sollunga, its anonymous! we want to know the mindset of students! thats it guys!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <SuggestionForm />
                        </div>
                    </div>
                </div>
            </main>

            {/* <p className="text-xl text-gray-600 m-2 text-center">
                Contact ku +91 7305591354
                feel free to ask your doubts nanbargale!
            </p> */}

            <footer className="text-center mt-12 text-gray-500">
                <p>© {new Date().getFullYear()} CodeSapiens. Building better developers together.</p>
            </footer>
        </div>
    );
}
