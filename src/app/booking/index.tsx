
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockProviders } from "@/features/providers/data/mockProviders";
import { mockServices } from "@/features/home/data/mockServices";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useBookings } from "@/features/bookings/BookingsContext";

export default function BookingScreen() {
    const { providerId, serviceId } = useLocalSearchParams<{
        providerId: string;
        serviceId: string;
    }>();

    const { theme } = useTheme();

    const { addBooking } = useBookings();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const availableDates = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);

        return date;
    });

    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const timeSlots = [
        "09:00",
        "10:30",
        "12:00",
        "14:00",
        "15:30",
        "17:00",
    ];

    const [isConfirmed, setIsConfirmed] = useState(false);

    const provider = mockProviders.find(
        (item) => item.id === providerId
    );

    const service = mockServices.find(
        (item) => item.id === serviceId
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
        title: {
            fontSize: theme.typography.fontSize["2xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
            // marginTop: theme.spacing.md,
        },
        subtitle: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
        },
        sectionTitle: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        detail: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
        },
        price: {
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary,
        },
        dateList: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: theme.spacing.sm,
        },
        dateOption: {
            flex: 1,
            alignItems: "center",
            paddingVertical: theme.spacing.md,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            gap: theme.spacing.xs,
        },
        selectedDateOption: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        dayText: {
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textSecondary,
        },
        dateText: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        timeGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.sm,
        },
        timeOption: {
            width: "31%",
            alignItems: "center",
            paddingVertical: theme.spacing.md,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        selectedTimeOption: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        timeText: {
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        summaryRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        summaryLabel: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
        },
        summaryValue: {
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        totalLabel: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        totalValue: {
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary,
        },
    });

    if (!provider || !service || service.providerId !== provider.id) {
        return (
            <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Booking unavailable
                    </Text>
                    <Text style={styles.subtitle}>
                        The selected provider or service could not be found.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text style={styles.title}>
                        Book your service
                    </Text>
                    <Text style={styles.subtitle}>
                        Review your selection before choosing a date.
                    </Text>
                </View>

                <Card>
                    <View style={{ gap: theme.spacing.md }}>
                        <Badge label="Selected service" variant="success" />

                        <Text style={styles.sectionTitle}>
                            {service.title}
                        </Text>

                        <Text style={styles.detail}>
                            Provider: {provider.name}
                        </Text>

                        <Text style={styles.detail}>
                            Category: {service.category}
                        </Text>

                        <Text style={styles.detail}>
                            Duration: {service.duration} minutes
                        </Text>

                        <Text style={styles.price}>
                            ${service.price}
                        </Text>
                    </View>
                </Card>

                <Card>
                    <View style={{ gap: theme.spacing.md }}>
                        <Text style={styles.sectionTitle}>
                            Select a date
                        </Text>

                        <View style={styles.dateList}>
                            {availableDates.map((date) => {
                                const isSelected =
                                    date.toDateString() === selectedDate.toDateString();

                                return (
                                    <Pressable
                                        key={date.toDateString()}
                                        onPress={() => setSelectedDate(date)}
                                        style={[
                                            styles.dateOption,
                                            isSelected && styles.selectedDateOption,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.dayText,
                                                isSelected && { color: "#FFFFFF" },
                                            ]}
                                        >
                                            {date.toLocaleDateString("en-US", {
                                                weekday: "short",
                                            })}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.dateText,
                                                isSelected && { color: "#FFFFFF" },
                                            ]}
                                        >
                                            {date.getDate()}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </Card>

                <Card>
                    <View style={{ gap: theme.spacing.md }}>
                        <Text style={styles.sectionTitle}>
                            Select a time
                        </Text>
                        <View style={styles.timeGrid}>
                            {timeSlots.map((time) => {
                                const isSelected = selectedTime === time;

                                return (
                                    <Pressable
                                        key={time}
                                        onPress={() => setSelectedTime(time)}
                                        style={[
                                            styles.timeOption,
                                            isSelected && styles.selectedTimeOption,
                                        ]}
                                    >
                                        <Text style={[styles.timeText, isSelected && {color: "#FFFFFF"}]}>
                                            {time}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </Card>

                <Card>
                    <View style={{ gap: theme.spacing.md }}>
                        <Text style={styles.sectionTitle}>
                            Booking Summary
                        </Text>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Service</Text>
                            <Text style={styles.summaryValue}>{service.title}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Provider</Text>
                            <Text style={styles.summaryValue}>{provider.name}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Date</Text>
                            <Text style={styles.summaryValue}>
                                {selectedDate.toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Time</Text>
                            <Text style={styles.summaryValue}>
                                {selectedTime ?? "Not selected"}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Duration</Text>
                            <Text style={styles.summaryValue}>
                                {service.duration} min
                            </Text>
                        </View>

                        <View
                            style={{
                                height: 1,
                                backgroundColor: theme.colors.border,
                            }}
                        />

                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>
                                ${service.price}
                            </Text>
                        </View>
                    </View>
                    <Button
                        title="Confirm Booking"
                        onPress={() => {
                            const bookingId = `SH-${Date.now().toString().slice(-6)}`;

                            addBooking({
                                id: bookingId,
                                providerId: provider.id,
                                serviceId: service.id,
                                serviceTitle: service.title,
                                providerName: provider.name,
                                date: selectedDate.toISOString(),
                                time: selectedTime!,
                                price: service.price,
                                duration: service.duration,
                                status: "upcoming",
                                createdAt: new Date().toISOString(),
                            });

                            router.push({
                                pathname: "/booking/confirmation",
                                params: {
                                    bookingId,
                                    serviceTitle: service.title,
                                    providerName: provider.name,
                                    date: selectedDate.toISOString(),
                                    time: selectedTime!,
                                    price: String(service.price),
                                    duration: String(service.duration),
                                },
                            });
                        }}
                        disabled={!selectedTime}
                        size="lg"
                    />
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
