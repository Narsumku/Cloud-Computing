const { getSpeakerDetails, searchSpeakers, getFavorites, addFavorite, deleteFavorite, getMostFavoritedSpeakers, getRandomRecommendedSpeakers } = require('./speak.service');

// MENU HOME BERISI SPEAKER PALING FAVORIT DAN RANDOM SPEAKER
const getMostFavorited = async (req, res) => {
  try {
    const data = await getMostFavoritedSpeakers();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// MENAMPILKAN DETAIL DARI SPEAKER
const getSpeakerDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    const speakerDetails = await getSpeakerDetails(id);
    if (!speakerDetails) {
      return res.status(404).json({ message: 'No details found for the given speaker ID' });
    }
    res.json(speakerDetails);
  } catch (error) {
    console.error('Error fetching speaker details:', error);
    res.status(500).send('Internal Server Error');
  }
};

// MENCARI SPEAKER BERDASARKAN BIDANGNYA
const searchSpeakersByField = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required' });
  }

  try {
    const speakers = await searchSpeakers(keyword);
    if (!speakers || speakers.length === 0) {
      return res.status(404).json({ message: 'No speakers found' });
    }

    const uniqueSpeakers = speakers.reduce((acc, current) => {
      const x = acc.find((item) => item.speaker_id === current.speaker_id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    res.json(uniqueSpeakers);
  } catch (error) {
    console.error('Error searching speakers by field:', error);
    res.status(500).send('Internal Server Error');
  }
};

// MENAMBAHKAN FAVORIT USER
const addFavoriteController = async (req, res) => {
  const { userId, speakerId } = req.body;

  try {
    const result = await addFavorite(userId, speakerId);
    const message = result.message; // Ambil pesan dari hasil operasi

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Error adding favorite. Please try again later.' });
  }
};

// MENAMPILKAN FAVORIT USER
const getFavoritesController = async (req, res) => {
  const { userId } = req.params;

  try {
    const favoritesData = await getFavorites(userId);
    res.json(favoritesData);
  } catch (error) {
    console.error('Error retrieving favorites data:', error);
    res.status(500).send('Internal Server Error');
  }
};

// MENGHAPUS FAVORIT USER
const deleteFavoriteController = async (req, res) => {
  const { userId, speakerId } = req.body;

  try {
    await deleteFavorite(userId, speakerId);
    res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getRandomRecommendedSpeakersController = async (req, res) => {
  try {
    const speakers = await getRandomRecommendedSpeakers();
    res.status(200).json(speakers);
  } catch (error) {
    console.error('Error fetching random recommended speakers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMostFavorited,
  getSpeakerDetailsById,
  searchSpeakersByField,
  addFavoriteController,
  getFavoritesController,
  deleteFavoriteController,
  getRandomRecommendedSpeakersController,
};
