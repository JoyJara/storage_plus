// server/routes/authRoutes.ts
import { Router } from 'express';
import { loginUser, logoutUser, checkSession } from '../controllers/authController';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-session', checkSession);

export default router;
