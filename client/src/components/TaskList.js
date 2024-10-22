import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from '../api'; 
import './TaskList.css';

const TaskList = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null); // For tracking which task is being edited

    const fetchTasks = useCallback(async () => {
        try {
            const response = await getTasks(token);
            setTasks(response.data || response);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [token]);

    const handleAddOrUpdateTask = async (e) => {
        e.preventDefault();

        if (editingTaskId) {
            // Update an existing task
            try {
                await updateTask(token, editingTaskId, { title: taskTitle, description: taskDescription });
                setEditingTaskId(null); // Reset editing state
            } catch (error) {
                console.error('Error updating task:', error);
                alert('Failed to update task');
            }
        } else {
            // Create a new task
            try {
                await createTask(token, { title: taskTitle, description: taskDescription });
            } catch (error) {
                console.error('Error creating task:', error);
                alert('Failed to create task');
            }
        }

        // Reset the form fields and fetch updated tasks
        setTaskTitle('');
        setTaskDescription('');
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(token, taskId);
            fetchTasks(); // Refresh tasks after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        }
    };

    const handleEditTask = (task) => {
        setTaskTitle(task.title); // Populate fields with task data
        setTaskDescription(task.description);
        setEditingTaskId(task._id); // Set the task ID for editing

        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Adds a smooth scrolling effect
        });
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div>
            <h2>My Tasks</h2>
            <form onSubmit={handleAddOrUpdateTask}>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                />
                <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button> {/* Change button label */}
            </form>
            <div className="task-grid"> {/* Change from ul to div for grid layout */}
                {tasks.map(task => (
                    <div className="task-item" key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Created on: {new Date(task.createdAt).toLocaleDateString()}</p>
                        <button onClick={() => handleEditTask(task)}>Edit</button> {/* Edit button */}
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
