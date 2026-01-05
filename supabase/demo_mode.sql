-- DEMO MODE: Allow public access for testing without Auth
-- Run this in your Supabase SQL Editor

-- 1. Allow anyone (anon) to VIEW services (already done usually, but ensuring it)
create policy "Enable read access for all users" on services for select using (true);

-- 2. Allow anyone to INSERT bookings (Guest Checkout)
-- We temporarily drop the Foreign Key constraint to auth.users if it exists strictly, 
-- or we just make sure we can insert a dummy ID. 
-- Actually, better to just allow the insert and we will generate a random UUID for the user_id in the frontend for now.

alter table bookings drop constraint bookings_user_id_fkey; -- Remove strict link to auth.users for demo
alter table bookings alter column user_id type text; -- Allow text IDs (client generated)

create policy "Enable insert for all users" on bookings for insert with check (true);
create policy "Enable read access for all users" on bookings for select using (true);

create policy "Enable insert for all users" on booking_items for insert with check (true);
create policy "Enable read access for all users" on booking_items for select using (true);

-- 3. Seed some initial data for the Dashboard
insert into bookings (id, user_id, start_time, end_time, status, total_price, trustpay_status, created_at)
values 
('b1-demo', 'guest-1', now() + interval '1 day', now() + interval '1 day 1 hour', 'confirmed', 45.00, 'hold_active', now()),
('b2-demo', 'guest-2', now() - interval '2 hour', now() - interval '1 hour', 'completed', 70.00, 'captured', now());

insert into booking_items (booking_id, service_id, guest_name, price_at_booking)
values
('b1-demo', (select id from services limit 1), 'Guest User', 45.00),
('b2-demo', (select id from services limit 1), 'Alex', 45.00),
('b2-demo', (select id from services offset 1 limit 1), 'Sam', 25.00);
