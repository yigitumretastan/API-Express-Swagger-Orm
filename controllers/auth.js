const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const userService = require('../modules/user/user-service');
const e = require('express');

// Tüm kullanıcıları getir
const getUser = async (req, res) => {
    console.log("Register request body:", req.body);

    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Kullanıcılar alınırken bir hata oluştu.' });
    }
};

// Belirli bir kullanıcıyı getir
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı!' });
        }
        res.status(200).json({ status: 'OK', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Kullanıcı bilgileri getirilirken bir hata oluştu.' });
    }
};

// Kayıt ol
const registerUser = async (req, res) => {
    console.log(req.body)
    
        const result = await userService.registerUser(req.body);
        res.status(201).json({
            user: result.user,
            token: result.token
        });
        console.log("user = " + result.user, "token = " + result.token);
        console.log(error.stack)
       
    
};
// Giriş yap
const loginUser = async (req, res) => {
    try {
        const result = await userService.loginUser(req.body);
        res.status(200).json({
            status: 'OK',
            user: result.user,
            token: result.token
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ message: error || 'Bir hata oluştu.' });
    }
};

// Kullanıcı sil
const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Kullanıcı başarıyla silindi.'
        });
    } catch (error) {
        console.error("Silme hatası:", error);
        res.status(error.status || 500).json({ message: error.message || 'Kullanıcı silinirken hata oluştu.' });
    }
};

module.exports = { getUser, getUserById, registerUser, loginUser, deleteUser };