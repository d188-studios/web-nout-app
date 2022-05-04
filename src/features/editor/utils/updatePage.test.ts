import { Page } from '../types';
import { updatePage } from './updatePage';

test('updateTest', () => {
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

  expect(updatePage('1.1.1', {
    id: 'new id',
    title: 'new title',
    expanded: true,
  } ,pages)).toEqual([
    {
      id: '1',
      title: '1',
      children: [
        {
          id: '1.1',
          title: '1.1',
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
