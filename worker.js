// Karo AI — Cloudflare Worker backend
// Recommended free path: bind Cloudflare Workers AI in wrangler.toml.
// The frontend calls POST /api/chat. Your AI key must NEVER be placed in app.js.
//
// If you prefer Gemini, replace the Workers AI block with a server-side fetch
// using GEMINI_API_KEY stored as a Cloudflare secret.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const { message } = await request.json();
        if (!message || message.length > 4000)
          return json({ reply: "Please send a shorter message." }, 400);

        // Cloudflare Workers AI free allocation is available on the Workers Free plan.
        // Model below is selected for a lightweight assistant experience.
        if (env.AI) {
          const result = await env.AI.run("@cf/zai-org/glm-4.7-flash", {
            messages: [
              { role: "system", content:
                "You are Karo AI, a helpful copilot for students, software developers, cybersecurity learners and job seekers. Be concise, practical and safe. For cybersecurity, teach defensive/ethical concepts only. For jobs, never claim a listing is live unless a real job-source API/search result was provided." },
              { role: "user", content: message }
            ],
            max_tokens: 700
          });
          return json({ reply: result?.response || "I couldn't generate a response." });
        }

        return json({ reply: "Karo is running in demo mode. Connect the Workers AI binding in wrangler.toml to enable the live AI engine." });
      } catch (err) {
        return json({ reply: "The AI service is temporarily unavailable. Please try again." }, 500);
      }
    }

    return env.ASSETS ? env.ASSETS.fetch(request) : new Response("Karo AI");
  }
};

function json(data, status=200){
  return new Response(JSON.stringify(data),{
    status,headers:{"content-type":"application/json; charset=utf-8","access-control-allow-origin":"*"}
  });
}