import { Button } from "Shared/Components/UI/Button/Button";
import { Modal } from "Shared/Components/UI/Modal/Modal";
import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import { currentLetterNumberSelector } from "Store/Selectors/WordleSelectors";
import { wordleActions } from "Store/Slices/WordleSlice";
import { useGetRandomWordQuery } from "Store/ToolkitAPIs/wordleAPI";
import { GrAchievement } from "react-icons/gr";
import { TfiLock } from "react-icons/tfi";

export function GameEndModal({ result }: { result: string }) {
	const currentLetterNumber = useAppSelector(currentLetterNumberSelector);
	const { data: answer = { word: "" }, refetch } = useGetRandomWordQuery(undefined);

	const dispatch = useAppDispatch();

	const attempts = currentLetterNumber / 5;

	function onClose() {
		dispatch(wordleActions.resetState());
		refetch();
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
		if (event.key === "Enter") {
			onClose();
		}
	};

	return (
		<Modal active={Boolean(result)} onClose={onClose} onKeyDown={handleKeyDown}>
			{" "}
			<div className="wordle-result-wrapper">
				<div className="wordle-result-icon">
					{result === "win" && <GrAchievement size={"100px"} color="#FFC300" />}
					{result === "lose" && <TfiLock size={"100px"} color="#FFC300" />}
				</div>

				{result === "win" && (
					<p className="wordle-result-text">
						Вы отгадали слово <span>{answer.word}</span> <br /> {attempts === 2 ? "со" : "с"}{" "}
						{attempts}-{attempts === 3 ? "ей" : "ой"} попытки!
					</p>
				)}
				{result === "lose" && (
					<p className="wordle-result-text">
						Увы! Вам не удалось отгадать <br /> слово <span>{answer.word}</span>
					</p>
				)}

				<Button onClick={onClose} title="Новое слово" onKeyDown={() => console.log("enter")} />
			</div>
		</Modal>
	);
}
