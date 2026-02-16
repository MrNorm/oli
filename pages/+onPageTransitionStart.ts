// https://vike.dev/onPageTransitionStart

import type { PageContextClient } from "vike/types";

// CSS transition duration - allow fade-out to complete before loading new content
const FADE_OUT_DURATION = 150;

export async function onPageTransitionStart(pageContext: Partial<PageContextClient>) {
  console.log("Page transition start");
  console.log("pageContext.isBackwardNavigation", pageContext.isBackwardNavigation);
  document.body.classList.add("page-transition");
  
  // Wait for fade-out animation to complete before loading new page
  await new Promise(resolve => setTimeout(resolve, FADE_OUT_DURATION));
}
