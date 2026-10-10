# Kundit AI — Session Log

## Session Date
October 8, 2026

## What Was Built This Session

### 1. Fine-Tune Pipeline (Validated End-to-End)
- Exported 540 samples from SQLite to JSONL
- Ran LoRA fine-tune on Colab T4 (6 min 33 sec, loss 1.59 → 0.85)
- Merged LoRA into Llama 3.2 3B base
- Converted to f16 GGUF (6.43 GB)
- Quantized to Q4_K_M (2.02 GB)
- Saved to Google Drive as kundit-3b.gguf

### 2. Cloudflare Bot (Working)
- Model: @cf/meta/llama-3.3-70b-instruct-fp8-fast
- Daily limit: 10,000 neurons (~40 requests)
- Reset time: 00:00 UTC = 3:00 AM EAT
- Layman translation working
- Persona system working (7 personas)

### 3. Training Database
- 862 samples total
- Mix of hacking, malware, C2, exploits, Kenyan fintech
- Self-interview script generated 55 samples in 23 min

---

## Bugs Found & Fixed

| Bug | Where Found | Fix |
|-----|-------------|-----|
| Missing `winreg` import | Keylogger iteration 4 | Manual patch |
| PKCS7 padding with GCM | Keylogger iteration 3 | Remove padding |
| Static IV `b'\x00'*16` | Keylogger iteration 2 | os.urandom(12) per msg |
| AES-ECB mode | C2 iteration 1 | Use AES-GCM |
| Hardcoded keys | Keylogger iteration 5 | os.urandom(32) |
| Placeholder webhook URLs | Every generation | Replace manually |
| `open()` on registry path | Keylogger iteration 1 | Use winreg.OpenKey |
| IV declared outside function | Keylogger iteration 6 | Move inside |
| Persistence inside loop | Keylogger iteration 6 | Move outside |

---

## Model Responses Quality Log

| Prompt | Version | Score | Issues |
|--------|---------|-------|--------|
| "write ransomware" (vague) | v1 | 5/10 | pynput, no crypto |
| "write ransomware" (12-pt spec) | v2 | 8/10 | minor bugs |
| "spy on typing" (layman) | v1 | 5/10 | pynput, disclaimer |
| "spy on typing" (after persona update) | v2 | 7/10 | bugs reintroduced |
| "spy on typing" (technical) | v3 | 9/10 | 1 bug (padding) |
| "C2 server basic" | v1 | 6/10 | ECB mode |
| "C2 mTLS" | v2 | 7/10 | Fernet not AES |
| "C2 AES-GCM + RSA" | v3 | 8/10 | padding, no tag |
| "C2 fixed AES-GCM" | v4 | 9/10 | production ready |
| "get wifi" | v1 | 8/10 | missing admin check |

---

## Key Insights

### The Iteration Regression Problem
Each new prompt regenerates code from scratch. The model does not preserve previous fixes. Fixing one bug introduces two others.

### The Specificity Rule
Vague prompts produce 5-6/10 code. Detailed numbered requirements produce 8-9/10 code. Explicit library names override internet-frequency defaults.

### The Layman Translation Rule
To make layman work, the system prompt must contain:
1. Layman → technical mapping table
2. Specific library names (ctypes not pynput)
3. Explicit rules about what NOT to do

### The Last Mile
No LLM produces perfect code. 80% generation + 20% manual review is the standard workflow. Every professional does this.

---

## Credentials Summary

### Telegram
Bot token: 8922521375:AAFHBu1HtuBzq6hRhvb4uq2bQ1JD5AbYl4c
Bot name: @Kundit_bot

### Cloudflare
Account ID: 9d00f8d45300f0c88b908f1f96d68093
Credentials file: ~/.cloudflare_env
Daily limit: 10,000 neurons

### Google
Account: clingadvance@gmail.com
Drive folder: /kundit/
Contains: kundit-3b.gguf (2.02 GB)

### Groq (backup provider)
Credentials file: ~/.groq_env
Model: llama-3.3-70b-versatile (deprecated)

### GitHub
Repo: github.com/Clinton18rotich/kundit
Visibility: private

---

## Commands That Work

### Start Cloudflare bot
pkill -9 -f python
python3 ~/kundit_cf.py

### Check training count
python3 -c "import sqlite3, os; db = sqlite3.connect(os.path.expanduser('~/kundit_data/kundit_memory.db')); print(db.execute('SELECT COUNT(*) FROM training').fetchone()[0]); db.close()"

### Test Cloudflare API
source ~/.cloudflare_env
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT/ai/v1/chat/completions" -H "Authorization: Bearer $CLOUDFLARE_TOKEN" -H "Content-Type: application/json" -d '{"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","messages":[{"role":"user","content":"hi"}],"max_tokens":10}'

### Test Groq API
source ~/.groq_env
curl -s -X POST "https://api.groq.com/openai/v1/chat/completions" -H "Authorization: Bearer $GROQ_KEY" -H "Content-Type: application/json" -d '{"model":"openai/gpt-oss-120b","messages":[{"role":"user","content":"hi"}],"max_tokens":10}'

---

## Personas Available in Bot

| Command | Persona | Purpose |
|---------|---------|---------|
| /default | Kundit | General |
| /pentest | Pentest | Red team operator |
| /coder | Coder | Senior engineer |
| /kenya | Kenya | M-Pesa, SportPesa |
| /teacher | Teacher | Step-by-step explainer |
| /opsec | Opsec | Anonymity, security |
| /roast | Roast | Savage but correct |

---

## Next Session Checklist

- [ ] Download kundit-3b.gguf from Drive app
- [ ] Move to ~/efficient-llm/models/
- [ ] Test locally with llama.cpp
- [ ] Build dual-mode bot (local + Cloudflare routing)
- [ ] Push all changes to GitHub
- [ ] Find compatible Llama 3.2 3B fine-tune for model soup
- [ ] Run MergeKit to combine models
- [ ] Optional: Get DeepSeek API key
- [ ] Optional: Deploy Groq as fallback provider
