import { FormEvent, MouseEvent } from 'react';
import './btn.scss';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  extraClass?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e: MouseEvent) => void;
  onSubmit?: (e: FormEvent<EventTarget>) => void;
}

function Button({ onClick, title, extraClass, disabled, onSubmit, type }: ButtonProps) {
  return (
    <div className='btn-elem'>
      <button
        className={extraClass ? `btn ${extraClass}` : 'btn'}
        type={type || 'button'}
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={disabled}
      >
        {title}
      </button>
    </div>
  );
}

export default Button;
