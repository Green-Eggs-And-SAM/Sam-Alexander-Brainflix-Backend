const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/videos', (req, res) => {
    const video = fs.readFileSync('data/video-details.json');
    res.send(JSON.parse(video));
});

router.get('/videos/:id', (req, res) => {
    const videos = JSON.parse(fs.readFileSync('data/video-details.json'));
    const foundVideo = videos.find((video) => video.id === req.params.id);
    console.log('foundVideo', foundVideo.image);
    res.send(JSON.stringify(foundVideo));
});

module.exports = router;
