import { Modal } from "@/components/modal";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

export const NotificationModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Modal
      className="md:p-10"
      triggerButtonVariant={"transparent"}
      trigerButtonClass="border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2
"
      buttonIcon={
        <FaBell size={24} className="text-primary-100 cursor-pointer" />
      }
      trigerButtonJustifyContent="justify-center"
      modalTitle="Notifications"
      show={showModal}
      onShowCallback={() => setShowModal(true)}
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-600">No new notifications 🎉</p>
        {/* Later you can map real notifications here */}
      </div>
    </Modal>
  );
};
