import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import TournamentsTable from 'Common/Components/TournamentsTable/TournamentsTable';
import { renderWithProviders } from '../utils/renderWithProviders';
import userEvent from '@testing-library/user-event';
import { allshort } from '../__fixtures__/allshort';

describe('TournamentsTable', () => {
  test('получает и рендерит турниры', async () => {
    renderWithProviders(<TournamentsTable />);

    const title = await screen.findByText(allshort[0].title);

    expect(title).toBeInTheDocument();
  });

  test('работает поиск по таблице турниров', async () => {
    renderWithProviders(<TournamentsTable />);

    const inputElement = await screen.findByRole('textbox');

    //при вводе одной буквы поиск не происходит
    await userEvent.type(inputElement, 'б');
    expect(screen.queryByText('Рождественский Романс')).toBeInTheDocument();
    await userEvent.clear(inputElement);

    //при вводе более одной буквы поиск происходит фильтрации по таблице турниров
    await userEvent.type(inputElement, 'балт');
    expect(screen.queryByText('Рождественский Романс')).not.toBeInTheDocument();
    expect(screen.queryByText('Балтийский Бриз. Challenger III')).toBeInTheDocument();

    // при очистке поля поиска все турниры отображаются
    await userEvent.clear(inputElement);
    expect(screen.queryByText('Рождественский Романс')).toBeInTheDocument();
  });

  test('работает сортировка по названию турниров: первое нажатие сортирует по алфавиту, повторное нажатие сортирует обратно', async () => {
    renderWithProviders(<TournamentsTable />);

    let links = await screen.findAllByRole('link');
    const sortIcon = screen.getByAltText('сортировать по названию');

    //в начале сортировка происходит по дате добавления начиная с самого позднего
    expect(links[0].textContent).toBe('Киты на стене кофейни зимой');

    //при первом нажатии сортировка происходит по названию в алфавитном порядке
    await userEvent.click(sortIcon);
    links = await screen.findAllByRole('link');
    expect(links[0].textContent).toBe('Балтийский Бриз. Challenger III');
    expect(links[links.length - 1].textContent).toBe('Сентябрьский Марш - 2021');

    //при повторном нажатии сортировка происходит по названию в обратном алфавитном порядке
    await userEvent.click(sortIcon);
    links = await screen.findAllByRole('link');
    expect(links[0].textContent).toBe('Сентябрьский Марш - 2021');
    expect(links[links.length - 1].textContent).toBe('Балтийский Бриз. Challenger III');
  });
});
