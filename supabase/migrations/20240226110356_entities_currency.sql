ALTER TABLE public.entities
ADD CONSTRAINT entities_currency_fkey FOREIGN key (currency) REFERENCES currencies (id) ON UPDATE cascade ON DELETE SET NULL

