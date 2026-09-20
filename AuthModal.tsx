-- ==============================================================================
-- 961AI NETWORK | DATABASE MIGRATION SCRIPT
-- Migration: 001_z961_second_brain_tables.sql
-- Description: Creates persistent tables for User Second Brain Workspace, 
--              multi-channel workspace entries (Research, Contacts, Notes, Follow-ups),
--              and WhatsApp z24seven capture webhooks.
-- Compatible with: PostgreSQL 14+, Supabase, Cloud SQL
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. UPDATE USERS TABLE WITH SECOND BRAIN FIELDS
-- Ensure users table exists or alter with required z961 workspace columns
DO $$ 
BEGIN
    -- Check if table exists, if not create base structure
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'founder',
        affiliation VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Add z961_second_brain_id if not present
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'z961_second_brain_id'
    ) THEN
        ALTER TABLE users ADD COLUMN z961_second_brain_id VARCHAR(128);
    END IF;

    -- Add whatsapp_phone if not present
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'whatsapp_phone'
    ) THEN
        ALTER TABLE users ADD COLUMN whatsapp_phone VARCHAR(64);
    END IF;

    -- Add ingested_sources_count if not present
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'ingested_sources_count'
    ) THEN
        ALTER TABLE users ADD COLUMN ingested_sources_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Create index on whatsapp_phone for lightning-fast webhook phone matching
CREATE INDEX IF NOT EXISTS idx_users_whatsapp_phone ON users(whatsapp_phone);
CREATE INDEX IF NOT EXISTS idx_users_second_brain_id ON users(z961_second_brain_id);

-- 3. CREATE Z961 WORKSPACES TABLE
CREATE TABLE IF NOT EXISTS z961_workspaces (
    id VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    starter_assets_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    settings JSONB DEFAULT '{
        "zero_hallucination_mode": true,
        "law_126_safe_harbor": true,
        "auto_audio_overview": true,
        "whatsapp_sync_enabled": true
    }'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_z961_workspaces_user_id ON z961_workspaces(user_id);

-- 4. CREATE WORKSPACE ENTRIES TABLE (MULTI-CHANNEL INGESTION)
-- Categories: 'research', 'contact', 'note', 'followup'
-- Source types: 'web_cta', 'whatsapp', 'file_upload', 'seed', 'web_clipper'
CREATE TABLE IF NOT EXISTS workspace_entries (
    id VARCHAR(128) PRIMARY KEY,
    workspace_id VARCHAR(128) NOT NULL REFERENCES z961_workspaces(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(32) NOT NULL CHECK (category IN ('research', 'contact', 'note', 'followup')),
    source_type VARCHAR(32) NOT NULL CHECK (source_type IN ('web_cta', 'whatsapp', 'file_upload', 'seed', 'web_clipper')),
    title VARCHAR(255) NOT NULL,
    content_payload JSONB NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_grounded_active BOOLEAN DEFAULT TRUE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_workspace_entries_workspace_id ON workspace_entries(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_entries_user_id ON workspace_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_workspace_entries_category ON workspace_entries(category);
CREATE INDEX IF NOT EXISTS idx_workspace_entries_source_type ON workspace_entries(source_type);
CREATE INDEX IF NOT EXISTS idx_workspace_entries_timestamp ON workspace_entries(timestamp DESC);

-- GIN Index for fast JSON search on content_payload
CREATE INDEX IF NOT EXISTS idx_workspace_entries_payload ON workspace_entries USING gin(content_payload);

-- 5. CREATE WHATSAPP WEBHOOK INGEST LOGS TABLE (Z24SEVEN ENGINE)
CREATE TABLE IF NOT EXISTS z24seven_webhook_logs (
    id VARCHAR(128) PRIMARY KEY,
    from_phone VARCHAR(64) NOT NULL,
    matched_user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    matched_workspace_id VARCHAR(128) REFERENCES z961_workspaces(id) ON DELETE SET NULL,
    message_type VARCHAR(32) NOT NULL, -- 'text', 'voice_note', 'contact_card', 'followup'
    raw_payload JSONB NOT NULL,
    extracted_category VARCHAR(32),
    created_entry_id VARCHAR(128) REFERENCES workspace_entries(id) ON DELETE SET NULL,
    status VARCHAR(32) DEFAULT 'processed',
    received_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_z24seven_phone ON z24seven_webhook_logs(from_phone);
CREATE INDEX IF NOT EXISTS idx_z24seven_received_at ON z24seven_webhook_logs(received_at DESC);

-- 6. AUTOMATED TRIGGER: UPDATE INGESTED_SOURCES_COUNT ON USERS
CREATE OR REPLACE FUNCTION update_user_sources_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE users 
        SET ingested_sources_count = ingested_sources_count + 1,
            updated_at = NOW()
        WHERE id = NEW.user_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE users 
        SET ingested_sources_count = GREATEST(0, ingested_sources_count - 1),
            updated_at = NOW()
        WHERE id = OLD.user_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_user_sources_count ON workspace_entries;
CREATE TRIGGER trg_update_user_sources_count
AFTER INSERT OR DELETE ON workspace_entries
FOR EACH ROW EXECUTE FUNCTION update_user_sources_count();

-- 7. COMMENTARY & METADATA
COMMENT ON TABLE z961_workspaces IS 'Dedicated Gemini/NotebookLM Second Brain workspaces auto-provisioned upon user sign-up';
COMMENT ON TABLE workspace_entries IS 'Multi-channel entries captured from Web CTAs, WhatsApp z24seven, File Uploads, and Web Clippers';
COMMENT ON TABLE z24seven_webhook_logs IS 'Real-time audit log of incoming WhatsApp z24seven messages and automated entity routing';
