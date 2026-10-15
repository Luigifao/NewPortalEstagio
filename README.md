# Portal de Estágios — Dom Helder

Protótipo de uma interface web para facilitar o acompanhamento e a gestão de estágios da comunidade acadêmica da Dom Helder. A proposta reúne as principais tarefas do aluno e do Núcleo de Prática Jurídica (NPJ) em um portal responsivo, com navegação simples e identidade visual institucional em vermelho e branco.

## Funcionalidades

### Perfil do aluno

- **Mural:** consulta a comunicados e documentos publicados pelo NPJ.
- **Nova solicitação:** preenchimento dos dados da empresa, período, jornada, bolsa, seguro e anexos.
- **Meus contratos:** consulta de contratos e solicitações demonstrativos.
- **Rescisões:** visualização do status e das observações do NPJ.

### Perfil do advogado (NPJ)

- **Contratos:** visualização de solicitações de estágio demonstrativas.
- **Rescisões:** análise demonstrativa dos pedidos recebidos.
- **Gerenciar mural:** criação, edição e exclusão de comunicados, com anexos que podem ser visualizados no Mural do aluno.
- Os anexos aceitos no Mural são PDF, DOC, DOCX, ODT, RTF, JPG e PNG, limitados a 10 MB por arquivo.

Os perfis podem ser alternados pelo seletor **Visualizar como**, no cabeçalho. A interface também se adapta a telas menores, com menu lateral responsivo.

## Baixar o projeto

Se recebeu o projeto como arquivo ZIP, extraia a pasta para o computador. Se ele estiver hospedado no GitHub, abra o repositório, selecione **Code → Download ZIP** e extraia o arquivo baixado.

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior, que inclui o npm.
- Um navegador atualizado.

Para confirmar a instalação, abra um terminal e execute:

```powershell
node --version
npm --version
```

## Instalar e executar

Abra o PowerShell na pasta do projeto. Por exemplo:

```powershell
cd C:\caminho\para\Proj_portal_Estagio
npm install
npm run dev
```

O Vite exibirá um endereço local no terminal, normalmente `http://localhost:5173/`. Abra esse endereço no navegador. Mantenha o terminal aberto enquanto estiver usando a página; para encerrar o servidor, pressione `Ctrl+C`.

## Testar o fluxo de anexos do Mural

1. No cabeçalho, em **Visualizar como**, selecione **Advogado NPJ**.
2. Na navegação lateral, abra **Gerenciar mural** e clique em **Novo comunicado**.
3. Preencha o título e a mensagem. Use **Anexar documentos** para selecionar um ou mais arquivos aceitos.
4. Clique em **Publicar comunicado**.
5. Troque o perfil para **Aluno**. O comunicado aparecerá no Mural, com links para visualizar os documentos.

Também é possível experimentar o formulário de estágio, a lista de contratos e a visualização das rescisões. Os dados apresentados são demonstrativos.

## Gerar a versão de produção

Para validar os tipos e compilar os arquivos otimizados:

```powershell
npm run build
```

O resultado será criado na pasta `dist`. Para servir essa versão localmente:

```powershell
npm run preview
```

## Tecnologias

- React e TypeScript
- Vite
- React Router DOM
- Lucide React
- CSS responsivo

## Limitações do protótipo

Esta versão não está conectada a um backend, banco de dados ou serviço de autenticação. Perfis, contratos e comunicados são demonstrativos. Comunicados e anexos criados permanecem disponíveis apenas em memória durante a sessão atual do navegador; atualizar ou fechar a página os remove. Em uma aplicação de produção, os dados e documentos devem ser persistidos por uma API e serviço de armazenamento, com controle de acesso apropriado.
