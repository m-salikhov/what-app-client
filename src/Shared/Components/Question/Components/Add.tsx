export function Add({ add }: { add: string }) {
  return (
    <div className='question-add'>
      <p>Раздаточный материал:</p>
      <div>{add.startsWith('http') ? <img src={add} alt='раздатка' /> : <p>{add}</p>}</div>
    </div>
  );
}
