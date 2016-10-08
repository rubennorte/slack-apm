'use strict';

const axios = require('axios');
const errors = require('http-errors');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

module.exports = function searchVideo(query) {
  return axios.request({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/search',
    params: {
      key: YOUTUBE_API_KEY,
      q: query,
      part: 'id'
    }
  }).then((response) => {
    const videos = response && response.data && response.data.items;
    if (!videos || videos.length === 0) {
      throw new errors.NotFound('Video not found');
    }

    return 'https://youtube.com/watch?v=' + videos[0].id.videoId;
  });
}
