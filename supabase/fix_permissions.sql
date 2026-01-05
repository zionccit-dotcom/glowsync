-- NUCLEAR FIX for Demo Mode permissions
-- Run this in Supabase SQL Editor

-- 1. Disable RLS completely for the demo tables (Guarantees no "Permission Denied" errors)
alter table bookings disable row level security;
alter table booking_items disable row level security;
alter table services disable row level security;

-- 2. Ensure we can insert arbitrary user_ids (Demo Mode)
alter table bookings drop constraint if exists bookings_user_id_fkey;
alter table bookings alter column user_id type text;

-- 3. Ensure we can insert specific service_ids or nulls
alter table booking_items drop constraint if exists booking_items_service_id_fkey;

-- 4. Grant full access to the 'anon' and 'authenticated' roles
grant all on bookings to anon, authenticated, service_role;
grant all on booking_items to anon, authenticated, service_role;
grant all on services to anon, authenticated, service_role;
