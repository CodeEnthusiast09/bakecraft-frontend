import React from "react";
import InviteForm from "./_components/invite-form";

const Teams = () => {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-3">
        Invite Team Members
      </h1>
      <p className="font-light text-primary-500 text-sm md:text-lg mb-10">
        Set up your departments and invite your team members via email. Assign
        roles to all.
      </p>

      <div className="lg:w-1/2">
        <InviteForm />
      </div>
    </div>
  );
};

export default Teams;
