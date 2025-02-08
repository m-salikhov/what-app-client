import { TournamentShortType } from 'Common/Types/tournament';
import { useEffect, useState, MouseEvent } from 'react';
import { useGetTournamentsShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';

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

export function useTournamentsTableFilter() {
  const [tournamentsShorts, setTournamentsShorts] = useState<TournamentShortType[]>([]);
  const [filterField, setFilterField] = useState<FieldName | null>(null);

  const { data, isSuccess, error, isLoading } = useGetTournamentsShortQuery(undefined);

  function handleSort(e: MouseEvent<HTMLDivElement>) {
    const filter = e.currentTarget.id as FieldName;
    if (filterField === filter) {
      setTournamentsShorts((prev) => [...prev.reverse()]);
    } else {
      setTournamentsShorts((prev) => sortFunction(prev, filter));
      setFilterField(filter);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setTournamentsShorts(structuredClone(data).reverse());
    }
  }, [isSuccess]);

  return { tournamentsShorts, handleSort, error, isLoading };
}
