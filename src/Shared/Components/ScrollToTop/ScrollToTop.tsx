import { useState, useEffect } from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import './scrollToTop.css';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      setVisible(scrollTop > windowHeight / 2);
    };

    window.addEventListener('scroll', onScroll);

    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return <BsArrowUpSquareFill className={`scroll-to-top ${visible ? '' : 'hidden'}`} onClick={scrollToTop} size={36} />;
}
