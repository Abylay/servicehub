
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Pressable,
} from "react-native";
import {useLocalSearchParams, Stack, router} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { Card } from "@/components/ui/Card";
import { mockProviders } from "@/features/providers/data/mockProviders";
import { mockServices } from "@/features/home/data/mockServices";

export default function ProviderScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { theme } = useTheme();

    // Find provider by ID
    const provider = mockProviders.find(
        (item) => item.id === id
    );

    // Find all services belonging to this provider
    const providerServices = mockServices.filter(
        (item) => item.providerId === id
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
            padding: theme.spacing.lg,
            gap: theme.spacing.lg,
        },
        header: {
            alignItems: "center",
            gap: theme.spacing.sm,
        },
        avatar: {
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: theme.colors.elevated,
            alignItems: "center",
            justifyContent: "center",
        },
        name: {
            fontSize: theme.typography.fontSize["2xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        category: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
        },
        rating: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
        },
        ratingText: {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.fontSize.sm,
        },
        sectionTitle: {
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        description: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
            lineHeight: 24,
        },
        details: {
            gap: theme.spacing.md,
        },
        detailRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
        },
        detailText: {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.fontSize.sm,
        },
        serviceCard: {
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.md,
        },
        serviceImage: {
            width: 90,
            height: 90,
            borderRadius: theme.radius.md,
        },
        serviceInfo: {
            flex: 1,
            gap: theme.spacing.sm,
        },
        serviceTitle: {
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        serviceDetails: {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.fontSize.sm,
        },
        price: {
            color: theme.colors.primary,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
        },
        emptyText: {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.fontSize.md,
        },
    });

    if (!provider) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>
                        Provider not found
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
    const headerStyles = StyleSheet.create({
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        headerButton: {
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
        },
        headerTitle: {
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
    });
    return (

        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <View style={headerStyles.header}>
                <Pressable
                    style={headerStyles.headerButton}
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.colors.textPrimary}
                    />
                </Pressable>

                <Text style={headerStyles.headerTitle}>
                    {provider.name}
                </Text>

                <View style={headerStyles.headerButton} />
            </View>
            <Stack.Screen
                options={{
                    headerShown: false,
                    title: provider.name,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.textPrimary,
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerTitleStyle: {
                        color: theme.colors.textPrimary,
                        fontWeight: "600",
                    },
                }}
            />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Provider Header */}
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Ionicons
                            name="person"
                            size={52}
                            color={theme.colors.textSecondary}
                        />
                    </View>

                    <Text style={styles.name}>
                        {provider.name}
                    </Text>

                    <Text style={styles.category}>
                        {provider.category}
                    </Text>

                    <View style={styles.rating}>
                        <Ionicons
                            name="star"
                            size={18}
                            color={theme.colors.warning}
                        />
                        <Text style={styles.ratingText}>
                            {provider.rating} ({provider.reviewCount} reviews)
                        </Text>
                    </View>
                </View>

                {/* About Provider */}
                <Card>
                    <View style={styles.details}>
                        <Text style={styles.sectionTitle}>
                            About
                        </Text>

                        <Text style={styles.description}>
                            {provider.description}
                        </Text>

                        <View style={styles.detailRow}>
                            <Ionicons
                                name="briefcase-outline"
                                size={18}
                                color={theme.colors.textSecondary}
                            />
                            <Text style={styles.detailText}>
                                {provider.experience} years of experience
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Ionicons
                                name="location-outline"
                                size={18}
                                color={theme.colors.textSecondary}
                            />
                            <Text style={styles.detailText}>
                                {provider.location}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={18}
                                color={theme.colors.success}
                            />
                            <Text style={styles.detailText}>
                                {provider.completedJobs} completed jobs
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Provider Services */}
                <View style={styles.details}>
                    <Text style={styles.sectionTitle}>
                        Services ({providerServices.length})
                    </Text>

                    {providerServices.length > 0 ? (
                        providerServices.map((service) => (
                            <Card key={service.id}>
                                <View style={styles.serviceCard}>
                                    <Image
                                        source={service.image}
                                        style={styles.serviceImage}
                                        resizeMode="cover"
                                    />

                                    <View style={styles.serviceInfo}>
                                        <Text style={styles.serviceTitle}>
                                            {service.title}
                                        </Text>

                                        <Text style={styles.serviceDetails}>
                                            {service.duration} min
                                        </Text>

                                        <Text style={styles.price}>
                                            ${service.price}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>
                            No services available.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
