// https://vike.dev/onPageTransitionStart

// CSS transition duration - allow fade-out to complete before loading new content
const FADE_OUT_DURATION = 150;
const LOADING_DELAY = 500; // Only show loading overlay if transition takes longer than this

// Store timeout ID globally so it can be cleared in onPageTransitionEnd
let loadingTimeoutId: ReturnType<typeof setTimeout> | null = null;

export async function onPageTransitionStart() {
  document.body.classList.add("page-transition");
  
  // Only show loading overlay if transition takes longer than LOADING_DELAY
  loadingTimeoutId = setTimeout(() => {
    document.body.classList.add("page-loading");
    loadingTimeoutId = null;
  }, LOADING_DELAY);
  
  // Wait for fade-out animation to complete before loading new page
  await new Promise(resolve => setTimeout(resolve, FADE_OUT_DURATION));
}

export function clearLoadingTimeout() {
  if (loadingTimeoutId !== null) {
    clearTimeout(loadingTimeoutId);
    loadingTimeoutId = null;
  }
}
