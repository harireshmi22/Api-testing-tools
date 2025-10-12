import Navigation from "../components/shared/Navigation";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        API Testing Documentation
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                        Learn how to use our API testing platform effectively
                    </p>
                </div>
            </div>

            {/* Documentation Content */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                                <nav className="space-y-2">
                                    <a href="#getting-started" className="block text-blue-600 hover:text-blue-800 text-sm">Getting Started</a>
                                    <a href="#making-requests" className="block text-gray-600 hover:text-gray-800 text-sm">Making Requests</a>
                                    <a href="#authentication" className="block text-gray-600 hover:text-gray-800 text-sm">Authentication</a>
                                    <a href="#environments" className="block text-gray-600 hover:text-gray-800 text-sm">Environments</a>
                                    <a href="#testing" className="block text-gray-600 hover:text-gray-800 text-sm">Testing & Validation</a>
                                    <a href="#collections" className="block text-gray-600 hover:text-gray-800 text-sm">Collections</a>
                                    <a href="#troubleshooting" className="block text-gray-600 hover:text-gray-800 text-sm">Troubleshooting</a>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">

                                {/* Getting Started */}
                                <section id="getting-started" className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 mb-4">
                                            Welcome to our API testing platform! This guide will help you get started with testing your APIs quickly and effectively.
                                        </p>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Creating Your First Request</h3>
                                        <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-6">
                                            <li>Open the API Tester from the main navigation</li>
                                            <li>Select your HTTP method (GET, POST, PUT, etc.)</li>
                                            <li>Enter your API endpoint URL</li>
                                            <li>Add any required headers or parameters</li>
                                            <li>Click "Send" to execute the request</li>
                                        </ol>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                            <h4 className="text-blue-800 font-semibold mb-2">💡 Pro Tip</h4>
                                            <p className="text-blue-700 text-sm">
                                                Try our quick URL suggestions to test with popular APIs like JSONPlaceholder or GitHub API.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Making Requests */}
                                <section id="making-requests" className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Making Requests</h2>
                                    <div className="prose max-w-none">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">HTTP Methods</h3>
                                        <p className="text-gray-600 mb-4">
                                            Our platform supports all standard HTTP methods:
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">GET</h4>
                                                <p className="text-sm text-gray-600">Retrieve data from the server</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">POST</h4>
                                                <p className="text-sm text-gray-600">Create new resources</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">PUT</h4>
                                                <p className="text-sm text-gray-600">Update existing resources</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">DELETE</h4>
                                                <p className="text-sm text-gray-600">Remove resources</p>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Body</h3>
                                        <p className="text-gray-600 mb-4">
                                            For POST, PUT, and PATCH requests, you can include a request body:
                                        </p>

                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
                                            <pre className="text-sm overflow-x-auto">
                                                {`{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </section>

                                {/* Authentication */}
                                <section id="authentication" className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication</h2>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 mb-4">
                                            Secure your API requests with various authentication methods:
                                        </p>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">API Key Authentication</h3>
                                        <p className="text-gray-600 mb-4">
                                            Add your API key in the headers section:
                                        </p>

                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
                                            <pre className="text-sm">
                                                {`Authorization: Bearer your-api-key-here
X-API-Key: your-api-key-here`}
                                            </pre>
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Authentication</h3>
                                        <p className="text-gray-600 mb-4">
                                            For username/password authentication:
                                        </p>

                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
                                            <pre className="text-sm">
                                                {`Authorization: Basic base64(username:password)`}
                                            </pre>
                                        </div>
                                    </div>
                                </section>

                                {/* Environments */}
                                <section id="environments" className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Environments</h2>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 mb-4">
                                            Manage different environments (development, staging, production) with environment variables:
                                        </p>

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                            <h4 className="text-yellow-800 font-semibold mb-2">🚧 Coming Soon</h4>
                                            <p className="text-yellow-700 text-sm">
                                                Environment variables and environment management will be available in a future update.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Testing & Validation */}
                                <section id="testing" className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing & Validation</h2>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 mb-4">
                                            Validate your API responses and create automated tests:
                                        </p>

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                            <h4 className="text-yellow-800 font-semibold mb-2">🚧 Coming Soon</h4>
                                            <p className="text-yellow-700 text-sm">
                                                Advanced testing features including assertions and automated test scripts will be available soon.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Collections */}
                                <section id="collections" className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Collections</h2>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 mb-4">
                                            Organize your API requests into collections for better management:
                                        </p>

                                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                                            <li>Save requests to your personal collection</li>
                                            <li>Access request history from the sidebar</li>
                                            <li>Re-run previous requests with one click</li>
                                            <li>Export collections for sharing</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Troubleshooting */}
                                <section id="troubleshooting" className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
                                    <div className="prose max-w-none">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Issues</h3>

                                        <div className="space-y-4">
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                <h4 className="text-red-800 font-semibold mb-2">CORS Errors</h4>
                                                <p className="text-red-700 text-sm mb-2">
                                                    If you encounter CORS errors, try using our proxy server by ensuring your URL doesn't start with localhost or 127.0.0.1.
                                                </p>
                                            </div>

                                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                                <h4 className="text-orange-800 font-semibold mb-2">Timeout Issues</h4>
                                                <p className="text-orange-700 text-sm mb-2">
                                                    Requests timeout after 10 seconds. For longer-running requests, consider breaking them into smaller operations.
                                                </p>
                                            </div>

                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <h4 className="text-blue-800 font-semibold mb-2">Authentication Problems</h4>
                                                <p className="text-blue-700 text-sm mb-2">
                                                    Double-check your API keys and authentication headers. Ensure they're properly formatted and haven't expired.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Support */}
                                <section className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 mb-4">
                                            If you need additional help or have questions:
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">Contact Support</h4>
                                                <p className="text-sm text-gray-600">Get help from our support team</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">Feature Requests</h4>
                                                <p className="text-sm text-gray-600">Suggest new features</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

