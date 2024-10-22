
exports.createTask = async (req, res) => {
    const { title, description } = req.body;

    console.log('Creating task with:', req.body); // Log the incoming request

    try {
        const task = new Task({ title, description, user: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error); // Log the error
        res.status(500).json({ message: 'Failed to create task' });
    }
};

exports.getTasks = async (req, res) => {
    console.log('Fetching tasks for user:', req.user.id); // Log user ID
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json(error);
    }
};

