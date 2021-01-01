const express = require('express');
const router = express.Router();
const { auth } = require('../supplemental/middleware');
const client_interface = require('../supplemental/client_interface');

// @route ------ GET api/imgsearch
// @desc ------- Search images on google by query
// @access ----- Private

router.get('/', auth, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      res.status(400).json({ errorBody: 'Bad Request' });
      return;
    }

    const searchResults = await client_interface.search(query);

    if (!searchResults) {
      res.status(503).json({ errorBody: 'Service Unavailable' });
      return;
    }

    res.status(200).json(searchResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

let half = false;

module.exports = router;
