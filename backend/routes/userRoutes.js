import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
} from"../controller/userController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.post("/logout", logoutUser)
router.post("/auth", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route("/:id").get(protect,admin,getUserById).put(protect,admin,updateUser).delete(protect,admin,deleteUser)


export default router;