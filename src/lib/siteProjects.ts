export type SiteProject = {
  slug: string
  name: string
  url: string
  category: string
  summary: { pt: string; en: string }
  challenge: { pt: string; en: string }
  approach: { pt: string; en: string }
}

export const siteProjects: SiteProject[] = [
  { slug: 'rodrigo-mkt', name: 'Rodrigo MKT', url: 'https://rodrigo-mkt-two.vercel.app/', category: 'Marketing',
    summary: { pt: 'Uma presença digital para apresentar a Rodrigo MKT e seus serviços de marketing.', en: 'A digital presence for Rodrigo MKT and its marketing services.' },
    challenge: { pt: 'Reunir a apresentação da marca e de seus serviços em um endereço fácil de compartilhar.', en: 'Bring the brand and its services together at an easy-to-share address.' },
    approach: { pt: 'Organizar a apresentação em uma experiência web direta, com o nome e a oferta da marca em destaque.', en: 'Organize the presentation as a direct web experience, with the brand and its offering in focus.' } },
  { slug: 'dra-isabela-santana', name: 'Dra. Isabela Santana', url: 'https://draisabelasantana.vercel.app/', category: 'Website',
    summary: { pt: 'Um site próprio para apresentar a atuação profissional da Dra. Isabela Santana.', en: 'A dedicated website presenting Dr. Isabela Santana’s professional work.' },
    challenge: { pt: 'Criar um ponto de referência online para quem deseja conhecer seu trabalho.', en: 'Create an online reference point for people who want to learn about her work.' },
    approach: { pt: 'Priorizar uma apresentação acolhedora, conteúdo legível e navegação simples.', en: 'Prioritize a welcoming presentation, readable content, and simple navigation.' } },
  { slug: 'graziela-fagotti', name: 'Graziela Fagotti', url: 'https://grazielafagotti.com.br/', category: 'Website',
    summary: { pt: 'Um espaço digital dedicado à apresentação de Graziela Fagotti e de seu trabalho.', en: 'A digital space dedicated to introducing Graziela Fagotti and her work.' },
    challenge: { pt: 'Dar ao trabalho uma presença própria na web, acessível por um único endereço.', en: 'Give her work its own web presence, accessible from one address.' },
    approach: { pt: 'Construir uma experiência centrada na identidade e nas informações que o visitante procura.', en: 'Build an experience centered on her identity and the information visitors seek.' } },
  { slug: 'pupo-pilates', name: 'Pupo Pilates', url: 'https://pupopilates.vercel.app/', category: 'Website',
    summary: { pt: 'Site desenvolvido para levar o negócio de Pilates de uma cliente ao ambiente digital.', en: 'A website built to bring a client’s Pilates business online.' },
    challenge: { pt: 'Oferecer ao negócio um endereço próprio para apresentar sua atividade.', en: 'Give the business its own address to present what it does.' },
    approach: { pt: 'Criar e publicar um site dedicado ao estúdio, acessível em diferentes telas.', en: 'Build and publish a dedicated studio website accessible across devices.' } },
  { slug: 'cibele-pardelli', name: 'Cibele Pardelli', url: 'https://cibele-pardelli.vercel.app/', category: 'Website',
    summary: { pt: 'Um site pessoal para apresentar Cibele Pardelli e seu trabalho.', en: 'A personal website introducing Cibele Pardelli and her work.' },
    challenge: { pt: 'Reunir sua apresentação em um espaço digital próprio e fácil de acessar.', en: 'Bring her introduction together in a dedicated, accessible digital space.' },
    approach: { pt: 'Dar destaque à pessoa e ao conteúdo com uma navegação clara.', en: 'Put the person and content first with clear navigation.' } },
  { slug: 'minify-html', name: 'Minify HTML', url: 'https://minify-html.vercel.app/', category: 'Developer tool',
    summary: { pt: 'Uma ferramenta web para compactar código HTML diretamente no navegador.', en: 'A web tool for minifying HTML code directly in the browser.' },
    challenge: { pt: 'Tornar uma tarefa técnica recorrente rápida de acessar e executar.', en: 'Make a recurring technical task quick to access and complete.' },
    approach: { pt: 'Concentrar a interface na ferramenta, reduzindo os passos entre inserir o HTML e obter o resultado.', en: 'Keep the interface focused on the tool, reducing the steps between entering HTML and getting the result.' } },
  { slug: 'joao-links', name: 'João Silva.tech Links', url: 'https://joaosilvatech-links.vercel.app/', category: 'Link hub',
    summary: { pt: 'Uma página que reúne meus principais links em um único lugar.', en: 'A page bringing my main links together in one place.' },
    challenge: { pt: 'Facilitar o acesso aos meus canais por meio de um único endereço.', en: 'Make my channels accessible through a single address.' },
    approach: { pt: 'Organizar os destinos em uma página simples de navegar e compartilhar.', en: 'Organize the destinations in a page that is easy to navigate and share.' } },
]

export function getSiteProject(slug: string) {
  return siteProjects.find((project) => project.slug === slug)
}
