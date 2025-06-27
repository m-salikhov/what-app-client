import { useState, MouseEvent } from 'react';
import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';
import { z } from 'zod';

const fieldNameSchema = z.enum(['title', 'date', 'tours', 'questionsQuantity', 'uploader', 'dateUpload']);

export function useTournamentListManager(tournaments: TournamentShortType[]) {
  const [filterString, setFilterString] = useState('');
  const [sortedTournaments, setSortedTournaments] = useState([...tournaments]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  function sortTournaments(e: MouseEvent<HTMLDivElement | SVGElement>) {
    const filter = fieldNameSchema.parse(e.currentTarget.id);

    if (filter === 'uploader' || filter === 'title') {
      setSortedTournaments((prev) =>
        [...prev].sort((a, b) =>
          sortDirection === 'asc' ? b[filter].localeCompare(a[filter]) : a[filter].localeCompare(b[filter])
        )
      );
    } else {
      setSortedTournaments((prev) =>
        [...prev].sort((a, b) => (sortDirection === 'asc' ? b[filter] - a[filter] : a[filter] - b[filter]))
      );
    }

    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  }

  const handleChangeFilterString = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(event.target.value);
  };

  const tournamentsList =
    filterString.length > 1
      ? sortedTournaments.filter((t) => t.title.toLowerCase().includes(filterString.toLowerCase()))
      : sortedTournaments;

  return { tournamentsList, handleChangeFilterString, filterString, sortTournaments };
}
