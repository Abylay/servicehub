import { darkColors, lightColors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { radius } from "./radius";

type ThemeColors = {
    [Key in keyof typeof darkColors]: string;
};

export type AppTheme = {
    mode: "dark" | "light";
    spacing: typeof spacing,
    typography: typeof typography,
    radius: typeof radius,
    colors: ThemeColors;
};

export const darkTheme = {
    mode: "dark",
    colors: darkColors,
    spacing,
    typography,
    radius,
} as const satisfies AppTheme;

export const lightTheme = {
    mode: "light",
    colors: lightColors,
    spacing,
    typography,
    radius,
} as const satisfies AppTheme;