import { Spinner } from "Shared/Components/Spinner/Spinner";
import { Button } from "Shared/Components/UI/Button/Button";
import { getServerErrorMessage } from "Shared/Helpers/getServerErrorMessage";
import { setDocTitle } from "Shared/Helpers/setDocTitle";
import { Activity, useReducer, useState } from "react";
import styles from "./add-tournament-link.module.css";
import { EditForm } from "./Components/EditForm/EditForm";
import { Instruction } from "./Components/Instruction";
import { ParsedTournament } from "./Components/ParsedTournament";
import { useSaveTournament } from "./Hooks/useSaveTournament";
import { addLinkInitTournament } from "./helpers/addLinkInitTournament";
import { reducer } from "./helpers/reducer";

function AddTournamentLink() {
	setDocTitle("Добавить турнир");

	const [link, setLink] = useState("");
	const [showEditForm, setShowEditForm] = useState(false);

	const [tournament, dispatch] = useReducer(reducer, addLinkInitTournament);

	const {
		isLoading,
		error,
		errorsFilling,
		handleParseLink,
		isSuccessParse,
		isSuccessSave,
		handleSaveTournament,
	} = useSaveTournament();

	if (showEditForm) {
		return (
			<EditForm
				tournament={tournament}
				dispatch={dispatch}
				setShowEditForm={setShowEditForm}
			></EditForm>
		);
	}

	window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<div className={styles.container}>
			<div className={styles.addlink}>
				<input
					type="text"
					placeholder="Ссылка на турнир"
					onChange={(e) => {
						setLink(e.target.value);
					}}
					disabled={isLoading}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleParseLink(dispatch, link);
						}
					}}
				/>
				<Button
					title="Открыть"
					onClick={() => handleParseLink(dispatch, link)}
					disabled={isLoading}
				/>
			</div>

			{errorsFilling.length > 0 &&
				errorsFilling.map((error) => (
					<p className={styles.errorFilling} key={error.id}>
						{error.message}
					</p>
				))}

			{isSuccessSave && <p className={styles.message}>{"Турнир успешно сохранён в базе"}</p>}

			{!!error && (
				<p className={styles.errorMessage}>{getServerErrorMessage(error, "Ошибка сервера")}</p>
			)}

			{isLoading && <Spinner />}

			<Activity mode={isSuccessParse ? "visible" : "hidden"}>
				<ParsedTournament
					tournament={tournament}
					onClickEdit={() => setShowEditForm(true)}
					onClickSave={handleSaveTournament}
				/>
			</Activity>

			<Activity mode={!isSuccessParse ? "visible" : "hidden"}>
				<Instruction />
			</Activity>
		</div>
	);
}

export default AddTournamentLink;
