var express = require('express');
var router = express.Router();

const fileController = require('../controllers/fileController');

// Récupérer (Télécharger) un PDF par nom de fichier
/**
 * @swagger
 * /files/pdfs/{filename}:
 *   get:
 *     summary: Retrieve a PDF by filename
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the PDF file to retrieve
 *     responses:
 *       200:
 *         description: The PDF file was retrieved successfully.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: PDF not found.
 */
router.get('/pdfs/:filename', fileController.getPdf);

/**
 * @swagger
 * /files/pdfs:
 *   get:
 *     summary: Retrieve all PDF filenames
 *     description: Returns a list of all PDF filenames stored in the uploads directory.
 *     responses:
 *       200:
 *         description: A list of PDF filenames.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "document1.pdf"
 *       500:
 *         description: Error occurred while reading the directory.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error occurred while reading the directory."
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "ENOENT"
 *                     syscall:
 *                       type: string
 *                       example: "readdir"
 *                     path:
 *                       type: string
 *                       example: "/path/to/uploads"
 */
router.get('/pdfs', fileController.getAllPdfs);

module.exports = router;
