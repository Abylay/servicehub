import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProviderScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View>
            <Text>Provider ID: {id}</Text>
        </View>
    );
}