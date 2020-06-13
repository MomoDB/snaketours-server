const redis = require('redis');

const portRedis = 'redis://snaketours-cache.glmwdm.ng.0001.usw1.cache.amazonaws.com:6379';

const redisClient = redis.createClient(portRedis);

redisClient
  .on('error', (error) => {
    console.error(error);
  })
  .on('connect', () => {
    console.log('Redis connected successfully');
  });

const checkCache = (req, res, next) => {
  const { id } = req.params;

  // get data value for key =id
  redisClient.get(id, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    // if match found
    if (data != null) {
      res.set('Content-Type', 'application/json; charset=utf-8');
      res.status(200).send(data);
    } else {
      // proceed to next middleware function
      next();
    }
  });
};


module.exports = {
  redisClient,
  checkCache,
};
