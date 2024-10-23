import React from "react";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="mx-5 md:mx-20 lg:mx-36 lg:mt-12">
        <Toaster />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
