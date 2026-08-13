-- ─── Setup RAG (pgvector) para o chatbot do portfólio ─────────────────────────
-- Rode este script inteiro no SQL Editor do Supabase (Project > SQL Editor > New query).
-- Idempotente: pode ser rodado mais de uma vez sem quebrar nada.

-- 1. Habilita a extensão pgvector
create extension if not exists vector;

-- 2. Tabela da base de conhecimento
create table if not exists knowledge_base (
    id uuid primary key default gen_random_uuid(),
    content text not null,
    category text not null,
    -- voyage-3.5-lite gera vetores de 1024 dimensões por padrão
    embedding vector(1024) not null,
    created_at timestamptz not null default now()
);

-- 3. Índice HNSW para busca por similaridade de cosseno em escala
create index if not exists knowledge_base_embedding_idx
    on knowledge_base
    using hnsw (embedding vector_cosine_ops);

-- 4. Função de busca semântica (chamada via supabase.rpc no Next.js)
--    security definer: permite que a role anon/publishable execute a busca
--    mesmo com RLS habilitado na tabela, sem precisar de permissão de leitura direta.
create or replace function match_knowledge_base(
    query_embedding vector(1024),
    match_count int default 6
)
returns table (
    id uuid,
    content text,
    category text,
    similarity float
)
language sql
stable
security definer
set search_path = public
as $$
    select
        knowledge_base.id,
        knowledge_base.content,
        knowledge_base.category,
        1 - (knowledge_base.embedding <=> query_embedding) as similarity
    from knowledge_base
    order by knowledge_base.embedding <=> query_embedding
    limit match_count;
$$;

-- 5. RLS: conteúdo é público (mesma info que já fica exposta no bundle do site),
--    então liberamos SELECT geral. INSERT/UPDATE/DELETE ficam restritos à
--    service_role (usada apenas pelo script de seed, nunca pelo client).
alter table knowledge_base enable row level security;

drop policy if exists "knowledge_base_public_read" on knowledge_base;
create policy "knowledge_base_public_read"
    on knowledge_base
    for select
    to anon, authenticated
    using (true);

-- Garante que a role anon pode chamar a função RPC
grant execute on function match_knowledge_base(vector, int) to anon, authenticated;
