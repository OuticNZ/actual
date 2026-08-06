BEGIN TRANSACTION;

-- Category tags: virtual groupings applied to categories (e.g. Essential,
-- Priority, Discretionary). They provide alternative views of the same
-- categories without aggregating spending/budget together.
-- Note: columns are intentionally nullable (no NOT NULL) and carry no foreign
-- key constraints to match the sync system, which applies database writes one
-- column at a time (mirroring the existing category_mapping/payee_mapping).
CREATE TABLE category_tags(
  id TEXT PRIMARY KEY,
  name TEXT,
  color TEXT,
  description TEXT,
  tombstone INTEGER DEFAULT 0
);

-- Many-to-many mapping between categories and category tags.
CREATE TABLE category_tag_mapping(
  id TEXT PRIMARY KEY,
  category_id TEXT,
  tag_id TEXT,
  tombstone INTEGER DEFAULT 0
);

CREATE INDEX idx_category_tag_mapping_category ON category_tag_mapping(category_id);
CREATE INDEX idx_category_tag_mapping_tag ON category_tag_mapping(tag_id);

COMMIT