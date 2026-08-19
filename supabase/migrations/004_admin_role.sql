-- Admin Role Migration
-- Run this in your Supabase SQL Editor

-- 1. Add admin role to profiles
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('host', 'guest', 'admin'));

-- 2. Add banned status to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banned BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banned_reason TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banned_at TIMESTAMPTZ;

-- 3. Add listing approval fields
ALTER TABLE listings ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);
ALTER TABLE listings ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- 4. Add disputes table
CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  reported_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  against_user UUID REFERENCES auth.users(id),
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'dismissed')),
  admin_notes TEXT,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Disputes indexes
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_disputes_booking ON disputes(booking_id);

-- 6. Disputes RLS
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- Users can read their own disputes
CREATE POLICY "disputes_select_own" ON disputes FOR SELECT USING (auth.uid() = reported_by OR auth.uid() = against_user);

-- Users can create disputes
CREATE POLICY "disputes_insert_auth" ON disputes FOR INSERT WITH CHECK (auth.uid() = reported_by);

-- 7. Admin RLS policies - admins can read everything
CREATE POLICY "listings_select_admin" ON listings FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "bookings_select_admin" ON bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "reviews_select_admin" ON reviews FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "profiles_select_admin" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "disputes_select_admin" ON disputes FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 8. Admin can update everything
CREATE POLICY "listings_update_admin" ON listings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "bookings_update_admin" ON bookings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "profiles_update_admin" ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "disputes_update_admin" ON disputes FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 9. Admin can delete disputes
CREATE POLICY "disputes_delete_admin" ON disputes FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 10. Create a default admin user (replace with your email)
-- First sign up normally, then run:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
