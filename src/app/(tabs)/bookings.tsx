import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Alert,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useBookings } from "@/features/bookings/BookingsContext";
import { useState } from "react";

export default function BookingsScreen() {
    const { theme } = useTheme();
    const { bookings, updateBookingStatus } = useBookings();

    type BookingFilter = "all" | "upcoming" | "completed" | "cancelled";

    const [activeFilter, setActiveFilter] = useState<BookingFilter>("all");

    const filteredBookings = activeFilter === "all" ? bookings : bookings.filter(booking => booking.status === activeFilter);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
            padding: theme.spacing.lg,
            gap: theme.spacing.lg,
        },
        title: {
            fontSize: theme.typography.fontSize["2xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        subTitle: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
        },
        cardContent: {
            gap: theme.spacing.md,
        },
        serviceTitle: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        provider: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
        },
        details: {
            gap: theme.spacing.md,
        },
        detailRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: theme.spacing.md,
        },
        detailLabel: {
            flex: 1,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
        },
        detailValue: {
            flex: 1,
            flexShrink: 1,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
            textAlign: "right",
        },
        emptyContainer: {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: theme.spacing["2xl"],
            gap: theme.spacing.md,
        },
        emptyIcon: {
            fontSize: 48,
        },
        emptyTitle: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
            textAlign: "center",
        },
        filterList: {
            flexDirection: "row",
            gap: theme.spacing.sm,
        },
        filterButton: {
            flex: 1,
            alignItems: "center",
            paddingVertical: theme.spacing.md,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        activeFilterButton: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        filterText: {
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textSecondary,
        },
        activeFilterText: {
            color: "#FFFFFF",
        },
        cancelButton: {
            alignItems: "center",
            paddingVertical: theme.spacing.md,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.error,
        },
        cancelButtonText: {
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.error,
        },
    });

    const getStatus = (status: string) => {
        switch (status) {
            case "upcoming":
                return {
                    label: "Upcoming",
                    variant: "primary" as const,
                };
                case "completed":
                    return {
                        label: "Completed",
                        variant: "success" as const,
                    };
                case "cancelled":
                    return {
                        label: "Cancelled",
                        variant: "error" as const,
                    };
                default:
                    return {
                        label: status,
                        variant: "neutral" as const,
                    };
        }
    };

    const handleCancelBooking = (bookingId: string) => {
        const confirmCancellation = () => {
            updateBookingStatus(bookingId, "cancelled");
        };

        if (Platform.OS === "web") {
            const confirmed = window.confirm(
                "Are you sure you want to cancel this booking?"
            );

            if (confirmed) {
                confirmCancellation();
            }

            return;
        }

        Alert.alert(
            "Cancel Booking",
            "Are you sure you want to cancel this booking?",
            [
                {
                    text: "Keep Booking",
                    style: "cancel",
                },
                {
                    text: "Cancel Booking",
                    style: "destructive",
                    onPress: confirmCancellation,
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={{ gap: theme.spacing.xs }}>
                    <Text style={styles.title}>My Bookings</Text>
                    <Text style={styles.subTitle}>Manage your upcoming and past bookings.</Text>
                </View>

                <View style={styles.filterList}>
                    {(["all", "upcoming", "completed", "cancelled"] as const).map(
                        (filter) => {
                            const isActive = activeFilter === filter;

                            return (
                                <Pressable
                                    key={filter}
                                    onPress={() => setActiveFilter(filter)}
                                    style={[
                                        styles.filterButton,
                                        isActive && styles.activeFilterButton,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.filterText,
                                            isActive && styles.activeFilterText,
                                        ]}
                                    >
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </Text>
                                </Pressable>
                            );
                        }
                    )}
                </View>

                {filteredBookings.map((booking) => {
                    const status = getStatus(booking.status);

                    return (

                        <Card key={booking.id}>
                            <View style={styles.cardContent}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: theme.spacing.sm,
                                    }}
                                >
                                    <Text style={styles.serviceTitle}>
                                        {booking.serviceTitle}
                                    </Text>

                                    <Badge
                                        label={status.label}
                                        variant={status.variant}
                                    />
                                </View>

                                <Text style={styles.provider}>
                                    with {booking.providerName}
                                </Text>

                                <View style={styles.details}>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Date</Text>
                                        <Text style={styles.detailValue}>
                                            {new Date(booking.date).toLocaleDateString(
                                                "en-US",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </Text>
                                    </View>

                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Time</Text>
                                        <Text style={styles.detailValue}>
                                            {booking.time}
                                        </Text>
                                    </View>

                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Duration</Text>
                                        <Text style={styles.detailValue}>
                                            {booking.duration} min
                                        </Text>
                                    </View>

                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Booking ID</Text>
                                        <Text style={styles.detailValue}>
                                            {booking.id}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: theme.colors.border,
                                    }}
                                />

                                <View style={styles.detailRow}>
                                    <Text style={styles.serviceTitle}>Total</Text>

                                    {booking.status === "upcoming" && (
                                        <Pressable
                                            style={styles.cancelButton}
                                            onPress={() => handleCancelBooking(booking.id)}
                                        >
                                            <Text style={styles.cancelButtonText}>
                                                Cancel Booking
                                            </Text>
                                        </Pressable>
                                    )}

                                    <Text
                                        style={{
                                            ...styles.serviceTitle,
                                            color: theme.colors.primary,
                                        }}
                                    >
                                        ${booking.price}
                                    </Text>
                                </View>
                            </View>
                            {filteredBookings.length === 0 && (
                                <Card>
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.emptyIcon}>📅</Text>

                                        <Text style={styles.emptyTitle}>
                                            No {activeFilter === "all" ? "" : activeFilter + " "}bookings
                                        </Text>
                                    </View>
                                </Card>
                            )}
                        </Card>

                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}