import type { Metadata } from "next";
import { TeamPage } from "@/components/TeamPage";

export const metadata: Metadata = {
  title: "Our Team — Premier Mortgage Resources",
  description: "Meet Premier's leadership and find loan officers, branch managers, and the people behind your home financing.",
};

export default function Page() { return <TeamPage />; }
