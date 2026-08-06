import { send } from '@actual-app/core/platform/client/connection';
import type { CategoryTagEntity } from '@actual-app/core/types/models';
import { queryOptions } from '@tanstack/react-query';

export const categoryTagQueries = {
  all: () => ['category-tags'],
  lists: () => [...categoryTagQueries.all(), 'lists'],
  list: () =>
    queryOptions<CategoryTagEntity[]>({
      queryKey: [...categoryTagQueries.lists()],
      queryFn: () => send('category-tags/get'),
      placeholderData: [],
      // Manually invalidated when tags change
      staleTime: Infinity,
    }),
  detail: (categoryId: string) =>
    queryOptions<CategoryTagEntity[]>({
      queryKey: [...categoryTagQueries.all(), 'category', categoryId],
      queryFn: () => send('category-tags/get-category-tags', categoryId),
      placeholderData: [],
      staleTime: Infinity,
    }),
};
