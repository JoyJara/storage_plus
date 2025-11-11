/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 *
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión del usuario
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
