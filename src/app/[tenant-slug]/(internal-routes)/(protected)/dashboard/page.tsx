"use client";

import { useAccount } from "@/hooks/services";
import DashboardCard from "./_components/dashboard-card";

const Dashboard = () => {
  const { data: userDetails } = useAccount();
  return (
    <div>
      <h1 className="font-light text-2xl md:text-3xl mb-3">
        Hello <span className="font-bold">{userDetails?.firstName},</span>
      </h1>
      <p className="font-light text-primary-500 text-sm md:text-lg mb-10">
        It’s time to set up your bakery modules and get started with
        transforming your bakery, click on any card to get started.
      </p>

      <div>
        <DashboardCard />
      </div>
    </div>
  );
};

export default Dashboard;
