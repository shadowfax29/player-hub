-- Add selfie_url column to profiles table
-- Run this in Supabase SQL Editor if you already ran 001_initial_schema.sql

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS selfie_url TEXT;
