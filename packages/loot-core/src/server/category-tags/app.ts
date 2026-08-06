import { createApp } from '#server/app';
import * as db from '#server/db';
import { mutator } from '#server/mutators';
import { batchMessages } from '#server/sync';
import { undoable } from '#server/undo';
import type { CategoryTagEntity } from '#types/models';

export type CategoryTagsHandlers = {
  'category-tags/get': typeof getCategoryTags;
  'category-tags/create': typeof createCategoryTag;
  'category-tags/update': typeof updateCategoryTag;
  'category-tags/delete': typeof deleteCategoryTag;
  'category-tags/set-category-tags': typeof setCategoryTags;
  'category-tags/get-category-tags': typeof getTagsForCategory;
};

export const app = createApp<CategoryTagsHandlers>();
app.method('category-tags/get', getCategoryTags);
app.method('category-tags/create', mutator(undoable(createCategoryTag)));
app.method('category-tags/update', mutator(undoable(updateCategoryTag)));
app.method('category-tags/delete', mutator(undoable(deleteCategoryTag)));
app.method(
  'category-tags/set-category-tags',
  mutator(undoable(setCategoryTags)),
);
app.method('category-tags/get-category-tags', getTagsForCategory);

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

function toEntity(tag: db.DbCategoryTag): CategoryTagEntity {
  const { tombstone: _tombstone, ...rest } = tag;
  return {
    ...rest,
    tombstone: Boolean(tag.tombstone),
  };
}

async function getCategoryTags(): Promise<CategoryTagEntity[]> {
  const tags = await db.getCategoryTags();
  const entities = tags.map(toEntity);
  entities.sort((a, b) => collator.compare(a.name, b.name));
  return entities;
}

async function createCategoryTag({
  name,
  color = null,
  description = null,
}: Omit<CategoryTagEntity, 'id'>): Promise<CategoryTagEntity> {
  const allTags = await db.getAllCategoryTags();

  const { id: tagId = null } = allTags.find(t => t.name === name) || {};
  if (tagId) {
    await db.updateCategoryTag({
      id: tagId,
      name,
      color,
      description,
      tombstone: 0,
    });
    return { id: tagId, name, color, description };
  }

  const id = await db.insertCategoryTag({
    name: name.trim(),
    color: color ? color.trim() : null,
    description,
  });

  return { id, name, color, description };
}

async function updateCategoryTag(
  tag: Partial<CategoryTagEntity> & Pick<CategoryTagEntity, 'id'>,
): Promise<Partial<CategoryTagEntity>> {
  const { tombstone, ...rest } = tag;
  await db.updateCategoryTag({
    ...rest,
    ...(tombstone !== undefined ? { tombstone: tombstone ? 1 : 0 } : {}),
  });
  return tag;
}

async function deleteCategoryTag(
  tag: Pick<CategoryTagEntity, 'id'>,
): Promise<CategoryTagEntity['id']> {
  await db.deleteCategoryTag(tag);
  return tag.id;
}

async function setCategoryTags({
  categoryId,
  tagIds,
}: {
  categoryId: string;
  tagIds: string[];
}): Promise<void> {
  await batchMessages(async () => {
    // Get existing mappings for this category
    const existingMappings = await db.getCategoryTagMappings();
    const categoryMappings = existingMappings.filter(
      m => m.category_id === categoryId,
    );

    // Delete mappings that are no longer selected
    for (const mapping of categoryMappings) {
      if (!tagIds.includes(mapping.tag_id)) {
        await db.deleteCategoryTagMapping({ id: mapping.id });
      }
    }

    // Add new mappings
    const existingTagIds = new Set(categoryMappings.map(m => m.tag_id));
    for (const tagId of tagIds) {
      if (!existingTagIds.has(tagId)) {
        await db.insertCategoryTagMapping({
          category_id: categoryId,
          tag_id: tagId,
        });
      }
    }
  });
}

async function getTagsForCategory(
  categoryId: string,
): Promise<CategoryTagEntity[]> {
  const tags = await db.getTagsForCategory(categoryId);
  const entities = tags.map(toEntity);
  entities.sort((a, b) => collator.compare(a.name, b.name));
  return entities;
}
