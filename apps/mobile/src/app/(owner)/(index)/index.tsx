import { useMyRestaurantQuery, useUpdateRestaurantMutation } from '@/api/restaurant/operations';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native'

export default function OwnerHomeScreen() {

	const { data: restaurant, isLoading } = useMyRestaurantQuery();
	const { mutate: toggleOpen } = useUpdateRestaurantMutation();

	useEffect(() => {
		if (isLoading) return;
		if (!restaurant) {
			router.replace("/(owner)/(index)/create-restaurant");
		}
	}, [restaurant, isLoading]);

	if (isLoading || !restaurant) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#FF6B35" />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.name}>{restaurant.name}</Text>

			<Pressable
				style={[styles.toggleButton, styles.editButton, restaurant.isOpen ? styles.open : styles.closed]}
				onPress={() => { toggleOpen({ id: restaurant.id, isOpen: !restaurant.isOpen }) }}
			>
				<Text style={styles.toggleText}>{restaurant.isOpen ? "Open - tap to close" : "Closed - tap to open"}</Text>
			</Pressable>

			<Pressable
				style={styles.editButton}
				onPress={() => router.push('/(owner)/(index)/edit-restaurant')}
			>
				<Text style={styles.editButtonText}>Edit Restaurant</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24
	},
	name: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 24
	},
	toggleButton: {
		width: '100%',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 24,
	},
	open: {
		backgroundColor: '#22C55E',
	},
	closed: {
		backgroundColor: '#EF4444',
	},
	toggleText: {
		color: '#fff',
		fontSize: 15,
		fontWeight: '600',
	},
	editButton: {
		width: '100%',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: "#ddd"
	},
	editButtonText: {
		fontSize: 15,
		fontWeight: '500',
	}
})
