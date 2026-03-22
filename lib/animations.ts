/**
 * Shared animation constants.
 * Import from here instead of hardcoding easing arrays across components.
 */

/** Smooth, snappy spring-like ease — use for reveals and entrances */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Strong ease-in-out — use for nav links, hover transitions */
export const EASE_IN_OUT_QUINT = [0.87, 0, 0.13, 1] as const;

/** Gentle ease — use for subtle movements and defaults */
export const EASE_STANDARD = [0.25, 0, 0.25, 1] as const;

/** Standard component transition duration in seconds */
export const DURATION_DEFAULT = 0.35;

/** Fast micro-interaction duration */
export const DURATION_FAST = 0.2;

/** Slow entrance duration */
export const DURATION_SLOW = 0.8;
