import type { CategoryTagEntity } from '@actual-app/core/types/models';
import { useQuery } from '@tanstack/react-query';

import { categoryTagQueries } from '#category-tags/queries';

export function useCategoryTags() {
  return useQuery({
    ...categoryTagQueries.list(),
  });
}

export function useCategoryTagsForCategory(categoryId: string) {
  return useQuery({
    ...categoryTagQueries.detail(categoryId),
    enabled: Boolean(categoryId),
  });
}

export function useCategoryTag(tagId: string) {
  const { data: tags } = useCategoryTags();
  return tags?.find(tag => tag.id === tagId) as CategoryTagEntity | undefined;
}
