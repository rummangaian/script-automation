const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://ig.gov-cloud.ai/pi-entity-service/v1.0',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.AUTH_TOKEN}`  // Load from env
  }
});

module.exports = axiosInstance;
