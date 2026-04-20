import {
  Smartphone,
  UserRound,
  Calculator,
  BellRing,
  Hourglass,
  FileText,
  HelpCircle,
  AlertCircle,
  Plus,
  MapPin,
  LucideIcon,
} from "lucide-react";

export interface ProblemFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
  extraIcon?: LucideIcon;
}

export const PROBLEM_FEATURES: ProblemFeature[] = [
  {
    icon: Smartphone,
    title: "Lost Track of Bookings",
    desc: "Sales bookings are recorded in multiple places and often get misplaced or forgotten.",
    extraIcon: MapPin,
  },
  {
    icon: UserRound,
    title: "Agent Performance Unknown",
    desc: "You don't know which agent is performing and who is just taking leads.",
    extraIcon: HelpCircle,
  },
  {
    icon: Calculator,
    title: "Commission Calculation Errors",
    desc: "Manual commission calculation leads to disputes and payment mistakes.",
    extraIcon: AlertCircle,
  },
  {
    icon: BellRing,
    title: "Payment Follow-ups Messy",
    desc: "Investor payments and installments are hard to track and often delayed.",
  },
  {
    icon: Hourglass,
    title: "Slow Approval Process",
    desc: "Approvals depend on calls and messages, delaying confirmations.",
  },
  {
    icon: FileText,
    title: "No Real-time Reports",
    desc: "You never get a clear monthly revenue or sales performance report.",
    extraIcon: Plus,
  },
];
