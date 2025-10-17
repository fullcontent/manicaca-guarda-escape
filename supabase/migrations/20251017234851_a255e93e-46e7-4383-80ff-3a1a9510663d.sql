-- Create table for room images
CREATE TABLE public.room_images (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id uuid NOT NULL REFERENCES public.room_types(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  description text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;

-- Create policies for room images
CREATE POLICY "Qualquer pessoa pode ver imagens das suítes"
ON public.room_images
FOR SELECT
USING (true);

CREATE POLICY "Admins podem criar imagens das suítes"
ON public.room_images
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem atualizar imagens das suítes"
ON public.room_images
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem deletar imagens das suítes"
ON public.room_images
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_room_images_updated_at
BEFORE UPDATE ON public.room_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();