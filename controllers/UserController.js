import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            { expiresIn: '10d' },
        );

        const { passwordHash, ...userData } = user._doc;

        res.status(201).json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Неудалось зарегистрироваться',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            { expiresIn: '10d' },
        );

        const { passwordHash, ...userData } = user._doc;

        res.status(200).json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Неудалось авторизоваться',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        const { passwordHash, ...userData } = user._doc;

        res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Неудалось получить данные',
        });
    }
};
