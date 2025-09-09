"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { SkeletonWrapper } from "@/components/skeleton/wrapper";
import { useAddMultipleInviteTeam } from "@/hooks/form-repeater";
import { useInviteTeamMember, useSelectionRoles } from "@/hooks/services";
import { useSelectionDepartments } from "@/hooks/services/selection/useSelectionDepartments";
import { capitalizeFirstWord } from "@/lib/utils";
import { inviteStaffValidationSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { InferType } from "yup";
import { SuccessModal } from "./success-modal";

const InviteForm = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const { data: departments, isPending: isLoadingDepartments } =
    useSelectionDepartments();

  const { data: roles, isPending: isLoadingRoles } = useSelectionRoles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<InferType<typeof inviteStaffValidationSchema>>({
    defaultValues: {
      invites: [
        {
          firstName: " ",
          lastName: " ",
          phoneNumber: " ",
          email: " ",
          department: " ",
          role: " ",
        },
      ],
    },
    resolver: yupResolver(inviteStaffValidationSchema),
  });

  const onSuccess = () => {
    reset();
    setShowSuccessModal(true);
  };

  const { mutate, isPending: isSubmitting } = useInviteTeamMember(onSuccess);

  const {
    fields: invite,
    remove: removeInvite,
    addMore: addInvite,
  } = useAddMultipleInviteTeam(control);

  const submitToServer: SubmitHandler<
    InferType<typeof inviteStaffValidationSchema>
  > = (data) => {
    mutate({ data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitToServer)}>
        {invite.map((field: any, index: number) => (
          <div key={field.id}>
            <Input
              label="First Name"
              type="text"
              placeholder="First name"
              error={errors?.invites?.[index]?.firstName}
              {...register(`invites.${index}.firstName`, { required: true })}
              showRequiredAsterik
            />

            <Input
              label="Last Name"
              type="text"
              placeholder="Last name"
              error={errors?.invites?.[index]?.lastName}
              {...register(`invites.${index}.lastName`, { required: true })}
              showRequiredAsterik
            />

            <Input
              label="Phone Number"
              type="text"
              placeholder="Phone number"
              error={errors?.invites?.[index]?.phoneNumber}
              {...register(`invites.${index}.phoneNumber`, { required: true })}
              showRequiredAsterik
            />

            <Input
              label="Email Address"
              type="text"
              placeholder="Enter Email"
              error={errors?.invites?.[index]?.email}
              {...register(`invites.${index}.email`, { required: true })}
              showRequiredAsterik
            />

            <SkeletonWrapper isLoading={isLoadingDepartments}>
              <Select
                label="Department"
                placeholder="Select Department"
                options={departments?.map((dept) => ({
                  value: dept.id,
                  label: capitalizeFirstWord(dept.name),
                }))}
                error={errors?.invites?.[index]?.department}
                {...register(`invites.${index}.department`, { required: true })}
                showRequiredAsterik
              />
            </SkeletonWrapper>

            <SkeletonWrapper isLoading={isLoadingRoles}>
              <Select
                label="Role"
                placeholder="Select Role"
                options={roles?.map((role) => ({
                  value: role.id,
                  label: capitalizeFirstWord(role.name),
                }))}
                error={errors?.invites?.[index]?.role}
                {...register(`invites.${index}.role`, { required: true })}
                showRequiredAsterik
              />
            </SkeletonWrapper>

            <div className="flex items-center justify-between">
              <div className="relative flex items-center justify-start gap-7 flex-wrap -left-4 lg:-left-6">
                <Button
                  variant="transparent"
                  className="gap-x-2 h-5 border-0 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2"
                  onClick={() => removeInvite(index)}
                >
                  <FaX className="bg-primary-100 text-xl p-1 rounded-full text-background" />{" "}
                  <span className="text-primary-500 font-light">
                    Remove Item
                  </span>
                </Button>
              </div>

              <div className="relative flex items-center justify-end gap-7 flex-wrap -right-4 lg:-right-6">
                <Button
                  variant="transparent"
                  className="gap-x-2 h-5 border-0 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2"
                  onClick={addInvite}
                >
                  <FaPlus className="bg-primary-100 text-xl p-1 rounded-full text-background" />
                  <span className="text-primary-500 font-light">
                    Invite more
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-5 flex gap-4 md:justify-end flex-wrap">
          {/* <Button
          variant="transparent"
          //   onClick={() => router.back()}
          className="bg-primary-100/40 border-0 h-12 w-full md:w-auto min-w-[120px] order-last md:order-first"
          >
          Cancel
        </Button> */}

          <Button
            type="submit"
            className="h-12 w-full md:w-auto min-w-[165px]"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>

      <SuccessModal
        showModal={showSuccessModal}
        setShowModal={setShowSuccessModal}
      />
    </>
  );
};

export default InviteForm;
