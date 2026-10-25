# Eleição Presidencial 2026 — mapa do Brasil

Site de página única com o resultado da eleição para presidente por estado.
Endereço: **https://ivanracoski.com/eleicao2026/**

- **1º turno:** resultado final do TSE, embutido no próprio arquivo.
- **2º turno:** buscado ao vivo nos arquivos públicos do TSE pelo navegador de quem está vendo.

Não precisa de servidor, banco de dados nem chave de acesso.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O site inteiro (código, dados do 1º turno, fotos e QR Code do Pix embutidos). |
| `previa.png` | Imagem que aparece ao compartilhar o link no WhatsApp, Facebook, X, LinkedIn etc. |
| `.nojekyll` | Avisa o GitHub Pages para publicar os arquivos como estão. |
| `README.md` | Este arquivo. |

Os quatro ficam juntos na mesma pasta. O site não usa caminhos fixos, então funciona em qualquer pasta (`/eleicao2026/`, raiz, outro domínio).
A única exceção é o endereço da prévia no `index.html` (`og:image`, `og:url` e `canonical`). Ele aponta para `https://ivanracoski.com/eleicao2026/`, porque os aplicativos exigem endereço completo. Se mudar o endereço, troque essas três linhas.

## Publicar em ivanracoski.com/eleicao2026

A forma depende de onde o **ivanracoski.com** está hospedado.

### Caso A — o ivanracoski.com já é um GitHub Pages
É o caso de quem tem um repositório `<seu-usuario>.github.io` com o domínio próprio configurado. Nesse caso:

1. Crie um repositório **público** chamado exatamente **`eleicao2026`**.
2. Envie os quatro arquivos para a raiz: **Add file → Upload files**, depois **Commit changes**.
   - O `.nojekyll` começa com ponto e pode ficar oculto no seu computador. Se não conseguir enviá-lo, crie-o direto no GitHub: **Add file → Create new file**, nome `.nojekyll`, conteúdo vazio.
3. Em **Settings → Pages**, em *Build and deployment*, escolha *Deploy from a branch*, a branch `main` e a pasta `/ (root)`. Clique em **Save**.
4. Em um ou dois minutos o site abre em **https://ivanracoski.com/eleicao2026/**. O GitHub usa o domínio do seu site principal automaticamente para os outros repositórios.

### Caso B — o ivanracoski.com está em outra hospedagem
Por exemplo Hostinger, HostGator, Locaweb ou WordPress.

1. No gerenciador de arquivos ou por FTP, crie a pasta **`eleicao2026`** dentro da pasta pública do site (geralmente `public_html`).
2. Envie para ela `index.html` e `previa.png`. O `.nojekyll` e o `README.md` não são necessários nesse caso.
3. Pronto: **https://ivanracoski.com/eleicao2026/**.

Se quiser guardar o código no GitHub mesmo assim, pode criar o repositório normalmente. Ele só não é obrigatório para o site ficar no ar.

### Depois de publicar
- Abra o endereço no celular e no computador e confira se o mapa aparece.
- Para conferir a prévia do link, cole o endereço numa conversa do WhatsApp consigo mesmo.
- O WhatsApp guarda a prévia em cache. Se mudar a imagem depois, ela pode demorar a atualizar.

Para atualizar o site, basta substituir o `index.html`.

## Como funciona a atualização ao vivo

- A página lê os arquivos oficiais do TSE da eleição **6258** (2º turno, 25/10/2026). Eles ficam em:
  `https://resultados.tse.jus.br/oficial/ele2026/6258/dados/<uf>/<uf>-c0001-e006258-u.json`
  São 29 arquivos: Brasil, as 27 UFs e o exterior (`zz`).
- **A cada 60 segundos**, só enquanto a aba estiver aberta e visível, a página lê o arquivo do Brasil.
  - Se o horário de geração mudou, baixa as 28 unidades, 6 de cada vez.
  - Se não mudou, para por ali, com 1 requisição por minuto por visitante.
- O TSE guarda esses arquivos em cache por cerca de 50 segundos. Buscar com mais frequência não traz dados novos.
- Se algum arquivo falhar, a página mantém a última leitura boa daquela unidade e avisa na linha de status.
- Se o TSE não responder, a página continua mostrando os últimos dados e tenta de novo no ciclo seguinte.
- Quando a totalização é encerrada (100% e `and = "f"`), as buscas param.
- A página abre sozinha no 2º turno assim que ele tiver seções apuradas, a menos que a pessoa já tenha escolhido um turno. O botão **Atualizar agora** força uma busca.
- **Seções apuradas:** ao passar o mouse na barra colorida (ou tocar nela, no celular), aparece "X de Y seções", lido do mesmo arquivo do Brasil (`s.st` de `s.ts`).
  - No 1º turno, a página lê uma vez o arquivo do Brasil da eleição 6257 só para isso.
  - Sem resposta do TSE, a dica mostra o percentual.

Para mudar o intervalo, altere `const INTERVALO = 60;` no `index.html` (em segundos).

## Testes feitos

- **23/10/2026:** de uma página fora do TSE, os 29 arquivos do 2º turno foram lidos sem erro em cerca de 0,4 s.
- **Apuração simulada:** testes automáticos com um TSE de mentira passaram nos casos de:
  - apuração em andamento e avanço da apuração;
  - 2 arquivos falhando (a página mantém os anteriores);
  - troca entre turnos;
  - totalização encerrada e TSE fora do ar;
  - dica de seções no mouse e no toque.

## Origem dos dados e créditos

- Resultados e fotos dos candidatos: arquivos públicos de resultado do TSE (resultados.tse.jus.br).
- Contornos dos estados: pacote `@svg-maps/brazil` 2.0.0 (MapSVG / Victor Cazanave, licença CC BY 4.0), carregado via jsDelivr.
- © 2026 · desenvolvido por Ivan Racoski (www.ivanracoski.com). Página independente, sem vínculo com o TSE.
