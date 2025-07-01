    const { PrismaClient } = require('@prisma/client');

    const prisma = new PrismaClient();

    const connectDatabase = async () => {
        try {
            await prisma.$connect();
            console.info('[DB] Veritabanına başarıyla bağlanıldı');
        } catch (error) {
            console.error('[DB] Veritabanına bağlanırken bir hata oluştu:', error.message, error.stack);
        }
    };

    const disconnectDatabase = async () => {
        try {
            await prisma.$disconnect();
            console.info('[DB] Veritabanı bağlantısı kapatıldı');
        } catch (error) {
            console.error('[DB] Bağlantı kapatılırken hata:', error.message, error.stack);
        }
    };

    // Uygulama kapatıldığında bağlantıyı düzgün şekilde kapat
    process.on('SIGINT', async () => {
        await disconnectDatabase();
        process.exit(0);
    });

    module.exports = { prisma, connectDatabase, disconnectDatabase };
