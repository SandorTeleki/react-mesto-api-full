const { Joi } = require('celebrate');

const signinValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().label('Email').required()
      .messages({
        'string.base': 'Поле должно быть строкой с {#label}.',
        'string.email': 'Некорректный формат {#label}.',
        'any.required': 'Необходимо ввести {#label}.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
    password: Joi.string().label('Пароль').required()
      .messages({
        'string.base': 'Некорректный формат поля {#label}. Должна быть строка.',
        'any.required': 'Не введен {#label}, необходимо ввести {#label}.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
  }),
};

const signupValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).label('Имя пользователя')
      .default('Жак-Ив Кусто')
      .messages({
        'string.base': '{#label} должно быть строкой 2-30 символов.',
        'string.min': '{#label} должно быть строкой 2-30 символов.',
        'string.max': '{#label} должно быть строкой 2-30 символов.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
    about: Joi.string().min(2).max(30).label('Описание пользователя')
      .default('Исследователь')
      .messages({
        'string.base': '{#label} должно быть строкой 2-30 символов.',
        'string.min': '{#label} должно быть строкой 2-30 символов.',
        'string.max': '{#label} должно быть строкой 2-30 символов.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
    avatar: Joi.string().label('Аватар').pattern(/(https|http):\/\/(www.)?[a-zA-Z0-9-_]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._/~:@!$&'()*+,;=]*$)?/)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .messages({
        'string.base': '{#label} должно быть строкой.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
        'string.pattern': '{#label} не соответствует формату ссылки.',
        'string.pattern.base': '{#label} не соответствует формату ссылки.',
      }),
    email: Joi.string().required().email().label('Email')
      .messages({
        'string.base': 'Поле должно быть строкой с {#label}.',
        'string.email': 'Некорректный формат {#label}.',
        'any.required': 'Необходимо ввести {#label}.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
    password: Joi.string().required().label('Пароль')
      .messages({
        'string.base': 'Некорректный формат поля {#label}. Должна быть строка.',
        'any.required': 'Не введен {#label}, необходимо ввести {#label}.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
  }),
};

module.exports = {
  signinValidationSchema,
  signupValidationSchema,
};
