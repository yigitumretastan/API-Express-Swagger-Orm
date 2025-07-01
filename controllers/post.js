const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const postService = require('../modules/product/product-service');

// Tüm Postları Getir
const getPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Yeni Post Oluştur
const createPosts = async (req, res) => {
    try {
        const newPost = await postService.createPost(req.body);
        res.status(201).json({ newPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Post Detayı Getir
const getDetail = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post bulunamadı!' });
        }
        res.status(200).json({ post }); 33333333
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Toplu Post Oluştur
const bulkCreatePosts = async (req, res) => {
    try {
        const created = await postService.bulkCreatePosts(req.body);
        res.status(201).json({ message: "Toplu ekleme başarılı", count: created.count });
    } catch (error) {
        res.status(400).json({ message: "Toplu ekleme başarısız", error: error.message });
    }
};

// Post Güncelle
const getUpdate = async (req, res) => {
    try {
        const updatedPost = await postService.updatePostById(req.params.id, req.body);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post güncellenemedi!' });
        }
        res.status(200).json({ updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Post Sil
const deletePost = async (req, res) => {
    try {
        const deletedPost = await postService.deletePostById(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post bulunamadı!' });
        }
        res.status(200).json({ message: "Silme işlemi tamamlandı", deletedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getPosts,
    createPosts,
    getDetail,
    bulkCreatePosts,
    getUpdate,
    deletePost
};
