import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ToastProvider } from "@heroui/react";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
        <DashboardSidebar />
      <div className="flex-1">

          {children}

          <ToastProvider
            placement="top-right"
            maxVisibleToasts={5}
          />
        </div>
    </div>
  );
};

export default DashboardLayout;
