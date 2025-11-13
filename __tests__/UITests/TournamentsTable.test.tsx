import { TournamentsTable } from "Shared/Components/TournamentsTable/TournamentsTable";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { allshort } from "../__fixtures__/allshort.fixture";
import { renderWithProviders } from "../utils/renderWithProviders";

// let tournaments: TournamentShortType[];
// beforeEach(async () => {
// 	const response = await fetch("https://andvarifserv.ru/tournaments/allshort");

// 	if (!response.ok) {
// 		throw new Error(`Request failed. URL: ${response.url}`);
// 	}

// 	tournaments = await response.json();
// });

describe("Таблица со всеми турнирами", () => {
	test("получает и рендерит турниры", async () => {
		renderWithProviders(<TournamentsTable tournaments={allshort} />);

		const title = await screen.findByText(allshort[0].title);

		expect(title).toBeInTheDocument();
	});

	test("работает поиск по таблице турниров", async () => {
		renderWithProviders(<TournamentsTable tournaments={allshort} />);

		const inputElement = await screen.findByRole("textbox");

		//при вводе одной буквы поиск не происходит
		await userEvent.type(inputElement, "б");
		expect(screen.queryByText("Рождественский Романс")).toBeInTheDocument();
		await userEvent.clear(inputElement);

		//при вводе более одной буквы поиск происходит фильтрации по таблице турниров
		await userEvent.type(inputElement, "балт");
		expect(screen.queryByText("Рождественский Романс")).not.toBeInTheDocument();
		expect(screen.queryByText("Балтийский Бриз. Challenger III")).toBeInTheDocument();

		// при очистке поля поиска все турниры отображаются
		await userEvent.clear(inputElement);
		expect(screen.queryByText("Рождественский Романс")).toBeInTheDocument();
	});

	test("работает сортировка по названию турниров: первое нажатие сортирует по алфавиту, повторное нажатие сортирует обратно", async () => {
		renderWithProviders(<TournamentsTable tournaments={allshort} />);

		let links = await screen.findAllByRole("link");
		const sortIcon = screen.getByRole("button", { name: "НАЗВАНИЕ" });

		//в начале сортировка происходит по дате добавления начиная с самого позднего
		expect(links[0].textContent).toBe("Киты на стене кофейни зимой");

		//при первом нажатии сортировка происходит по названию в алфавитном порядке
		await userEvent.click(sortIcon);
		links = await screen.findAllByRole("link");
		expect(links[0].textContent).toBe("Балтийский Бриз. Challenger III");
		expect(links.at(-1)?.textContent).toBe("Сентябрьский Марш - 2021");

		//при повторном нажатии сортировка происходит по названию в обратном алфавитном порядке
		await userEvent.click(sortIcon);
		links = await screen.findAllByRole("link");
		expect(links[0].textContent).toBe("Сентябрьский Марш - 2021");
		expect(links.at(-1)?.textContent).toBe("Балтийский Бриз. Challenger III");
	});
});
