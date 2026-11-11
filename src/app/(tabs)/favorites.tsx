
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { useFavorites } from "@/features/favorites/FavoritesContext";
import { mockServices } from "@/features/home/data/mockServices";
import { ServiceCard } from "@/features/home/components/ServiceCard";

export default function FavoritesScreen() {
    const { theme } = useTheme();
    const { favoriteIds, toggleFavorite } = useFavorites();

    const favoriteServices = mockServices.filter((service) =>
        favoriteIds.includes(service.id)
    );

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            edges={["top"]}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                    Favorites
                </Text>

                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    Your saved services
                </Text>

                {favoriteServices.length > 0 ? (
                    <View style={styles.servicesList}>
                        {favoriteServices.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                isFavorite={true}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>
                            No favorites yet
                        </Text>

                        <Text
                            style={[styles.emptyDescription, { color: theme.colors.textSecondary }]}
                        >
                            Save services you like, and they will appear here.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 14,
        marginTop: 6,
    },
    servicesList: {
        marginTop: 24,
        gap: 16,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80,
        paddingHorizontal: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
    },
    emptyDescription: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 21,
    },
});
