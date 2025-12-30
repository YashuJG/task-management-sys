# Task Management Web Application

A modern, production-ready Task Management Web Application built with React, Node.js, Express, and MongoDB. Features a clean, responsive UI with full CRUD operations for task management.

🔗 Live App Link: https://task-management-sys-woad.vercel.app
## 🎯 Features

- **Task CRUD Operations**
  - Create new tasks with title, description, priority, status, and due date
  - View all tasks on a beautiful dashboard
  - View individual task details
  - Edit existing tasks
  - Delete tasks with confirmation modal

- **Dashboard Features**
  - Task statistics (Total, Pending, In Progress, Completed)
  - Search tasks by title
  - Filter by status (Pending, In Progress, Completed)
  - Filter by priority (Low, Medium, High)
  - Empty states for better UX

- **Modern UI/UX**
  - Fully responsive design (mobile, tablet, desktop)
  - Color-coded priority badges
  - Status labels with visual indicators
  - Smooth transitions and hover effects
  - Toast notifications for user feedback
  - Confirmation modals for delete operations

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
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.3.1 - Environment variables

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier) or local MongoDB instance
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
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

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

3. Create a `.env` file in the frontend directory (optional, defaults to localhost):
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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a single task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task by ID |
| DELETE | `/tasks/:id` | Delete a task by ID |
| GET | `/health` | Health check endpoint |

### Request/Response Examples

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
│   ├── server.js           # Express server and routes
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables (create this)
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── PriorityBadge.js
│   │   │   ├── StatusLabel.js
│   │   │   └── DeleteModal.js
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── CreateTask.js
│   │   │   ├── TaskDetails.js
│   │   │   └── EditTask.js
│   │   ├── services/       # API service
│   │   │   └── api.js
│   │   ├── utils/          # Utility functions
│   │   │   └── dateFormatter.js
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind configuration
│   └── postcss.config.js   # PostCSS configuration
└── README.md
```

## 🚀 Deployment
Live Deployment

You can access the live deployed application here:

🔗 Live App: https://task-management-sys-woad.vercel.app

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

### Backend Deployment (Render/Railway)

1. **Prepare for deployment:**
   - Ensure `.env` file is configured in your hosting platform
   - Set `MONGODB_URI` in environment variables
   - Set `PORT` (Render/Railway will provide this automatically)

2. **Deploy to Render:**
   - Connect your GitHub repository
   - Select backend directory as root
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables in Render dashboard

3. **Deploy to Railway:**
   - Connect your GitHub repository
   - Select backend directory
   - Add environment variables in Railway dashboard
   - Deploy automatically

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier)
3. Create a database user
4. Whitelist your IP address (use `0.0.0.0/0` for all IPs in production)
5. Get your connection string and add it to `.env` as `MONGODB_URI`

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)
- Large screens (1280px and up)

## 🎨 UI Features

- **Priority Badges**: Color-coded badges (Red for High, Yellow for Medium, Green for Low)
- **Status Labels**: Visual status indicators (Gray for Pending, Purple for In Progress, Blue for Completed)
- **Smooth Animations**: Hover effects and transitions throughout the app
- **Toast Notifications**: Success and error messages for user actions
- **Confirmation Modals**: Prevents accidental deletions
- **Empty States**: Helpful messages when no tasks are found

## 🔒 Security Notes

- No authentication is implemented (as per requirements)
- For production use, consider adding:
  - User authentication
  - Input validation and sanitization
  - Rate limiting
  - CORS configuration
  - HTTPS

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

### Running Tests
```bash
# Backend (if tests are added)
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🐛 Troubleshooting

### Backend issues
- Ensure MongoDB connection string is correct
- Check if port 5000 is available
- Verify all dependencies are installed

### Frontend issues
- Clear browser cache
- Ensure backend server is running
- Check CORS configuration
- Verify API URL in environment variables

## 📞 Support

For issues and questions, please open an issue on the repository.

---

Built with ❤️ for efficient task management

