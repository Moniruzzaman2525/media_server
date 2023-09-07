import UserModel from "../modal/User.js";


const register = async (req, res) => {
  const { displayName, email, photoURL, uid, university,   address, } = req.body;
  try {
    if (!displayName || !email) {
      return res.status(400).json({
        message: "Please fill all the required fields",
      });
    }

    const users = await UserModel.findOne({ email });
    if (users) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const user = new UserModel({
      displayName,
      email,
      photoURL,
      uid,
      university,
      address,
    });
    await user.validate();
    await user.save();

    

    return res.status(200).json({
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, uid } = req.body;
    if (!email || !uid) {
      return res.status(400).json({
        message: "Invalid Response!",
      });
    }
    const user = await UserModel.findOne({ email });
    console.log(user);
    console.log(uid);
    if (!user) {
      return res.status(400).json({
        message: "Invalid User!",
      });
    }
    const validPassword = uid === user.uid
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid User!",
      });
    }
    
    await UserModel.findByIdAndUpdate(user._id);
    const userDetails = {
      displayName: user.displayName,
      uid
    };

    return res.status(200).json({
      userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getUserByUID = async (req, res) => {
  try {
    const uid = req.params.id; // Extract the user UID from req.params
    const user = await UserModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export { login, register, updateUser  , getUserByUID};
