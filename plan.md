# Projeto: Nossa Jornada 2025

Este projeto visa criar uma experiência web emocionante e visualmente deslumbrante para celebrar o ano de 2025. Será uma retrospectiva interativa com fotos, mensagens e momentos marcantes.

## Conceito Visual

A aplicação terá uma estética **Premium e Romântica**:
- **Cores:** Paleta de Rose Gold, Off-white e tons profundos de vinho/bordô.
- **Tipografia:** Uso de fontes elegantes como *Playfair Display* para títulos e *Inter* para legibilidade.
- **Efeitos:** Glassmorphism (vidro fosco), animações de entrada suaves e paralaxe.
- **Hospedagem:** Preparado para deploy na **Vercel**.

## Assets Locais

As fotos enviadas em `Nosso Álbum_` serão incorporadas diretamente na pasta `public/assets` do projeto para garantir que carreguem rapidamente e funcionem no deploy.

## Funcionalidades Propostas

### 1. Hero Page (Abertura)
- Uma tela limpa com um fundo animado sutil (ex: partículas brilhantes).
- Botão central: "Destravar Nossas Memórias".
- Ao clicar, uma transição suave revela o conteúdo principal.

### 2. Linha do Tempo Interativa
- Um scroll vertical apresentando os meses de 2025.
- **Cards de Fotos:** Estilo Polaroid com legendas manuscritas.
- **Marcos do Ano:** Pequenas seções de estatísticas como:
  - "Nossas viagens: X"
  - "Nossas risadas: Infinitas"
  - "Nossos dias de 2025: 365"

### 3. Galeria de Mensagens
- Seções dedicadas a textos mais longos e cartas, aparecendo com animações de fade-in.

### 4. Encerramento (Happy 2026)
- Uma mensagem final de amor e uma contagem regressiva (ou celebração) para o novo ano.
- Botão interativo para reiniciar a jornada.

## Tecnologias

- **Vite + Vanilla JS:** Para máxima performance e controle total da DOM.
- **CSS Avançado:** Flexbox, Grid e variáveis CSS para um design responsivo e moderno.
- **GSAP (GreenSock):** Para animações de alto nível.

## Plano de Execução

### Fase 1: Fundação
- [NEW] `index.html`: Estrutura base da aplicação.
- [NEW] `style.css`: Sistema de design (tokens, cores, fontes).
- [NEW] `main.js`: Lógica de navegação e animações.

### Fase 2: Componentes
- Implementar o sistema de cards Polaroid.
- Criar a animação de "Unlock".
- Adicionar efeitos de scroll (AOS ou Intersection Observer).

### Fase 3: Detalhes e Assets
- Gerar imagens de background premium via `generate_image`.
- Adicionar suporte para o usuário inserir suas próprias URLs de fotos facilmente.

## User Review Required

> [!IMPORTANT]
> - **Fotos:** Já identifiquei as 72 fotos na pasta fornecida. Vou selecionas as melhores para a linha do tempo.
> - **Vercel:** Vou configurar o projeto com `vercel.json` para facilitar o seu deploy.
> - **Música:** Alguma música em especial? Se quiser, pode colocar o arquivo `.mp3` na pasta também!
