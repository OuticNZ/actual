import { useTranslation } from 'react-i18next';

import { send } from '@actual-app/core/platform/client/connection';
import type { CategoryTagEntity } from '@actual-app/core/types/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { QueryClient, QueryKey } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { addNotification } from '#notifications/notificationsSlice';
import { useDispatch } from '#redux';
import type { AppDispatch } from '#redux/store';

import { categoryTagQueries } from './queries';

function invalidateQueries(queryClient: QueryClient, queryKey?: QueryKey) {
  void queryClient.invalidateQueries({
    queryKey: queryKey ?? categoryTagQueries.all(),
  });
}

function dispatchErrorNotification(
  dispatch: AppDispatch,
  message: string,
  error?: Error,
) {
  dispatch(
    addNotification({
      notification: {
        id: uuidv4(),
        type: 'error',
        message,
        pre: error ? error.message : undefined,
      },
    }),
  );
}

type CreateCategoryTagPayload = {
  tag: Omit<CategoryTagEntity, 'id'>;
};

export function useCreateCategoryTagMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ tag }: CreateCategoryTagPayload) => {
      return await send('category-tags/create', tag);
    },
    onSuccess: () => invalidateQueries(queryClient),
    onError: error => {
      console.error('Error creating category tag:', error);
      dispatchErrorNotification(
        dispatch,
        t('There was an error creating the category tag. Please try again.'),
        error,
      );
    },
  });
}

type UpdateCategoryTagPayload = {
  tag: CategoryTagEntity;
};

export function useUpdateCategoryTagMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ tag }: UpdateCategoryTagPayload) => {
      return await send('category-tags/update', tag);
    },
    onSuccess: () => invalidateQueries(queryClient),
    onError: error => {
      console.error('Error updating category tag:', error);
      dispatchErrorNotification(
        dispatch,
        t('There was an error updating the category tag. Please try again.'),
        error,
      );
    },
  });
}

type DeleteCategoryTagPayload = {
  id: CategoryTagEntity['id'];
};

export function useDeleteCategoryTagMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ id }: DeleteCategoryTagPayload) => {
      return await send('category-tags/delete', { id });
    },
    onSuccess: () => invalidateQueries(queryClient),
    onError: error => {
      console.error('Error deleting category tag:', error);
      dispatchErrorNotification(
        dispatch,
        t('There was an error deleting the category tag. Please try again.'),
        error,
      );
    },
  });
}

type SetCategoryTagsPayload = {
  categoryId: string;
  tagIds: string[];
};

export function useSetCategoryTagsMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ categoryId, tagIds }: SetCategoryTagsPayload) => {
      return await send('category-tags/set-category-tags', {
        categoryId,
        tagIds,
      });
    },
    onSuccess: () => invalidateQueries(queryClient),
    onError: error => {
      console.error('Error setting category tags:', error);
      dispatchErrorNotification(
        dispatch,
        t('There was an error setting the category tags. Please try again.'),
        error,
      );
    },
  });
}
