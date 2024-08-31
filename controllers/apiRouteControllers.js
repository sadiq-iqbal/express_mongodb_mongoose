const User = require('../model/user.js')
const getUser = async (req, res) => {
    console.log('hello from', req.url)
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(400).send('Bad Request')
    }
    res.json(user);
}

const creatUser = async (req, res) => {
    let { first_name, last_name, email, gender, job_title } = req.body
    console.log(req.body);
    if (!first_name || !last_name || !email || !gender || !job_title) {
        return res.status(400).send('Bad Request')
    }

    const newUser = await User.create({
        firstName: first_name,
        lastName: last_name,
        email: email,
        jobTitle: job_title,
        gender: gender
    })
    res.status(201).send({ message: "user created", data: newUser })
}
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(204).send({ message: "User deleted" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
};

const updateUser = async (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body;
    const { id } = req.params; // Get the user ID from URL parameters

    if (!id) {
        return res.status(400).send('User ID is required');
    }

    // Prepare an update object with only provided fields
    const updateData = {};
    if (first_name) updateData.firstName = first_name;
    if (last_name) updateData.lastName = last_name;
    if (email) updateData.email = email;
    if (gender) updateData.gender = gender;
    if (job_title) updateData.jobTitle = job_title;

    try {
        // Use `new: true` to return the updated document
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};



module.exports = {
    updateUser,
    creatUser,
    getUser,
    deleteUser
}