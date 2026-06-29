"use client";

import { useEffect } from "react";

export default function WakeAiService() {
  useEffect(() => {
    const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICES?.trim();

    if (!aiServiceUrl) {
      return;
    }

    const wakeService = async () => {
      try {
        await fetch(`${aiServiceUrl.replace(/\/$/, "")}/`, {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
      } catch (error) {
        console.warn("Failed to wake AI service:", error);
      }
    };

    void wakeService();
  }, []);

  return null;
}
