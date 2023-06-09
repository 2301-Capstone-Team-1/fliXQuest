const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");
const Movie = require("../db/models/Movies");

dotenv.config();


router.get("/", async (req, res, next) => {
  try {
    const apiKey = process.env.api_key;
    const movies = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${apiKey}`
    );
    console.log(movies.data);

    res.json(movies.data);
  } catch (error) {
    next(error);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    
    const apiKey = process.env.api_key;
    console.log(apiKey)

    const movie = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.api_key}&query=${req.params.id}`);


    res.json(movie.data);
  } catch (error) {
    next(error);
  }
});

router.get("/video/:id", async (req, res, next) => {
  try {
    const apiKey = process.env.api_key;
    console.log(apiKey);

    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=${process.env.api_key}`
    );

    console.log(movie.data);

    res.json(movie.data);
  } catch (error) {
    next(error);
  }
});


router.get("/single/:id", async (req, res, next) => {
  try {
    const apiKey = process.env.api_key;
    console.log(apiKey)

    const movie = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.api_key}&language=en-US`);


    res.json(movie.data);
  } catch (error) {
    next(error);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
