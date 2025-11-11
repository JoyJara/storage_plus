/**
 * @openapi
 * /api/pos:
 *   get:
 *     summary: Obtener productos disponibles para el POS
 *     tags: [Punto de Venta]
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente
 *
 * /api/pos/sale:
 *   post:
 *     summary: Registrar una venta
 *     tags: [Punto de Venta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeID:
 *                 type: integer
 *               date:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Venta registrada correctamente
 */
