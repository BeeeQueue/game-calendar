import type { Cluster, Redis } from "ioredis"

declare module "cache-manager" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Store<T = unknown> {
    getClient(): Redis | Cluster

    name: "redis"
  }
}
