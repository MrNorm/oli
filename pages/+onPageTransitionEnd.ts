import { clearLoadingTimeout } from './+onPageTransitionStart';

export async function onPageTransitionEnd() {
  // Clear the loading timeout if it hasn't fired yet
  clearLoadingTimeout();
  
  // Remove both transition and loading classes
  document.body.classList.remove("page-transition", "page-loading");
}
