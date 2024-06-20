const pool = require('../../config/database'); // Ubah path sesuai dengan lokasi file db.js Anda

const getMostFavoritedSpeakers = async () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT 
          d.speaker_id,
          d.full_name AS \`Full Name\`,
          d.profile_pic_url,  -- Menambahkan kolom profile_pic_url
          ROUND(IFNULL(ssd.rating_ave, 0), 1) AS \`Rating\`,
          CASE
            WHEN d.Category_1 IS NOT NULL THEN d.Category_1
            WHEN d.Category_2 IS NOT NULL THEN d.Category_2
            WHEN d.Category_3 IS NOT NULL THEN d.Category_3
            ELSE 'Unknown'
          END AS \`Field\`,
          COUNT(uf.user_id) AS \`Favorite Count\`,
          d.experience AS \`Experience\`
      FROM 
          data d
      LEFT JOIN 
          speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
      LEFT JOIN 
          user_favorites uf ON d.speaker_id = uf.speaker_id
      GROUP BY 
          d.speaker_id, d.full_name, d.profile_pic_url,  -- Menambahkan profile_pic_url ke GROUP BY
          ssd.rating_ave, ssd.Business, ssd.Entertainment, 
          ssd.Politics, ssd.Sport, ssd.Tech, ssd.Healthcare, 
          ssd.Academic, ssd.Media_News
      ORDER BY 
          COUNT(uf.user_id) DESC
      LIMIT 5;
      `,
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};


const getAllSpeakers = async () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT 
          d.speaker_id,
          d.full_name AS \`Full Name\`,
          ROUND(IFNULL(ssd.rating_ave, 0), 1) AS \`Rating\`,
          d.Experience AS \`Experience\`,
          CASE
            WHEN d.Category_1 IS NOT NULL THEN d.Category_1
            WHEN d.Category_2 IS NOT NULL THEN d.Category_2
            WHEN d.Category_3 IS NOT NULL THEN d.Category_3
            ELSE 'Unknown'
          END AS \`Field\`
      FROM 
          data d
      LEFT JOIN 
          speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
      WHERE 
          d.Category_1 IS NOT NULL OR d.Category_2 IS NOT NULL OR d.Category_3 IS NOT NULL
      ORDER BY 
          RAND()
      LIMIT 7;
      `,
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};


const getSpeakerDetails = async (speakerId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        d.speaker_id,
        d.profile_pic_url,
        d.full_name,
        d.occupation,
        d.headline,
        d.summary,
        ROUND(d.1st_Recent_Experience_in_Years) AS '1st Recent Experience',
        d.Experience,
        d.Email,
        d.Category_1,
        d.Category_2,
        d.Category_3
      FROM data d
      WHERE d.speaker_id = ?
    `;

    pool.query(query, [speakerId], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      resolve(results[0]);
    });
  });
};

const searchSpeakers = async (keyword) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
    d.speaker_id,
    d.full_name AS name,
    d.profile_pic_url,   
    ROUND(ssd.rating_ave, 1) AS rating,
    'Business' AS field
FROM data d
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
WHERE ssd.Business = 1 AND LOWER('business') LIKE LOWER(?)

UNION

SELECT 
    d.speaker_id,
    d.full_name AS name,
    d.profile_pic_url,   
    ROUND(ssd.rating_ave, 1) AS rating,
    'Entertainment' AS field
FROM data d
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
WHERE ssd.Entertainment = 1 AND LOWER('entertainment') LIKE LOWER(?)

UNION

SELECT 
    d.speaker_id,
    d.full_name AS name,
    d.profile_pic_url,   
    ROUND(ssd.rating_ave, 1) AS rating,
    'Politics' AS field
FROM data d
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
WHERE ssd.Politics = 1 AND LOWER('politics') LIKE LOWER(?)

UNION

SELECT 
    d.speaker_id,
    d.full_name AS name,
    d.profile_pic_url,   
    ROUND(ssd.rating_ave, 1) AS rating,
    'Sport' AS field
FROM data d
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
WHERE ssd.Sport = 1 AND LOWER('sport') LIKE LOWER(?)

UNION

SELECT 
    d.speaker_id,
    d.full_name AS name,
    d.profile_pic_url,   
    ROUND(ssd.rating_ave, 1) AS rating,
    'Tech' AS field
FROM data d
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
WHERE ssd.Tech = 1 AND LOWER('tech') LIKE LOWER(?)

UNION

SELECT 
    d.speaker_id,
    d.full_name AS name,
    d.profile_pic_url,   
    ROUND(ssd.rating_ave, 1) AS rating,
    'Healthcare' AS field
FROM data d
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
WHERE ssd.Healthcare = 1 AND LOWER('healthcare') LIKE LOWER(?)

UNION

SELECT 
    d.speaker_id,
    d.full_name AS name,
    d.profile_pic_url,   
    ROUND(ssd.rating_ave, 1) AS rating,
    'Academic' AS field
FROM data d
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
WHERE ssd.Academic = 1 AND LOWER('academic') LIKE LOWER(?)

UNION

SELECT 
    d.speaker_id,
    d.full_name AS name,
    d.profile_pic_url,   
    ROUND(ssd.rating_ave, 1) AS rating,
    'Media_News' AS field
FROM data d
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
WHERE ssd.Media_News = 1 AND LOWER('media_news') LIKE LOWER(?)

ORDER BY 
    CASE
        WHEN LOWER('business') LIKE LOWER(?) THEN 1
        WHEN LOWER('entertainment') LIKE LOWER(?) THEN 2
        WHEN LOWER('politics') LIKE LOWER(?) THEN 3
        WHEN LOWER('sport') LIKE LOWER(?) THEN 4
        WHEN LOWER('tech') LIKE LOWER(?) THEN 5
        WHEN LOWER('healthcare') LIKE LOWER(?) THEN 6
        WHEN LOWER('academic') LIKE LOWER(?) THEN 7
        WHEN LOWER('media_news') LIKE LOWER(?) THEN 8
        ELSE 9
    END;
    `;
    const params = Array(9).fill(`%${keyword.toLowerCase()}%`);

    pool.query(query, [...params, ...params], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

const addFavorite = async (userId, speakerId) => {
  const insertQuery = `
    INSERT INTO user_favorites (user_id, speaker_id)
    VALUES (?, ?)
  `;
  const values = [userId, speakerId];

  const checkQuery = `
    SELECT COUNT(*) AS count
    FROM user_favorites
    WHERE user_id = ? AND speaker_id = ?
  `;

  return new Promise((resolve, reject) => {
    // Check if the speaker is already a favorite for the user
    pool.query(checkQuery, values, (error, results, fields) => {
      if (error) {
        return reject(error);
      }

      const count = results[0].count;

      // If the count is greater than 0, it means the speaker is already a favorite
      if (count > 0) {
        const message = `Speaker is already a favorite for this user.`;
        return resolve({ message });
      }

      // If not, proceed to insert into user_favorites table
      pool.query(insertQuery, values, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve({ message: 'Speaker added as favorite.' });
      });
    });
  });
};

const getFavorites = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT DISTINCT
    d.speaker_id,
    d.full_name AS Name,
    d.experience AS Experience,
    ROUND(ssd.rating_ave, 1) AS Rating,
    CASE
        WHEN ssd.Business = 1 THEN 'Business'
        WHEN ssd.Entertainment = 1 THEN 'Entertainment'
        WHEN ssd.Politics = 1 THEN 'Politics'
        WHEN ssd.Sport = 1 THEN 'Sport'
        WHEN ssd.Tech = 1 THEN 'Tech'
        WHEN ssd.Healthcare = 1 THEN 'Healthcare'
        WHEN ssd.Academic = 1 THEN 'Academic'
        WHEN ssd.Media_News = 1 THEN 'Media News'
        ELSE ''
    END AS Field,
    d.profile_pic_url
FROM (
    SELECT uf.speaker_id, MAX(ssd.rating_ave) AS max_rating
    FROM user_favorites uf
    INNER JOIN data d ON uf.speaker_id = d.speaker_id
    INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
    WHERE uf.user_id = ?
    GROUP BY uf.speaker_id
) AS max_rating_data
INNER JOIN data d ON max_rating_data.speaker_id = d.speaker_id
INNER JOIN speaker_side_data ssd ON d.speaker_id = ssd.speaker_id AND ssd.rating_ave = max_rating_data.max_rating;
    `;

    pool.query(query, [userId], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

const deleteFavorite = async (userId, speakerId) => {
  const deleteQuery = `
    DELETE FROM user_favorites
    WHERE user_id = ? AND speaker_id = ?
  `;
  const values = [userId, speakerId];

  return new Promise((resolve, reject) => {
    pool.query(deleteQuery, values, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results.affectedRows);
    });
  });
};
const submitUserPreferences = async (userId, fields) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM user_preferences
      WHERE userID = ?
    `;

    const insertQuery = `
      INSERT INTO user_preferences (userID, field)
      VALUES ?
    `;

    const values = fields.map((field) => [userId, field]);

    pool.query(checkQuery, [userId], (error, results) => {
      if (error) {
        return reject(error);
      }

      if (results[0].count > 0) {
        return reject(new Error('Preferences already submitted'));
      }

      pool.query(insertQuery, [values], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve({ message: 'Preferences submitted successfully' });
      });
    });
  });
};

const getSpeakerPreferences = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
          d.speaker_id,
          d.full_name AS \`Full Name\`,
          ROUND(IFNULL(ssd.rating_ave, 0), 1) AS \`Rating\`,
          d.Experience AS \`Experience\`,
          d.profile_pic_url AS \`Profile Picture\`,
          CASE
            WHEN d.Category_1 IS NOT NULL THEN d.Category_1
            WHEN d.Category_2 IS NOT NULL THEN d.Category_2
            WHEN d.Category_3 IS NOT NULL THEN d.Category_3
            ELSE 'Unknown'
          END AS \`Field\`
      FROM 
          data d
      LEFT JOIN 
          speaker_side_data ssd ON d.speaker_id = ssd.speaker_id
      INNER JOIN 
          user_preferences up ON (
            up.userID = ? AND 
            (d.Category_1 = up.field OR d.Category_2 = up.field OR d.Category_3 = up.field)
          )
      WHERE 
          d.Category_1 IS NOT NULL OR d.Category_2 IS NOT NULL OR d.Category_3 IS NOT NULL
      ORDER BY 
          RAND()
      LIMIT 7;
    `;

    pool.query(query, [userId], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};


module.exports = {
  getAllSpeakers,
  getSpeakerDetails,
  searchSpeakers,
  addFavorite,
  getFavorites,
  deleteFavorite,
  getMostFavoritedSpeakers,
  submitUserPreferences,
  getSpeakerPreferences,
};
