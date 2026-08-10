import { Spinner } from "Shared/Components/Spinner/Spinner";
import { Button } from "Shared/Components/UI/Button/Button";
import { setDocTitle } from "Shared/Helpers/setDocTitle";
import { Activity, useReducer, useState } from "react";
import { EditForm } from "./Components/EditForm/EditForm";
import { Instruction } from "./Components/Instruction";
import { ParsedTournament } from "./Components/ParsedTournament";
import { useSaveTournament } from "./Hooks/useSaveTournament";
import { initState } from "./Reducer/initState";
import { reducer } from "./Reducer/reducer";
import { useParseTournament } from "./Hooks/useParseTournament";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { useCheckTournament } from "./Hooks/useCheckTournament";
import styles from "./add-tournament-link.module.css";
import { extractApiErrorDetails } from "Shared/Helpers/extractApiErrorDetails";

function AddTournamentLink() {
	setDocTitle("Добавить турнир");

	const [link, setLink] = useState("");
	const [showEditForm, setShowEditForm] = useState(false);

	const [tournament, dispatch] = useReducer(reducer, initState);

	const { isLoadingSave, errorOnSave, isSuccessSave, handleSaveTournament, resetSaveState } =
		useSaveTournament();

	const { isLoadingParse, isSuccessParse, errorOnParse, handleParseLink, resetParseState } =
		useParseTournament();

	const { errorsTournamentSchema, resetErrorsTournamentSchema, checkTournamentSchema } =
		useCheckTournament();

	const isLoading = isLoadingParse || isLoadingSave;
	const apiError = errorOnParse || errorOnSave;

	const onClickSave = async (tournament: TournamentType) => {
		const isValid = checkTournamentSchema(tournament);

		if (!isValid) return;

		const isSuccess = await handleSaveTournament(tournament);

		if (isSuccess) {
			resetParseState();
			resetErrorsTournamentSchema();
		}
	};

	const sendLink = () => {
		if (!link.trim()) return;

		const linkToParse = Number.isInteger(+link) ? `https://gotquestions.online/pack/${link}` : link;

		handleParseLink(dispatch, linkToParse);
		resetErrorsTournamentSchema();
		resetSaveState();
	};

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
					value={link}
					disabled={isLoading}
					onKeyDown={(e) => {
						if (e.key === "Enter") sendLink();
					}}
				/>
				<Button title="Открыть" onClick={sendLink} disabled={isLoading}>
					Открыть{" "}
				</Button>
			</div>

			<div className={styles.errorsSchema}>
				{errorsTournamentSchema.length > 0 &&
					errorsTournamentSchema.map((error) => (
						<p className={styles.errorFilling} key={error.id}>
							{error.message}
						</p>
					))}
			</div>

			{isSuccessSave && (
				<p className={styles.message}>{"Турнир сохранён. Появится в списке после проверки"}</p>
			)}

			{!!apiError && (
				<p className={styles.errorMessage}>{extractApiErrorDetails(apiError).message}</p>
			)}

			{isLoading && <Spinner />}

			<Activity mode={isSuccessParse ? "visible" : "hidden"}>
				<ParsedTournament
					tournament={tournament}
					onClickEdit={() => setShowEditForm(true)}
					onClickSave={onClickSave}
				/>
			</Activity>

			<Activity mode={isSuccessParse ? "hidden" : "visible"}>
				<Instruction />
			</Activity>
		</div>
	);
}

export default AddTournamentLink;
