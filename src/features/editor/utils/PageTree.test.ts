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
