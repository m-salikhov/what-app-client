import './btn.css';

interface ButtonProps {
  extraClass?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  extraClass?: string;
}

export function Button({ title, extraClass, type, ...props }: ButtonProps) {
  return (
    <div className='btn-elem'>
      <button className={extraClass ? `btn ${extraClass}` : 'btn'} type={type || 'button'} {...props}>
        {title}
      </button>
    </div>
  );
}
