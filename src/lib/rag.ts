import { createClient } from '@supabase/supabase-js'
import { embed } from './voyage'

const MATCH_COUNT = 6

type MatchResult = {
    id: string
    content: string
    category: string
    similarity: number
}

export type RetrievalResult = {
    context: string
    embeddingTokens: number
}

function getSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    if (!url || !key) throw new Error('Supabase env vars ausentes')
    return createClient(url, key)
}

/**
 * Recupera os trechos mais relevantes da base de conhecimento para a
 * pergunta do usuário e devolve um bloco de texto pronto para ser injetado
 * no system prompt, além dos tokens gastos no embedding da query (para
 * rastreio de custo). Nunca lança — o chat deve continuar funcionando com
 * as guardrails estáticas mesmo se o RAG estiver indisponível.
 */
export async function retrieveContext(query: string): Promise<RetrievalResult> {
    try {
        const { embedding: queryEmbedding, tokens: embeddingTokens } = await embed(query, 'query')

        const { data, error } = await getSupabase().rpc('match_knowledge_base', {
            query_embedding: queryEmbedding,
            match_count: MATCH_COUNT,
        })

        if (error) throw error

        const matches = (data ?? []) as MatchResult[]
        const context = matches.map(m => `- [${m.category}] ${m.content}`).join('\n')

        return { context, embeddingTokens }
    } catch (err) {
        console.error('[RAG retrieval error]', err)
        return { context: '', embeddingTokens: 0 }
    }
}
