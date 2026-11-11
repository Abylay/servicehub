import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";
import { Input } from "@/components/ui/Input";

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: SearchBarProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            position: "relative",
            justifyContent: "center",
        },
        icon: {
            position: "absolute",
            left: theme.spacing.md,
            zIndex: 1,
        },
        input: {
            paddingLeft: 44,
        },
    });

    return (
        <View style={styles.container}>
            <Ionicons
                name="search-outline"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.icon}
            />
            <Input
                placeholder="What service are you looking for?"
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
            />
        </View>
    );
}