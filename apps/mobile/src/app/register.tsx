import {
	registerSchema,
	RegisterInput,
	useRegisterMutation,
} from "@/api/auth.ts";
import { ROLES } from "@/api/types";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@food-delivery/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	TextInput,
	View,
	StyleSheet,
	Text,
} from "react-native";

export default function RegisterScreen() {
	const { setSession } = useAuth();
	const registerMutation = useRegisterMutation();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			role: UserRole.CUSTOMER,
		},
	});

	function onSubmit(values: RegisterInput) {
		registerMutation.mutate(values, {
			onSuccess: async (session) => {
				await setSession(session);
				router.replace("/");
			},
		});
	}

	const serverError = registerMutation.error
		? isAxiosError(registerMutation.error)
			? (registerMutation.error.response?.data?.message ??
				"Registration failed")
			: "Something went wrong"
		: null;

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Create an account</Text>

			<Controller
				control={control}
				name="firstName"
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={[styles.input, errors.firstName && styles.inputError]}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						placeholder="First Name"
					/>
				)}
			/>
			{errors.firstName && (
				<Text style={styles.error}>{errors.firstName.message}</Text>
			)}

			<Controller
				control={control}
				name="lastName"
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={[styles.input, errors.lastName && styles.inputError]}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						placeholder="Last Name"
					/>
				)}
			/>
			{errors.lastName && (
				<Text style={styles.error}>{errors.lastName.message}</Text>
			)}

			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={[styles.input, errors.email && styles.inputError]}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						placeholder="Email"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				)}
			/>
			{errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={[styles.input, errors.password && styles.inputError]}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						placeholder="Password"
						secureTextEntry
					/>
				)}
			/>
			{errors.password && (
				<Text style={styles.error}>{errors.password.message}</Text>
			)}

			<Text style={styles.label}>I am a...</Text>
			{/* Not a text input, but Controller works the same: `value` is the
			    selected role and `onChange` sets it. */}
			<Controller
				control={control}
				name="role"
				render={({ field: { onChange, value: selectedRole } }) => (
					<View style={styles.roleContainer}>
						{ROLES.map(({ label, value }) => (
							<Pressable
								key={value}
								style={[
									styles.roleButton,
									selectedRole === value && styles.roleButtonActive,
								]}
								onPress={() => onChange(value)}
							>
								<Text
									style={[
										styles.roleText,
										selectedRole === value && styles.roleTextActive,
									]}
								>
									{label}
								</Text>
							</Pressable>
						))}
					</View>
				)}
			/>

			{serverError && <Text style={styles.serverError}>{serverError}</Text>}

			<Pressable
				style={styles.button}
				onPress={handleSubmit(onSubmit)}
				disabled={registerMutation.isPending}
			>
				{registerMutation.isPending ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Register</Text>
				)}
			</Pressable>

			<Pressable onPress={() => router.back()}>
				<Text style={styles.link}>Already have an account? Login</Text>
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: "center",
		padding: 24,
		backgroundColor: "#fff",
	},
	title: { fontSize: 28, fontWeight: "700", marginBottom: 32 },
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 14,
		marginBottom: 16,
		fontSize: 16,
	},
	inputError: { borderColor: "#D92D20", marginBottom: 4 },
	error: { color: "#D92D20", fontSize: 13, marginBottom: 12 },
	serverError: {
		color: "#D92D20",
		fontSize: 14,
		textAlign: "center",
		marginBottom: 12,
	},
	label: { fontSize: 16, fontWeight: "500", marginBottom: 12 },
	roleContainer: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 24,
	},
	roleButton: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ddd",
		alignItems: "center",
	},
	roleButtonActive: {
		backgroundColor: "#FF6B35",
		borderColor: "#FF6B35",
	},
	roleText: {
		fontSize: 13,
		color: "#666",
	},
	roleTextActive: {
		color: "#fff",
		fontWeight: "600",
	},
	button: {
		backgroundColor: "#FF6B35",
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		marginBottom: 16,
	},
	buttonText: { fontSize: 16, fontWeight: "600", color: "#fff" },
	link: { textAlign: "center", color: "#FF6B35" },
});
