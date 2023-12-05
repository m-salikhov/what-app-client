import { FormEvent } from "react";
import "./btn.scss";

interface ButtonProps {
  onClick?: () => void;
  onSubmit?: (e: FormEvent<EventTarget>) => void;
  title: string;
  extraClass?: string;
  disabled?: boolean;
}

const Button = ({ onClick, title, extraClass, disabled, onSubmit }: ButtonProps) => {
  return (
    <div className="btn-elem">
      <button
        className={extraClass ? `btn ${extraClass}` : "btn"}
        type="button"
        onClick={onClick || onSubmit}
        disabled={disabled ? true : false}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
