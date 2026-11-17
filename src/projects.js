export const projects = [
  {
    name: "Carona Universitária",
    key: "carona",
    count: 4,
    context: "Projeto acadêmico · Londrina, PR",
    headline: "Compartilhar o caminho. Aproximar pessoas.",
    description:
      "Projeto acadêmico voltado à mobilidade dos universitários de Londrina. A plataforma conecta estudantes que fazem trajetos semelhantes, facilitando a organização de caronas entre casa e universidade e criando oportunidades de convivência além da sala de aula.",
    detail:
      "A experiência reúne oferta e busca de caronas, visualização de trajetos no mapa e organização de solicitações. A proposta é tornar os deslocamentos mais colaborativos, incentivar o compartilhamento de custos e fortalecer as conexões entre alunos de diferentes cursos e instituições.",
    stacks: ["Next.js", "NestJS", "PostgreSQL"],
    authors: "Renan e Alisson",
    repos: [
      ["Frontend", "carona-frontend"],
      ["Backend", "carona-backend"],
    ],
  },
  {
    name: "CTD Flipbook",
    key: "flipbook",
    count: 2,
    context: "Desenvolvido para a CTD",
    headline: "Documentos digitais com a experiência de um livro.",
    description:
      "Desenvolvido para a Companhia de Tecnologia e Desenvolvimento S.A. (CTD), o Flipbook transforma a leitura de documentos PDF em uma experiência visual e interativa, com navegação em formato de livro e passagem de páginas.",
    detail:
      "O projeto combina uma biblioteca de documentos com recursos de acesso e compartilhamento. O foco está em facilitar a consulta e a apresentação de materiais digitais, oferecendo uma interface que aproxima a familiaridade do livro físico da praticidade da web.",
    stacks: ["Next.js", "NestJS", "PostgreSQL"],
    authors: "Renan",
    repos: [["Ver código", "flipbook"]],
  },
  {
    name: "CTD Resource",
    key: "resource",
    count: 3,
    context: "Desenvolvido para a CTD",
    headline: "Conhecimento documentado. Respostas com contexto.",
    description:
      "Plataforma desenvolvida para a CTD para criar, organizar e consultar documentos em Markdown. Guias, padrões e orientações técnicas passam a compor uma base de conhecimento que pode ser mantida e explorada em um único ambiente.",
    detail:
      "Um chatbot de inteligência artificial integrado com Langflow responde perguntas com base nos documentos cadastrados. A solução conecta documentação e consulta contextual, apoiando a descoberta de informações e o compartilhamento de conhecimento entre as pessoas da equipe.",
    stacks: ["Langflow", "Next.js", "NestJS", "PostgreSQL"],
    authors: "Renan e Gabriel",
    repos: [["Ver código", "ctd-resource"]],
  },
  {
    name: "CTD Animal",
    key: "animal",
    count: 3,
    context: "CTD · CMTU · Expo Londrina",
    headline: "Tecnologia que ajuda a encontrar um novo lar.",
    description:
      "Plataforma de adoção de animais desenvolvida para a CTD, destinada ao atendimento da CMTU na Expo Londrina. O projeto apresenta os animais disponíveis e suas informações em uma experiência pensada para o público do evento.",
    detail:
      "O catálogo reúne fotos e características dos animais, enquanto a área de controle apoia o gerenciamento dos cadastros e dos registros de adoção. A proposta é facilitar a consulta durante o atendimento e aproximar os visitantes dos animais que aguardam uma nova família.",
    stacks: ["Vite", "NestJS", "PostgreSQL"],
    authors: "Renan",
    repos: [
      ["Frontend", "ctd-animal-frontend"],
      ["Backend", "ctd-animal-backend"],
    ],
  },
];
