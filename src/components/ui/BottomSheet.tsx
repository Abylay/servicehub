import type { ReactNode } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

import { useTheme } from "@/theme";

type BottomSheetProps = {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
};

export function BottomSheet({ visible, title, onClose, children }: BottomSheetProps) {
    const { theme } = useTheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />

                <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
                    <View style={styles.handle} />

                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.colors.primary }]}>
                            {title}
                        </Text>
                        <Pressable onPress={onClose} hitSlop={8}>
                            <Text style={{color: theme.colors.primary}}>
                                Close
                            </Text>
                        </Pressable>
                    </View>

                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        justifyContent: "flex-end",
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 40,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#6B7280",
        alignSelf: "center",
        marginBottom: 24,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
    },
});