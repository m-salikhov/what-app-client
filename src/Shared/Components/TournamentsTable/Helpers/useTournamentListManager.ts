import { useState, MouseEvent, ChangeEvent } from 'react';
import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';
import { z } from 'zod';

const sortFieldSchema = z.enum(['title', 'date', 'tours', 'difficulty', 'questionsQuantity', 'uploader', 'dateUpload']);
type SortFieldType = z.infer<typeof sortFieldSchema>;

export function useTournamentListManager(tournaments: TournamentShortType[]) {
  const [filterString, setFilterString] = useState('');
  const [sortedTournaments, setSortedTournaments] = useState(tournaments);
  const [sortField, setSortField] = useState<SortFieldType>('dateUpload');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  function sortTournaments(e: MouseEvent<HTMLDivElement | SVGElement>) {
    const field = sortFieldSchema.parse(e.currentTarget.dataset.field);

    setSortField(field);

    if (field === 'uploader' || field === 'title') {
      setSortedTournaments((prev) =>
        [...prev].sort((a, b) =>
          sortDirection === 'asc' ? b[field].localeCompare(a[field]) : a[field].localeCompare(b[field])
        )
      );
    } else {
      setSortedTournaments((prev) =>
        [...prev].sort((a, b) => (sortDirection === 'asc' ? b[field] - a[field] : a[field] - b[field]))
      );
    }

    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  }

  const handleChangeFilterString = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterString(event.target.value);
  };

  const tournamentsList =
    filterString.length > 1
      ? sortedTournaments.filter((t) => t.title.toLowerCase().includes(filterString.toLowerCase()))
      : sortedTournaments;

  return { tournamentsList, handleChangeFilterString, filterString, sortTournaments, sortField, sortDirection };
}
