import { Router } from "express";
import { Create, Get, Get_one, Get_products_per_business, Trash, Update } from "../controllers/product.controller";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });




router.get("/", Get);
router.post("/", upload.array("images", 10), Create);
router.put("/:id", Update);
router.delete("/:id", Trash);
router.get("/:id", Get_one);
router.get("/business/:id", Get_products_per_business);


export default router;
