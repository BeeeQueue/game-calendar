import { envsafe, str } from "envsafe"

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
})

export const config = {
  ...baseEnv,
  USER_AGENT: `game calendar ${baseEnv.NODE_ENV}`,
}
