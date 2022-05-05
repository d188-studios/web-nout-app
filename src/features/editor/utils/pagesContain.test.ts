import { Page } from '../types';
import { pagesContain } from './pagesContain';

test('pagesContain', () => {
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

  expect(pagesContain('1', pages)).toBe(true);
  expect(pagesContain('1.1', pages)).toBe(true);
  expect(pagesContain('1.1', pages[0].children)).toBe(true);
  expect(pagesContain('2', pages[0].children)).toBe(false);
  expect(pagesContain('2.2', pages[0].children)).toBe(false);
});
