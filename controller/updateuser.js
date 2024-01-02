// controllers/userController.js

import User from '../models/userSchema.js';

const updateEmail = async (req, res) => {
  try {
    const { username } = req; // Assuming req.username contains the username after authentication
    const { newEmail } = req.body;
    console.log(username)

    if (!username || !newEmail) {
      return res.status(400).json({ message: 'Please provide username and newEmail' });
    }

    // Update the email in the database
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { email: newEmail } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Email updated successfully', updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default updateEmail;
