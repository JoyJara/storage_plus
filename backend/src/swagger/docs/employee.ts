/**
 * @openapi
 * /api/employees:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *
 * /api/employees:
 *   post:
 *     summary: Agregar un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: integer
 *               hiringDate:
 *                 type: string
 *                 format: date
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               status:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Empleado agregado correctamente
 */
