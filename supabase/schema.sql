-- GlowSync Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Profiles Table (Extends auth.users)
-- Stores public information about users (both Clients and Providers)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  user_role text default 'client' check (user_role in ('client', 'provider', 'admin')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Services Table
-- The menu of services offered by the business
create table services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  duration_minutes integer not null, -- Duration in minutes
  video_url text, -- For the "Viral" video preview
  category text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Bookings Table
-- The main appointment record. One booking can contain multiple people (Squad).
create table bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null, -- The person who made the booking
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  total_price decimal(10,2) not null,
  
  -- TrustPay Fields
  trustpay_status text default 'unsecured' check (trustpay_status in ('unsecured', 'hold_active', 'captured', 'released')),
  stripe_payment_intent_id text, -- ID from Stripe for the card hold
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Booking Items (Squad Members)
-- Individual services within a single booking (e.g. "Guest Mike getting a Beard Trim")
create table booking_items (
  id uuid default gen_random_uuid() primary key,
  booking_id uuid references bookings(id) on delete cascade not null,
  service_id uuid references services(id) on delete set null,
  
  guest_name text, -- e.g. "Mike" (or null if it's the main user)
  price_at_booking decimal(10,2) not null, -- Snapshot of price at time of booking
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table services enable row level security;
alter table bookings enable row level security;
alter table booking_items enable row level security;

-- RLS Policies

-- Profiles: Public can view profiles, but only owner can edit
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Services: Everyone can view, only Providers/Admins can edit
create policy "Services are viewable by everyone." on services
  for select using (true);

-- Bookings: Users can see their own bookings. Providers can see all.
create policy "Users can view own bookings." on bookings
  for select using (auth.uid() = user_id);
  
create policy "Users can insert own bookings." on bookings
  for insert with check (auth.uid() = user_id);

-- Booking Items: Same as bookings
create policy "Users can view own booking items." on booking_items
  for select using (
    exists ( select 1 from bookings where id = booking_items.booking_id and user_id = auth.uid() )
  );
  
create policy "Users can insert own booking items." on booking_items
  for insert with check (
    exists ( select 1 from bookings where id = booking_items.booking_id and user_id = auth.uid() )
  );

-- SEED DATA (Optional: To get you started)
insert into services (name, price, duration_minutes, video_url) values
('Classic Fade', 45.00, 45, 'https://videos.pexels.com/video-files/3998399/3998399-uhd_2560_1440_25fps.mp4'),
('Beard Sculpting', 25.00, 20, null),
('Hot Towel Shave', 35.00, 30, null),
('Kids Cut', 30.00, 30, null);
