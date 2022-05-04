import { Page } from '../types';
import { deletePage } from './deletePage';

test('deletePage', () => {
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
          ],
        },
      ],
    },
  ];

  expect(deletePage('1.1.1', pages)).toEqual([
    {
      id: '1',
      title: '1',
      children: [
        {
          id: '1.1',
          title: '1.1',
          children: [],
        },
      ],
    },
  ]);

  expect(deletePage('1.1', pages)).toEqual([
    {
      id: '1',
      title: '1',
      children: [],
    },
  ]);

  expect(deletePage('1', pages)).toEqual([]);

  expect(pages).toEqual([
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
          ],
        },
      ],
    },
  ]);
});
