"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/analytics";

/**
 * Mount once in the layout to persist UTM / ?ref= parameters into
 * sessionStorage so the booking POST can attach them.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
