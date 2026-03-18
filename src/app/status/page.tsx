import type { Metadata } from "next";
import StatusClient from './status-client';

export const metadata: Metadata = {
  title: "System Status - Fortune Cookie | Service Uptime & Health",
  description: "Check Fortune Cookie's real-time system status. View service uptime, response times, and any ongoing incidents. Our fortune telling services are monitored 24/7.",
  keywords: "fortune cookie status, system status, service uptime, fortune telling status, website health",
  robots: {
    index: true,
    follow: true,
  },
};

export default function StatusPage() {
  return <StatusClient />;
}
