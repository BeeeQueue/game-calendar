import { DefaultTheme as XStyledDefaultTheme } from "@xstyled/styled-components"
import { Redis, Cluster } from "ioredis"

declare module "styled-components" {
  export interface DefaultTheme extends XStyledDefaultTheme {
    /* Customize your theme */
  }
}

declare module "cache-manager" {
  import { Redis, Cluster } from "ioredis"
  interface Store<T = unknown> {
    getClient(): Redis | Cluster

    name: "redis"
  }
}
