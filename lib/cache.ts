import CacheManager from "cache-manager"
import RedisStore from "cache-manager-ioredis"

import { config } from "@/config"
import { s } from "@/utils"

const memoryCache = CacheManager.caching({
  store: "memory",
  max: 50,
  ttl: s("12h"),
})

const redisCache = CacheManager.caching({
  store: RedisStore,
  ttl: s("30d"),
  refreshThreshold: s("7d"),
  ...config.redis,
  keyPrefix: "gc-v1-",
})

const client = redisCache.store.getClient()

client.on("error", (err) => {
  throw new Error(`Could not connect to Redis (${err.toString()})`)
})

export const Cache = CacheManager.multiCaching([memoryCache, redisCache])