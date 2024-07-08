import { TournamentShortType } from '../../../Types/tournament';

type FieldName = keyof Omit<TournamentShortType, 'id'>;

const sortFunction = (arr: TournamentShortType[], fieldName: FieldName) => {
  return [
    ...arr.sort(function (a, b) {
      if (a[fieldName] > b[fieldName]) {
        return 1;
      }
      if (a[fieldName] < b[fieldName]) {
        return -1;
      }
      return 0;
    }),
  ];
};

export default sortFunction;
