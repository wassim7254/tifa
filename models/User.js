import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
    {
        _id: {type: string, required: true},
        _name: {type: string, required: true},
        _email: {type: string, required: true},
        _image: {type: string, required: false},
    },
    {timestamps: true}
);

const User = mongoose.models.User || mongoose.model("User", UserShema)

export default User;