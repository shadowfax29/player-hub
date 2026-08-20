-- Fix admin RLS policies: use JWT user_metadata instead of profiles table
-- Run this in Supabase SQL Editor

-- Drop old admin policies that query profiles table (causes recursion/empty results)
DROP POLICY IF EXISTS "listings_select_admin" ON listings;
DROP POLICY IF EXISTS "listings_update_admin" ON listings;
DROP POLICY IF EXISTS "bookings_select_admin" ON bookings;
DROP POLICY IF EXISTS "bookings_update_admin" ON bookings;
DROP POLICY IF EXISTS "reviews_select_admin" ON reviews;
DROP POLICY IF EXISTS "profiles_select_admin" ON profiles;
DROP POLICY IF EXISTS "profiles_update_admin" ON profiles;
DROP POLICY IF EXISTS "disputes_select_admin" ON disputes;
DROP POLICY IF EXISTS "disputes_update_admin" ON disputes;
DROP POLICY IF EXISTS "disputes_delete_admin" ON disputes;

-- Recreate using auth.jwt() to read user_metadata.role (no profiles table lookup)
CREATE POLICY "listings_select_admin" ON listings FOR SELECT USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "listings_update_admin" ON listings FOR UPDATE USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "bookings_select_admin" ON bookings FOR SELECT USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "bookings_update_admin" ON bookings FOR UPDATE USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "reviews_select_admin" ON reviews FOR SELECT USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "profiles_select_admin" ON profiles FOR SELECT USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "profiles_update_admin" ON profiles FOR UPDATE USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "disputes_select_admin" ON disputes FOR SELECT USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "disputes_update_admin" ON disputes FOR UPDATE USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);

CREATE POLICY "disputes_delete_admin" ON disputes FOR DELETE USING (
  (auth.jwt()->'user_metadata'->>'role') = 'admin'
);
