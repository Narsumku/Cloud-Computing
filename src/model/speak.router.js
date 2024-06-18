const express = require('express');
const router = express.Router();
const { getSpeakerDetailsById, searchSpeakersByField, addFavoriteController, getFavoritesController, deleteFavoriteController, getMostFavorited, getRandomRecommendedSpeakersController } = require('./speak.controller');

router.get('/populer', getMostFavorited);
router.get('/speaker/:id', getSpeakerDetailsById);
router.get('/search', searchSpeakersByField);
router.post('/favorites', addFavoriteController);
router.get('/favorites/:userId', getFavoritesController);
router.delete('/favorites', deleteFavoriteController);
router.get('/recommendations', getRandomRecommendedSpeakersController);

module.exports = router;
