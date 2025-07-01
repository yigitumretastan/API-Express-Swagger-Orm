const express = require('express');
const { getPosts, createPosts, getUpdate,bulkCreatePosts, getDetail, deletePost } = require('../controllers/post.js');
const auth = require('../middleware/auth.js');
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Post ID
 *         name:
 *           type: string
 *           description: Post başlığı
 *         author:
 *           type: string
 *           description: Post içeriği  
 *         image:
 *           type: string
 *           description: Post içeriği  
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Oluşturulma tarihi
 *       required:
 *         - name
 *   responses:
 *     UnauthorizedError:
 *       description: Kimlik doğrulama başarısız
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Yetkilendirme hatası"
 *     NotFoundError:
 *       description: Kaynak bulunamadı
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Post bulunamadı"
 *     ServerError:
 *       description: Sunucu hatası
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Sunucu hatası oluştu"
 */

/**
 * @swagger
 * /api/Posts:
 *   get:
 *     summary: Tüm postları getir
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Tüm postların listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 getPosts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/api/Posts', getPosts)

/**
 * @swagger
 * /api/Posts:
 *   post:
 *     summary: Yeni post oluştur
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newPost:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Geçersiz girdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Geçersiz veri formatı"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/api/Posts', auth, createPosts)

/**
 * @swagger
 * /api/Detail/{id}:
 *   get:
 *     summary: ID'ye göre post detayını getir
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post başarıyla bulundu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 detailPost:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/api/Detail/:id', getDetail)

/**
 * @swagger
 * /api/bulk:
 *   post:
 *     summary: Birden fazla post ekle
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Post Başlığı"
 *                 author:
 *                   type: string
 *                   example: "Yazar Adı"
 *                 image:
 *                   type: string
 *                   example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Postlar başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 message:
 *                   type: string
 *                   example: "Toplu post oluşturma işlemi başarılı"
 *       400:
 *         description: Geçersiz veri formatı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Geçersiz veri girdisi"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/api/bulk', bulkCreatePosts);
/**
 * @swagger
 * /api/Update/{id}:
 *   patch:
 *     summary: ID'ye göre post güncelle
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               image:
 *                 type: string

 *     responses:
 *       200:
 *         description: Post başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatePost:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Geçersiz girdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Geçersiz veri formatı"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.patch('/api/Update/:id', auth, getUpdate)

/**
 * @swagger
 * /api/Post/{id}:
 *   delete:
 *     summary: ID'ye göre post sil
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Silme İşlemi Tamamlandı"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/api/Post/:id', auth, deletePost)


module.exports = router