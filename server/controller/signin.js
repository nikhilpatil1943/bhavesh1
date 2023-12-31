import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userList from "../models/userSchema.js";

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).send("Please enter all the required fields");
    }
    const existingUser = await userList.findOne({ username });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invaild Credentials" });

    const jsonKey = process.env.JSONTOKEN;
    const token = jwt.sign(
      { phone: existingUser.phone, id: existingUser._id },
      jsonKey,
      { expiresIn: "24h" }
    );
    return res.status(200).json({ result: { username }, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went worng, try agin later" });
  }
};
export default userLogin;