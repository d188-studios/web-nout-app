import { Page } from '../types';
import { PageTree } from './PageTree';

test('PageTree', () => {
  const pageTree = new PageTree();

  const rootPage = pageTree.createPage({
    expanded: false,
  }) as Page;

  expect(rootPage).toEqual<Page>({
    children: [],
    id: expect.any(String),
    title: '',
    expanded: false,
  });

  const childPage = pageTree.createPage({
    expanded: false,
    parent: rootPage.id,
  }) as Page;

  expect(childPage).toEqual<Page>({
    children: [],
    id: expect.any(String),
    title: '',
    expanded: false,
    parent: rootPage.id,
  });

  const grandChildPage = pageTree.createPage({
    expanded: false,
    parent: childPage.id,
  }) as Page;

  pageTree.updatePage({
    id: grandChildPage.id,
    title: 'Grandchild',
    expanded: true,
  });

  expect(pageTree.findPage(grandChildPage.id)).toEqual<Page>({
    children: [],
    id: grandChildPage.id,
    title: 'Grandchild',
    expanded: true,
    parent: childPage.id,
  });

  expect(pageTree.findPageInParent(rootPage.id, childPage.id)).toEqual(childPage);
  expect(pageTree.findPageInParent(rootPage.id, grandChildPage.id)).toEqual(grandChildPage);
  expect(pageTree.findPageInParent(childPage.id, grandChildPage.id)).toEqual(grandChildPage);

  pageTree.deletePage(childPage.id);
  expect(pageTree.findPageInParent(rootPage.id, childPage.id)).toEqual(null);
  expect(pageTree.findPageInParent(rootPage.id, grandChildPage.id)).toEqual(null);
});

test('PageTree multiple roots rename', () => {
  const pageTree = new PageTree();

  const rootPage = pageTree.createPage({
    expanded: false,
  }) as Page;

  const rootPage2 = pageTree.createPage({
    expanded: false,
  }) as Page;

  pageTree.renamePage(rootPage.id, 'Root');

  expect(pageTree.findPage(rootPage.id)).toEqual<Page>({
    children: [],
    id: rootPage.id,
    title: 'Root',
    expanded: false,
  });

  pageTree.renamePage(rootPage2.id, 'Root2');

  expect(pageTree.findPage(rootPage2.id)).toEqual<Page>({
    children: [],
    id: rootPage2.id,
    title: 'Root2',
    expanded: false,
  });

  pageTree.insertPage({
    id: 'r2c1',
    title: 'Root2 Child 1',
    expanded: false,
    parent: rootPage2.id,
  });

  pageTree.insertPage({
    id: 'r2c2',
    title: 'Root2 Child 2',
    expanded: false,
    parent: rootPage2.id,
  });

  pageTree.renamePage('r2c2', 'Root2 Child 2 Renamed');
  expect(pageTree.findPage('r2c2')).toEqual<Page>({
    children: [],
    id: 'r2c2',
    title: 'Root2 Child 2 Renamed',
    expanded: false,
    parent: rootPage2.id,
  });
});
