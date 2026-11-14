import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { Card } from "@/components/ui/Card";
import type { Service } from "../data/mockServices";
import { router } from "expo-router";

type ServiceCardProps = {
    service: Service;
    isFavorite: boolean;
    onToggleFavorite: (serviceId: string) => void;
};

export function ServiceCard({ service, isFavorite, onToggleFavorite }: ServiceCardProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            gap: theme.spacing.md,
        },
        image: {
            width: "100%",
            height: 160,
            borderRadius: theme.radius.md,
        },
        info: {
            gap: theme.spacing.sm,
        },
        title: {
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        provider: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
            padding: theme.spacing.sm,
        },
        details: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        rating: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
        },
        ratingText: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
        },
        price: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary,
        },
        duration: {
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textSecondary,
        },
        favoriteButton: {
            position: "absolute",
            top: theme.spacing.md,
            right: theme.spacing.md,
            width: 40,
            height: 40,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.background,
            alignItems: "center",
            justifyContent: "center",
        },
        imageContainer: {
            position: "relative",
        },
    });

    return (
        <Card>
            <View style={styles.container}>
                <Pressable
                    onPress={() => router.push(`/provider/${service.providerId}`)}
                    accessibilityRole={"button"}
                    accessibilityLabel={`View ${service.provider}'s profile`}
                    style={styles.container}
                >
                    <Image
                        source={service.image}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    <Pressable
                        style={styles.favoriteButton}
                        onPress={() => onToggleFavorite(service.id)}
                        accessibilityRole={"button"}
                        accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={22}
                            color={isFavorite ? theme.colors.error : theme.colors.textSecondary}
                        />
                    </Pressable>

                    <View style={styles.info}>
                        <Text style={styles.title}>{service.title}</Text>

                        <Text style={styles.provider}>
                            by {service.provider}
                        </Text>
                    </View>

                    <View style={styles.details}>
                        <View style={styles.rating}>
                            <Ionicons
                                name="star"
                                size={16}
                                color={theme.colors.warning}
                            />
                            <Text style={styles.ratingText}>{service.rating} ({service.reviewCount} reviews)</Text>
                        </View>
                        <Text style={styles.price}>
                            ${service.price}
                        </Text>
                    </View>
                    <Text style={styles.duration}>
                        {service.duration} min
                    </Text>

                </Pressable>
            </View>
        </Card>
    );
}