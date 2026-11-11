
import { useState, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { SearchBar } from "@/features/home/components/SearchBar";
import { CategoriesSection } from "@/features/home/components/CategoriesSection";
import { PopularServicesSection } from "@/features/home/components/PopularServicesSection";
import { mockServices } from "@/features/home/data/mockServices";
import { useFavorites } from "@/features/favorites/FavoritesContext";

export default function HomeScreen() {
    const { theme } = useTheme();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { favoriteIds, toggleFavorite } = useFavorites();

    const filteredServices = useMemo(() => {
        return mockServices.filter((service) => {
            const matchesCategory =
                selectedCategory === null || service.category === selectedCategory;
            const normalizedSearch = search.trim().toLowerCase();
            const matchesSearch =
                service.title.toLowerCase().includes(normalizedSearch) ||
                service.category.toLowerCase().includes(normalizedSearch) ||
                service.provider.toLowerCase().includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        });
    }, [search, selectedCategory]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing["2xl"],
            paddingBottom: theme.spacing["2xl"],
            gap: theme.spacing.xl,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <HomeHeader />

                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                />

                <CategoriesSection selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                
                <PopularServicesSection
                    services={filteredServices}
                    selectedCategory={selectedCategory}
                    search={search}
                    onClearFilters={() => {
                        setSearch("");
                        setSelectedCategory(null);
                    }}
                    favoriteIds={favoriteIds}
                    onToggleFavorite={toggleFavorite}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
