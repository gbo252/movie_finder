import unogs from './unogs';

test('search() recently added', async () => {
  unogs.getMovies = jest.fn(() =>
    Promise.resolve({ data: { ITEMS: [1, 2, 3] } })
  );
  const res = await unogs.search(123);
  expect(unogs.getMovies).toHaveBeenCalledTimes(1);
  expect(res).toEqual([1, 2, 3]);
});

test('search() genre with 2 pages of results', async () => {
  unogs.getMovies = jest.fn(() =>
    Promise.resolve({ data: { COUNT: 120, ITEMS: [1, 2, 3] } })
  );
  const res = await unogs.search(123, 1000);
  expect(unogs.getMovies).toHaveBeenCalledTimes(2);
  expect(res).toEqual([1, 2, 3, 1, 2, 3]);
});
