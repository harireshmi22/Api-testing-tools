import Navigation from "../components/shared/Navigation";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Powerful API Testing Features
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Everything you need to test, debug, and document your APIs effectively
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* HTTP Methods */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">All HTTP Methods</h3>
                            <p className="text-gray-600 mb-4">
                                Support for GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS methods with proper request handling.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• RESTful API testing</li>
                                <li>• GraphQL support</li>
                                <li>• WebSocket connections</li>
                            </ul>
                        </div>

                        {/* Request Builder */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Request Builder</h3>
                            <p className="text-gray-600 mb-4">
                                Intuitive interface for building complex API requests with headers, parameters, and body data.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Dynamic headers management</li>
                                <li>• Query parameters builder</li>
                                <li>• JSON/XML body editor</li>
                            </ul>
                        </div>

                        {/* Response Analysis */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Response Analysis</h3>
                            <p className="text-gray-600 mb-4">
                                Detailed response analysis with timing, status codes, headers, and formatted output.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Response time tracking</li>
                                <li>• Status code validation</li>
                                <li>• Header inspection</li>
                            </ul>
                        </div>

                        {/* History Management */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Request History</h3>
                            <p className="text-gray-600 mb-4">
                                Save and organize your API requests with full history tracking and easy access.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Unlimited request history</li>
                                <li>• Search and filter</li>
                                <li>• Export capabilities</li>
                            </ul>
                        </div>

                        {/* Authentication */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Authentication</h3>
                            <p className="text-gray-600 mb-4">
                                Support for various authentication methods including API keys, OAuth, and JWT tokens.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• API Key authentication</li>
                                <li>• OAuth 2.0 support</li>
                                <li>• JWT token handling</li>
                            </ul>
                        </div>

                        {/* Environment Variables */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Environment Variables</h3>
                            <p className="text-gray-600 mb-4">
                                Manage different environments with variables for URLs, API keys, and other dynamic values.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Multiple environments</li>
                                <li>• Variable substitution</li>
                                <li>• Environment switching</li>
                            </ul>
                        </div>

                        {/* Testing & Validation */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing & Validation</h3>
                            <p className="text-gray-600 mb-4">
                                Built-in testing capabilities with response validation and automated test scripts.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Response validation</li>
                                <li>• Test assertions</li>
                                <li>• Automated testing</li>
                            </ul>
                        </div>

                        {/* Collaboration */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Collaboration</h3>
                            <p className="text-gray-600 mb-4">
                                Share API collections with your team and collaborate on testing strategies.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Shared collections</li>
                                <li>• Team workspaces</li>
                                <li>• Comment system</li>
                            </ul>
                        </div>

                        {/* Import/Export */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Import/Export</h3>
                            <p className="text-gray-600 mb-4">
                                Import from Postman, Insomnia, or other tools and export your collections.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Postman import</li>
                                <li>• OpenAPI support</li>
                                <li>• JSON export</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to experience these features?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Start testing your APIs with our comprehensive platform today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/auth/signup"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                        >
                            Get Started Free
                        </a>
                        <a
                            href="/auth/login"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-lg"
                        >
                            Try Demo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
