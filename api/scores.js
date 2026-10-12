/*
 * 반응속도 테스트 랭킹 (TOP 5)
 * ─────────────────────────────────────────────
 *  GET  /api/scores          → 상위 5개 기록
 *  POST /api/scores { times: [5개 기록(ms)] } → 기록 저장 후 상위 5개
 *
 *  저장소: Vercel 프로젝트에 연결한 Upstash Redis (무료)
 *  Vercel이 자동으로 넣어주는 환경 변수를 읽어요.
 *  이름이나 개인 정보는 저장하지 않아요. 기록(ms)과 날짜만 남아요.
 */
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const KEY = "reaction:top";
const KEEP = 5;
const ROUNDS = 5;
const MIN_MS = 100;   // 사람이 낼 수 없는 기록은 받지 않아요
const MAX_MS = 1500;
const PER_MINUTE = 10; // 같은 기기에서 1분에 저장할 수 있는 횟수

async function redis(commands) {
  const r = await fetch(URL_ + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(commands)
  });
  if (!r.ok) throw new Error("redis " + r.status);
  return (await r.json()).map((x) => x.result);
}

function toList(flat) {
  const out = [];
  for (let i = 0; i < (flat || []).length; i += 2) {
    const ts = parseInt(String(flat[i]).split("-")[0], 10);
    out.push({ ms: Math.round(Number(flat[i + 1])), at: Number.isFinite(ts) ? ts : null });
  }
  return out;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!URL_ || !TOKEN) return res.status(503).json({ error: "not_configured" });

  try {
    if (req.method === "GET") {
      const [flat] = await redis([["ZRANGE", KEY, 0, KEEP - 1, "WITHSCORES"]]);
      return res.status(200).json({ top: toList(flat) });
    }

    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      const times = Array.isArray(body && body.times) ? body.times.map(Number) : [];
      const ok = times.length === ROUNDS && times.every((t) => Number.isFinite(t) && t >= 80 && t <= 3000);
      if (!ok) return res.status(400).json({ error: "invalid" });
      const avg = times.reduce((a, b) => a + b, 0) / ROUNDS;
      if (avg < MIN_MS || avg > MAX_MS) return res.status(400).json({ error: "out_of_range" });

      const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
      const rlKey = "reaction:rl:" + ip;
      const [count] = await redis([["INCR", rlKey], ["EXPIRE", rlKey, 60]]);
      if (count > PER_MINUTE) return res.status(429).json({ error: "too_many" });

      const member = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
      const score = Math.round(avg * 10) / 10;
      const result = await redis([
        ["ZADD", KEY, score, member],
        ["ZREMRANGEBYRANK", KEY, KEEP, -1],
        ["ZRANGE", KEY, 0, KEEP - 1, "WITHSCORES"],
        ["ZRANK", KEY, member]
      ]);
      const rank = result[3] === null || result[3] === undefined ? null : Number(result[3]) + 1;
      return res.status(200).json({ top: toList(result[2]), rank: rank });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method_not_allowed" });
  } catch (e) {
    return res.status(500).json({ error: "server" });
  }
};
