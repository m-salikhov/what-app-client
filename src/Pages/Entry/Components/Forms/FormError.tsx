interface Props {
  message: string | undefined;
}

export function FormFieldError({ message }: Props) {
  if (!message) return null;

  return (
    <div className='entry-error'>
      <div className='entry-error-block'></div>
      <p>{message}</p>
    </div>
  );
}
