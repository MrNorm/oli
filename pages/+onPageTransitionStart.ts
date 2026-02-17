// https://vike.dev/onPageTransitionStart

// CSS transition duration - allow fade-out to complete before loading new content
const FADE_OUT_DURATION = 150;

export async function onPageTransitionStart() {
  document.body.classList.add("page-transition");
  
  // Wait for fade-out animation to complete before loading new page
  await new Promise(resolve => setTimeout(resolve, FADE_OUT_DURATION));
}
