const router = require("express").Router();

const axios = require("axios");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration)

router.get("audio/:query", async (req, res, next) => {
  try {
    const resp = await openai.createTranscription(
      fs.createReadStream("Recording.m4a"),
      "whisper-1","translate the string","text",0)
    console.log(resp)
    res.json(resp.data.choices[0].text);
  } catch (error) {
    next(error);
  }
});


router.get("/:query", async (req, res, next) => {
  try {
        const completion = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: req.params.query
        prompt: `find me a movie about ${req.params.query} and give me the title only and no punctuation`
    });
    console.log(completion.data.choices[0].text)
    res.json(completion.data.choices[0].text);
  } catch (error) {
    next(error);
  }
});



router.get("/movielocations/:query", async (req, res, next) => {
  try {
        const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 50,
        // prompt: req.params.query
        // prompt: `find me all movie locations for the movie ${req.params.query} and give it to me in this format LOCATION - WHat Was SHOT - (END)`
        // prompt: `find me all movie locations for the movie ${req.params.query} and give it to me in JSON format **DONT INCLUDE tabs or newline characters and no slashes****{$:"youranswer",Description:"what was shot there"},`

        prompt: `What is the main filming location for ${req.params.query}

        in the format [address]`


        // prompt: `find me all movie locations for the movie ${req.params.query} and give it to me in JSON format **DONT INCLUDE tabs or newline characters and no slashes**** put it all on one line{Location:"youranswer",Description:"what was shot there"},`

    //     prompt: `find me all movie locations for the movie ${req.params.query} and give it to me in JSON format **DONT INCLUDE tabs or newline characters and no slashes**** put it all on one line{Location:"youranswer",Description:"what was shot there"},`
    });
    console.log(completion.data.choices[0].text)
    res.json(completion.data.choices[0].text);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
