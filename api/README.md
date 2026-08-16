# API contract

## POST /api/chat

```json
{"prompt":"Explain zero trust","mode":"cyber","history":[]}
```

Returns:

```json
{"success":true,"answer":"...","provider":"OpenRouter"}
```

## POST /api/generate

```json
{"prompt":"Build a responsive portfolio","type":"website"}
```

Returns a structured file array for the browser preview/ZIP.

## POST /api/jobs

```json
{"country":"PK","role":"frontend developer","resumeText":"..."}
```

Returns normalized jobs with source, match score and application URL.
