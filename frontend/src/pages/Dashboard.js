import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/api';
import PriorityBadge from '../components/PriorityBadge';
import StatusLabel from '../components/StatusLabel';
import DeleteModal from '../components/DeleteModal';
import { formatDate } from '../utils/dateFormatter';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null, taskTitle: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    
    setFilteredTasks(filtered);
  };

  const handleDeleteClick = (taskId, taskTitle) => {
    setDeleteModal({ isOpen: true, taskId, taskTitle });
  };

  const handleDeleteConfirm = async () => {
    try {
      await taskService.deleteTask(deleteModal.taskId);
      toast.success('Task deleted successfully');
      fetchTasks();
      setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' });
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleCreateTaskClick = (e) => {
    e.preventDefault();
    navigate('/create-task');
  };

  const getTaskStats = () => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  });

  const stats = getTaskStats();

  const StatCard = ({ label, value, icon, gradient }) => (
    <div className={`glass-card p-4 sm:p-5 bg-gradient-to-br ${gradient} text-white hover:scale-105 transition-transform cursor-pointer`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/90 text-xs sm:text-sm font-medium mb-1">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold">{value}</p>
        </div>
        <div className="text-white/80 text-3xl sm:text-4xl">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      {/* Mobile Navbar */}
      <nav className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Task Manager
              </h1>
              <p className="text-xs text-white/80">Welcome, {user?.name || 'User'}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateTaskClick}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                + New
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-sm transition-all backdrop-blur-sm border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="content-wrapper sm:pt-6 pt-20">
        {/* Header - Desktop */}
        <div className="page-header animate-fadeIn">
          <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="page-title">Task Management</h1>
              <p className="page-subtitle">Welcome back, {user?.name || 'User'}!</p>
            </div>
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={handleCreateTaskClick}
                className="btn-primary"
              >
                Create Task
              </button>
              <button 
                type="button"
                onClick={handleLogout} 
                className="btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
          {/* Mobile Header - Just Title */}
          <div className="sm:hidden mb-4">
            <h1 className="page-title text-2xl">Task Management</h1>
            <p className="page-subtitle text-sm">Welcome back, {user?.name || 'User'}!</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slideIn">
          <StatCard label="Total Tasks" value={stats.total} icon="📋" gradient="from-blue-500 to-blue-600" />
          <StatCard label="Pending" value={stats.pending} icon="⏳" gradient="from-gray-500 to-gray-600" />
          <StatCard label="In Progress" value={stats.inProgress} icon="🔄" gradient="from-indigo-500 to-indigo-600" />
          <StatCard label="Completed" value={stats.completed} icon="✅" gradient="from-green-500 to-green-600" />
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6 animate-fadeIn max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Search</label>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field text-sm py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select-field text-sm py-2">
                <option>All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Priority</label>
              <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="select-field text-sm py-2">
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500/20 border-t-purple-500" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-6">
              {tasks.length === 0 ? "Get started by creating your first task!" : "Try adjusting your filters."}
            </p>
            {tasks.length === 0 && (
              <button 
                type="button"
                onClick={handleCreateTaskClick}
                className="btn-primary"
              >
                Create Your First Task
              </button>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-3">
            {filteredTasks.map((task, index) => (
              <div 
                key={task._id} 
                className="group relative overflow-hidden glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Accent Border */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  task.priority === 'High' ? 'bg-gradient-to-b from-red-500 to-pink-500' :
                  task.priority === 'Medium' ? 'bg-gradient-to-b from-yellow-500 to-orange-500' :
                  'bg-gradient-to-b from-green-500 to-emerald-500'
                }`} />

                <div className="relative p-4 flex items-center justify-between gap-4">
                  {/* Left: Task Info with Icon */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Task Icon/Checkbox */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      task.status === 'Completed' ? 'bg-green-100' :
                      task.status === 'In Progress' ? 'bg-blue-100' :
                      'bg-gray-100'
                    } group-hover:scale-110 transition-transform`}>
                      {task.status === 'Completed' ? (
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : task.status === 'In Progress' ? (
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )}
                    </div>

                    {/* Task Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                          {task.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <PriorityBadge priority={task.priority} />
                        <StatusLabel status={task.status} />
                        {task.dueDate && (
                          <span className="hidden sm:flex text-xs text-gray-500 items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
                            <span>📅</span>
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: View Button with Arrow */}
                  <Link 
                    to={`/task/${task._id}`} 
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 group/btn"
                  >
                    <span>View</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })}
        onConfirm={handleDeleteConfirm}
        taskTitle={deleteModal.taskTitle}
      />
    </div>
  );
};

export default Dashboard;