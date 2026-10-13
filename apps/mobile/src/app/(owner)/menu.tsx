import AddCategoryModal from "@/components/custom/AddCategoryModal";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/context/popup-context";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen() {
	const { openModal } = usePopup();
	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<Button
				label="+Add Category"
				style={styles.addButton}
				textStyle={styles.addButtonText}
				onPress={() => openModal(<AddCategoryModal />)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	addButton: {
		marginHorizontal: 16,
	},
	addButtonText: {
		color: "#FFF",
		fontSize: 15,
	},
});
