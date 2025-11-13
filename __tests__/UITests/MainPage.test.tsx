import { Main } from "src/Pages/Main/Main";
import { renderWithProviders } from "../utils/renderWithProviders";
import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { lastTournamentsFirstCall } from "../__fixtures__/lastTournaments.fixture";
import { statsFixture } from "../__fixtures__/stats.fixture";
import userEvent from "@testing-library/user-event";
import { questions } from "../__fixtures__/questions.fixture";

describe("Главная страница", () => {
	test("рендерит главную страницу", async () => {
		renderWithProviders(<Main />);

		//получил и отрендерил список последних турниров
		for (const tournament of lastTournamentsFirstCall.tournaments) {
			await screen.findByText(tournament.title);
		}

		//получил и отрендерил статистику по кол-ву турниров и вопросов
		await screen.findByText(statsFixture.tc);
		await screen.findByText(statsFixture.qc);

		//Получил и отрендерил 4 случайных вопроса
		const randomQuestionsFirstCall = questions.slice(0, 4);
		for (const question of randomQuestionsFirstCall) {
			await screen.findByText(question.text);

			if (question.tournament) await screen.findByText(question.tournament.title);
		}

		//TODO: в отдельный тест
		const rightArrow = screen.getByTitle("lastTournamentsNext");
		expect(rightArrow).toBeInTheDocument();
		await userEvent.click(rightArrow);
	});
});
