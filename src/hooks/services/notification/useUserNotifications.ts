import { Notification } from "@/interfaces/notification";
import { clientRequest } from "@/services/client";
import { useQuery } from "@tanstack/react-query";

export const useUserNotifications = () => {
  const { data, isPending, error, isError } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => {
      return clientRequest.notification.getUserNotifications();
    },
  });

  return {
    data,
    isPending,
    error,
    isError,
  };
};
