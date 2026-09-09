import type { Metadata } from "next";
import { TeamPage } from "@/components/TeamPage";
export const metadata: Metadata = { title: "Find a Loan Officer — Premier Mortgage Resources" };
export default function Page() { return <TeamPage directoryOnly />; }
