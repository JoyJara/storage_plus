/**
 * @openapi
 * /api/inventory:
 *   get:
 *     summary: Obtener inventario completo
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: Lista de productos
 *
 * /api/inventory/categories:
 *   get:
 *     summary: Obtener categorías disponibles
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: Categorías obtenidas
 *
 * /api/inventory:
 *   post:
 *     summary: Agregar un nuevo producto
 *     security:
 *       - BearerAuth: []
 *     tags: [Inventario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Producto:
 *                 type: string
 *               CodigoBarras:
 *                 type: string
 *               Categoria:
 *                 type: integer
 *               Descripcion:
 *                 type: string
 *               Stock:
 *                 type: number
 *               Precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto agregado correctamente
 *
 * /api/inventory/{id}:
 *   put:
 *     summary: Editar un producto
 *     security:
 *       - BearerAuth: []
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 *
 * /api/inventory/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Eliminar un producto
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 */
