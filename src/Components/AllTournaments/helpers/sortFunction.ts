import { TournamentShortType } from '../../../Types/tournament';

type FieldName = keyof Omit<TournamentShortType, 'id'>;

const sortFunction = (arr: TournamentShortType[], fieldName: FieldName) => {
  return [
    ...arr.sort(function (a, b) {
      if (a[fieldName] > b[fieldName]) {
        return 1;
      } else if (a[fieldName] < b[fieldName]) {
        return -1;
      } else return 0;
    }),
  ];
};

export default sortFunction;
