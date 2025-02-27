import './btn.css';
import { FormEvent, MouseEvent } from 'react';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  extraClass?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  id?: string;
  onClick?: (e: MouseEvent) => void;
  onSubmit?: (e: FormEvent<EventTarget>) => void;
}

export function Button({ onClick, title, extraClass, disabled, onSubmit, type, id }: ButtonProps) {
  return (
    <div className='btn-elem'>
      <button
        className={extraClass ? `btn ${extraClass}` : 'btn'}
        type={type || 'button'}
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={disabled}
        id={id}
      >
        {title}
      </button>
    </div>
  );
}
