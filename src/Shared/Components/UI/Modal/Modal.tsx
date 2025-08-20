import styles from './modal.module.css';
import { PropsWithChildren, useEffect } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { scrollVisibility } from './Helpers/scrollVisibility';
import { createPortal } from 'react-dom';

interface Props {
  active: boolean;
  onClose: () => void;
  onElementDestroyed?: () => void;
}

//HOC для модальных окон.
export function Modal({ active, onClose, onElementDestroyed, children }: PropsWithChildren<Props>) {
  const transition = useTransition(active, {
    from: {
      scale: 0.8,
      opacity: 0.5,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0.8,
      opacity: 0.5,
    },

    onDestroyed() {
      if (!active) {
        scrollVisibility('show');
      }

      if (onElementDestroyed && !active) {
        onElementDestroyed();
      }
    },

    config: { duration: 200 },
  });

  useEffect(() => {
    if (active) {
      scrollVisibility('hide');
    }
  }, [active]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {createPortal(
        transition((style, active) =>
          active ? (
            <dialog
              className={styles.modal}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  onClose();
                }
              }}
            >
              <animated.div className={styles.content} style={style}>
                {children}
              </animated.div>
            </dialog>
          ) : null
        ),
        document.body
      )}
    </>
  );
}
