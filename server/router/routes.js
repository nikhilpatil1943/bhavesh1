import express from "express";
const router = express();

import userLogin from "../controller/signin.js";
import userCreate from "../controller/createUser.js";


router.post("/login", userLogin);
router.post("/register", userCreate);


export default router;