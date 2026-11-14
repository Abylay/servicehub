
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { useTheme } from "@/theme";
import { Service } from "@/features/home/data/mockServices";
import { ServiceCard } from "@/features/home/components/ServiceCard";

type PopularServicesSectionProps = {
    services: Service[];
    selectedCategory: string | null;
    search: string;
    onClearFilters: () => void;
    favoriteIds: string[];
    onToggleFavorite: (serviceId: string) => void;
};

export const PopularServicesSection = ({
                                           services,
                                           selectedCategory,
                                           search,
                                           onClearFilters,
                                           favoriteIds,
                                           onToggleFavorite,
                                       }: PopularServicesSectionProps) => {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const isDesktop = width >= 1200;
    const isTablet = width >= 768 && width < 1200;

    const cardWidth = isDesktop
        ? "31%"
        : isTablet
            ? "47%"
            : "100%";

    const styles = StyleSheet.create({
        container: {
            gap: theme.spacing.lg,
        },
        grid: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.lg,
        },
        cardWrapper: {
            width: cardWidth,
        },
        title: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        emptyText: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
        },
        emptyContainer: {
            alignItems: "center",
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.xl,
        },
        clearText: {
            color: theme.colors.primary,
            fontWeight: theme.typography.fontWeight.semibold,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Popular Services</Text>

            {services.length > 0 ? (
                <View style={styles.grid}>
                    {services.map((service) => (
                        <View key={service.id} style={styles.cardWrapper}>
                            <ServiceCard
                                service={service}
                                isFavorite={favoriteIds.includes(service.id)}
                                onToggleFavorite={onToggleFavorite}
                            />
                        </View>
                    ))}
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        {search.trim()
                            ? selectedCategory
                                ? "No services match your filters."
                                : `No services found matching "${search.trim()}".`
                            : "No services available in this category."}
                    </Text>

                    <Pressable onPress={onClearFilters}>
                        <Text style={styles.clearText}>
                            Clear filters
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};