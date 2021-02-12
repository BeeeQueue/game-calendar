import { DefaultTheme as XStyledDefaultTheme } from "@xstyled/styled-components"

declare module "styled-components" {
  export interface DefaultTheme extends XStyledDefaultTheme {
    /* Customize your theme */
  }
}
