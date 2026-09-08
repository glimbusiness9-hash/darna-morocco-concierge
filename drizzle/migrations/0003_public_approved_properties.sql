-- Public read access to approved properties, safe columns only.
CREATE POLICY "Anyone can read approved properties"
ON public.host_submissions
FOR SELECT
TO anon, authenticated
USING (status = 'approved'::host_submission_status);

-- Column-level grants: no host contact details, no street address.
GRANT SELECT (
  id, name, city, property_type, description, guests, bedrooms, beds,
  bathrooms, price_per_night, amenities, nearby, photos, status, created_at
) ON public.host_submissions TO anon;
