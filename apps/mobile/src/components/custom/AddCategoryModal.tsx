import {
  AddCategoryInput,
  addCategorySchema,
  useAddCategoryMutation,
} from "@/api/menu";
import BaseModal from "../shared/BaseModal";
import Button from "../ui/button";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { usePopup } from "@/context/popup-context";
import { isAxiosError } from "axios";
import AppText from "../ui/text";

export default function AddCategoryModal() {
  const { closeModal } = usePopup();

  const { mutate, error, isPending } = useAddCategoryMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryInput>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: { name: "" },
  });

  function onSubmit(values: z.infer<typeof addCategorySchema>) {
    mutate(values, {
      onSuccess: async () => closeModal(),
    });
  }

  const serverError = error
    ? isAxiosError(error)
      ? (error.response?.data?.message ?? "Something went wrong")
      : "Something went wrong"
    : null;

  return (
    <BaseModal title="New Category">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Category Name"
            error={errors.name?.message}
          />
        )}
      />
      {serverError && (
        <AppText variant="danger" style={{ alignSelf: "center" }}>
          {serverError}
        </AppText>
      )}
      <Button
        label="Create"
        variant="primary"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      />
      <Button label="Cancel" variant="ghost" onPress={closeModal} />
    </BaseModal>
  );
}
