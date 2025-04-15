import Redis from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1',  // or your Redis host
  port: 6379,         // default Redis port
  password: '',       // optional
  db: 0               // optional Redis database index
})

export default redis;