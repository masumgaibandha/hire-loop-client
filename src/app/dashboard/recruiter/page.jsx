"use client";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";
import {
  FileText,
  Persons,
  Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  
  const recruiterStats = [
    { label: "Total Job Posts", value: "48", icon: FileText },
    { label: "Total Applicants", value: "1,284", icon: Persons },
    { label: "Active Jobs", value: "18", icon: Thunderbolt },
    { label: "Jobs Closed", value: "32", icon: CircleCheck },
  ];
  const user = session?.user;
  console.log("User session:", session);
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <DashboardStats stats={recruiterStats} />
    </div>
  );
};

export default RecruiterPage;
