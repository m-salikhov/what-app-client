import { useState, useEffect } from 'react';
import { BsArrowUpSquareFill as ArrowUp } from 'react-icons/bs';
import styles from './scroll-to-top.module.css';

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

  return <ArrowUp className={styles.scroll} onClick={scrollToTop} size={36} />;
}
