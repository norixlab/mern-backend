import { body } from 'express-validator';

export const registerValidation = [
    body('fullName', 'Введите имя').isLength({ min: 3 }),
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длинна пароля 5 символов').isLength({ min: 5 }),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
];
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длинна пароля 5 символов').isLength({ min: 5 }),
];
