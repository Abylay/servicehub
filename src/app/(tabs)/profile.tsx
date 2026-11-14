
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/theme";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { useUser } from "@/features/user/UserContext";
import { router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const { theme, mode, toggleTheme } = useTheme();

    const { user } = useUser();

    const [language, setLanguage] = useState("English");
    const [currency, setCurrency] = useState("USD");

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem(
                    "@servicehub/language"
                );
                const savedCurrency = await AsyncStorage.getItem(
                    "@servicehub/currency"
                );

                if (savedLanguage) setLanguage(savedLanguage);
                if (savedCurrency) setCurrency(savedCurrency);
            } catch (error) {
                console.error("Failed to load preferences:", error);
            }
        };

        void loadPreferences();
    }, []);

    const selectLanguage = () => {
        Alert.alert("Select Language", "Choose your preferred language", [
            {
                text: "English",
                onPress: () => saveLanguage("English"),
            },
            {
                text: "Русский",
                onPress: () => saveLanguage("Русский"),
            },
            {
                text: "Қазақша",
                onPress: () => saveLanguage("Қазақша"),
            },
            {
                text: "Cancel",
                style: "cancel",
            },
        ]);
    };

    const saveLanguage = async (value: string) => {
        setLanguage(value);

        try {
            await AsyncStorage.setItem("@servicehub/language", value);
        } catch (error) {
            console.error("Failed to save language:", error);
        }
    };

    const selectCurrency = () => {
        Alert.alert("Select Currency", "Choose your preferred currency", [
            {
                text: "USD ($)",
                onPress: () => saveCurrency("USD"),
            },
            {
                text: "KZT (₸)",
                onPress: () => saveCurrency("KZT"),
            },
            {
                text: "EUR (€)",
                onPress: () => saveCurrency("EUR"),
            },
            {
                text: "Cancel",
                style: "cancel",
            },
        ]);
    };

    const saveCurrency = async (value: string) => {
        setCurrency(value);

        try {
            await AsyncStorage.setItem("@servicehub/currency", value);
        } catch (error) {
            console.error("Failed to save currency:", error);
        }
    };

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
        subtitle: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
        },
        profileHeader: {
            alignItems: "center",
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.lg,
        },
        name: {
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        email: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
        },
        sectionTitle: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        section: {
            gap: theme.spacing.md,
        },
        infoRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.md,
        },
        infoText: {
            flex: 1,
            gap: 4,
        },
        label: {
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textSecondary,
        },
        value: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textPrimary,
            fontWeight: theme.typography.fontWeight.medium,
        },
        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
        },
        menuText: {
            flex: 1,
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textPrimary,
        },
    });

    const MenuItem = ({
                          icon,
                          label,
                          onPress,
                      }: {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
        onPress?: () => void;
    }) => (
        <Pressable
            style={styles.menuItem}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={22}
                color={theme.colors.textSecondary}
            />

            <Text style={styles.menuText}>{label}</Text>

            <Ionicons
                name="chevron-forward"
                size={18}
                color={theme.colors.textSecondary}
            />
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: theme.spacing.xs }}>
                    <Text style={styles.title}>My Profile</Text>
                    <Text style={styles.subtitle}>
                        Manage your personal information and preferences.
                    </Text>
                </View>

                <Card>
                    <View style={styles.profileHeader}>
                        <Avatar name={user.name} size="xl" />

                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                        <Button
                            title="Edit Profile"
                            onPress={() => router.push("/profile/edit")}
                            variant="outline"
                        />
                    </View>
                </Card>

                <Card>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Personal Information
                        </Text>

                        <View style={styles.infoRow}>
                            <Ionicons
                                name="mail-outline"
                                size={22}
                                color={theme.colors.textSecondary}
                            />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Email</Text>
                                <Text style={styles.value}>{user.email}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Ionicons
                                name="call-outline"
                                size={22}
                                color={theme.colors.textSecondary}
                            />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Phone</Text>
                                <Text style={styles.value}>{user.phone}</Text>
                            </View>
                        </View>
                    </View>
                </Card>

                <Card>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Preferences</Text>

                        <MenuItem
                            icon="language-outline"
                            label={`Language · ${language}`}
                            onPress={selectLanguage}
                        />

                        <MenuItem
                            icon="cash-outline"
                            label={`Currency · ${currency}`}
                            onPress={selectCurrency}
                        />
                        <MenuItem
                            icon={mode === "dark" ? "moon-outline" : "sunny-outline"}
                            label={`Appearance · ${mode === "dark" ? "Dark" : "Light"}`}
                            onPress={toggleTheme}
                        />
                    </View>
                </Card>

                <Card>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account</Text>

                        <MenuItem
                            icon="notifications-outline"
                            label="Notifications"
                        />
                        <MenuItem
                            icon="help-circle-outline"
                            label="Help & Support"
                        />
                        <MenuItem
                            icon="log-out-outline"
                            label="Log Out"
                        />
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
