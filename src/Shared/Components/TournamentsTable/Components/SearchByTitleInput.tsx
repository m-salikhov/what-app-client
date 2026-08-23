import { useRef, useState, type KeyboardEvent } from "react";
import styles from "../tournaments-table.module.css";
import { BsSearch as Search } from "react-icons/bs";
import { RiCloseLargeFill as Clear } from "react-icons/ri";
import { RandomTournament } from "Shared/Components/RandomTournament/RandomTournament";

interface Props {
	handleSearch: (value: string) => void;
}
export default function SearchByTitleInput({ handleSearch }: Props) {
	const [inputText, setInputText] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	function handleInputClear() {
		if (inputText.length > 0) {
			setInputText("");
			handleSearch("");
		}
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}

	function inputOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			handleSearch(inputText);
		}

		if (e.key === "Escape") {
			handleInputClear();
		}
	}

	return (
		<div className={styles.header}>
			<div className={styles.searchContainer}>
				<label className={styles.searchLabel}>
					<input
						type="text"
						name="tournaments-search"
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						onKeyDown={inputOnKeyDown}
						placeholder="поиск по названию"
						autoComplete="off"
						ref={inputRef}
					/>
				</label>
				<button
					className={styles.searchClear}
					type="button"
					title="очистить поиск"
					onClick={handleInputClear}
				>
					<Clear size="20" />
				</button>
				<button
					className={styles.searchIcon}
					type="button"
					title="поиск"
					onClick={() => handleSearch(inputText)}
				>
					<Search size="28" color="var(--h-color)" />
				</button>
			</div>

			<RandomTournament size="40" />
		</div>
	);
}
