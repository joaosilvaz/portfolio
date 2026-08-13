-- ─── Rastreio de tokens por resposta do chat ───────────────────────────────
-- Rode no SQL Editor do Supabase. Idempotente (add column if not exists).
-- Adiciona colunas na tabela chat_logs já existente para registrar quanto
-- cada resposta gastou: tokens do Claude (input/output/cache) + tokens do
-- embedding da busca RAG (Voyage AI).

alter table chat_logs
    add column if not exists input_tokens int,
    add column if not exists output_tokens int,
    add column if not exists cache_creation_input_tokens int,
    add column if not exists cache_read_input_tokens int,
    add column if not exists embedding_tokens int;

-- View auxiliar: custo total de tokens por dia (útil pra acompanhar consumo)
create or replace view chat_logs_daily_usage as
select
    date_trunc('day', created_at) as day,
    count(*) as total_messages,
    sum(input_tokens) as total_input_tokens,
    sum(output_tokens) as total_output_tokens,
    sum(cache_read_input_tokens) as total_cache_read_tokens,
    sum(embedding_tokens) as total_embedding_tokens,
    sum(coalesce(input_tokens, 0) + coalesce(output_tokens, 0) + coalesce(embedding_tokens, 0)) as total_tokens
from chat_logs
group by 1
order by 1 desc;
