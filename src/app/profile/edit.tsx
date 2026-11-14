
import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useUser } from "@/features/user/UserContext";

export default function EditProfileScreen() {
    const { theme } = useTheme();
    const { user, updateUser } = useUser();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

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
        field: {
            gap: theme.spacing.sm,
        },
        label: {
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        input: {
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            color: theme.colors.textPrimary,
            backgroundColor: theme.colors.background,
            fontSize: theme.typography.fontSize.md,
        },
    });

    const handleSave = () => {
        if (!name.trim() || !email.trim() || !phone.trim()) {
            Alert.alert("Missing information", "Please fill in all fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            Alert.alert("Invalid email", "Please enter a valid email address.");
            return;
        }

        updateUser({
            ...user,
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
        });

        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: theme.spacing.xs }}>
                    <Text style={styles.title}>Edit Profile</Text>
                    <Text style={styles.subtitle}>
                        Update your personal information.
                    </Text>
                </View>

                <Card>
                    <View style={{ gap: theme.spacing.lg }}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor={theme.colors.textSecondary}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                placeholderTextColor={theme.colors.textSecondary}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="Enter your phone"
                                placeholderTextColor={theme.colors.textSecondary}
                                keyboardType="phone-pad"
                                style={styles.input}
                            />
                        </View>
                    </View>
                </Card>

                <Button
                    title="Save Changes"
                    onPress={handleSave}
                    size="lg"
                />

                <Button
                    title="Cancel"
                    variant="outline"
                    onPress={() => router.back()}
                    size="lg"
                />
            </ScrollView>
        </SafeAreaView>
    );
}
