import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@actual-app/components/button';
import { Text } from '@actual-app/components/text';
import { theme } from '@actual-app/components/theme';
import { View } from '@actual-app/components/view';

import {
  useCreateCategoryTagMutation,
  useSetCategoryTagsMutation,
} from '#category-tags/mutations';
import {
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalTitle,
} from '#components/common/Modal';
import { Checkbox } from '#components/forms';
import {
  useCategoryTags,
  useCategoryTagsForCategory,
} from '#hooks/useCategoryTags';
import type { Modal as ModalType } from '#modals/modalsSlice';

type CategoryTagsModalProps = Extract<
  ModalType,
  { name: 'category-tags' }
>['options'];

export function CategoryTagsModal({
  categoryId,
  categoryName,
  onClose,
}: CategoryTagsModalProps) {
  const { t } = useTranslation();
  const { data: allTags = [] } = useCategoryTags();
  const { data: categoryTags = [] } = useCategoryTagsForCategory(categoryId);
  const createTagMutation = useCreateCategoryTagMutation();
  const setTagsMutation = useSetCategoryTagsMutation();

  const [newTagName, setNewTagName] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(
    () => new Set(categoryTags.map(tag => tag.id)),
  );

  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  };

  const handleCreateTag = async () => {
    const name = newTagName.trim();
    if (!name) return;
    const created = await createTagMutation.mutateAsync({
      tag: { name },
    });
    if (created?.id) {
      setSelectedTagIds(prev => new Set(prev).add(created.id));
      setNewTagName('');
    }
  };

  const handleSave = async () => {
    await setTagsMutation.mutateAsync({
      categoryId,
      tagIds: Array.from(selectedTagIds),
    });
    onClose?.();
  };

  return (
    <Modal name="category-tags" onClose={onClose}>
      {({ state }) => (
        <>
          <ModalHeader
            title={
              <ModalTitle
                title={t('Tags for {{categoryName}}', { categoryName })}
              />
            }
            rightContent={<ModalCloseButton onPress={() => state.close()} />}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 16,
              gap: 12,
            }}
          >
            <View style={{ gap: 8 }}>
              {allTags.length === 0 ? (
                <Text style={{ color: theme.pageTextSubdued }}>
                  <Trans>
                    No category tags yet. Create one below to start tagging
                    categories.
                  </Trans>
                </Text>
              ) : (
                allTags.map(tag => (
                  <label
                    key={tag.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <Checkbox
                      checked={selectedTagIds.has(tag.id)}
                      onChange={() => toggleTag(tag.id)}
                    />
                    <Text>{tag.name}</Text>
                  </label>
                ))
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                borderTop: `1px solid ${theme.pillBorder}`,
                paddingTop: 12,
              }}
            >
              <input
                type="text"
                value={newTagName}
                onChange={e => setNewTagName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    void handleCreateTag();
                  }
                }}
                placeholder={t('New tag name')}
                style={{ flex: 1 }}
              />
              <Button
                variant="primary"
                onPress={() => void handleCreateTag()}
                isDisabled={!newTagName.trim()}
              >
                <Trans>Create</Trans>
              </Button>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 8,
                paddingTop: 8,
              }}
            >
              <Button onPress={() => state.close()}>
                <Trans>Cancel</Trans>
              </Button>
              <Button variant="primary" onPress={() => void handleSave()}>
                <Trans>Save</Trans>
              </Button>
            </View>
          </View>
        </>
      )}
    </Modal>
  );
}
