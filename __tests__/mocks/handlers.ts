import { http, HttpResponse } from 'msw';
import { baseUrl, serverRoutes } from 'Shared/Constants/constants';
import { allshort } from '../__fixtures__/allshort';

export const handlers = [
  http.get('https://example.com/user', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),

  http.get(baseUrl + '/' + serverRoutes.tournamentsAllShort, () => {
    return HttpResponse.json(allshort);
  }),
];
