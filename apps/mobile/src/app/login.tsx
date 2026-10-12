import { loginSchema, LoginInput, useLoginMutation } from "@/api/auth";
import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Pressable,
	Text,
	TextInput,
	View,
	StyleSheet,
} from "react-native";

export default function LoginScreen() {
	const { setSession } = useAuth();
	const loginMutation = useLoginMutation();

	// react-hook-form owns the field state; zodResolver runs loginSchema on submit
	// and puts any failures into formState.errors, keyed by field name.
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	// Only called once the schema passes, so `values` is already typed and valid.
	function onSubmit(values: LoginInput) {
		loginMutation.mutate(values, {
			onSuccess: async (session) => {
				await setSession(session);
				router.replace("/");
			},
		});
	}

	const serverError = loginMutation.error
		? isAxiosError(loginMutation.error)
			? (loginMutation.error.response?.data?.message ?? "Invalid email or password")
			: "Something went wrong"
		: null;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome back</Text>

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

			{serverError && <Text style={styles.serverError}>{serverError}</Text>}

			<Pressable
				style={styles.button}
				onPress={handleSubmit(onSubmit)}
				disabled={loginMutation.isPending}
			>
				{loginMutation.isPending ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Login</Text>
				)}
			</Pressable>

			<Pressable onPress={() => router.push("/register")}>
				<Text style={styles.link}>Don't have an account? Register</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
