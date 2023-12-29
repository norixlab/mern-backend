import { body } from 'express-validator';

export const postValidation = [
    body('title', 'Укажите заголовок. Минимальная длинна 3 символа')
        .isLength({ min: 3 })
        .isString(),
    body('text', 'Укажите текст. Минимальная длинна 10 символа').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тегов').optional().isArray(),
    body('imageUrl', 'Неверно указана ссылка').optional().isString(),
];
