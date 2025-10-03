import { Router} from "express";
import { changeCurrentPassword, logOutUser, loginUser, refreshAccessToken, registerUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import {upload} from "../middlewares/multer.middlewares.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secure routes 
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/change-password").post(verifyJWT , changeCurrentPassword)

router.route("/refresh-token").post(refreshAccessToken)



export default router