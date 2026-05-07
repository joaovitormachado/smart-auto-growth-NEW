import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type TrackingEventName =
  | "landing_cta_click"
  | "view_form_page"
  | "form_started"
  | "form_submitted"
  | "view_vsl_page"
  | "vsl_video_play"
  | "vsl_cta_click";

export const useTracking = () => {
  const [searchParams] = useSearchParams();
  const [utms, setUtms] = useState<string>("");

  useEffect(() => {
    // Preserve UTMs
    const params = new URLSearchParams(searchParams.toString());
    const utmParams = new URLSearchParams();
    
    // Only extract UTMs and id
    params.forEach((value, key) => {
      if (key.startsWith("utm_") || key === "id" || key === "src" || key === "sck") {
        utmParams.append(key, value);
      }
    });

    const utmString = utmParams.toString();
    if (utmString) {
      setUtms(`?${utmString}`);
    }
  }, [searchParams]);

  const trackEvent = (eventName: TrackingEventName, data?: Record<string, unknown>) => {
    // Console log for debugging
    console.log(`[Tracking Event]: ${eventName}`, data);

    // Push to dataLayer if available (GTM/Meta)
    if (typeof window !== "undefined") {
      const dataLayer = (window as { dataLayer?: unknown[] }).dataLayer = (window as { dataLayer?: unknown[] }).dataLayer || [];
      dataLayer.push({
        event: eventName,
        ...data,
      });
    }
  };

  const getUtmLink = (path: string) => {
    return `${path}${utms}`;
  };

  return {
    trackEvent,
    getUtmLink,
    utms,
  };
};
