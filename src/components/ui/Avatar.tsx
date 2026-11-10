import {
    View,
    Text,
    Image,
    StyleSheet,
    type ImageSourcePropType,
} from "react-native";

import { useTheme } from "@/theme";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarProps = {
    source?: ImageSourcePropType;
    name: string;
    size?: AvatarSize;
};

export function Avatar({source, name, size="md"}: AvatarProps) {
    const { theme } = useTheme();

    const sizes = {
        sm: 32,
        md: 44,
        lg: 56,
        xl: 80,
    };

    const avatarSize = sizes[size];

    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const styles = StyleSheet.create({
        container: {
            width: avatarSize,
            height: avatarSize,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.elevated,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        },
        image: {
            width: "100%",
            height: "100%",
        },
        initials: {
            color: theme.colors.textPrimary,
            fontSize: avatarSize * 0.32,
            fontWeight: theme.typography.fontWeight.semibold,
        },
    });

    return (
        <View style={styles.container}>
            {source ? (
                <Image source={source} style={styles.image} />
            ) : (
                <Text style={styles.initials}>{initials}</Text>
            )}
        </View>
    );
}