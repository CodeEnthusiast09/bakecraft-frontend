import { NotificationCount } from "@/interfaces/notification";
import { clientRequest } from "@/services/client";
import { useQuery } from "@tanstack/react-query";

export const useNotificationUnreadCount = () => {
  const { data, isPending, error, isError } = useQuery<NotificationCount>({
    queryKey: ["notifications-count"],
    queryFn: () => {
      return clientRequest.notification.getUnreadCount();
    },
  });

  return {
    data: data ?? { count: 0 },
    isPending,
    error,
    isError,
  };
};
