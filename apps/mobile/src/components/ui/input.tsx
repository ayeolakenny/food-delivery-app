
import { useState } from "react";
import {
	TextInput,
	type TextInputProps,
	StyleSheet,
	View,
	Text,
} from "react-native";

interface Props extends TextInputProps {
	error?: string;
}

const COLORS = {
	primary: "#FF6B35",
	border: "#D0D5DD",
	error: "#D92D20",
	text: "#101828",
	placeholder: "#98A2B3",
} as const;

export function Input({ error, style, onFocus, onBlur, ...props }: Props) {
	const [isFocused, setIsFocused] = useState(false);

	const hasError = Boolean(error);

	return (
		<View style={styles.container}>
			<TextInput
				{...props}
				onFocus={(event) => {
					setIsFocused(true);
					onFocus?.(event);
				}}
				onBlur={(event) => {
					setIsFocused(false);
					onBlur?.(event);
				}}
				accessibilityState={{
					disabled: props.editable === false,
				}}
				aria-invalid={hasError}
				style={[
					styles.input,
					isFocused && !hasError && styles.inputFocused,
					hasError && styles.inputError,
					props.editable === false && styles.inputDisabled,
					style,
				]}
			/>

			{hasError && (
				<Text
					accessibilityLiveRegion="polite"
					style={styles.errorText}
				>
					{error}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	input: {
		minHeight: 48,
		borderWidth: 1,
		borderColor: COLORS.border,
		borderRadius: 8,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 16,
		color: COLORS.text,
		backgroundColor: "#FFFFFF",
	},
	inputFocused: {
		borderColor: COLORS.primary,
		borderWidth: 1.5,
	},
	inputError: {
		borderColor: COLORS.error,
	},
	inputDisabled: {
		backgroundColor: "#F2F4F7",
		color: COLORS.placeholder,
		opacity: 0.7,
	},
	errorText: {
		color: COLORS.error,
		fontSize: 13,
		marginTop: 5,
	},
});
