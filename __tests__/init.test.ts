import { baseUrl, serverRoutes } from 'Shared/Constants/constants';
import { expect, test } from 'vitest';
import { allshort } from './__fixtures__/allshort';
import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';

test('server', async () => {
  const response = await fetch(baseUrl + '/' + serverRoutes.tournamentsAllShort);
  const ts: TournamentShortType[] = await response.json();
  expect(ts[0].title).toBe(allshort[0].title);
});
