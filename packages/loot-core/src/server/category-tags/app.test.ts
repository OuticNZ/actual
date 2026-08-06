import { beforeEach, describe, expect, it } from 'vitest';

import { runHandler } from '#server/mutators';
import type { CategoryTagEntity } from '#types/models';

import { app } from './app';

const handlers = app.handlers;

async function createCategoryTag(name: string): Promise<CategoryTagEntity> {
  return (await runHandler(handlers['category-tags/create'], {
    name,
  })) as CategoryTagEntity;
}

describe('category-tags', () => {
  beforeEach(global.emptyDatabase());

  it('creates a category tag', async () => {
    const tag = await createCategoryTag('Essential');
    expect(tag.id).toBeDefined();
    expect(tag.name).toBe('Essential');
  });

  it('gets all category tags', async () => {
    await createCategoryTag('Essential');
    await createCategoryTag('Discretionary');

    const tags = (await runHandler(
      handlers['category-tags/get'],
      undefined,
    )) as CategoryTagEntity[];
    expect(tags).toHaveLength(2);
    expect(tags.map(t => t.name)).toEqual(['Discretionary', 'Essential']);
  });

  it('updates a category tag', async () => {
    const tag = await createCategoryTag('Essential');
    await runHandler(handlers['category-tags/update'], {
      id: tag.id,
      name: 'Priority',
    });

    const tags = (await runHandler(
      handlers['category-tags/get'],
      undefined,
    )) as CategoryTagEntity[];
    expect(tags[0].name).toBe('Priority');
  });

  it('deletes a category tag', async () => {
    const tag = await createCategoryTag('Essential');
    await runHandler(handlers['category-tags/delete'], { id: tag.id });

    const tags = (await runHandler(
      handlers['category-tags/get'],
      undefined,
    )) as CategoryTagEntity[];
    expect(tags).toHaveLength(0);
  });

  it('sets category tags for a category', async () => {
    const tag1 = await createCategoryTag('Essential');
    const tag2 = await createCategoryTag('Discretionary');

    await runHandler(handlers['category-tags/set-category-tags'], {
      categoryId: 'category-1',
      tagIds: [tag1.id, tag2.id],
    });

    const tags = (await runHandler(
      handlers['category-tags/get-category-tags'],
      'category-1',
    )) as CategoryTagEntity[];
    expect(tags).toHaveLength(2);
  });

  it('removes category tags when set to empty', async () => {
    const tag1 = await createCategoryTag('Essential');

    await runHandler(handlers['category-tags/set-category-tags'], {
      categoryId: 'category-1',
      tagIds: [tag1.id],
    });

    await runHandler(handlers['category-tags/set-category-tags'], {
      categoryId: 'category-1',
      tagIds: [],
    });

    const tags = (await runHandler(
      handlers['category-tags/get-category-tags'],
      'category-1',
    )) as CategoryTagEntity[];
    expect(tags).toHaveLength(0);
  });
});
