import { ExternalLinkText } from "Shared/Components/UI/ExternalLinkText/ExternalLinkText";
import { GrCopy } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import styles from "../add-tournament-link.module.css";

const exampleGOTLink = "https://gotquestions.online/pack/6001";

const handleCopy = async (textToCopy: string) => {
	await navigator.clipboard
		.writeText(textToCopy)
		.then(() => {
			toast.success(
				<p>Ссылка скопирована</p>,

				{
					hideProgressBar: true,
					autoClose: 1200,
					pauseOnHover: true,
				},
			);
		})
		.catch((err) => {
			console.error(err);
		});
};

export function Instruction() {
	return (
		<div className={styles.instruction}>
			Чтобы добавить турнир надо сначала загрузить его из{" "}
			<ExternalLinkText href="https://gotquestions.online/" text=" gotquestions.online " />
			<br />
			<br />
			Для этого откройте страницу любого из турниров на указанных сайтах. Вставьте ссылку на неё в
			поле выше и нажмите "Открыть".
			<br />
			Ссылки должны обязательно вести на страницу турнира.
			<br /> Например, {exampleGOTLink}
			<GrCopy onClick={() => handleCopy(exampleGOTLink)} className={styles.copyIcon} />
			<ToastContainer toastClassName={styles.toastSuccess} />
			<br />
			Если всё в порядке то турнир распарсится и откроется предпросмотр. Там же будет возможность
			отредактировать любое из полей. Некоторые поля обязательные, например, Дата отыгрыша или Ответ
			в каждом из вопросов. Их заполнение проверится автоматически, когда нажмёте Добавить в базу. В
			случае наличия ошибок, появится их список и можно добавить недостающую информацию через
			Редактирование. <br />
			<br />
			При успешном сохранении вы увидите соответствующее сообщение. Турнир появится в общем списке.
			А также турнир отобразится в Профиле, если вы вошли, если нет, то сохранится под гостевым
			аккаунтом.
		</div>
	);
}
