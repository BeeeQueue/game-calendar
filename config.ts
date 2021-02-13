import { envsafe, str, url } from "envsafe"
import { RedisOptions } from "ioredis"

enum Environment {
  Development = "development",
  Test = "test",
  Production = "production",
}

const baseEnv = envsafe({
  NODE_ENV: str({
    choices: [
      Environment.Development,
      Environment.Test,
      Environment.Production,
    ],
    default: Environment.Development,
  }),

  IGDB_CLIENT_ID: str(),
  IGDB_SECRET: str(),

  REDIS_URL: url({
    devDefault: "redis://localhost:6379",
  }),
})

const redisUrl = new URL(baseEnv.REDIS_URL)
const redisConfig: RedisOptions = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port),
  username: redisUrl.username,
  password: redisUrl.password,
  tls: redisUrl.protocol === "rediss:" ? {} : undefined,
}

export const config = {
  ...baseEnv,
  redis: redisConfig,
  USER_AGENT: `game calendar ${baseEnv.NODE_ENV}`,
}
