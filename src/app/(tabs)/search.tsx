
import { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { useFavorites } from "@/features/favorites/FavoritesContext";

import { mockServices } from "@/features/home/data/mockServices";
import { SearchBar } from "@/features/home/components/SearchBar";
import { ServiceCard } from "@/features/home/components/ServiceCard";
import { BottomSheet } from "@/components/ui/BottomSheet";

type SortOption =
    | "recommended"
    | "rating"
    | "priceLow"
    | "priceHigh";

type DurationOption = "any" | "30" | "60" | "90" | "over90";

type ServiceFilters = {
    minPrice: string;
    maxPrice: string;
    minRating: number | null;
    duration: DurationOption;
};

const defaultFilters: ServiceFilters = {
    minPrice: "",
    maxPrice: "",
    minRating: null,
    duration: "any",
};

const categories = [
    { id: "all", title: "All" },
    { id: "beauty", title: "Beauty" },
    { id: "fitness", title: "Fitness" },
    { id: "auto", title: "Auto" },
    { id: "home", title: "Home" },
    { id: "education", title: "Education" },
    { id: "creative", title: "Creative" },
];

export default function SearchScreen() {
    const { theme } = useTheme();

    const { width } = useWindowDimensions();

    const isDesktop = width >= 1200;
    const isTablet = width >= 768 && width < 1200;

    const cardWidth = isDesktop
        ? "31%"
        : isTablet
            ? "47%"
            : "100%";

    const { favoriteIds, toggleFavorite } = useFavorites();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [sortOption, setSortOption] =
        useState<SortOption>("recommended");

    const [isSortVisible, setIsSortVisible] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [appliedFilters, setAppliedFilters] =
        useState<ServiceFilters>({ ...defaultFilters });

    const [draftFilters, setDraftFilters] =
        useState<ServiceFilters>({ ...defaultFilters });

    // Step 1: Search and category filtering
    const filteredServices = useMemo(() => {
        return mockServices.filter((service) => {
            const matchesCategory =
                selectedCategory === "all" ||
                service.category === selectedCategory;

            const normalizedSearch = search.trim().toLowerCase();

            const matchesSearch =
                service.title.toLowerCase().includes(normalizedSearch) ||
                service.category.toLowerCase().includes(normalizedSearch) ||
                service.provider.toLowerCase().includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        });
    }, [search, selectedCategory]);

    // Step 2: Apply price, rating and duration filters
    const servicesAfterFilters = useMemo(() => {
        return filteredServices.filter((service) => {
            const minPrice =
                appliedFilters.minPrice === ""
                    ? 0
                    : Number(appliedFilters.minPrice);

            const maxPrice =
                appliedFilters.maxPrice === ""
                    ? Infinity
                    : Number(appliedFilters.maxPrice);

            const matchesPrice =
                service.price >= minPrice &&
                service.price <= maxPrice;

            const matchesRating =
                appliedFilters.minRating === null ||
                service.rating >= appliedFilters.minRating;

            let matchesDuration = true;

            switch (appliedFilters.duration) {
                case "30":
                    matchesDuration = service.duration <= 30;
                    break;
                case "60":
                    matchesDuration = service.duration <= 60;
                    break;
                case "90":
                    matchesDuration = service.duration <= 90;
                    break;
                case "over90":
                    matchesDuration = service.duration > 90;
                    break;
                case "any":
                default:
                    matchesDuration = true;
            }

            return matchesPrice && matchesRating && matchesDuration;
        });
    }, [filteredServices, appliedFilters]);

    // Step 3: Sort the filtered services
    const sortedServices = useMemo(() => {
        const services = [...servicesAfterFilters];

        switch (sortOption) {
            case "rating":
                return services.sort((a, b) => b.rating - a.rating);

            case "priceLow":
                return services.sort((a, b) => a.price - b.price);

            case "priceHigh":
                return services.sort((a, b) => b.price - a.price);

            case "recommended":
            default:
                return services;
        }
    }, [servicesAfterFilters, sortOption]);

    // Reset search and category
    const clearSearch = () => {
        setSearch("");
        setSelectedCategory("all");
    };

    // Reset all applied filters
    const resetFilters = () => {
        setDraftFilters({ ...defaultFilters });
        setAppliedFilters({ ...defaultFilters });
    };

    // Apply filters
    const applyFilters = () => {
        const min = Number(draftFilters.minPrice);
        const max = Number(draftFilters.maxPrice);

        if (
            draftFilters.minPrice !== "" &&
            draftFilters.maxPrice !== "" &&
            min > max
        ) {
            return;
        }

        setAppliedFilters({ ...draftFilters });
        setIsFilterVisible(false);
    };

    // Open filters with the currently applied values
    const openFilters = () => {
        setDraftFilters({ ...appliedFilters });
        setIsFilterVisible(true);
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
            edges={["top"]}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                    Search
                </Text>

                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                />

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: theme.colors.textPrimary },
                        ]}
                    >
                        Categories
                    </Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesList}
                    >
                        {categories.map((category) => {
                            const isSelected = selectedCategory === category.id;

                            return (
                                <Pressable
                                    key={category.id}
                                    onPress={() => setSelectedCategory(category.id)}
                                    style={[
                                        styles.categoryChip,
                                        {
                                            backgroundColor: isSelected
                                                ? theme.colors.primary
                                                : theme.colors.surface,
                                            borderColor: isSelected
                                                ? theme.colors.primary
                                                : theme.colors.border,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            {
                                                color: isSelected
                                                    ? "#FFFFFF"
                                                    : theme.colors.textSecondary,
                                            },
                                        ]}
                                    >
                                        {category.title}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Results header */}
                <View style={styles.resultsHeader}>
                    <View>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: theme.colors.textPrimary },
                            ]}
                        >
                            Search Results
                        </Text>

                        <Text
                            style={[
                                styles.resultsCount,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            {sortedServices.length} services found
                        </Text>
                    </View>

                    <View style={styles.actions}>
                        <Pressable
                            onPress={openFilters}
                            style={[
                                styles.actionButton,
                                { borderColor: theme.colors.border },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.actionButtonText,
                                    { color: theme.colors.primary },
                                ]}
                            >
                                Filters
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setIsSortVisible(true)}
                            style={[
                                styles.actionButton,
                                { borderColor: theme.colors.border },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.actionButtonText,
                                    { color: theme.colors.primary },
                                ]}
                            >
                                Sort
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Services */}
                {sortedServices.length > 0 ? (
                    <View style={styles.servicesGrid}>
                        {sortedServices.map((service) => (
                            <View
                                key={service.id}
                                style={{ width: cardWidth }}
                            >
                                <ServiceCard
                                    service={service}
                                    isFavorite={favoriteIds.includes(service.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text
                            style={[
                                styles.emptyTitle,
                                { color: theme.colors.textPrimary },
                            ]}
                        >
                            No services found
                        </Text>

                        <Text
                            style={[
                                styles.emptyDescription,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            Try changing your search or filters.
                        </Text>

                        <Pressable onPress={clearSearch}>
                            <Text
                                style={[
                                    styles.clearButton,
                                    { color: theme.colors.primary },
                                ]}
                            >
                                Clear search
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                resetFilters();
                                setSortOption("recommended");
                            }}
                        >
                            <Text
                                style={[
                                    styles.clearButton,
                                    { color: theme.colors.primary },
                                ]}
                            >
                                Reset filters and sorting
                            </Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>

            {/* Sort Bottom Sheet */}
            <BottomSheet
                visible={isSortVisible}
                title="Sort by"
                onClose={() => setIsSortVisible(false)}
            >
                {[
                    { id: "recommended", label: "Recommended" },
                    { id: "rating", label: "Highest Rated" },
                    { id: "priceLow", label: "Price: Low to High" },
                    { id: "priceHigh", label: "Price: High to Low" },
                ].map((option) => {
                    const isSelected = sortOption === option.id;

                    return (
                        <Pressable
                            key={option.id}
                            onPress={() => {
                                setSortOption(option.id as SortOption);
                                setIsSortVisible(false);
                            }}
                            style={styles.sortOption}
                        >
                            <Text
                                style={[
                                    styles.sortOptionText,
                                    {
                                        color: theme.colors.textPrimary,
                                        fontWeight: isSelected ? "700" : "400",
                                    },
                                ]}
                            >
                                {option.label}
                            </Text>

                            <View
                                style={[
                                    styles.radioOuter,
                                    {
                                        borderColor: isSelected
                                            ? theme.colors.primary
                                            : theme.colors.border,
                                    },
                                ]}
                            >
                                {isSelected && (
                                    <View
                                        style={[
                                            styles.radioInner,
                                            { backgroundColor: theme.colors.primary },
                                        ]}
                                    />
                                )}
                            </View>
                        </Pressable>
                    );
                })}
            </BottomSheet>

            {/* Filters Bottom Sheet */}
            <BottomSheet
                visible={isFilterVisible}
                title="Filters"
                onClose={() => setIsFilterVisible(false)}
            >
                <Text
                    style={[
                        styles.filterSectionTitle,
                        { color: theme.colors.textPrimary },
                    ]}
                >
                    Price range ($)
                </Text>

                <View style={styles.priceInputs}>
                    <TextInput
                        value={draftFilters.minPrice}
                        onChangeText={(value) =>
                            setDraftFilters((current) => ({
                                ...current,
                                minPrice: value.replace(/[^0-9]/g, ""),
                            }))
                        }
                        placeholder="Min"
                        placeholderTextColor={theme.colors.textSecondary}
                        keyboardType="number-pad"
                        style={[
                            styles.priceInput,
                            {
                                color: theme.colors.textPrimary,
                                backgroundColor: theme.colors.background,
                                borderColor: theme.colors.border,
                            },
                        ]}
                    />

                    <Text style={{ color: theme.colors.textSecondary }}>—</Text>

                    <TextInput
                        value={draftFilters.maxPrice}
                        onChangeText={(value) =>
                            setDraftFilters((current) => ({
                                ...current,
                                maxPrice: value.replace(/[^0-9]/g, ""),
                            }))
                        }
                        placeholder="Max"
                        placeholderTextColor={theme.colors.textSecondary}
                        keyboardType="number-pad"
                        style={[
                            styles.priceInput,
                            {
                                color: theme.colors.textPrimary,
                                backgroundColor: theme.colors.background,
                                borderColor: theme.colors.border,
                            },
                        ]}
                    />
                </View>

                <Text
                    style={[
                        styles.filterSectionTitle,
                        { color: theme.colors.textPrimary },
                    ]}
                >
                    Minimum rating
                </Text>

                <View style={styles.filterOptions}>
                    {[3, 4, 4.5, 5].map((rating) => {
                        const selected = draftFilters.minRating === rating;

                        return (
                            <Pressable
                                key={rating}
                                onPress={() =>
                                    setDraftFilters((current) => ({
                                        ...current,
                                        minRating: selected ? null : rating,
                                    }))
                                }
                                style={[
                                    styles.filterChip,
                                    {
                                        backgroundColor: selected
                                            ? theme.colors.primary
                                            : theme.colors.background,
                                        borderColor: selected
                                            ? theme.colors.primary
                                            : theme.colors.border,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: selected
                                            ? "#FFFFFF"
                                            : theme.colors.textPrimary,
                                    }}
                                >
                                    {rating.toFixed(1)}+
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <Text
                    style={[
                        styles.filterSectionTitle,
                        { color: theme.colors.textPrimary },
                    ]}
                >
                    Duration
                </Text>

                <View style={styles.filterOptions}>
                    {[
                        { id: "any", label: "Any" },
                        { id: "30", label: "Up to 30 min" },
                        { id: "60", label: "Up to 60 min" },
                        { id: "90", label: "Up to 90 min" },
                        { id: "over90", label: "90+ min" },
                    ].map((option) => {
                        const selected = draftFilters.duration === option.id;

                        return (
                            <Pressable
                                key={option.id}
                                onPress={() =>
                                    setDraftFilters((current) => ({
                                        ...current,
                                        duration: option.id as DurationOption,
                                    }))
                                }
                                style={[
                                    styles.filterChip,
                                    {
                                        backgroundColor: selected
                                            ? theme.colors.primary
                                            : theme.colors.background,
                                        borderColor: selected
                                            ? theme.colors.primary
                                            : theme.colors.border,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: selected
                                            ? "#FFFFFF"
                                            : theme.colors.textPrimary,
                                    }}
                                >
                                    {option.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <View style={styles.filterActions}>
                    <Pressable
                        onPress={() => setDraftFilters({ ...defaultFilters })}
                    >
                        <Text style={{ color: theme.colors.textSecondary }}>
                            Reset
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.applyButton,
                            { backgroundColor: theme.colors.primary },
                        ]}
                        onPress={applyFilters}
                    >
                        <Text style={styles.applyButtonText}>
                            Apply filters
                        </Text>
                    </Pressable>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 32,
        gap: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
    },
    categoriesSection: {
        gap: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    categoriesList: {
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: "600",
    },
    resultsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    resultsCount: {
        fontSize: 13,
        marginTop: 5,
    },
    actions: {
        flexDirection: "row",
        gap: 8,
    },
    actionButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: "600",
    },
    servicesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    emptyContainer: {
        alignItems: "center",
        paddingVertical: 64,
        paddingHorizontal: 24,
        gap: 12,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    emptyDescription: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 21,
    },
    clearButton: {
        fontSize: 14,
        fontWeight: "600",
    },
    sortOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
    },
    sortOptionText: {
        fontSize: 16,
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        marginTop: 8,
    },
    priceInputs: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    priceInput: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 14,
    },
    filterOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
    },
    filterChip: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    filterActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },
    applyButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
    },
    applyButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});
