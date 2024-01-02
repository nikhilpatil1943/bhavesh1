import userSchema from "../models/userSchema.js";

const getMyProfile = async (req, res) => {
  try {
    const username = req.username; // Assuming req.userId contains the username after authentication

    if (!username) {
      return res.status(400).json({ message: "Username not found in middleware" });
    }

    const myuser = await userSchema.findOne({ username });

    if (!myuser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { email, firstName } = myuser;

    return res.status(200).json({ username, email, name:firstName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getMyProfile;
