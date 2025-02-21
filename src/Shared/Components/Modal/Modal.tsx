import { PropsWithChildren, useRef } from 'react';
import './Modal.css';
import { animated, useTransition } from '@react-spring/web';
import { scrollVisibility } from './Helpers/scrollVisibility';

interface Props {
  active: boolean;
  onClose: () => void;
  onDestroyed?: () => void;
}
//HOC для модальных окон.
export default function Modal({ active, onClose, onDestroyed, children }: PropsWithChildren<Props>) {
  //чтобы onDestroyed не срабатывал при первом рендере
  const ref = useRef(null);

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
      if (!ref.current) {
        scrollVisibility('show');
      }

      if (onDestroyed && !ref.current) {
        onDestroyed();
      }
    },

    onStart() {
      scrollVisibility('hide');
    },

    config: { duration: 200 },
  });

  return transition((style, active) =>
    active ? (
      <div
        className='modal'
        ref={ref}
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
