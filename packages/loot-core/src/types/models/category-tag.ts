import type { CategoryEntity } from './category';

export type CategoryTagEntity = {
  id: string;
  name: string;
  color?: string | null;
  description?: string | null;
  tombstone?: boolean;
};

export type CategoryTagMappingEntity = {
  id: string;
  categoryId: CategoryEntity['id'];
  tagId: CategoryTagEntity['id'];
  tombstone?: boolean;
};
