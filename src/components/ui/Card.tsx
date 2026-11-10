import {
    View,
    StyleSheet,
    type ViewProps,
} from "react-native";

import { useTheme } from "@/theme";
import React from "react";

type CardProps = ViewProps & {
    children?: React.ReactNode;
    padding?: keyof ReturnType<typeof useTheme>["theme"]["spacing"];
};

export function Card({children, padding="lg", style, ...props}: CardProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
       container: {
           backgroundColor: theme.colors.surface,
           borderRadius: theme.radius.lg,
           borderWidth: 1,
           borderColor: theme.colors.border,
           padding: theme.spacing[padding],
       },
    });

    return (
        <View style={[styles.container, style]} {...props}>
            {children}
        </View>
    );
}