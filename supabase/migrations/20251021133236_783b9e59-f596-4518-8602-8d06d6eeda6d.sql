-- Add suite_specific_amenities column to room_types table
ALTER TABLE public.room_types 
ADD COLUMN suite_specific_amenities text[] DEFAULT '{}' NOT NULL;

COMMENT ON COLUMN public.room_types.suite_specific_amenities IS 'Comodidades específicas desta suíte, além das comodidades comuns';