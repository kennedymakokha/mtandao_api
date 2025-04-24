import { Router } from "express";
import { Create, Get, Get_one, Trash, Update } from "../controllers/towns.controller";


const router = Router();


router.get("/", Get);
router.post("/", Create);
router.put("/:id", Update);
router.delete("/:id", Trash);
router.get("/:id", Get_one);


export default router;
