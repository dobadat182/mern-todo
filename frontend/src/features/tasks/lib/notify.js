import { toast } from "@/components/ui/toast";

export const notify = {
  success(title, description) {
    toast.add({
      type: "success",
      title,
      ...(description ? { description } : {}),
    });
  },
  error(title, description) {
    toast.add({
      type: "error",
      title,
      ...(description ? { description } : {}),
    });
  },
};
