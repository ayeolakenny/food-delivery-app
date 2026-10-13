import React from 'react';
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
	type PressableProps,
	type StyleProp,
	type TextStyle,
	type ViewStyle,
} from 'react-native';

// Types

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
	extends Omit<PressableProps, 'children' | 'style'> {
	label: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	fullWidth?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}

// Theme

const COLORS = {
	primary: '#FF6B35',
	primaryText: '#FFFFFF',
	secondary: '#FFF0E9',
	secondaryText: '#C94419',
	border: '#FF6B35',
	danger: '#DC2626',
	white: '#FFFFFF',
	transparent: 'transparent',
} as const;

const VARIANTS = {
	primary: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
		textColor: COLORS.primaryText,
		loaderColor: COLORS.primaryText,
	},
	secondary: {
		backgroundColor: COLORS.secondary,
		borderColor: COLORS.secondary,
		textColor: COLORS.secondaryText,
		loaderColor: COLORS.secondaryText,
	},
	outline: {
		backgroundColor: COLORS.transparent,
		borderColor: COLORS.border,
		textColor: COLORS.primary,
		loaderColor: COLORS.primary,
	},
	ghost: {
		backgroundColor: COLORS.transparent,
		borderColor: COLORS.transparent,
		textColor: COLORS.primary,
		loaderColor: COLORS.primary,
	},
	danger: {
		backgroundColor: COLORS.danger,
		borderColor: COLORS.danger,
		textColor: COLORS.white,
		loaderColor: COLORS.white,
	},
} as const;

const SIZES = {
	sm: {
		height: 36,
		paddingHorizontal: 12,
		fontSize: 13,
		gap: 6,
		borderRadius: 8,
	},
	md: {
		height: 44,
		paddingHorizontal: 16,
		fontSize: 15,
		gap: 8,
		borderRadius: 10,
	},
	lg: {
		height: 52,
		paddingHorizontal: 20,
		fontSize: 16,
		gap: 10,
		borderRadius: 12,
	},
} as const;

// Component

export function Button({
	label,
	variant = 'primary',
	size = 'md',
	loading = false,
	disabled = false,
	fullWidth = false,
	leftIcon,
	rightIcon,
	style,
	textStyle,
	accessibilityLabel,
	accessibilityState,
	...pressableProps
}: ButtonProps) {
	const colors = VARIANTS[variant];
	const dimensions = SIZES[size];
	const isDisabled = disabled || loading;

	return (
		<Pressable
			{...pressableProps}
			disabled={isDisabled}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel ?? label}
			accessibilityState={{
				...accessibilityState,
				disabled: isDisabled,
				busy: loading,
			}}
			style={({ pressed }) => [
				styles.button,
				{
					height: dimensions.height,
					paddingHorizontal: dimensions.paddingHorizontal,
					borderRadius: dimensions.borderRadius,
					backgroundColor: colors.backgroundColor,
					borderColor: colors.borderColor,
					opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1,
				},
				fullWidth && styles.fullWidth,
				style,
			]}
		>
			{loading ? (
				<ActivityIndicator
					size="small"
					color={colors.loaderColor}
				/>
			) : (
				<>
					{leftIcon && (
						<View style={styles.icon}>
							{leftIcon}
						</View>
					)}

					<Text
						numberOfLines={1}
						style={[
							styles.label,
							{
								color: colors.textColor,
								fontSize: dimensions.fontSize,
							},
							textStyle,
						]}
					>
						{label}
					</Text>

					{rightIcon && (
						<View style={styles.icon}>
							{rightIcon}
						</View>
					)}
				</>
			)}
		</Pressable>
	);
}

// Styles

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		borderWidth: 1,
	},
	fullWidth: {
		width: '100%',
	},
	label: {
		fontWeight: '600',
		textAlign: 'center',
	},
	icon: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Button;
