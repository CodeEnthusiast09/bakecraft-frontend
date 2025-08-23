"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components//input";
import Link from "next/link";
import Image from "next/image";
// import { Label } from "@/components/label";

export default function CompanyDetailsPage() {
  const [formData, setFormData] = useState({
    companyName: "Emi Bakery",
    companyAddress: "",
    officialEmail: "",
    companyPhone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Sidebar with Progress Steps */}
      <div className="hidden w-full lg:w-[35%] bg-white shadow-sm p-8 md:flex justify-between lg:flex-col lg:justify-start items-center">
        {/* Logo */}
        <div className="lg:mb-[88px]">
          <Link href={"/"}>
            <Image
              alt="logo"
              src="/images/logo.png"
              width={93}
              height={46}
              className="w-auto h-12 sm:h-12 md:h-14 2xl:h-16"
            />
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="lg:space-y-8 flex items-center gap-5 lg:block">
          {/* Step 1 - Create Account */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5 4.5L6 12L2.5 8.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Create Account</span>
          </div>

          {/* Step 2 - Subscribe */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5 4.5L6 12L2.5 8.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Subscribe</span>
          </div>

          {/* Step 3 - Company Details */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border-1 border-primary-100 flex items-center justify-center">
              <span className="text-primary-100 font-medium text-sm">3</span>
            </div>
            <span className="text-primary-100 font-medium">
              Company Details
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {/* <div className="flex-1 p-12"> */}
      <div className="w-full flex flex-col ustify-center px-5 py-10 md:px-12 md:py-12 lg:py-32">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Company Details
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 lg:w-[70%] 2xl:w-[50%]"
        >
          {/* Company Name */}

          <Input
            label={"Company Name"}
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
          />

          {/* Company Address */}
          <Input
            label={"Company Address"}
            id="companyAddress"
            placeholder="Enter Company Address"
            value={formData.companyAddress}
            onChange={(e) =>
              handleInputChange("companyAddress", e.target.value)
            }
          />

          {/* Official Email */}
          <Input
            label={"Official Email"}
            id="officialEmail"
            type="email"
            placeholder="Enter Company Email"
            value={formData.officialEmail}
            onChange={(e) => handleInputChange("officialEmail", e.target.value)}
          />

          {/* Company Phone Number */}
          <Input
            label={"Company Phone Number"}
            id="companyPhone"
            type="tel"
            placeholder="Enter Company Phone Number"
            value={formData.companyPhone}
            onChange={(e) => handleInputChange("companyPhone", e.target.value)}
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-8">
            <Button variant="primary" className="w-[120px]">
              Submit
            </Button>
          </div>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}
