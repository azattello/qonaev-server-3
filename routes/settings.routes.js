const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const Contacts = require('../models/Contacts');

const { check, validationResult } = require('express-validator');

// Маршрут для получения настроек
router.get('/getSettings', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.status(200).json(settings);
    } catch (error) {
        console.error('Ошибка при получении настроек:', error.message);
        res.status(500).send('Ошибка сервера.');
    }
});

// Маршрут для обновления настроек
router.post('/updateSettings', [
    check('videoLink').optional().isString(),
    check('chinaAddress').optional().isString(),
    check('whatsappNumber').optional().isString(),
    check('aboutUsText').optional().isString(),
    check('prohibitedItemsText').optional().isString()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Неверный запрос', errors });
        }

        const { videoLink, chinaAddress, whatsappNumber, aboutUsText, prohibitedItemsText } = req.body;

        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings();
        }

        if (videoLink) settings.videoLink = videoLink;
        if (chinaAddress) settings.chinaAddress = chinaAddress;
        if (whatsappNumber) settings.whatsappNumber = whatsappNumber;
        if (aboutUsText) settings.aboutUsText = aboutUsText;
        if (prohibitedItemsText) settings.prohibitedItemsText = prohibitedItemsText;

        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        console.error('Ошибка при обновлении настроек:', error.message);
        res.status(500).send('Ошибка сервера.');
    }
});




// Маршрут для получения настроек
router.get('/getPrice', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.status(200).json(settings);
    } catch (error) {
        console.error('Ошибка при получении настроек:', error.message);
        res.status(500).send('Ошибка сервера.');
    }
});

// Маршрут для обновления настроек
router.post('/updatePrice', [
    check('price').optional().isString(),
    check('currency').optional().isString()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Неверный запрос', errors });
        }

        const { price,currency } = req.body;

        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings();
        }

        if (price) settings.price = price;
        if (currency) settings.currency = currency;
        
        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        console.error('Ошибка при обновлении настроек:', error.message);
        res.status(500).send('Ошибка сервера.');
    }
});

// Контакты
router.post('/updateContacts', async (req, res) => {
    try {
        const {phone, whatsappPhone, whatsappLink, instagram, telegramId, telegramLink} = req.body;

        // Получаем текущие настройки или создаем новые
        let contacts = await Contacts.findOne();
        if (!contacts) {
            contacts = new Contacts();
        }

        // Обновляем поля настроек
        if (phone) contacts.phone = phone;
        if (whatsappPhone) contacts.whatsappPhone = whatsappPhone;
        if (whatsappLink) contacts.whatsappLink = whatsappLink;
        if (instagram) contacts.instagram = instagram;
        if (telegramId) contacts.telegramId = telegramId;
        if (telegramLink) contacts.telegramLink = telegramLink;


        // Сохраняем изменения в базе данных
        await contacts.save();
        res.status(200).json(contacts); // Возвращаем обновленные настройки

    } catch (error) {
        console.error('Ошибка при обновлении настроек:', error.message);
        res.status(500).send('Ошибка сервера.');
    }
});



// Маршрут для получения настроек
router.get('/getContacts', async (req, res) => {
    try {
        const contacts = await Contacts.findOne();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Ошибка при получении настроек:', error.message);
        res.status(500).send('Ошибка сервера.');
    }
});




module.exports = router;