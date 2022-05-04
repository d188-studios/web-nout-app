import { Page } from '../types';
import { getPagePath } from './getPagePath';

test('getPagePath', () => {
  const pages: Page[] = [
    {
      id: '1',
      title: '1',
      children: [
        {
          id: '1.1',
          title: '1.1',
          children: [
            {
              id: '1.1.1',
              title: '1.1.1',
              children: [],
            },
            {
              id: '1.1.2',
              title: '1.1.2',
              children: [],
            },
          ],
        },
        {
          id: '1.2',
          title: '1.2',
          children: [],
        }
      ],
    },
    {
      id: '2',
      title: '2',
      children: [
        {
          id: '2.1',
          title: '2.1',
          children: [],
        },
        {
          id: '2.2',
          title: '2.2',
          children: [],
        }
      ],
    },
  ];

  expect(getPagePath('1', pages)).toEqual([0]);
  expect(getPagePath('1.1', pages)).toEqual([0, 0]);
  expect(getPagePath('1.2', pages)).toEqual([0, 1]);
  expect(getPagePath('1.1.1', pages)).toEqual([0, 0, 0]);
  expect(getPagePath('1.1.2', pages)).toEqual([0, 0, 1]);
  expect(getPagePath('2', pages)).toEqual([1]);
  expect(getPagePath('2.1', pages)).toEqual([1, 0]);
  expect(getPagePath('2.2', pages)).toEqual([1, 1]);
  expect(getPagePath('3', pages)).toEqual([]);
});
