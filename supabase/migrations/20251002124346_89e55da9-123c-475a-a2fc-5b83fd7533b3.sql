-- Corrigir search_path da função has_role com CASCADE
DROP FUNCTION IF EXISTS public.has_role(UUID, public.app_role) CASCADE;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Recriar todas as políticas que dependiam da função

-- Políticas RLS para profiles
CREATE POLICY "Admins podem ver todos os perfis"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para user_roles
CREATE POLICY "Admins podem gerenciar roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para room_types
CREATE POLICY "Admins podem criar suítes"
  ON public.room_types FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar suítes"
  ON public.room_types FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar suítes"
  ON public.room_types FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para amenities
CREATE POLICY "Admins podem criar comodidades"
  ON public.amenities FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar comodidades"
  ON public.amenities FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar comodidades"
  ON public.amenities FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para additional_info
CREATE POLICY "Admins podem criar informações adicionais"
  ON public.additional_info FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar informações adicionais"
  ON public.additional_info FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar informações adicionais"
  ON public.additional_info FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));