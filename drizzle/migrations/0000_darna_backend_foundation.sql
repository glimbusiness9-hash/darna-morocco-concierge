CREATE TYPE public.host_submission_status AS ENUM ('pending','approved','rejected');
CREATE TYPE public.inquiry_status AS ENUM ('new','contacted','completed','cancelled');

CREATE TABLE public.host_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 120),
  contact_name text CHECK (contact_name IS NULL OR char_length(contact_name) <= 120),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 32),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  city text NOT NULL CHECK (char_length(trim(city)) BETWEEN 2 AND 80),
  property_type text NOT NULL CHECK (property_type IN ('Apartment','Villa','House','Riad')),
  description text NOT NULL CHECK (char_length(description) BETWEEN 20 AND 2000),
  guests integer NOT NULL CHECK (guests BETWEEN 1 AND 50),
  bedrooms integer NOT NULL CHECK (bedrooms BETWEEN 0 AND 30),
  beds integer NOT NULL CHECK (beds BETWEEN 1 AND 50),
  bathrooms integer NOT NULL CHECK (bathrooms BETWEEN 0 AND 30),
  price_per_night numeric(10,2) NOT NULL CHECK (price_per_night > 0 AND price_per_night <= 1000000),
  amenities text[] NOT NULL DEFAULT '{}',
  address text NOT NULL CHECK (char_length(trim(address)) BETWEEN 4 AND 255),
  nearby text CHECK (nearby IS NULL OR char_length(nearby) <= 500),
  photos text[] NOT NULL DEFAULT '{}',
  status public.host_submission_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text CHECK (name IS NULL OR char_length(name) <= 120),
  city text NOT NULL CHECK (char_length(trim(city)) BETWEEN 1 AND 120),
  check_in date,
  check_out date,
  guests integer NOT NULL CHECK (guests BETWEEN 1 AND 60),
  activities text[] NOT NULL DEFAULT '{}',
  stay text CHECK (stay IS NULL OR char_length(stay) <= 120),
  transport text[] NOT NULL DEFAULT '{}',
  budget text CHECK (budget IS NULL OR char_length(budget) <= 120),
  email text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 255),
  whatsapp text NOT NULL CHECK (char_length(trim(whatsapp)) BETWEEN 6 AND 32),
  message text CHECK (message IS NULL OR char_length(message) <= 1000),
  status public.inquiry_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER host_submissions_updated_at BEFORE UPDATE ON public.host_submissions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT INSERT ON public.host_submissions TO anon, authenticated;
GRANT ALL ON public.host_submissions TO service_role;
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.host_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a host application"
ON public.host_submissions FOR INSERT TO anon, authenticated
WITH CHECK (status = 'pending');

CREATE POLICY "Anyone can submit an inquiry"
ON public.inquiries FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new');

CREATE INDEX host_submissions_status_created_idx ON public.host_submissions (status, created_at DESC);
CREATE INDEX inquiries_status_created_idx ON public.inquiries (status, created_at DESC);