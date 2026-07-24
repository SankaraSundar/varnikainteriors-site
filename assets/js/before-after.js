/* ==========================================================================
   VARNIKA INTERIOR DESIGN - BEFORE & AFTER INTERACTIVE SLIDER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.before-after-container');

  containers.forEach(container => {
    const afterImg = container.querySelector('.ba-after');
    const handle = container.querySelector('.ba-slider-handle');
    const rangeInput = container.querySelector('.ba-slider-input');

    function updateSlider(val) {
      const percentage = Math.max(0, Math.min(100, val));
      if (afterImg) {
        afterImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
      }
      if (handle) {
        handle.style.left = `${percentage}%`;
      }
    }

    if (rangeInput) {
      // Input range event (handles mouse drag, touch swipe, track click)
      rangeInput.addEventListener('input', (e) => {
        updateSlider(e.target.value);
      });

      // Initial alignment
      updateSlider(rangeInput.value || 50);
    }
  });
});
