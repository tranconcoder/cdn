import { Router } from "express";
import apiController from "../controller/apiController.js";
import multerMiddleware from "../../app/middleware/multer.js";

const router = Router();

router.use("/upload", multerMiddleware);
router.get("/get-all-cdn", apiController.getAllCdns);

export default router;
