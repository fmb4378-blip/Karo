# DOST AI

Dost AI is a lightweight, futuristic general AI workspace for developers, cybersecurity learners, students, career builders and people who want AI to create projects from natural-language briefs.

It is intentionally **not** a movie or entertainment site and it is not a clone of another assistant. The experience is a clean AI workspace with a persistent lightweight visual field behind the page.

## Features

- General AI assistant with session conversation context
- Developer, defensive cybersecurity, study and career focus modes
- Text/document attachment support
- CV upload and career/job search
- Multi-source job aggregation through connected APIs/feeds
- AI project builder
- Sandboxed live preview
- Browser ZIP export
- Cloudflare Worker backend
- OpenRouter support + Workers AI fallback
- No frontend API keys
- Lightweight Canvas background with mobile limits, reduced motion and tab pausing
- Responsive UI from small phones to large desktop screens

## Structure

```text
DOST-AI/
├── index.html
├── style.css
├── script.js
├── README.md
├── DOST_BUILD_PROMPT.md
├── .gitignore
├── robots.txt
├── sitemap.xml
├── assets/
├── api/README.md
└── worker/
    ├── worker.js
    ├── wrangler.jsonc
    └── README.md
```

## Local preview

The static UI can be opened with any local static server. For example:

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

For the real `/api/*` endpoints, run the Cloudflare Worker through Wrangler from the `worker` directory:

```bash
cd worker
npx wrangler dev -c wrangler.jsonc
```

For the simplest full-stack development flow, deploy the Worker and access the resulting URL.

## Cloudflare deployment

Install Wrangler:

```bash
npm install -D wrangler
```

Login:

```bash
npx wrangler login
```

Add the AI secret:

```bash
npx wrangler secret put OPENROUTER_API_KEY -c worker/wrangler.jsonc
```

Optional model:

```bash
npx wrangler secret put OPENROUTER_MODEL -c worker/wrangler.jsonc
```

Add job providers:

```bash
npx wrangler secret put ADZUNA_APP_ID -c worker/wrangler.jsonc
npx wrangler secret put ADZUNA_APP_KEY -c worker/wrangler.jsonc
```

Optional:

```bash
npx wrangler secret put JOOBLE_API_KEY -c worker/wrangler.jsonc
npx wrangler secret put JSEARCH_RAPIDAPI_KEY -c worker/wrangler.jsonc
```

Deploy:

```bash
npx wrangler deploy -c worker/wrangler.jsonc
```

## GitHub

1. Create a GitHub repository.
2. Extract this project.
3. Commit and push:

```bash
git init
git add .
git commit -m "Initial Dost AI build"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Do not commit `.dev.vars`, API keys or Cloudflare secrets.

## AI provider

The browser calls `/api/chat` and `/api/generate`. The Worker calls the configured model provider.

Preferred configuration:

`OPENROUTER_API_KEY`

The default model is `openai/gpt-oss-120b`, configurable in `worker/wrangler.jsonc`.

If OpenRouter is unavailable but the Workers AI binding is available, the Worker falls back to the configured Workers AI model.

## Job search

Dost is designed as a **multi-source job discovery layer**, not a scraper that ignores site rules. It currently supports:

- Adzuna — country-based job search when credentials are configured
- Arbeitnow — public job-board feed
- Remotive — remote job feed
- Jooble — optional API key
- JSearch/RapidAPI — optional API key

Because job boards change their access rules, there is no honest way to promise every job website in every country forever. The architecture makes providers modular so more approved APIs/feeds can be added without changing the UI.

For each result, Dost returns the source and direct application/listing URL when the provider supplies one.

## CV privacy

The browser reads supported CV text for the current request. The Worker does not permanently store CVs. For production, keep logs free of document contents and add a dedicated encrypted storage workflow only if you later need user accounts or saved CVs.

## Security

- API keys stay server-side
- Input length limits
- Safe JSON errors
- CORS headers
- No sensitive request logging by the application
- Generated websites render in a sandboxed iframe
- Generated static files must not contain provider secrets
- Defensive cybersecurity mode avoids malware/credential theft/evasion/persistence/destructive guidance

## Future features

- User accounts
- Encrypted CV vault
- Saved job searches and alerts
- More official job APIs
- Browser-based code workspace
- Streaming AI responses
- Tool calling and web search
- Team workspaces
- Usage limits and billing
