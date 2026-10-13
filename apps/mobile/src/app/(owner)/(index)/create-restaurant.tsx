import {
  ActivityIndicator,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useUploadMutation } from "@/api/upload";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRestaurantSchema } from "@/api/restaurant/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateRestaurantInput,
  useCreateRestaurantMutation,
} from "@/api/restaurant";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import z from "zod";

export default function CreateRestaurantScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const uploadMutation = useUploadMutation();
  const createRestaurantMutation = useCreateRestaurantMutation();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ["images"],
      quality: 1,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);
      uploadMutation.mutate(asset);
    } else {
      alert("You did not select any image");
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRestaurantSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      cuisineType: "",
    },
  });

  // Only called once the schema passes, so `values` is already typed and valid.
  function onSubmit(values: z.infer<typeof createRestaurantSchema>) {
    createRestaurantMutation.mutate({
      ...values,
      uploadId: uploadMutation.data?.id,
    }, {
      onSuccess: () => {
        router.replace("/(owner)/(index)");
      }
    });

  }

  const serverError = createRestaurantMutation.error
    ? isAxiosError(createRestaurantMutation.error)
      ? (createRestaurantMutation.error.response?.data?.message ??
        "Something went wrong")
      : "Something went wrong"
    : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Restaurant Screen</Text>
      <Pressable
        onPress={pickImageAsync}
        disabled={uploadMutation.isPending}
        style={({ pressed }) => [
          styles.imagePicker,
          selectedImage && styles.imagePickerFilled,
          pressed && styles.imagePickerPressed,
        ]}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={styles.preview}
            contentFit="cover"
          />
        ) : (
          <Text style={styles.imagePickerText}>
            Tap to upload restaurant image
          </Text>
        )}

        {uploadMutation.isPending && (
          <View style={styles.uploadOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.uploadOverlayText}>Uploading...</Text>
          </View>
        )}
      </Pressable>
      {uploadMutation.isError && (
        <Text style={[styles.uploadStatus, styles.uploadError]}>
          Upload failed: {uploadMutation.error.message}
        </Text>
      )}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Restaurant Name"
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Description"
            multiline
            numberOfLines={3}
            error={errors.description?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Address"
            error={errors.address?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="cuisineType"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Cuisine Type * (e.g. Italian, Mexican)"
            error={errors.cuisineType?.message}
          />
        )}
      />

      {serverError && <Text style={styles.serverError}>{serverError}</Text>}

      <Button
        label="Create Restaurant"
        loading={
          uploadMutation.isPending || createRestaurantMutation.isPending
        }
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  imagePicker: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginTop: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 16,
  },
  imagePickerFilled: {
    borderStyle: "solid",
    borderColor: "transparent",
  },
  imagePickerPressed: {
    opacity: 0.7,
  },
  imagePickerText: {
    color: "#6b7280",
    fontSize: 15,
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  uploadOverlayText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  uploadStatus: {
    marginTop: 12,
    fontSize: 14,
    color: "#374151",
  },
  uploadError: {
    color: "#dc2626",
  },
  serverError: {
    color: "#D92D20",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
});
