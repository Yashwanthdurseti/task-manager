import axios from 'axios';

const api = axios.create({
    baseURL: 'https://task-manager-yashwanth-941d9764a925.herokuapp.com/api/', // Change to your backend URL when deployed
});

export const registerUser = async (userData) => {
    return await api.post('/auth/register', userData);
};

export const loginUser = async (userData) => {
    return await api.post('/auth/login', userData);
};



// export const getTasks = async (token) => {
//     const response = await fetch('/api/tasks', {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });
//     if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//     }
//     return response.json();
// };

export const getTasks = async (token) => {
    try {
        const response = await api.get('/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};


export const createTask = async (token, task) => {
    const response = await fetch('https://task-manager-yashwanth-941d9764a925.herokuapp.com/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task)
    });
    
   

    if (!response.ok) {
        const errorText = await response.text(); // Get raw response text
        console.error("Error response:", errorText); // Log error response
        throw new Error(errorText || 'Failed to create task');
    }

    return response.json();
};



// Make sure this function is included
// export const deleteTask = async (token, taskId) => {
//     const response = await fetch(`/api/tasks/${taskId}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     });
//     if (!response.ok) {
//         throw new Error('Failed to delete task');
//     }
//     return response.json();
// };

export const deleteTask = async (token, taskId) => {
    try {
        const response = await fetch(`https://task-manager-yashwanth-941d9764a925.herokuapp.com/api/tasks/${taskId}`, {  // Ensure full URL
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,  // Include Bearer token
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();  // Log full error response
            console.error("Error response from server:", errorText);
            throw new Error('Failed to delete task');
        }

        return response.json();
    } catch (error) {
        console.error('Delete task failed:', error);  // Log exact error
        throw error;
    }
};

export const updateTask = async (token, taskId, updatedTask) => {
    const response = await fetch(`https://task-manager-yashwanth-941d9764a925.herokuapp.com/api/tasks/${taskId}`, {
        method: 'PUT',  // HTTP PUT method for updates
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error('Failed to update task');
    }

    return response.json();
};




// Add your other API functions here






