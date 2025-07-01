const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Tüm postları getir
const getAllPosts = async () => {
    return await prisma.post.findMany();
};

/**
 * Yeni post oluşturur.
 * @param {{name: string, author: string, image: string}} productData 
 */
const createPost = async ({ name, author, image }) => {
    return await prisma.post.create({
        data: { name, author, image }
    });
};

// ID ile post getir
const getPostById = async (id) => {
    return await prisma.post.findUnique({
        where: { id: parseInt(id) }
    });
};

// Toplu ürün ekle
const bulkCreatePosts = async (dataArray) => {
    return await prisma.post.createMany({
        data: dataArray
    });
};

// Post güncelle
const updatePostById = async (id, { name, author, image }) => {
    return await prisma.post.update({
        where: { id: parseInt(id) },
        data: { name, author, image }
    });
};

// Post sil
const deletePostById = async (id) => {
    return await prisma.post.delete({
        where: { id: parseInt(id) }
    });
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    bulkCreatePosts,
    updatePostById,
    deletePostById
};
