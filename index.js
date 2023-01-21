const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('/trending', (req, res) => {
    request('https://www.imdb.com/chart/moviemeter', (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const title = $('.titleColumn a');
            const rating = $('.imdbRating strong');

            const trendingMovies = [];

            for (let i = 0; i < title.length; i++) {
                trendingMovies.push({
                    title: $(title[i]).text(),
                    rating: $(rating[i]).text()
                });
            }
            res.json(trendingMovies);
        }
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));