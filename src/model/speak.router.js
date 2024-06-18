const express = require('express');
const router = express.Router();
const { getHomeData, searchSpeakersByField, getSpeakerDetailsById, addFavoriteController, getFavoritesController, deleteFavoriteController } = require('./speak.controller');
const { checkToken } = require('../../auth/validate');

router.get('/home', getHomeData, checkToken);
router.get('/speaker/:id', getSpeakerDetailsById);
router.get('/search/speakers', searchSpeakersByField);
router.post('/favorite/add', addFavoriteController);
router.get('/favorite/:userId', getFavoritesController);
router.delete('/favorite/delete', deleteFavoriteController);

module.exports = router;
