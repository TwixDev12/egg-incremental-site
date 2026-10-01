import { SITE_CONFIG } from '../config/siteConfig';

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Privacy-friendly event tracking utility.
 * In compliance with privacy guidelines, analytics are disabled by default.
 * If enabled in SITE_CONFIG, events are cleanly forwarded to the chosen provider.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (!SITE_CONFIG.analytics.enabled) {
    // In development or when disabled, log to console for debugging if in dev mode
    if (import.meta.env.DEV) {
      console.debug('[Analytics (Disabled)] Event triggered:', event);
    }
    return;
  }

  try {
    if (SITE_CONFIG.analytics.provider === 'plausible') {
      const windowWithPlausible = window as unknown as { plausible?: (name: string, options?: { props?: Record<string, unknown> }) => void };
      if (typeof windowWithPlausible.plausible === 'function') {
        windowWithPlausible.plausible(event.action, {
          props: {
            category: event.category,
            label: event.label,
            value: event.value,
          },
        });
      }
    } else if (SITE_CONFIG.analytics.provider === 'google-analytics') {
      const windowWithGtag = window as unknown as { gtag?: (type: string, action: string, params: Record<string, unknown>) => void };
      if (typeof windowWithGtag.gtag === 'function') {
        windowWithGtag.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
        });
      }
    }
  } catch (error) {
    console.error('Failed to dispatch analytics event:', error);
  }
}

export function trackPlayNowClick(source: string): void {
  trackEvent({
    action: 'click_play_now',
    category: 'Conversion',
    label: source,
  });
}
