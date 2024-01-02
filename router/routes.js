import express from "express";
const router = express();

import userLogin from "../controller/signin.js";
import userCreate from "../controller/createUser.js";
import authenticateUser from "../middleware/auth.js";
import createPost from "../controller/createpost.js";
import getAllPosts from "../controller/getallposts.js";
import updatePost from "../controller/updatepost.js";
import deletePost from "../controller/deletepost.js";
import likePost from "../controller/likepost.js";
import getMyPosts from "../controller/getmypost.js";
import addComment from "../controller/addcomment.js";
import getUserLikedPosts from "../controller/getlikedpost.js";
import getAllComments from "../controller/getcomments.js";
import bookmarkPost from "../controller/bookmarkpost.js";
import getUserbookmarkedPosts from "../controller/getmybookmark.js";
import getMyProfile from "../controller/getprofile.js";
import updateEmail from "../controller/updateuser.js";

router.post("/login", userLogin);
router.post("/register", userCreate);
router.post("/createpost",authenticateUser,createPost);
router.post("/updatepost",authenticateUser,updatePost);
router.post("/deletepost",authenticateUser,deletePost);
router.post("/likepost",authenticateUser,likePost);
router.post("/addcomment",authenticateUser,addComment);
router.post("/bookmarkpost",authenticateUser,bookmarkPost);
router.post("/updateprofile",authenticateUser,updateEmail);




router.get("/getallpost",getAllPosts);
router.get("/getmypost",authenticateUser,getMyPosts);
router.get("/getmylikedpost",authenticateUser,getUserLikedPosts);
router.get("/getmybookmarks",authenticateUser,getUserbookmarkedPosts);
router.get("/getmyprofile",authenticateUser,getMyProfile);


router.post("/getallcomments",getAllComments)








export default router;