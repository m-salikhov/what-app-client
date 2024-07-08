const checkLinkOrText = (str: string) => /^http/.test(str);

function Add({ add }: { add: string }) {
  return (
    <div className='question__add'>
      <p>Раздаточный материал:</p>
      <div>{checkLinkOrText(add) ? <img src={add} alt='раздатка' /> : <p>{add}</p>}</div>
    </div>
  );
}

export default Add;
