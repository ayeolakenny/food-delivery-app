import { type ReactNode } from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	type StyleProp,
	type TextStyle,
	type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePopup } from "@/context/popup-context";

interface Props {
	children: ReactNode;
	title: string;
	titleStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	dismissOnBackdropPress?: boolean;
}

export default function BaseModal({
	children,
	title,
	titleStyle,
	containerStyle,
	dismissOnBackdropPress = true,
}: Props) {
	const { isModalOpen, closeModal } = usePopup();
	const insets = useSafeAreaInsets();

	return (
		<Modal
			visible={isModalOpen}
			transparent
			animationType="slide"
			presentationStyle="overFullScreen"
			statusBarTranslucent
			onRequestClose={closeModal}
		>
			<KeyboardAvoidingView style={styles.keyboardAvoider} behavior="padding">
				<View style={styles.modalOverlay}>
					<Pressable
						style={StyleSheet.absoluteFill}
						onPress={dismissOnBackdropPress ? closeModal : undefined}
						accessible={false}
					/>

					<View
						style={[
							styles.modal,
							{ paddingBottom: Math.max(insets.bottom, 24) },
							containerStyle,
						]}
						accessibilityViewIsModal
					>
						<View style={styles.header}>
							<Text
								accessibilityRole="header"
								style={[styles.title, titleStyle]}
							>
								{title}
							</Text>

							<Pressable
								onPress={closeModal}
								hitSlop={10}
								accessibilityRole="button"
								accessibilityLabel="Close modal"
								style={styles.closeButton}
							>
								<Text style={styles.closeText}>✕</Text>
							</Pressable>
						</View>

						{children}
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	keyboardAvoider: {
		flex: 1,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	modal: {
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 24,
		gap: 16,
		overflow: "hidden",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 12,
	},
	title: {
		flex: 1,
		fontSize: 20,
		fontWeight: "700",
		color: "#101828",
	},
	closeButton: {
		width: 36,
		height: 36,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 18,
		backgroundColor: "#FFF0E9",
	},
	closeText: {
		fontSize: 18,
		color: "#FF6B35",
	},
});
