const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient();

/**
 * Tüm kullanıcıları getirir.
 * @returns {Promise<Array>}
 */
const getAllUsers = () => {
    return prisma.user.findMany();
};

/**
 * ID ile kullanıcıyı getirir.
 * @param {number} id 
 * @returns {Promise<Object|null>}
 */
const getUserById = (id) => {
    return prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
};

/**
 * Yeni kullanıcı kaydı oluşturur.
 * @param {{username: string, email: string, password: string, phone: string}} userData 
 * @returns {Promise<{user: Object, token: string}>}
 */
const registerUser = async (userData) => {

    const { username, email, password, phone } = userData;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        const error = new Error('Bu e-posta zaten alınmış.');
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     console.log('hasledi', hashedPassword);
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            phone
        }
    });

    console.log(newUser)

    if (!newUser ) {
        return new Response[{
            message: 'kullanıcı oluşturualamadı',
            status: 400,
        }, 400]
    }
    console.log(JSON.stringify(newUser))

    const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '1h' }
    );

    return { user : newUser ,token};
};

/**
 * Kullanıcı girişi işlemi.
 * @param {{username: string, password: string}} loginData 
 * @returns {Promise<{user: Object, token: string}>}
 */
const loginUser = async ({ username, password }) => {
    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
        const error = new Error('Kullanıcı bulunamadı.');
        error.status = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error('Şifre hatalı.');
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '7d' }
    );

    return { user, token };
};

/**
 * Kullanıcıyı ID ile siler.
 * @param {number} id 
 * @returns {Promise<void>}
 */
const deleteUser = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
    });

    if (!user) {
        const error = new Error('Kullanıcı bulunamadı.');
        error.status = 404;
        throw error;
    }

    await prisma.user.delete({
        where: { id: Number(id) }
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser,
    deleteUser
};
