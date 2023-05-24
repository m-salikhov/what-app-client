import "./btn.scss";

interface ButtonProps {
  onClick: () => void;
  title: string;
  extraClass?: string;
  disabled?: boolean;
}

const Button = ({ onClick, title, extraClass, disabled }: ButtonProps) => {
  return (
    <div className="btn-elem">
      <button
        className={extraClass ? `btn ${extraClass}` : "btn"}
        type="button"
        onClick={onClick}
        disabled={disabled ? true : false}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
