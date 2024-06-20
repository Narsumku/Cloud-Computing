const express = require('express');
const router = express.Router();
const { getSpeakerPreferencesController, submitUserPreferencesController, getSpeakerDetailsById, searchSpeakersByField, addFavoriteController, getFavoritesController, deleteFavoriteController, getMostFavorited } = require('./speak.controller');

router.get('/popular', getMostFavorited);
router.get('/speaker/:id', getSpeakerDetailsById);
router.get('/search', searchSpeakersByField);
router.post('/favorites', addFavoriteController);
router.get('/favorites/:userId', getFavoritesController);
router.delete('/favorites', deleteFavoriteController);
router.post('/preference/:userId', submitUserPreferencesController);
router.get('/recommendations/:userId', getSpeakerPreferencesController);

module.exports = router;
