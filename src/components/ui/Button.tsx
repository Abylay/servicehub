import {
    Pressable,
    Text,
    StyleSheet,
    type PressableProps,
} from "react-native";

import { useTheme } from "@/theme";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    title: string;
    onPress: PressableProps["onPress"];
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
};

export function Button({
                           title,
                           onPress,
                           variant = "primary",
                           size = "md",
                           disabled = false,
                       }: ButtonProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        button: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radius.md,
        },
        text: {
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
        },
    });

    const backgroundColor =
        variant === "primary"
            ? theme.colors.primary
            : variant === "secondary"
                ? theme.colors.elevated
                : "transparent";

    const textColor =
        variant === "primary"
            ? "#FFFFFF"
            : theme.colors.textPrimary;

    const paddingVertical =
        size === "sm" ? 8 : size === "md" ? 12 : 16;

    const paddingHorizontal =
        size === "sm" ? 12 : size === "md" ? 16 : 24;

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor,
                    paddingVertical,
                    paddingHorizontal,
                    borderWidth: variant === "outline" ? 1 : 0,
                    borderColor: theme.colors.border,
                    opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
                },
            ]}
        >
            <Text style={[styles.text, { color: textColor }]}>
                {title}
            </Text>
        </Pressable>
    );
}