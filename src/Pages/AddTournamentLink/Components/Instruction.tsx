import { ExternalLinkText } from 'Shared/Components/Text/ExternalLinkText/ExternalLinkText';
import { GrCopy } from 'react-icons/gr';
import { ToastContainer, toast } from 'react-toastify';

const exampleGOTLink = 'https://gotquestions.online/pack/6001';
const exampleDBLink = 'https://db.chgk.info/tour/olivye21_u';

const handleCopy = async (textToCopy: string) => {
  await navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      toast.success(
        <p>Ссылка скопирована</p>,

        {
          hideProgressBar: true,
          autoClose: 1000,
          pauseOnHover: true,
        }
      );
    })
    .catch((err) => {
      console.error(err);
    });
};

export function Instruction() {
  return (
    <div className='addlink-instruction'>
      Чтобы добавить турнир надо сначала загрузить его из{' '}
      <ExternalLinkText href='https://gotquestions.online/' text=' gotquestions.online ' /> (предпочтительно) или{' '}
      <ExternalLinkText href='https://db.chgk.info/' text=' db.chgk.info' /> (сайт уже почти не обновляется).
      <br />
      <br />
      Для этого откройте страницу любого из турниров на указанных сайтах. Вставьте ссылку на неё в поле выше и нажмите
      "Открыть".
      <br />
      Ссылки должны обязательно вести на страницу турнира. Например, {exampleGOTLink}
      <GrCopy onClick={() => handleCopy(exampleGOTLink)} className='copy-icon' />
      или {exampleDBLink}
      <GrCopy onClick={() => handleCopy(exampleDBLink)} className='copy-icon' />
      <ToastContainer />
      <br />
      Если всё в порядке то турнир распарсится и откроется предпросмотр. Там же будет возможность отредактировать любое
      из полей. Некоторые поля обязательные, например, Дата отыгрыша или Ответ в каждом из вопросов. Их заполнение
      проверится автоматически, когда нажмёте Добавить в базу. В случае наличия ошибок, появится их список и можно
      добавить недостающую информацию через Редактирование. <br />
      <br />
      При успешном сохранении вы увидите соответствующее сообщение. Турнир появится в общем списке. А также турнир
      отобразится в Профиле, если вы вошли, если нет, то сохранится под гостевым аккаунтом.
    </div>
  );
}
