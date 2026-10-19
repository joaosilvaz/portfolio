/**
 * Projetos do portfólio. Os textos ficam em messages/*.json (work.items.<slug>);
 * aqui só o que não muda com o idioma.
 */
export type Project = {
  slug: 'lens' | 'assistant' | 'bank'
  stack: string[]
  image?: string
  code?: string
  /** Âncora ou URL para experimentar o produto. */
  live?: string
  confidential?: boolean
  hasResult: boolean
}

export const projects: Project[] = [
  {
    slug: 'lens',
    stack: ['AWS Bedrock', 'Generative AI', 'Full Stack', 'AWS'],
    confidential: true,
    hasResult: true,
  },
  {
    slug: 'assistant',
    stack: ['Next.js', 'Claude API', 'Supabase', 'TypeScript'],
    code: 'https://github.com/joaosilvaz/portfolio',
    live: '/#chat',
    hasResult: true,
  },
  {
    slug: 'bank',
    stack: ['Java', 'Spring Boot', 'REST API'],
    image: '/images/bank-project.jpg',
    code: 'https://github.com/joaosilvaz/bank-project',
    hasResult: false,
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
