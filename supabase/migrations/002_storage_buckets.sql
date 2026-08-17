-- Storage Buckets for PlayConsole
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Create government-ids bucket for user ID uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'government-ids',
  'government-ids',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Create listing-photos bucket for listing image uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'listing-photos',
  'listing-photos',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage RLS policies

-- Government IDs: anyone can read, authenticated users can upload to their own folder
CREATE POLICY "govt_ids_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'government-ids');

CREATE POLICY "govt_ids_insert_auth"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'government-ids'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "govt_ids_update_own"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'government-ids'
    AND auth.uid()::text = (string_to_array(name, '/'))[1]
  );

CREATE POLICY "govt_ids_delete_own"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'government-ids'
    AND auth.uid()::text = (string_to_array(name, '/'))[1]
  );

-- Listing photos: public read, authenticated users can upload
CREATE POLICY "listing_photos_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listing-photos');

CREATE POLICY "listing_photos_insert_auth"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'listing-photos'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "listing_photos_update_own"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'listing-photos'
    AND auth.uid()::text = (string_to_array(name, '/'))[1]
  );

CREATE POLICY "listing_photos_delete_own"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'listing-photos'
    AND auth.uid()::text = (string_to_array(name, '/'))[1]
  );
