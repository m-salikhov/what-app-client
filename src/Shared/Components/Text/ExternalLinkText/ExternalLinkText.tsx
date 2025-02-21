import './ExternalLinkText.css';

interface Props {
  text: string;
  href: string;
}

export function ExternalLinkText({ text, href }: Props) {
  return (
    <a className='text-external-link' href={href} target='_blank' rel='noreferrer'>
      {text}
    </a>
  );
}
