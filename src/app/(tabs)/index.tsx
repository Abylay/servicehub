import {View, Text, StyleSheet, ScrollView} from "react-native";
import { useTheme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import {useState} from "react";

export default function HomeScreen() {
    const { theme, mode, toggleTheme } = useTheme();

    const [search, setSearch] = useState("");

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: theme.spacing.lg,
        },
        title: {
            fontSize: theme.typography.fontSize["3xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        subtitle: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.sm,
        },
        card: {
            backgroundColor: theme.colors.surface,
            padding: theme.spacing.lg,
            borderRadius: theme.radius.lg,
            marginTop: theme.spacing.xl,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        cardTitle: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        cardDescription: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.sm,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>ServiceHub</Text>

            <Text style={styles.subtitle}>
                One app. Many services. Easy booking.
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Find your next service</Text>

                <Text style={styles.cardDescription}>
                    Discover professionals and book services easily.
                </Text>
            </View>

            <Button
                title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
                onPress={toggleTheme}
            />


            <ScrollView contentContainerStyle={{gap: 16}}>
                <Text style={styles.title}>UI KIT Preview</Text>

                {/*Buttons*/}
                <Card>
                    <Text style={styles.cardTitle}>Buttons</Text>

                    <Button title="Primary Button" onPress={() => {}} />

                    <Button title="Secondary Button" variant="secondary" onPress={() => {}} />

                    <Button title="Outline Button" variant="outline" onPress={() => {}} />
                </Card>

                {/*Input*/}
                <Card>
                    <Text style={styles.cardTitle}>Input</Text>

                    <Input label="Search" placeholder="Find a service..." />
                </Card>

                {/*Avatar*/}
                <Card>
                    <Text style={styles.cardTitle}>Avatars</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                        <Avatar name="John Smith" size="sm" />
                        <Avatar name="Sarah Wilson" size="md" />
                        <Avatar name="Alex Morgan" size="lg" />
                        <Avatar name="Emma Brown" size="xl" />
                    </View>
                </Card>

                {/* Badges */}
                <Card>
                    <Text style={styles.cardTitle}>Badges</Text>

                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                        <Badge label="Popular" variant="primary" />
                        <Badge label="Verified" variant="success" />
                        <Badge label="Pending" variant="warning" />
                        <Badge label="Cancelled" variant="error" />
                        <Badge label="Beauty" variant="neutral" />
                    </View>
                </Card>
            </ScrollView>

        </SafeAreaView>
    );
}