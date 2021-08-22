import { Router } from "express";
import homeController from "../controller/homeController.js";

const router = Router();

router.get("/", homeController.home);

export default router;
