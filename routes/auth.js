const express = require('express');
const { registerUser, loginUser, deleteUser, getUser, getUserById } = require('../controllers/auth.js');
const auth = require('../middleware/auth.js');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Kullanıcı ID
 *         username:
 *           type: string
 *           description: Kullanıcı adı
 *         email:
 *           type: string
 *           description: E-posta adresi
 *         phone:
 *           type: string
 *           description: Telefon numarası
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Oluşturulma tarihi
 *       required:
 *         - username
 *         - email
 *         - password
 *   responses:
 *     
 *     NotFoundError:
 *       description: Kaynak bulunamadı
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Kullanıcı bulunamadı"
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
 *     UnauthorizedError:
 *       description: Yetkilendirme hatası
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Yetkilendirme hatası"
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Kullanıcı bilgilerini getir
 *     description: Kimlik doğrulaması yapılmış kullanıcının bilgilerini getirir
 *     tags: [Users | Kullanıcılar]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı bilgileri başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Yetkilendirme hatası
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.get('/api/user', getUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: ID ile kullanıcı bilgilerini getir
 *     description: Belirtilen ID'ye sahip kullanıcının bilgilerini getirir
 *     tags: [Users | Kullanıcılar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Kullanıcı ID'si
 *     responses:
 *       200:
 *         description: Kullanıcı bilgileri başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.get('/api/user/:id', getUserById);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Yeni bir kullanıcı kaydedin
 *     description: E-posta ve parola sağlayarak yeni bir kullanıcı oluşturur
 *     tags: [Users | Kullanıcılar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *               phone:
 *                 type: string
 *                 example: "+901234567890"
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla kaydoldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Geçersiz istek - eksik veya hatalı parametreler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Geçersiz kullanıcı bilgileri"
 *       409:
 *         description: Çakışma - E-posta zaten kullanımda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bu e-posta adresi zaten kullanımda"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/api/user/register', registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Bir kullanıcıyla oturum açın
 *     description: Bir kullanıcıyı e-posta ve parola ile doğrulayın
 *     tags: [Users | Kullanıcılar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Giriş başarılı, bir token döndürülüyor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Geçersiz istek - eksik veya hatalı parametreler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Geçersiz kullanıcı bilgileri"
 *       401:
 *         description: Kimlik doğrulama başarısız - yanlış parola
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Geçersiz şifre"
 *       404:
 *         description: Kullanıcı bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kullanıcı bulunamadı"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/api/user/login', loginUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Kullanıcı hesabını sil
 *     description: Belirtilen ID'ye sahip kullanıcıyı siler
 *     tags: [Users | Kullanıcılar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek kullanıcının ID'si
 *  
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kullanıcı başarıyla silindi"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/api/user/:id', deleteUser);

module.exports = router;