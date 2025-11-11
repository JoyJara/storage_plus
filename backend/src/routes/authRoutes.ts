/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints relacionados con el inicio y verificación de sesión
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión con un usuario y obtiene un token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: admin
 *                     role:
 *                       type: string
 *                       example: admin
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/auth/check-session:
 *   get:
 *     summary: Verifica si el token JWT es válido
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido o inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loggedIn:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   example:
 *                     id: 1
 *                     username: admin
 *                     role: admin
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido o expirado
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cierra sesión (solo simbólico, JWT no requiere logout en servidor)
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logout exitoso (JWT no requiere invalidación en servidor)
 */

// server/routes/authRoutes.ts
import { Router } from 'express';
import { loginUser, logoutUser, checkSession } from '../controllers/authController';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-session', checkSession);

export default router;
