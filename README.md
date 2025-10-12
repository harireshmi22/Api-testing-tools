# API Testing Tools

A comprehensive API testing platform built with Next.js and Node.js, featuring modern UI, authentication, and advanced testing capabilities.

## 🚀 Features

- **Modern UI**: Clean, responsive design with white theme
- **Authentication**: Secure login/signup with JWT tokens
- **API Testing**: Support for all HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)
- **Request History**: Save and manage your API requests
- **Response Analysis**: Detailed response analysis with timing and status codes
- **Headers Management**: Dynamic headers and parameters builder
- **User Management**: Personal accounts with request history
- **Responsive Design**: Works perfectly on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/api-testing-tools
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

### Getting Started

1. **Sign Up**: Create a new account or use the demo credentials:
   - Email: `demo@example.com`
   - Password: `demo123`

2. **API Testing**: 
   - Navigate to the API Tester
   - Select HTTP method
   - Enter your API endpoint
   - Add headers/parameters as needed
   - Click "Send" to execute the request

3. **Request History**: 
   - All requests are automatically saved
   - Access history from the sidebar
   - Re-run previous requests with one click

### Quick Test URLs

Try these popular APIs to get started:

- `https://jsonplaceholder.typicode.com/posts` - JSONPlaceholder API
- `https://httpbin.org/get` - HTTP testing service
- `https://api.github.com/users/octocat` - GitHub API
- `https://reqres.in/api/users` - ReqRes API

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### API Testing
- `POST /api/execute` - Execute API request
- `GET /api/history` - Get user's request history
- `GET /api/history/:id` - Get specific history item
- `DELETE /api/history/:id` - Delete history item

## 🎨 UI Components

The application includes several reusable components:

- **Navigation**: Responsive navigation bar with authentication
- **UrlBar**: Enhanced URL input with method selector
- **ResponseViewer**: Advanced response analysis with tabs
- **RequestEditor**: Multi-tab request builder
- **HistorySidebar**: Request history management

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **CORS Protection**: Configured CORS policies
- **Input Validation**: Request validation and sanitization
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to Vercel, Netlify, or any static hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation at `/docs`
2. Review the troubleshooting section
3. Create an issue on GitHub
4. Contact support

## 🔮 Roadmap

- [ ] Environment variables management
- [ ] Advanced testing and assertions
- [ ] Team collaboration features
- [ ] API collection import/export
- [ ] GraphQL support
- [ ] WebSocket testing
- [ ] Automated testing scripts
- [ ] API documentation generation

---

Built with ❤️ for developers who demand precision and efficiency in API testing.




