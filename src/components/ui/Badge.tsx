import { View, Text, StyleSheet } from "react-native";

import { useTheme } from "@/theme";

type BadgeVariant = "primary" | "success" | "warning" | "error" | "neutral";

type BadgeProps = {
    label: string;
    variant?: BadgeVariant;
};

export function Badge({label, variant = "neutral"}: BadgeProps) {
    const { theme } = useTheme();

    const variantColors = {
        primary: {
            background: theme.colors.primary,
            text: "#FFFFFF",
        },
        success: {
            background: theme.colors.success,
            text: "#FFFFFF",
        },
        warning: {
            background: theme.colors.warning,
            text: "#FFFFFF",
        },
        error: {
            background: theme.colors.error,
            text: "#FFFFFF",
        },
        neutral: {
            background: theme.colors.elevated,
            text: theme.colors.textPrimary,
        },
    };

    const colors = variantColors[variant];

    const styles = StyleSheet.create({
        container: {
            alignSelf: "flex-start",
            backgroundColor: colors.background,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.radius.full,
        },
        label: {
            color: colors.text,
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.medium,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}