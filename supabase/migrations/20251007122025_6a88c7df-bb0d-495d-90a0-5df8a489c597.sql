-- Create storage bucket for pousada images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pousada-images',
  'pousada-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Create RLS policies for the bucket
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'pousada-images');

CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'pousada-images' 
  AND (SELECT public.has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'pousada-images' 
  AND (SELECT public.has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'pousada-images' 
  AND (SELECT public.has_role(auth.uid(), 'admin'::app_role))
);

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  category text NOT NULL CHECK (category IN ('pousada', 'praia')),
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS policies for gallery_images
CREATE POLICY "Qualquer pessoa pode ver imagens da galeria"
ON public.gallery_images FOR SELECT
USING (true);

CREATE POLICY "Admins podem criar imagens da galeria"
ON public.gallery_images FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem atualizar imagens da galeria"
ON public.gallery_images FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem deletar imagens da galeria"
ON public.gallery_images FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_gallery_images_updated_at
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();