
-- Create storage policies to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users to view files" ON storage.objects
FOR SELECT USING (bucket_id = 'cards');

CREATE POLICY "Allow users to delete their own files" ON storage.objects
FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);
