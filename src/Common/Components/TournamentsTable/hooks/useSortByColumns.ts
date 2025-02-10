import { TournamentShortType } from 'Common/Types/tournament';
import { useState, MouseEvent, Dispatch, SetStateAction } from 'react';

type FieldName = keyof Omit<TournamentShortType, 'id'>;

const sortFunction = (arr: TournamentShortType[], fieldName: FieldName) => {
  if (fieldName === 'uploader' || fieldName === 'title') {
    return [
      ...arr.sort(function (a, b) {
        return a[fieldName].toLowerCase() > b[fieldName].toLowerCase() ? 1 : -1;
      }),
    ];
  }

  return [
    ...arr.sort(function (a, b) {
      return a[fieldName] > b[fieldName] ? 1 : -1;
    }),
  ];
};

export function useSortByColumns(setTournaments: Dispatch<SetStateAction<TournamentShortType[]>>) {
  const [filterField, setFilterField] = useState<FieldName | null>(null);

  function handleSort(e: MouseEvent<HTMLDivElement>) {
    const filter = e.currentTarget.id as FieldName;
    if (filterField === filter) {
      setTournaments((prev) => [...prev.reverse()]);
    } else {
      setTournaments((prev) => sortFunction(prev, filter));
      setFilterField(filter);
    }
  }

  return { handleSort };
}
