import CacheManager from "cache-manager"
import RedisStore from "cache-manager-ioredis"
import ms from "ms"

import { config } from "@/config"

const memoryCache = CacheManager.caching({
  store: "memory",
  max: 50,
  ttl: Math.round(ms("30m") / 1000),
})

const redisCache = CacheManager.caching({
  store: RedisStore,
  ttl: Math.round(ms("1d") / 1000),
  ...config.redis,
  keyPrefix: "gc-v1-",
})

const client = redisCache.store.getClient()

client.on("error", (err) => {
  throw new Error(`Could not connect to Redis (${err.toString()})`)
})

export const Cache = CacheManager.multiCaching([memoryCache, redisCache])
