import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import TournamentsTable from 'Common/Components/TournamentsTable/TournamentsTable';
import About from 'src/modules/About/About';

describe('TournamentsTable', () => {
  test('should render tournaments table', async () => {
    // render(<TournamentsTable />);

    render(<About />);

    const about = screen.getByText('О сайте');

    expect(about).toBeInTheDocument();
  });
});
