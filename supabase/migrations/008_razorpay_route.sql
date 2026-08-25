-- 008_razorpay_route.sql
-- Razorpay Route: Host bank details + transfer tracking

-- Host bank/KYC details on profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS razorpay_account_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bank_account_number TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bank_ifsc TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bank_holder_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pan_number TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'submitted', 'activated', 'needs_clarification'));

-- Transfer tracking on bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS transfer_id TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS transfer_status TEXT DEFAULT 'not_started' CHECK (transfer_status IN ('not_started', 'pending', 'processed', 'failed'));
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS platform_fee NUMERIC DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS host_payout NUMERIC DEFAULT 0;

-- Platform fee percent (configurable, default 15%)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS platform_fee_percent NUMERIC DEFAULT 15;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_razorpay_account ON profiles(razorpay_account_id) WHERE razorpay_account_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_transfer_status ON bookings(transfer_status);
