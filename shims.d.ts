declare module "react-tiny-transition" {
  import { ComponentType, ReactNode } from "react"

  export type TransitionProps = {
    /**
     * The duration of your css transition (milliseconds)
     * @default 500
     */
    duration?: number
    /**
     * Disable the animation when TinyTransition mounts
     * @default false
     */
    disableInitialAnimation?: boolean
    /**
     * Classnames to use when mounting / unmounting
     */
    classNames?: {
      beforeEnter?: string
      entering?: string
      beforeLeave?: string
      leaving?: string
    }
    children: ReactNode
  }

  const content: ComponentType<TransitionProps>

  export = content
}

declare module "react-tiny-crossfade" {
  import { ComponentType } from "react"
  import { TransitionProps } from "react-tiny-transition"

  type CrossfadeProps = TransitionProps & {
    /**
     * Type of element used for the wrapper node
     * @default "div"
     */
    component?: keyof HTMLElementTagNameMap
  }

  const content: ComponentType<CrossfadeProps>

  export = content
}
