const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7; // 7 days
const { Redis } = require("ioredis");
const config = require("config");
const Logger = require("../../server/log/logger");

const RedisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

const CacheService = {};

CacheService.getRedisInstance = () => {
  return RedisClient;
};

CacheService.ping = () => {
  return RedisClient.ping();
};

CacheService.createKey = (key) => {
  return `${config.redis.prefix}::${key}`?.toLowerCase();
};

CacheService.get = (key) => {
  return RedisClient.get(key).then((value) => {
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  });
};

CacheService.clearAllCache = async () => {
  const keys = await RedisClient.keys(`${config.redis.prefix}:*`.toLowerCase());
  if (keys.length > 0) {
    await RedisClient.del(...keys);
    Logger.success("Cleared all cache");
  }
};

CacheService.bootstrap = () => {};
CacheService.set = (key, value, ttl = DEFAULT_CACHE_TIME) => {
  Logger.success(
    `Load cache ${redisKey} at ${dayjs(new Date()).format("DD-MM hh:mm:ss")}`
  );

  return RedisClient.set(key, JSON.stringify(value), "EX", ttl);
};

module.exports = CacheService;
