import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskService } from '../services/api';
import PriorityBadge from '../components/PriorityBadge';
import StatusLabel from '../components/StatusLabel';
import DeleteModal from '../components/DeleteModal';
import { formatDateTime } from '../utils/dateFormatter';
import toast from 'react-hot-toast';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false });

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTask(id);
      setTask(response.data);
    } catch (error) {
      toast.error('Failed to fetch task details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModal({ isOpen: true });
  };

  const handleDeleteConfirm = async () => {
    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500/20 border-t-purple-500" />
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Task not found</h2>
            <Link to="/" className="text-purple-600 hover:text-purple-700 font-semibold">
              Go back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const InfoCard = ({ icon, label, value }) => (
    <div className="bg-white/70 p-3 rounded-lg border border-gray-200">
      <h3 className="text-xs font-semibold text-gray-600 uppercase mb-1">{label}</h3>
      <div className="flex items-center text-gray-900 text-sm">
        <span className="mr-2">{icon}</span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="content-wrapper max-w-3xl">
        <div className="page-header animate-slideIn">
          <button onClick={() => navigate('/')} className="link-back mb-4 group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="page-title">Task Details</h1>
              <p className="page-subtitle">View and manage your task</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/task/${id}/edit`} className="btn-primary text-sm px-4 py-2">
                Edit
              </Link>
              <button onClick={handleDeleteClick} className="btn-danger text-sm px-4 py-2">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 sm:p-6 animate-fadeIn">
          <div className="mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{task.title}</h2>
            <div className="flex flex-wrap gap-2">
              <PriorityBadge priority={task.priority} />
              <StatusLabel status={task.status} />
            </div>
          </div>

          {task.description && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">Description</h3>
              <p className="text-gray-800 bg-white/70 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap text-sm">
                {task.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <InfoCard
              icon="📅"
              label="Due Date"
              value={task.dueDate ? formatDateTime(task.dueDate) : 'No due date'}
            />
            <InfoCard
              icon="🕐"
              label="Created"
              value={formatDateTime(task.createdAt)}
            />
            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <InfoCard
                icon="🔄"
                label="Updated"
                value={formatDateTime(task.updatedAt)}
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Link to={`/task/${id}/edit`} className="btn-primary flex-1 text-center">
              Edit Task
            </Link>
            <button onClick={handleDeleteClick} className="btn-danger flex-1">
              Delete Task
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDeleteConfirm}
        taskTitle={task.title}
      />
    </div>
  );
};

export default TaskDetails;