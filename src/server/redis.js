const redis = require('redis');

const portRedis = 6379;

exports.redis_client = redis.createClient(portRedis);
