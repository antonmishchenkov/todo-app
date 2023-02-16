import Router from "express";
import userController from "../controllers/userController.js";
import {body} from "express-validator";
export const router = new Router();

router.post(
  "/registration",
  body("username").isLength({ min: 5, max: 32 }),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/refresh", userController.refresh);





