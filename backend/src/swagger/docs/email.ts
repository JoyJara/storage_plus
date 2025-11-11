/**
 * @openapi
 * /api/email:
 *   post:
 *     summary: Enviar mensaje desde el formulario de contacto
 *     tags: [Correo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               asunto:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo enviado correctamente
 */
