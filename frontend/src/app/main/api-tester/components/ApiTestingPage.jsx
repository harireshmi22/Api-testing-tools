import React, { useState } from 'react';
import { Plus, Trash2, Send, Eye, EyeOff } from 'lucide-react';

// This is our state structure - similar to what you showed
const initialState = {
    request: {
        url: 'https://api.github.com/users/octocat',
        method: 'GET',
        headers: [
            { key: 'Authorization', value: 'Bearer your-token-here', enabled: true },
            { key: 'Content-Type', value: 'application/json', enabled: true },
            { key: 'User-Agent', value: 'MyApp/1.0', enabled: false }
        ]
    },
    response: null,
    loading: false
};

export default function APIHeadersManager() {
    const [state, setState] = useState(initialState);

    // This is similar to your addHeaders function
    const addHeaders = () => {
        setState((prevState) => ({
            ...prevState,
            request: {
                ...prevState.request,
                headers: [
                    ...prevState.request.headers,
                    { key: "", value: "", enabled: true }
                ]
            }
        }));
    };

    // Update specific header
    const updateHeader = (index, field, value) => {
        setState((prevState) => ({
            ...prevState,
            request: {
                ...prevState.request,
                headers: prevState.request.headers.map((header, i) =>
                    i === index ? { ...header, [field]: value } : header
                )
            }
        }));
    };

    // Remove header
    const removeHeader = (index) => {
        setState((prevState) => ({
            ...prevState,
            request: {
                ...prevState.request,
                headers: prevState.request.headers.filter((_, i) => i !== index)
            }
        }));
    };

    // Toggle header enabled/disabled
    const toggleHeader = (index) => {
        setState((prevState) => ({
            ...prevState,
            request: {
                ...prevState.request,
                headers: prevState.request.headers.map((header, i) =>
                    i === index ? { ...header, enabled: !header.enabled } : header
                )
            }
        }));
    };

    // Simulate API call
    const sendRequest = async () => {
        setState(prev => ({ ...prev, loading: true, response: null }));

        try {
            // Filter only enabled headers
            const enabledHeaders = state.request.headers
                .filter(header => header.enabled && header.key && header.value)
                .reduce((acc, header) => {
                    acc[header.key] = header.value;
                    return acc;
                }, {});

            const response = await fetch(state.request.url, {
                method: state.request.method,
                headers: enabledHeaders
            });

            const data = await response.json();
            setState(prev => ({
                ...prev,
                loading: false,
                response: {
                    status: response.status,
                    data: JSON.stringify(data, null, 2)
                }
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                response: {
                    status: 'Error',
                    data: error.message
                }
            }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">API Testing Tool</h1>

            {/* Request URL Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Request URL</label>
                <div className="flex gap-2">
                    <select
                        value={state.request.method}
                        onChange={(e) => setState(prev => ({
                            ...prev,
                            request: { ...prev.request, method: e.target.value }
                        }))}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <input
                        type="text"
                        value={state.request.url}
                        onChange={(e) => setState(prev => ({
                            ...prev,
                            request: { ...prev.request, url: e.target.value }
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter API URL"
                    />
                    <button
                        onClick={sendRequest}
                        disabled={state.loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        <Send size={16} />
                        {state.loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>

            {/* Headers Section */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Headers</h2>
                    <button
                        onClick={addHeaders}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Header
                    </button>
                </div>

                <div className="space-y-2">
                    {state.request.headers.map((header, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            {/* Enable/Disable Toggle */}
                            <button
                                onClick={() => toggleHeader(index)}
                                className={`p-1 rounded ${header.enabled ? 'text-green-600' : 'text-gray-400'}`}
                                title={header.enabled ? 'Enabled' : 'Disabled'}
                            >
                                {header.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>

                            {/* Header Key */}
                            <input
                                type="text"
                                value={header.key}
                                onChange={(e) => updateHeader(index, 'key', e.target.value)}
                                placeholder="Header Key (e.g., Authorization)"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Header Value */}
                            <input
                                type="text"
                                value={header.value}
                                onChange={(e) => updateHeader(index, 'value', e.target.value)}
                                placeholder="Header Value (e.g., Bearer token123)"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Remove Button */}
                            <button
                                onClick={() => removeHeader(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                title="Remove Header"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Response Section */}
            {state.response && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Response</h2>
                    <div className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-auto max-h-96">
                        <div className="mb-2">Status: {state.response.status}</div>
                        <pre>{state.response.data}</pre>
                    </div>
                </div>
            )}

            {/* Debug Section - Shows Current State */}
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Current State (Debug)</h3>
                <pre className="text-sm text-yellow-700 overflow-auto">
          {JSON.stringify(state.request, null, 2)}
        </pre>
            </div>
        </div>
    );
}