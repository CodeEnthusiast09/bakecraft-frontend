// import { Modal } from "@/components/modal";
// import { useUserNotifications } from "@/hooks/services";
// import { useState } from "react";
// import { FaBell } from "react-icons/fa";

// export const NotificationModal = () => {
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const { data: notifications, isPending } = useUserNotifications();

//   return (
//     <Modal
//       className="md:p-10"
//       triggerButtonVariant={"transparent"}
//       trigerButtonClass="border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2
// "
//       buttonIcon={
//         <FaBell size={24} className="text-primary-100 cursor-pointer" />
//       }
//       trigerButtonJustifyContent="justify-center"
//       modalTitle="Notifications"
//       show={showModal}
//       onShowCallback={() => setShowModal(true)}
//     >
//       <div className="flex flex-col gap-3">
//         <p className="text-sm text-gray-600">No new notifications 🎉</p>
//         {/* Map real notifications here */}
//       </div>
//     </Modal>
//   );
// };

import { Modal } from "@/components/modal";
import {
  useNotificationUnreadCount,
  useUserNotifications,
} from "@/hooks/services";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { Skeleton } from "@/components/skeleton";

export const NotificationModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: notifications, isPending: isNotificationsLoading } =
    useUserNotifications();

  const { data: unreadCount, isPending: isCountLoading } =
    useNotificationUnreadCount();

  return (
    <Modal
      className="md:p-10"
      triggerButtonVariant="transparent"
      trigerButtonClass="relative border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2"
      buttonIcon={
        <div className="relative">
          <FaBell size={24} className="text-primary-100 cursor-pointer" />
          {!isCountLoading && unreadCount?.count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[12px] font-bold">
              {unreadCount.count}
            </span>
          )}
        </div>
      }
      trigerButtonJustifyContent="justify-center"
      modalTitle="Notifications"
      show={showModal}
      onShowCallback={() => setShowModal(true)}
    >
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
        {isNotificationsLoading ? (
          // Skeleton placeholders
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl p-3 shadow-sm border bg-white flex flex-col gap-2"
              >
                <Skeleton height={14} width={180} className="rounded-md" />
                <Skeleton height={12} width={120} className="rounded-md" />
              </div>
            ))}
          </div>
        ) : notifications && notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`rounded-xl p-3 shadow-sm border ${
                notif.isRead
                  ? "bg-white text-gray-600"
                  : "bg-primary-50 text-primary-900"
              }`}
            >
              {notif.message && <p className="text-sm">{notif.message}</p>}
              {/* <span className="text-[10px] text-gray-400">
                {new Date(notif.createdAt).toLocaleString()}
              </span> */}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">No new notifications 🎉</p>
        )}
      </div>
    </Modal>
  );
};
