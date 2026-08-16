# Dost AI Worker

Cloudflare Worker API for the Dost AI frontend.

## Endpoints

- `GET /api/health`
- `POST /api/chat`
- `POST /api/generate`
- `POST /api/jobs`

## AI secrets

Required for live model responses:

```bash
npx wrangler secret put OPENROUTER_API_KEY -c worker/wrangler.jsonc
```

Optional model override:

```bash
npx wrangler secret put OPENROUTER_MODEL -c worker/wrangler.jsonc
```

Workers AI is configured as a fallback through the `AI` binding in `wrangler.jsonc`.

## Job-source secrets

Adzuna:

```bash
npx wrangler secret put ADZUNA_APP_ID -c worker/wrangler.jsonc
npx wrangler secret put ADZUNA_APP_KEY -c worker/wrangler.jsonc
```

Optional Jooble:

```bash
npx wrangler secret put JOOBLE_API_KEY -c worker/wrangler.jsonc
```

Optional JSearch/RapidAPI:

```bash
npx wrangler secret put JSEARCH_RAPIDAPI_KEY -c worker/wrangler.jsonc
```

The Worker never sends these secrets to the browser.

## Job aggregation

Dost combines connected providers such as Adzuna, Arbeitnow and Remotive and can optionally add Jooble/JSearch. It does **not** scrape every job site indiscriminately; sources must expose a usable API/feed or be connected through an approved provider. This is safer, more stable and more respectful of provider terms.
