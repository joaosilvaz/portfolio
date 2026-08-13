// ─── Seed da base de conhecimento (RAG) ────────────────────────────────────
// Roda uma vez (ou sempre que o conteúdo mudar) para (re)popular a tabela
// `knowledge_base` no Supabase com os chunks + embeddings.
//
// Uso:
//   node scripts/seed-knowledge-base.mjs
//
// Requer no .env.local: VOYAGE_API_KEY, NEXT_PUBLIC_SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY (a service role é necessária aqui porque a
// role anon/publishable só tem permissão de SELECT — ver supabase/setup-rag.sql)

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// Carrega .env.local manualmente (sem depender de dotenv como dependência extra)
function loadEnvLocal() {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const envPath = join(__dirname, '..', '.env.local')
    let raw
    try {
        raw = readFileSync(envPath, 'utf-8')
    } catch {
        return
    }
    for (const line of raw.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eq = trimmed.indexOf('=')
        if (eq === -1) continue
        const key = trimmed.slice(0, eq).trim()
        const value = trimmed.slice(eq + 1).trim()
        if (!(key in process.env)) process.env[key] = value
    }
}

loadEnvLocal()

const VOYAGE_API_URL = 'https://api.voyageai.com/v1/embeddings'
const VOYAGE_MODEL = 'voyage-3.5-lite'

// ─── Base de conhecimento (fonte da verdade em texto) ──────────────────────
// Cada chunk é um fato autocontido e tematicamente coeso — chunks pequenos e
// focados geram embeddings mais precisos do que blocos grandes e misturados.
const CHUNKS = [
    // Nota: telefone e e-mail pessoal foram deliberadamente deixados de fora
    // da base — este conteúdo é buscável por qualquer visitante do chat, e
    // dados de contato direto não devem ser expostos automaticamente
    // (risco de spam/assédio). Contato oficial fica só em LinkedIn/GitHub.
    {
        category: 'perfil',
        content:
            'João Vitor da Silva Nascimento é Engenheiro de Software com mais de 2 anos de experiência construindo produtos digitais enterprise para marcas globais como GM, Mastercard, Leroy Merlin, LATAM Airlines e Diageo. Atua na MRM Brasil (MRM McCann Worldgroup) desenvolvendo interfaces web de alta performance com React, Next.js e TypeScript, e está expandindo para arquitetura backend com Java, Spring Boot e Docker. Está localizado em São Paulo, SP.',
    },
    {
        category: 'foco_carreira',
        content:
            'João Vitor iniciou a carreira focado em Frontend e atualmente está expandindo para arquitetura backend, aprofundando conhecimentos em Java, Spring Boot e Docker através da pós-graduação em Arquitetura e Desenvolvimento Java na FIAP, com foco também em sistemas distribuídos e padrões de engenharia de software.',
    },
    {
        category: 'experiencia_atual',
        content:
            'Desde março de 2025, João Vitor é Engenheiro de Software Júnior na MRM Brasil, em São Paulo, desenvolvendo interfaces responsivas e de alta performance com React, Next.js e TypeScript para campanhas e plataformas digitais de marcas globais como GM, Mastercard, Leroy Merlin, LATAM Airlines e Diageo. Atua em squads ágeis multidisciplinares com Scrum, Jira e Bitbucket, entregando soluções consistentemente dentro dos prazos de campanha.',
    },
    {
        category: 'impacto_frontend',
        content:
            'Na MRM Brasil, João Vitor implementou arquitetura frontend escalável em mais de 7 campanhas de marcas diferentes, suportando experiências de marketing digital para milhões de usuários finais.',
    },
    {
        category: 'projeto_lens_analytics',
        content:
            'João Vitor está desenvolvendo o Lens Analytics, uma plataforma interna de analytics construída com Next.js 15, TypeScript e MySQL, que integra o AWS Bedrock (Claude AI) para permitir consultas em linguagem natural sobre dados de campanhas de marketing. O projeto substitui processos manuais de geração de relatórios que antes demandavam horas de trabalho por semana, entregando insights em segundos para clientes como a Leroy Merlin.',
    },
    {
        category: 'projeto_dealer40',
        content:
            'João Vitor liderou o desenvolvimento frontend do Dealer 4.0, um configurador interativo do veículo GM Blazer EV RS implantado em eventos de concessionárias da GM. Foi construído para telas touchscreen em escala de TV, com personalização completa do veículo, simulação de financiamento e visualização 3D em tempo real, usando React, SCSS, HTML5 e JavaScript.',
    },
    {
        category: 'projeto_prodesp',
        content:
            'João Vitor contribuiu para uma plataforma digital governamental de grande escala para a PRODESP (empresa de tecnologia do Governo do Estado de São Paulo), utilizando Adobe Experience Manager (AEM). O time entregou um sistema CMS enterprise que modernizou a gestão e publicação de conteúdo digital para uma das maiores instituições públicas de TI do Brasil.',
    },
    {
        category: 'experiencia_estagio',
        content:
            'Antes da posição atual, João Vitor foi Estagiário de Desenvolvimento Frontend na MRM Brasil, em Vila Madalena (São Paulo), de junho de 2024 a fevereiro de 2026. Desenvolveu e publicou campanhas de email marketing em HTML e landing pages interativas via Salesforce Marketing Cloud (SFMC) e CloudPages para grandes marcas e eventos de escala nacional no Brasil.',
    },
    {
        category: 'estagio_diageo',
        content:
            'Durante o estágio na MRM Brasil, João Vitor criou e publicou campanhas de email para o portfólio premium da Diageo — Johnnie Walker, Smirnoff, Tanqueray e The Bar — cobrindo lançamentos de produtos, promoções sazonais e fluxos de CRM.',
    },
    {
        category: 'estagio_eventos',
        content:
            'No estágio, João Vitor entregou ativos digitais de campanha para eventos musicais icônicos como The Town, Lollapalooza Brasil e Rock in Rio, alcançando audiências de milhões de participantes e assinantes, além de campanhas de email marketing para marcas como Mastercard, Bayern Munich e Leroy Merlin, garantindo compatibilidade de renderização cross-client em Outlook, Gmail e Apple Mail.',
    },
    {
        category: 'estagio_sfmc',
        content:
            'Durante o estágio, João Vitor implementou lógica de CloudPages e AMPscript no Salesforce Marketing Cloud (SFMC) para criar experiências personalizadas e orientadas a dados para múltiplas marcas simultaneamente.',
    },
    {
        category: 'stack_frontend',
        content: 'Stack de Frontend de João Vitor: React.js, Next.js, JavaScript, TypeScript, HTML, CSS, SCSS e Tailwind CSS.',
    },
    {
        category: 'stack_backend',
        content:
            'Stack de Backend de João Vitor: Java, Spring Boot e Node.js, com foco em REST APIs, arquitetura de Microsserviços e testes com JUnit.',
    },
    {
        category: 'stack_cloud_devops',
        content:
            'Em Cloud e DevOps, João Vitor trabalha com Azure, AWS (incluindo Bedrock, Lambda, EC2, S3 e API Gateway), Docker, Git e GitHub.',
    },
    {
        category: 'stack_bancos_dados',
        content: 'Em bancos de dados, João Vitor trabalha com SQL, PostgreSQL e MySQL.',
    },
    {
        category: 'stack_ia',
        content:
            'Em Inteligência Artificial e IA Generativa, João Vitor tem experiência com AWS Bedrock, Claude API (Anthropic), LangChain, RAG (Retrieval-Augmented Generation) e Prompt Engineering — aplicados, por exemplo, no projeto Lens Analytics e no chatbot deste próprio portfólio.',
    },
    {
        category: 'arquitetura_praticas',
        content:
            'Em arquitetura e práticas de engenharia, João Vitor trabalha com Microsserviços, APIs REST, metodologia Ágil/Scrum e Design Patterns.',
    },
    {
        category: 'soft_skills',
        content:
            'Soft skills de João Vitor: resiliência, organização, responsabilidade, aprendizado rápido, resolução de problemas, trabalho em equipe, comunicação, liderança e adaptabilidade.',
    },
    {
        category: 'formacao_pos',
        content:
            'João Vitor está cursando pós-graduação em Arquitetura e Desenvolvimento Java na FIAP (Pós-Tech), iniciada em janeiro de 2026, aprofundando conhecimentos em sistemas distribuídos e padrões de engenharia de software.',
    },
    {
        category: 'formacao_graduacao',
        content: 'João Vitor cursou Análise e Desenvolvimento de Sistemas na FIAP, de janeiro de 2024 a dezembro de 2025.',
    },
    {
        category: 'formacao_ingles',
        content: 'João Vitor estudou inglês como segundo idioma na Wizard by Pearson, de 2017 a 2022.',
    },
    {
        category: 'idiomas',
        content:
            'Idiomas de João Vitor: Português nativo, Inglês avançado (nível C1) e Espanhol intermediário. Tem interesse e qualificação para vagas internacionais.',
    },
    {
        category: 'projeto_portfolio',
        content:
            'O portfólio pessoal de João Vitor (joaosilvadev.vercel.app) foi construído com Next.js, React, TypeScript e Tailwind CSS. Conta com um chatbot de IA integrado via Claude API (Anthropic) que responde perguntas de recrutadores de forma conversacional e contextualizada, com proteção contra prompt injection e rate limiting, busca semântica via RAG, interface animada, conteúdo bilíngue (PT/EN) e deploy contínuo na Vercel.',
    },
    {
        category: 'projeto_ecosmart',
        content:
            'O EcoSmart é uma aplicação de João Vitor (React, Next.js, TypeScript, Tailwind CSS, disponível em global-solution-s2.vercel.app) que permite ao usuário inserir seu consumo médio de energia elétrica e localização para calcular uma estimativa personalizada de economia com a instalação de um sistema de energia solar.',
    },
    {
        category: 'projeto_bank_system',
        content:
            'O Bank System é um projeto de João Vitor em Java e Spring Boot (código no GitHub: github.com/joaosilvaz/bank-project) que permite criação de conta, consulta de saldo, depósitos, saques e transferências via PIX, utilizando enums para tipos de conta (CORRENTE, POUPANÇA, SALÁRIO) e status da conta (ATIVA, INATIVA).',
    },
    {
        category: 'certificacoes',
        content:
            'Certificações de João Vitor: Git e GitHub - Básico ao Avançado (Alura), PostgreSQL - Avançado (Alura), Java - Avançado (FIAP) e Certificado de Qualificação Profissional em Estratégia e Inovação Tecnológica com aplicações em IA e IoT (FIAP).',
    },
    {
        category: 'contratacao',
        content:
            'João Vitor busca exclusivamente vaga de Desenvolvedor Júnior (não aceita estágio), em carga horária integral (8h diárias). Está localizado em São Paulo - SP e não aceita mudança de cidade/estado para vagas presenciais fora de SP. Aceita modelo remoto, híbrido ou presencial (dentro de SP), em regime CLT ou PJ, com preferência por CLT.',
    },
    {
        category: 'salario',
        content:
            'Sobre pretensão salarial, João Vitor está aberto a avaliar propostas de acordo com o escopo do projeto e o modelo de contratação.',
    },
    {
        category: 'processo_seletivo',
        content:
            'João Vitor está totalmente disponível para Live Coding ou desafios técnicos no GitHub. Contato e entrevistas podem ser agendados a qualquer horário via LinkedIn.',
    },
]

async function embedBatch(texts) {
    const apiKey = process.env.VOYAGE_API_KEY
    if (!apiKey) throw new Error('VOYAGE_API_KEY ausente no .env.local')

    const res = await fetch(VOYAGE_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: texts,
            model: VOYAGE_MODEL,
            input_type: 'document',
        }),
    })

    if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new Error(`Voyage API error ${res.status}: ${body}`)
    }

    const data = await res.json()
    return data.data.sort((a, b) => a.index - b.index).map(d => d.embedding)
}

async function main() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
        console.error(
            'Faltam variáveis de ambiente. Preencha no .env.local: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (pegue a service_role em Project Settings > API no Supabase).'
        )
        process.exit(1)
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    console.log(`Gerando embeddings para ${CHUNKS.length} chunks via Voyage AI (${VOYAGE_MODEL})...`)
    const embeddings = await embedBatch(CHUNKS.map(c => c.content))

    console.log('Limpando base de conhecimento anterior...')
    const { error: deleteError } = await supabase.from('knowledge_base').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (deleteError) throw deleteError

    const rows = CHUNKS.map((chunk, i) => ({
        content: chunk.content,
        category: chunk.category,
        embedding: embeddings[i],
    }))

    console.log(`Inserindo ${rows.length} chunks no Supabase...`)
    const { error: insertError } = await supabase.from('knowledge_base').insert(rows)
    if (insertError) throw insertError

    console.log('Base de conhecimento populada com sucesso.')
}

main().catch(err => {
    console.error('[seed error]', err)
    process.exit(1)
})
