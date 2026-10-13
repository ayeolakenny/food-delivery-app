
import {
	Text as RNText,
	StyleSheet,
	type TextProps as RNTextProps,
	type TextStyle,
	type StyleProp,
} from "react-native";

export type TextVariant =
	| "h1"
	| "h2"
	| "h3"
	| "body"
	| "bodySmall"
	| "label"
	| "caption"
	| "danger"
	| "success"
	| "warning";

interface AppTextProps extends RNTextProps {
	variant?: TextVariant;
	color?: string;
	weight?: TextStyle["fontWeight"];
	align?: TextStyle["textAlign"];
	style?: StyleProp<TextStyle>;
}

export const COLORS = {
	primary: "#FF6B35",
	text: "#101828",
	secondaryText: "#667085",
	muted: "#98A2B3",
	danger: "#D92D20",
	success: "#039855",
	warning: "#DC6803",
	white: "#FFFFFF",
} as const;

const VARIANTS: Record<TextVariant, TextStyle> = {
	h1: {
		fontSize: 32,
		lineHeight: 40,
		fontWeight: "700",
		color: COLORS.text,
	},
	h2: {
		fontSize: 26,
		lineHeight: 34,
		fontWeight: "700",
		color: COLORS.text,
	},
	h3: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: "600",
		color: COLORS.text,
	},
	body: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "400",
		color: COLORS.text,
	},
	bodySmall: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: "400",
		color: COLORS.secondaryText,
	},
	label: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: "600",
		color: COLORS.text,
	},
	caption: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: "400",
		color: COLORS.secondaryText,
	},
	danger: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: "500",
		color: COLORS.danger,
	},
	success: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: "500",
		color: COLORS.success,
	},
	warning: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: "500",
		color: COLORS.warning,
	},
};

export default function AppText({
	variant = "body",
	color,
	weight,
	align,
	style,
	children,
	...props
}: AppTextProps) {
	return (
		<RNText
			{...props}
			style={[
				styles.text,
				VARIANTS[variant],
				color !== undefined && { color },
				weight !== undefined && { fontWeight: weight },
				align !== undefined && { textAlign: align },
				style,
			]}
		>
			{children}
		</RNText>
	);
}

const styles = StyleSheet.create({
	text: {
		includeFontPadding: false,
	},
});
