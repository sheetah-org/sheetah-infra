-- Execute this script after Drizzle db push

-- Enable realtime for receipts table
ALTER publication supabase_realtime ADD TABLE public.receipts;
-- Receive full OLD record in realtime change handlers
ALTER TABLE public.receipts REPLICA IDENTITY full;

-- Enable realtime for expenses_to_receipts_suggestions table
ALTER publication supabase_realtime ADD TABLE public.expenses_to_receipts_suggestions;
-- Receive full OLD record in realtime change handlers
ALTER TABLE public.expenses_to_receipts_suggestions REPLICA IDENTITY full;
