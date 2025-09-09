"use client";
import { Modal } from "@/components/modal";
import Image from "next/image";

export const SuccessModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) => {
  return (
    <Modal
      show={showModal}
      onShowCallback={() => setShowModal(true)}
      onCloseCallback={() => setShowModal(false)}
    >
      <div className="text-center flex flex-col justify-center items-center gap-y-3">
        <Image
          alt="success image"
          src={"/images/success-modal.svg"}
          width={410}
          height={365}
        />
        <h1 className="text-xl font-medium">Congratulations!</h1>
        <p className="text-gray-600">
          An account has been created for the staff and activation link has been
          sent to them via email.
        </p>
      </div>
    </Modal>
  );
};
