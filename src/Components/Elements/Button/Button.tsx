import "./btn.scss";

interface ButtonProps {
  onClick: () => void;
  title: string;
  extraClass?: string;
}

const Button = ({ onClick, title, extraClass }: ButtonProps) => {
  return (
    <div className="btn-elem">
      <button
        className={Boolean(extraClass) ? `btn ${extraClass}` : "btn"}
        type="button"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
