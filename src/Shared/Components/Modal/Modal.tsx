import './Modal.css';
import { PropsWithChildren, useEffect } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { scrollVisibility } from './Helpers/scrollVisibility';
import { createPortal } from 'react-dom';

interface Props {
  active: boolean;
  onClose?: () => void;
  onDestroyed?: () => void;
}
//HOC для модальных окон.
export function Modal({ active, onClose, onDestroyed, children }: PropsWithChildren<Props>) {
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

      if (onDestroyed && !active) {
        onDestroyed();
      }
    },

    config: { duration: 200 },
  });

  useEffect(() => {
    if (active) {
      scrollVisibility('hide');
    }
  }, [active]);

  return (
    <>
      {createPortal(
        transition((style, active) =>
          active ? (
            <div
              className='modal'
              onClick={(e) => {
                if (e.target === e.currentTarget && onClose) {
                  onClose();
                }
              }}
            >
              <animated.div className='modal-content' style={style}>
                {children}
              </animated.div>
            </div>
          ) : null
        ),
        document.body
      )}
    </>
  );
}
