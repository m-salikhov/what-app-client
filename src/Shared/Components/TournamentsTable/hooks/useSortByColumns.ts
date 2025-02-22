import { useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';
import { z } from 'zod';

const fieldNameSchema = z.enum([
  'title',
  'date',
  'tours',
  'questionsQuantity',
  'uploader',
  'dateUpload',
  'uploaderUuid',
  'link',
]);

type FieldName = z.infer<typeof fieldNameSchema>;

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
      return a[fieldName] < b[fieldName] ? 1 : -1;
    }),
  ];
};

export function useSortByColumns(setTournaments: Dispatch<SetStateAction<TournamentShortType[]>>) {
  const [filterField, setFilterField] = useState<FieldName>('dateUpload');

  function handleSort(e: MouseEvent<HTMLDivElement>) {
    try {
      const filter = fieldNameSchema.parse(e.currentTarget.id);
      if (filterField === filter) {
        setTournaments((prev) => [...prev.reverse()]);
      } else {
        setTournaments((prev) => sortFunction(prev, filter));
        setFilterField(filter);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { handleSort };
}
