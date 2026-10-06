-- Migration 0001: Init prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]', -- JSON array of strings
  models TEXT NOT NULL DEFAULT '[]', -- JSON array of strings
  is_favorite INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_prompts_favorite ON prompts (is_favorite);
CREATE INDEX IF NOT EXISTS idx_prompts_category ON prompts (category);
CREATE INDEX IF NOT EXISTS idx_prompts_updated ON prompts (updated_at);
