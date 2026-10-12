import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";



export default function CreateRestaurantScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result)
    } else {
      alert("You did not select any image")
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Create Restaurant Screen</Text>
      <Pressable onPress={pickImageAsync}>
        <Text>Pick Image</Text>
      </Pressable>

      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={styles.preview}
          contentFit="cover"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  preview: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: "#f3f4f6",
  },
})
