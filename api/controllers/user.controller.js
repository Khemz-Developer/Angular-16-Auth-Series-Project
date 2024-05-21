import User from "../models/User.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export  { getAllUsers, getUserById};
