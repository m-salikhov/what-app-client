const body = document.body;

export function showScroll(delay: number) {
  if (body.style.overflow !== 'hidden') return;

  setTimeout(() => {
    body.style.overflow = 'auto';
    body.style.removeProperty('padding-right');
  }, delay);
}

export function hideScroll() {
  const scrollOffset = window.innerWidth - body.clientWidth;

  if (scrollOffset < 1) return;

  body.style.overflow = 'hidden';
  body.style.paddingRight = `${scrollOffset + 0.4}px`;
}
