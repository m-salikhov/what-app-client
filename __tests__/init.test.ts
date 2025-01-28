import { baseUrl, serverRoutes } from 'Common/Constants/constants';
import { TournamentShortType } from 'Common/Types/tournament';
import { expect, test } from 'vitest';

test('server', async () => {
  const response = await fetch(baseUrl + serverRoutes.tournamentsAllShort);
  const ts: TournamentShortType[] = await response.json();
  expect(ts[0].title).toBe('Простой Смоленск – 2');
});
