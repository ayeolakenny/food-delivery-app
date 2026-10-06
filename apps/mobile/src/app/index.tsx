import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { HealthCheckResponse } from '@food-delivery/types';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  const { data: health, error, isLoading } = useQuery<HealthCheckResponse>({
    queryKey: ['health'],
    queryFn: async () => api.get<HealthCheckResponse>('/health').then(res => res.data),
  })


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Delivery!</Text>
      <Text>Connection Text</Text>

      {isLoading && <ActivityIndicator size="large" color="#ff6b35" />}

      {health && (
        <View>
          <Text>API Status: {health.status}</Text>
          <Text>
            {new Date(health.timestamp).toLocaleString()}
          </Text>
        </View>
      )}
      {error && (
        <View>
          <Text>Could not react the API. Is the server running?</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 6,
  }
});