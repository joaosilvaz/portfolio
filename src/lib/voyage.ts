// ─── Cliente Voyage AI (embeddings) ────────────────────────────────────────
// Anthropic não expõe endpoint de embeddings — Voyage AI é o parceiro
// recomendado. Usamos fetch direto (sem SDK) por ser uma única chamada REST.

const VOYAGE_API_URL = 'https://api.voyageai.com/v1/embeddings'
const VOYAGE_MODEL = 'voyage-3.5-lite'

type VoyageInputType = 'query' | 'document'

type VoyageEmbeddingsResponse = {
    data: { embedding: number[]; index: number }[]
    model: string
    usage: { total_tokens: number }
}

export type EmbedResult = { embedding: number[]; tokens: number }

/**
 * Gera o embedding de um texto via Voyage AI.
 * `inputType` diferencia a otimização interna do modelo entre a pergunta do
 * usuário ("query") e os chunks da base de conhecimento ("document") — a
 * Voyage recomenda declarar isso para melhorar a qualidade da busca.
 * Retorna também `tokens` (usage.total_tokens) para permitir rastrear custo.
 */
export async function embed(text: string, inputType: VoyageInputType): Promise<EmbedResult> {
    const apiKey = process.env.VOYAGE_API_KEY
    if (!apiKey) throw new Error('VOYAGE_API_KEY ausente')

    const res = await fetch(VOYAGE_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: [text],
            model: VOYAGE_MODEL,
            input_type: inputType,
        }),
    })

    if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new Error(`Voyage API error ${res.status}: ${body}`)
    }

    const data = (await res.json()) as VoyageEmbeddingsResponse
    return { embedding: data.data[0].embedding, tokens: data.usage.total_tokens }
}

/**
 * Gera embeddings em lote (usado pelo script de seed). A Voyage aceita até
 * 128 inputs por chamada — a base de conhecimento do portfólio é muito
 * menor que isso, então um único request resolve.
 */
export async function embedBatch(texts: string[], inputType: VoyageInputType): Promise<number[][]> {
    const apiKey = process.env.VOYAGE_API_KEY
    if (!apiKey) throw new Error('VOYAGE_API_KEY ausente')

    const res = await fetch(VOYAGE_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: texts,
            model: VOYAGE_MODEL,
            input_type: inputType,
        }),
    })

    if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new Error(`Voyage API error ${res.status}: ${body}`)
    }

    const data = (await res.json()) as VoyageEmbeddingsResponse
    return data.data.sort((a, b) => a.index - b.index).map(d => d.embedding)
}
