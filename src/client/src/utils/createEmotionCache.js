/**
 * Emotion Cache Creator
 * 
 * This utility creates a cache for emotion styling to work with MUI and Next.js.
 */

import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
