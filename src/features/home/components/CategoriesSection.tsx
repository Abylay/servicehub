import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

type Category = {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
};

type CategorySectionProps = {
    selectedCategory: string | null;
    onSelectCategory: (categoryId: string) => void;
};

const categories: Category[] = [
    { id: "beauty", title: "Beauty", icon: "cut-outline" },
    { id: "fitness", title: "Fitness", icon: "barbell-outline" },
    { id: "auto", title: "Auto", icon: "car-outline" },
    { id: "home", title: "Home", icon: "home-outline" },
    { id: "education", title: "Education", icon: "school-outline" },
    { id: "creative", title: "Creative", icon: "color-palette-outline" },
];

export function CategoriesSection({ selectedCategory, onSelectCategory }: CategorySectionProps) {
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
        grid: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.md,
        },
        category: {
            width: "31%",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: theme.spacing.lg,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            borderColor: theme.colors.border,
            gap: theme.spacing.sm,
        },
        selectedCategory: {
            backgroundColor: theme.colors.elevated,
            borderColor: theme.colors.primary,
        },
        categoryTitle: {
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textPrimary,
            fontWeight: theme.typography.fontWeight.medium,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>

            <View style={styles.grid}>
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.id;

                    return (
                        <Pressable
                            key={category.id}
                            style={[
                                styles.category,
                                isSelected && styles.selectedCategory,
                            ]}
                            onPress={() => onSelectCategory(category.id)}
                        >
                            <Ionicons
                                name={category.icon}
                                size={26}
                                color={
                                    isSelected ? theme.colors.primary : theme.colors.textSecondary
                                }
                            />

                            <Text style={styles.categoryTitle}>
                                {category.title}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

        </View>
    );
}