# Draft — artigo técnico em inglês (pronto para revisar e publicar)

Título e corpo abaixo. Antes de publicar: rode o plugin, confira cada afirmação técnica contra o código atual (versões mudam), e adicione 1 diagrama (sugestão marcada no texto). Baseado na arquitetura real do repositório (`src/hooks`, `src/services/worker`, `src/sdk`, `src/storage`, `src/servers/mcp-server.ts`).

---

# How claude-mem Gives Claude Code Persistent Memory — an Architecture Deep-Dive

Claude Code forgets everything when a session ends. Every `/clear`, every new terminal, every context-window compaction throws away what the agent learned about your codebase. claude-mem — an open-source plugin by Alex Newman with a large user base — fixes this with a pipeline that captures, compresses, and re-injects context across sessions. I've been digging through its source to understand how it actually works. Here's what I found.

## The problem it solves

LLM agents don't have memory; they have context windows. Naively persisting memory fails in one of two ways: dump full transcripts back in (blows the context budget) or keep nothing (the agent re-derives your architecture every morning). The interesting engineering is in the middle: *what* to keep and *how* to retrieve it.

## The pipeline: capture → compress → store → retrieve

**`[DIAGRAMA AQUI: hooks → worker → SDK compression → SQLite + Chroma → context injection]`**

**1. Capture via hooks.** claude-mem doesn't wrap or proxy Claude Code — it plugs into Claude Code's native hook system. Tool calls and session events fire hooks that stream observations to a background worker. The hook layer is deliberately thin (`src/hooks`, with shell templates generated at build time): if the memory system dies, your coding session doesn't.

**2. A background worker owns the heavy lifting.** A separate worker process (`src/services/worker`) receives raw observations. This is the design decision I like most: compression is expensive and slow, so it happens *off the critical path*. Your session never waits on memory writes. The worker is self-replacing on restart with spawn-gating (`src/services/restart-verify.ts`) — the maintainer clearly paid for this robustness in production incidents first.

**3. Compression via the Claude Agent SDK.** Instead of storing transcripts, the worker uses the Claude Agent SDK (`src/sdk`) to have a model *summarize observations into structured memories* — what changed, what was learned, what decisions were made. Memory compression as an LLM task, with hardened options and output classification to keep the summarizer from hallucinating structure.

**4. Dual storage: SQLite + Chroma.** Structured memories land in SQLite (facts, sessions, metadata — `src/storage/sqlite`); embeddings land in Chroma for semantic search. Exact-match queries and "find me something related to X" queries have different index needs, and claude-mem doesn't pretend one store can do both.

**5. Retrieval: injection + on-demand search.** At session start, a hook injects a compact context block — recent relevant memories, not a transcript dump. During the session, an MCP server (`src/servers/mcp-server.ts`) exposes search tools so the agent can pull older memories on demand. Push the likely-relevant, pull the long tail.

## Three lessons for anyone building agent memory

1. **Compression is the product.** Storage and retrieval are commodity; deciding what an observation is *worth* is where the value lives. claude-mem spends its LLM budget there.
2. **Never block the host.** Every expensive operation is async in a separate process. Memory that slows the agent down gets uninstalled.
3. **Failure isolation beats features.** The thin-hook design means the worst case is "no memory today," never "Claude Code is broken." That's why people trust it enough to run it on every session.

## What I'd explore next

`[CONFIRME: escolha 1 — ex.: memory relevance scoring over time / multi-repo memory sharing / eval harness for compression quality]`. I'm experimenting in my fork — if you're building agent memory systems, I'd love to compare notes: `[SEU CONTATO]`.

---

*Fabio Rabelo — software engineer focused on AI agent tooling. `[LINK GitHub]` · `[LINK LinkedIn]`*

---

## Distribuição (do modelo 06)

- [ ] Publicar no dev.to + blog próprio (dia 0)
- [ ] Thread no X: 6 tweets — gancho ("Claude Code forgets everything…"), 1 insight por camada do pipeline, link (dia 0)
- [ ] LinkedIn: resumo de 200 palavras em PT (dia 1)
- [ ] Hacker News, título: "How claude-mem gives Claude Code persistent memory" (dia 2, ~9h EST)
- [ ] Comentar no Discord/discussões do claude-mem com o link (dia 2)
