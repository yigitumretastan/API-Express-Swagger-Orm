const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Kimlik doğrulama ara katmanı.
 * @param {Object} req - Express istek nesnesi
 * @param {Object} res - Express yanıt nesnesi
 * @param {Function} next - Sonraki ara katmana geçiş fonksiyonu
 * @returns {Promise<void>}
 */
const auth = async (req, res, next) => {
    try {
        // Authorization header'dan token'ı al
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        
        if (!token) {
            return res.status(403).json({ message: 'Token gereklidir!' });
        }
        
        // Token'ı doğrula
        const decodedData = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        
        if (!decodedData?.id) {
            return res.status(401).json({ message: 'Geçersiz token' });
        }
        
        // Kullanıcıyı veritabanında sorgula
        const user = await prisma.user.findUnique({
            where: { id: Number(decodedData.id) }
        });
        
        // Kullanıcı bulunamazsa hata döndür
        if (!user) {
            return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
        }
        
        // Kullanıcıyı request nesnesine ekle
        req.user = user;
        
        // Bir sonraki ara katmana geç
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
    }
};

module.exports = auth;