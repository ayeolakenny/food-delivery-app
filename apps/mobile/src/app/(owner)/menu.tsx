import { View, Text, StyleSheet } from 'react-native'

export default function OwnerHomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Owner Menu Screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: '700',
	}
})

