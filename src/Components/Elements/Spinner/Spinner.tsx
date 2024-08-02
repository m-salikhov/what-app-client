import { RotatingLines } from 'react-loader-spinner';
import './spinner.scss';

type Props = Parameters<typeof RotatingLines>[0];

const defaultProps: Props = {
  strokeColor: '#61a199e6',
  strokeWidth: '3',
  animationDuration: '0.75',
  width: '80',
  visible: true,
};

export function Spinner(props: Props) {
  return (
    <div className='spinner'>
      <RotatingLines {...{ ...defaultProps, ...props }} />
    </div>
  );
}
