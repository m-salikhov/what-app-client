import { PropsWithChildren } from 'react';
import './Modal.css';
import { animated, useTransition } from '@react-spring/web';

interface Props {
  active: boolean;
  onClose: () => void;
  onDestroyed?: () => void;
}
//HOC для модальных окон.
export default function Modal({ active, onClose, onDestroyed, children }: PropsWithChildren<Props>) {
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

    onDestroyed(item) {
      if (item && onDestroyed) {
        onDestroyed();
      }
    },

    config: { duration: 200 },
  });

  return transition((style, active) =>
    active ? (
      <div
        className='modal'
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <animated.div className='modal-content' style={style}>
          {children}
        </animated.div>
      </div>
    ) : null
  );
}
