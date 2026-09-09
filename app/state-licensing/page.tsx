import type { Metadata } from "next";
import { CompliancePage } from "@/components/ServicePages";

export const metadata: Metadata = { title: "State Licensing — Premier Mortgage Resources" };
export default function Page() { return <CompliancePage slug="state-licensing" />; }
