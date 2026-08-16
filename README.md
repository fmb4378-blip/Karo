# Karo AI — final landing + workspace

Karo is positioned as an AI workspace for **students, developers, cybersecurity learners and job seekers**.

## Included

- Premium dark/neon landing page
- Floating 3D-style AI core built entirely with CSS
- Scroll-based sections and responsive mobile layout
- Study Mentor, Developer Copilot, Cyber Learning Lab and Career Navigator
- CV upload UI for PDF/DOCX/TXT
- Country selector
- CV signal matching demo
- AI chat endpoint
- Cloudflare Worker + Workers AI binding
- No movie-related copy or visuals

## Deploy on Cloudflare

1. Put all files in a GitHub repository.
2. In Cloudflare, create a Worker/Workers project from the repository.
3. Make sure the Worker uses `worker.js` and `wrangler.toml`.
4. The `AI` binding is declared in `wrangler.toml`.
5. Deploy.
6. Open your `workers.dev` URL.

## Free AI option

As of August 2026, Cloudflare Workers AI has a free allocation of 10,000 Neurons/day on the Workers Free plan. Some models require the Paid plan, but `@cf/zai-org/glm-4.7-flash` remains listed as available on Free.

The project therefore uses Workers AI first, so you do not expose an API key in browser JavaScript.

### Alternative: Gemini

Gemini API also has free-tier models. If you use Gemini, store the key as a Cloudflare secret, never in `app.js` or `index.html`, and call Gemini only from `worker.js`.

## Important: real job search

The UI currently demonstrates matching logic. A production job finder needs real job-source/search integrations. Do **not** scrape every website blindly.

A solid architecture is:

CV upload → text extraction → AI profile → target country → job-source APIs/search → normalize results → deduplicate → AI rank → show source + apply link.

For every result, keep:
- title
- company
- country/city/remote
- source
- published date if available
- apply URL
- match score
- matched skills
- missing skills

This makes the job finder honest and useful instead of showing fake “live” jobs.

## Next upgrades

1. Add authentication.
2. Store CV/profile only with explicit user consent.
3. Add real job APIs/search providers.
4. Add a server-side CV parser for reliable DOCX/PDF handling.
5. Add saved jobs and application tracking.
6. Add rate limiting and abuse protection.
7. Add a dedicated `/api/jobs` endpoint that aggregates and normalizes sources.
8. Add a real AI profile endpoint that returns structured skills and role recommendations.

## Security note

Never put Gemini/Groq/OpenAI keys in frontend code. Use Cloudflare secrets or server-side bindings.
