const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const videosData = require('../data/video-details.json');
const videosFilePath = 'data/video-details.json';

router.get('/videos', (req, res) => {
    // console.log('videosData', videosData);
    const video = fs.readFileSync(videosFilePath);
    res.send(JSON.parse(video));
});

router.get('/videos/:id', (req, res) => {
    const videos = JSON.parse(fs.readFileSync(videosFilePath));
    const foundVideo = videos.find((video) => video.id === req.params.id);
    console.log('foundVideo', foundVideo.image);
    res.send(JSON.stringify(foundVideo));
});

router.post('/upload', (req, res) => {
    console.log(res);
    const { title, description, image } = req.body;
    const newVideo = {
        id: uuidv4(),
        title,
        channel: 'New User',
        image,
        description,
        views: 0,
        likes: 0,
        video: 'https://unit-3-project-api-0a5620414506.herokuapp.com/stream',
        timestamp: Date.now(),
        comments: [],
    };
    const videos = JSON.parse(fs.readFileSync(videosFilePath));
    videos.push(newVideo);
    console.log(videos);
    console.log('posted video', newVideo);
    fs.writeFile(videosFilePath, JSON.stringify(videos), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ error: 'Error updating JSON ' });
        }
        console.log('Data has been written to', videosFilePath);
        res.json(newVideo);
    });
});

module.exports = router;
