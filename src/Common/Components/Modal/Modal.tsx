import { PropsWithChildren } from 'react';
import './Modal.css';

interface Props {
  active: boolean;
  onClose: () => void;
}
//HOC для модальных окон.
export default function Modal({ active, onClose, children }: PropsWithChildren<Props>) {
  if (!active) return null;

  return (
    <div
      className='modal'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className='modal-content'>{children}</div>
    </div>
  );
}
