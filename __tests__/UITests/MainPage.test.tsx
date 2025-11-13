import { Main } from "src/Pages/Main/Main";
import { renderWithProviders } from "../utils/renderWithProviders";
import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { lastTournamentsFirstCall } from "../__fixtures__/lastTournaments.fixture";
import { statsFixture } from "../__fixtures__/stats.fixture";

describe("Главная страница", () => {
	test("рендерит главную страницу", async () => {
		renderWithProviders(<Main />);

		//получил и отрендерил список последних турниров
		const lastTournament = await screen.findByText(lastTournamentsFirstCall.tournaments[0].title);

		//получил и отрендерил статистику по кол-ву турниров и вопросов
		const amountTournaments = await screen.findByText(statsFixture.tc);
		const amountQuestions = await screen.findByText(statsFixture.qc);

		expect(lastTournament).toBeInTheDocument();
		expect(amountTournaments).toBeInTheDocument();
		expect(amountQuestions).toBeInTheDocument();
	});
});
