import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/node';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeAll(() => server.listen());
afterEach(() => {
  console.log('AFTER EACH');
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
