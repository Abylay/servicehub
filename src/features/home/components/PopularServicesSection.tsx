import {View, Text, StyleSheet, Pressable} from "react-native";
import { useTheme } from "@/theme";
import { Service } from "@/features/home/data/mockServices";
import {ServiceCard} from "@/features/home/components/ServiceCard";

type PopularServicesSectionProps = {
    services: Service[];
    selectedCategory: string | null;
    search: string;
    onClearFilters: () => void;
    favoriteIds: string[];
    onToggleFavorite: (serviceId: string) => void;
};

export const PopularServicesSection = ({ services, selectedCategory, search, onClearFilters, favoriteIds, onToggleFavorite }: PopularServicesSectionProps) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            gap: theme.spacing.lg,
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
                services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        isFavorite={favoriteIds.includes(service.id)}
                        onToggleFavorite={onToggleFavorite}
                    />
                ))
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
}