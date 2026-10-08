import { UserRole } from "@food-delivery/types";

export const ROLES = [
  { label: "Customer", value: UserRole.CUSTOMER },
  { label: "Restaurant Owner", value: UserRole.RESTAURANT_OWNER },
  { label: "Driver", value: UserRole.DRIVER },
];
