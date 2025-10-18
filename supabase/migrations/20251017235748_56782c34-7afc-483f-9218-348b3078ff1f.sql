-- Add type column to amenities table to distinguish between common and suite-specific amenities
ALTER TABLE public.amenities 
ADD COLUMN type text NOT NULL DEFAULT 'suite' CHECK (type IN ('suite', 'common'));

-- Update existing amenities to be suite-specific by default
UPDATE public.amenities SET type = 'suite' WHERE type IS NULL;