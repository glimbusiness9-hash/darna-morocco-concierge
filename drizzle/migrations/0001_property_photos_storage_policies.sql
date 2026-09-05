CREATE POLICY "Public can upload property photos"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'property-photos');