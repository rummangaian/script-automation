const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
})

redisClient.on("error" , (err)=>console.error("Reddis error" , err));

redisClient.connect();

module.exports = redisClient;