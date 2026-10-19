/**
 * Projetos do portfólio. Os textos ficam em messages/*.json (work.items.<slug>);
 * aqui só o que não muda com o idioma.
 */
export type Project = {
  slug: 'lens' | 'requalify' | 'mottu' | 'bank'
  stack: string[]
  image?: string
  /** Repositórios; `label` é a chave da mensagem em work.* */
  code?: { label: 'code' | 'codeApi' | 'codeMobile'; href: string }[]
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
    slug: 'requalify',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'React Native', 'GPT-4'],
    code: [
      { label: 'codeApi', href: 'https://github.com/Requalify-GS/api-java-requalify' },
      { label: 'codeMobile', href: 'https://github.com/Requalify-GS/mobile-requalify' },
    ],
    hasResult: true,
  },
  {
    slug: 'mottu',
    stack: ['C#', 'ASP.NET Core', 'EF Core', 'Oracle', 'Swagger'],
    code: [{ label: 'code', href: 'https://github.com/joaosilvaz/Challenge-MOTTU' }],
    hasResult: false,
  },
  {
    slug: 'bank',
    stack: ['Java', 'Spring Boot', 'REST API'],
    image: '/images/bank-project.jpg',
    code: [{ label: 'code', href: 'https://github.com/joaosilvaz/bank-project' }],
    hasResult: false,
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
