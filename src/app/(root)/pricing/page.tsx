import type { Metadata } from "next";
import PricingClient from "./pricing-client";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Synapse UI is free and open source.",
};

export default function PricingPage() {
  return <PricingClient />;
}

