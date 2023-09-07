import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "display name required!"],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  email: {
    type: String,
    required: [true, "email required!"],
  },
  photoURL: {
    type: String,
    required: false,
  },
  uid: {
    type: String,
    required: false,
  },
  university: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("class", UserSchema);

export default UserModel;
