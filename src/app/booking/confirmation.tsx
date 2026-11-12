import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function BookingConfirmationScreen() {
    const {
        bookingId,
        serviceTitle,
        providerName,
        date,
        time,
        price,
        duration,
    } = useLocalSearchParams<{
        bookingId: string;
        serviceTitle: string;
        providerName: string;
        date: string;
        time: string;
        price: string;
        duration: string;
    }>();

    const { theme } = useTheme();

    const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "Not available";

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
            flexGrow: 1,
            justifyContent: "center",
            padding: theme.spacing.lg,
            gap: theme.spacing.lg,
        },
        successIcon: {
            width: 88,
            height: 88,
            borderRadius: 44,
            backgroundColor: theme.colors.success,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
        },
        checkmark: {
            fontSize: 48,
            color: "#fff",
            fontWeight: "bold",
        },
        title: {
            fontSize: theme.typography.fontSize["2xl"],
            fontWeight: "bold",
            color: theme.colors.textPrimary,
            textAlign: "center",
        },
        subtitle: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
            textAlign: "center",
        },
        sectionTitle: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: theme.spacing.md,
        },
        label: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
        },
        value: {
            flex: 1,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
            textAlign: "right",
        },
    });

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <View style={styles.content}>
                <View style={styles.successIcon}>
                    <Text style={styles.checkmark}>✓</Text>
                </View>

                <View style={{gap: theme.spacing.sm}}>
                    <Text style={styles.title}>Booking Confirmed!</Text>
                    <Text style={styles.subtitle}>
                        Your booking has been successfully confirmed.
                    </Text>
                </View>

                <Card>
                    <View style={{ gap: theme.spacing.md }}>
                        <Text style={styles.sectionTitle}>Booking Details</Text>

                        <View style={styles.row}>
                            <Text style={styles.label}>Booking ID</Text>
                            <Text style={styles.value}>{bookingId}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Service</Text>
                            <Text style={styles.value}>{serviceTitle}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Provider</Text>
                            <Text style={styles.value}>{providerName}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Date</Text>
                            <Text style={styles.value}>{formattedDate}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Time</Text>
                            <Text style={styles.value}>{time}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Duration</Text>
                            <Text style={styles.value}>{duration} min</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.value}>${price}</Text>
                        </View>
                    </View>
                </Card>

                <View style={{ gap: theme.spacing.md }}>
                    <Button
                        title="View My Bookings"
                        onPress={() => router.replace("/(tabs)/bookings")}
                        size="lg"
                    />

                    <Button
                        title="Back to Home"
                        variant="outline"
                        onPress={() => router.replace("/(tabs)")}
                        size="lg"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}