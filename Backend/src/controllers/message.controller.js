import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getContacts = async (req, res) => {
    try {
        const signedInUserID = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: signedInUserID}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500);
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: otherUserId } = req.params;
        const userId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: userId, receiverId: otherUserId},
                {senderId: otherUserId, receiverId: userId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500);        
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (text === "" && !image)
            return res.status(400);

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500);
    }
}