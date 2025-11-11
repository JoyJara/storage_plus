import { Router } from "express";
import { GetHistory } from "../controllers/historyController";
import { GetProducts } from "../controllers/posController";

const router = Router();
router.get('/', GetHistory);
router.get('/products', GetProducts);

export default router;
