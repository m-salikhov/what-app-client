import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import TournamentsTable from 'Common/Components/TournamentsTable/TournamentsTable';
import { renderWithProviders } from '../utils/renderWithProviders';

describe('TournamentsTable', () => {
  test('should render tournaments table', async () => {
    renderWithProviders(<TournamentsTable />);

    const search = await screen.findByText('Простой Смоленск – 2');

    expect(search).toBeInTheDocument();
  });
});
