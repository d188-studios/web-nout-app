import { Page } from '../types';
import { addChildrenToPage } from './addChildrenToPage';

test('addChildrenToPage', () => {
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

  expect(
    addChildrenToPage(
      '1.1.1',
      {
        id: 'new id',
        title: 'new title',
        expanded: true,
        children: [],
      },
      pages
    )
  ).toEqual([
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
              expanded: true,
              children: [
                {
                  id: 'new id',
                  title: 'new title',
                  expanded: true,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  expect(
    addChildrenToPage(
      null,
      {
        id: 'new id',
        title: 'new title',
        expanded: true,
        children: [],
      },
      pages
    )
  ).toEqual([
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
    {
      id: 'new id',
      title: 'new title',
      expanded: true,
      children: [],
    }
  ]);

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
