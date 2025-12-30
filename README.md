# Task Management Web Application

A modern, production-ready Task Management Web Application built with React, Node.js, Express, and MongoDB. Features a clean, responsive UI with authentication, task management, and email-based password recovery.

🔗 **Live App Link:** https://task-management-sys-woad.vercel.app

## 🎯 Features

### User Authentication
- User registration with email validation
- Secure login system
- JWT-based authentication
- Protected routes
- Session management

### Password Recovery
- Email-based password reset
- Secure reset token with expiry (1 hour)
- Password update via reset link
- Token validation

### Task CRUD Operations
- Create new tasks with title, description, priority, status, and due date
- View all tasks on a beautiful dashboard
- View individual task details
- Edit existing tasks
- Delete tasks with confirmation modal

### Dashboard Features
- Task statistics (Total, Pending, In Progress, Completed)
- Search tasks by title
- Filter by status (Pending, In Progress, Completed)
- Filter by priority (Low, Medium, High)
- Empty states for better UX

### Modern UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Color-coded priority badges
- Status labels with visual indicators
- Smooth transitions and hover effects
- Toast notifications for user feedback
- Confirmation modals for delete operations
- Loading states and error handling

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **React Router** 6.20.1 - Client-side routing
- **Tailwind CSS** 3.3.6 - Utility-first CSS framework
- **Axios** 1.6.2 - HTTP client
- **React Hot Toast** 2.4.1 - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - Database
- **Mongoose** 8.0.3 - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.3.1 - Environment variables

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier) or local MongoDB instance
- npm or yarn
- Gmail account (for password reset emails)

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
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

**Email Setup (Gmail):**
- Go to Google Account Settings
- Enable 2-Step Verification
- Generate an App Password
- Use the App Password in `EMAIL_PASS`

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔌 API Endpoints

All endpoints are prefixed with `/api`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/forgot-password` | Send reset password email | No |
| POST | `/auth/reset-password/:token` | Reset password | No |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks` | Get all tasks | Yes |
| GET | `/tasks/:id` | Get a single task by ID | Yes |
| POST | `/tasks` | Create a new task | Yes |
| PUT | `/tasks/:id` | Update a task by ID | Yes |
| DELETE | `/tasks/:id` | Delete a task by ID | Yes |

### Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check endpoint | No |

### Request/Response Examples

#### Register (POST /api/auth/register)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Login (POST /api/auth/login)
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Forgot Password (POST /api/auth/forgot-password)
```json
{
  "email": "john@example.com"
}
```

#### Reset Password (POST /api/auth/reset-password/:token)
```json
{
  "password": "NewSecurePassword123"
}
```

#### Create Task (POST /api/tasks)
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the project",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

#### Update Task (PUT /api/tasks/:id)
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the project",
  "priority": "Medium",
  "status": "In Progress",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

## 📁 Project Structure

```
task-management/
├── backend/
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task CRUD logic
│   ├── routes/
│   │   ├── authRoutes.js        # Auth routes
│   │   └── taskRoutes.js        # Task routes
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── Task.js              # Task model
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── utils/
│   │   └── sendEmail.js         # Email utility
│   ├── server.js                # Express server
│   ├── package.json             # Backend dependencies
│   ├── .env                     # Environment variables
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── PriorityBadge.js
│   │   │   ├── StatusLabel.js
│   │   │   └── DeleteModal.js
│   │   ├── pages/               # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ForgotPassword.js
│   │   │   ├── ResetPassword.js
│   │   │   ├── Dashboard.js
│   │   │   ├── CreateTask.js
│   │   │   ├── TaskDetails.js
│   │   │   └── EditTask.js
│   │   ├── services/            # API service
│   │   │   └── api.js
│   │   ├── utils/               # Utility functions
│   │   │   └── dateFormatter.js
│   │   ├── App.js               # Main app component
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Frontend dependencies
│   ├── tailwind.config.js       # Tailwind configuration
│   └── postcss.config.js        # PostCSS configuration
└── README.md
```

## 🚀 Deployment

### Live Deployment

You can access the live deployed application here:

🔗 **Live App:** https://task-management-sys-woad.vercel.app

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Deploy to Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the frontend directory
   - Add environment variable: `REACT_APP_API_URL=your_backend_url/api`

3. **Deploy to Netlify:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Add environment variable: `REACT_APP_API_URL=your_backend_url/api`

### Backend Deployment (Render/Railway/Heroku)

1. **Prepare for deployment:**
   - Ensure all environment variables are configured
   - Update `CLIENT_URL` to your deployed frontend URL

2. **Deploy to Render:**
   - Connect your GitHub repository
   - Select backend directory as root
   - Build command: `npm install`
   - Start command: `npm start`
   - Add all environment variables in Render dashboard:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `CLIENT_URL`

3. **Deploy to Railway:**
   - Connect your GitHub repository
   - Select backend directory
   - Add all environment variables in Railway dashboard
   - Deploy automatically

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0)
3. Create a database user with password
4. Whitelist your IP address (use `0.0.0.0/0` for all IPs in production)
5. Get your connection string
6. Add it to `.env` as `MONGODB_URI`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktop** (1024px and up)
- **Large screens** (1280px and up)

## 🎨 UI Features

- **Priority Badges**: Color-coded badges
  - 🔴 Red for High priority
  - 🟡 Yellow for Medium priority
  - 🟢 Green for Low priority

- **Status Labels**: Visual status indicators
  - ⚪ Gray for Pending
  - 🟣 Purple for In Progress
  - 🔵 Blue for Completed

- **Smooth Animations**: Hover effects and transitions throughout the app
- **Toast Notifications**: Success and error messages for user actions
- **Confirmation Modals**: Prevents accidental deletions
- **Empty States**: Helpful messages when no tasks are found
- **Loading States**: Spinners and skeletons for better UX

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs (10 salt rounds)
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware to protect API endpoints
- **Password Reset Tokens**: Time-limited tokens (1 hour expiry)
- **HTTP-Only Cookies**: Secure token storage (optional implementation)
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

### Additional Security Recommendations for Production

- Enable HTTPS/SSL certificates
- Implement rate limiting to prevent brute force attacks
- Add request validation middleware
- Use environment-specific configurations
- Implement refresh tokens
- Add CSRF protection
- Set secure HTTP headers (helmet.js)
- Monitor and log security events

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure your database user has proper permissions

**Email Sending Fails:**
- Verify Gmail App Password is correct
- Check if 2-Step Verification is enabled
- Ensure less secure app access is disabled (use App Password instead)

**JWT Errors:**
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration settings
- Verify token is being sent in Authorization header

**Port Already in Use:**
```bash
# Kill process on port 5000 (Mac/Linux)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Issues

**API Connection Failed:**
- Ensure backend server is running
- Verify `REACT_APP_API_URL` is correct
- Check CORS configuration in backend
- Clear browser cache and local storage

**Authentication Not Working:**
- Check if token is being stored correctly
- Verify token is being sent in API requests
- Clear local storage and try logging in again

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📝 Environment Variables Reference

### Backend (.env)
```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars

# Email Configuration (Gmail)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_16_char_app_password

# Frontend URL (for CORS and email links)
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Running Tests
```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 👨‍💻 Development

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Contact: yasaswinisrit@gmail.com

---

**Built with ❤️ for efficient task management**

⭐ Star this repo if you find it helpful!
