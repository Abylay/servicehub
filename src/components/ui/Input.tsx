import {
    View,
    Text,
    TextInput,
    StyleSheet,
    type TextInputProps,
} from "react-native";

import { useTheme } from "@/theme";
import {useState} from "react";

type InputProps = TextInputProps & {
    label?: string;
    error?: string;
};

export function Input({
                          label,
                          error,
                          onFocus,
                          onBlur,
                          editable = true,
                          ...props
                      }: InputProps) {
    const { theme } = useTheme();

    const [isFocused, setIsFocused] = useState(false);

    const styles = StyleSheet.create({
        container: {
            gap: theme.spacing.sm,
        },
        label: {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
        },
        input: {
            minHeight: 52,
            paddingHorizontal: theme.spacing.lg,
            paddingLeft: 44,
            borderWidth: 1,
            borderRadius: theme.radius.md,
            borderColor: error
                ? theme.colors.error
                : isFocused
                    ? theme.colors.primary
                    : theme.colors.border,
            backgroundColor: theme.colors.surface,
            color: theme.colors.textPrimary,
            fontSize: theme.typography.fontSize.md,
            opacity: editable ? 1 : 0.5,
        },
        error: {
            color: theme.colors.error,
            fontSize: theme.typography.fontSize.xs,
        },
    });

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                {...props}
                editable={editable}
                style={styles.input}
                placeholderTextColor={theme.colors.textSecondary}
                onFocus={(event) => {
                    setIsFocused(true);
                    onFocus?.(event);
                }}
                onBlur={(event) => {
                    setIsFocused(false);
                    onBlur?.(event);
                }}
            />

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}