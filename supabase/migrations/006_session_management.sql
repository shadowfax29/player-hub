-- Session management: timer, confirmations, reviews
-- Run in Supabase SQL Editor

-- 1. Add session tracking columns to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS session_started_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS session_ends_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS session_active BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS host_confirmed_end BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS guest_confirmed_end BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS host_wants_continue BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS guest_wants_continue BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS continue_notes TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS session_ended_at TIMESTAMPTZ;

-- 2. Update booking status to include new states
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check CHECK (status IN ('pending', 'confirmed', 'active', 'awaiting_confirmation', 'awaiting_continue', 'completed', 'cancelled'));

-- 3. Add host_cancelled column for host-initiated cancel
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_by UUID REFERENCES auth.users(id);

-- 4. Reviews: add host_id and target_role so both can rate each other
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS host_id UUID REFERENCES auth.users(id);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS booking_id UUID REFERENCES bookings(id);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS target_role TEXT CHECK (target_role IN ('host', 'guest'));

-- 5. One review per user per booking
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_booking_author ON reviews(booking_id, author_id);
