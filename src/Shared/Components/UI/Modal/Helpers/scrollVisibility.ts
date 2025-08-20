const body = document.body;

export function scrollVisibility(flag: 'show' | 'hide') {
  if (flag === 'hide' && body.style.overflow !== 'hidden') {
    const scrollOffset = window.innerWidth - body.clientWidth;

    if (scrollOffset > 5) {
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollOffset + 0.4}px`;
    }
  } else if (flag === 'show' && body.style.overflow === 'hidden') {
    body.style.overflow = 'auto';
    body.style.removeProperty('padding-right');
  }
}
