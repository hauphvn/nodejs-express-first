const express = require('express');
const router = express.Router();
const db = require('../db');
const userController = require('../controller/user.controller');
//Generator id user
const shortid = require('shortid');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.create);

router.get('/:id', userController.createById);

router.post('/create', userController.postCreate);

module.exports = router;