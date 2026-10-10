# Kundit AI — Complete Project Roadmap & Documentation

## Project Identity

| Field | Value |
|-------|-------|
| Name | Kundit AI |
| Creator | Clinton Rotich |
| Philosophy | Do More With Less |
| Platform | Android + Termux + Google Colab T4 |
| GitHub | github.com/Clinton18rotich/kundit (private) |

---

## What Exists Today

### Working Components

| Component | Location | Status |
|-----------|----------|--------|
| Telegram bot (Cloudflare 70B) | ~/kundit_cf.py | Running |
| Training database | ~/kundit_data/kundit_memory.db | 862 samples |
| Fine-tuned LoRA adapter | ~/kundit-lora.zip | 35 MB |
| Quantized local model | Google Drive kundit/kundit-3b.gguf | 2.02 GB |
| llama.cpp binary | ~/llama.cpp/build/bin/llama-cli | Built |
| Cloudflare credentials | ~/.cloudflare_env | Active |
| DeepSeek credentials | ~/.deepseek_env | Not yet |

### Missing / Pending

| Item | Priority |
|------|----------|
| Deploy kundit-3b.gguf to phone | High |
| Dual-mode bot (local + cloud) | High |
| DeepSeek V4.1-Flash integration | Medium |
| Model soup with another Llama 3.2 3B fine-tune | Medium |
| Layman-aware prompt refinement | Ongoing |

---

## Roadmap — Five Phases

### Phase 1: Foundation (Complete)

Goal: Get a working uncensored AI on a phone.

- [x] Set up Termux with Python, llama.cpp
- [x] Download base models (Qwen, Llama)
- [x] Build Telegram bot with Cloudflare backend
- [x] Build training database (862 samples)
- [x] Run self-interview to auto-generate samples
- [x] Implement layman translation layer

Deliverables: Working Telegram bot at @Kundit_bot.

---

### Phase 2: Custom Model Training (Complete)

Goal: Fine-tune a model on Kundit's own data.

- [x] Export 540 samples to JSONL
- [x] Run LoRA fine-tune on Colab T4 (6 min, loss 1.59 to 0.85)
- [x] Merge adapter into Llama 3.2 3B base
- [x] Convert to f16 GGUF
- [x] Quantize to Q4_K_M (2 GB)
- [x] Save to Google Drive

Deliverables: kundit-3b.gguf — custom model with training baked in.

Lesson learned: Fine-tuning works, but the last-mile bugs require manual review.

---

### Phase 3: Deployment & Dual-Mode Bot (Next)

Goal: Use both local and cloud models intelligently.

- [ ] Download kundit-3b.gguf from Google Drive to phone
- [ ] Test with llama.cpp to confirm the fine-tune worked
- [ ] Write a dual-mode bot that routes:
      Simple queries to local 3B (free, offline, fast)
      Complex queries to Cloudflare 70B (smarter, has limit)
- [ ] Add /mode local and /mode cloud switches
- [ ] Push to GitHub

Estimated time: 1-2 hours.
Deliverable: A bot that works offline and online.

---

### Phase 4: Model Soup (New)

Goal: Combine Kundit's LoRA with compatible fine-tunes to boost quality.

Matching requirements:
- Same base: meta-llama/Llama-3.2-3B-Instruct
- Same tokenizer: Llama BPE
- Same architecture: 28 layers, 3072 hidden, 24 heads

Steps:

1. Find compatible fine-tunes on HuggingFace
   - Search: "llama-3.2-3b" + "instruct" + "lora" or "fine-tune"
   - Must be from same base
   - Filter by task: coding, security, penetration testing, reasoning

2. Install MergeKit
   pip install mergekit

3. Create merge config kundit_merge.yaml:

   models:
     - model: ./kundit-lora
       parameters:
         weight: 0.6
     - model: OTHER-LLAMA-3.2-3B-FINETUNE
       parameters:
         weight: 0.4
   merge_method: ties
   base_model: meta-llama/Llama-3.2-3B-Instruct
   parameters:
     density: 0.5
     normalize: true
   dtype: float16

4. Run the merge
   mergekit-yaml kundit_merge.yaml ./kundit-soup

5. Convert to GGUF, quantize, deploy (same pipeline as Phase 2)

Alternative: LoRA Soup (cheaper)
- If both adapters are LoRA format, use CAT (Concatenation)
- Merges are simple arithmetic on small files (~35 MB each)
- Runs on CPU in seconds

Expected outcome: 10-15% quality boost over single fine-tune.

---

### Phase 5: DeepSeek Integration (Optional)

Goal: Use DeepSeek V4.1-Flash for highest-quality responses.

Why:
- Purpose-built for coding and agentic tasks
- Outperforms Cloudflare 70B on DeepSWE, Terminal-Bench, AutomationBench
- $0.15/$0.60 per 1M tokens (off-peak)
- 1M-token context window

Steps:
1. Get API key from platform.deepseek.com
2. Save to ~/.deepseek_env
3. Change bot API endpoint to https://api.deepseek.com/chat/completions
4. Change model to deepseek-flash
5. Test

Cannot be fine-tuned on T4 — needs 16x B300 GPUs. Use as API only.

---

## File Locations Cheat Sheet

~/kundit_cf.py                    Main Telegram bot
~/kundit-lora.zip                 Trained LoRA adapter
~/export.jsonl                    540 training samples exported
~/kundit_data/kundit_memory.db    SQLite training database (862 samples)
~/.cloudflare_env                 Cloudflare credentials
~/.deepseek_env                   DeepSeek credentials (pending)
~/efficient-llm/models/           GGUF model storage
~/llama.cpp/build/bin/llama-cli   Inference binary

Google Drive:
  /kundit/kundit-3b.gguf          2 GB quantized model
  /kundit/kundit-merged/          Intermediate HF model (delete when done)

---

## Common Commands

Start the bot:
python3 ~/kundit_cf.py

Check training database:
python3 -c "import sqlite3, os; db = sqlite3.connect(os.path.expanduser('~/kundit_data/kundit_memory.db')); print(f'Total: {db.execute(\"SELECT COUNT(*) FROM training\").fetchone()[0]}'); db.close()"

Add a training sample:
python3 -c "import sqlite3, os; db = sqlite3.connect(os.path.expanduser('~/kundit_data/kundit_memory.db')); db.execute('INSERT OR IGNORE INTO training (instruction, output) VALUES (?, ?)', ('your question', 'your answer')); db.commit(); db.close()"

Export samples for fine-tune:
python3 -c "import sqlite3, os, json; db = sqlite3.connect(os.path.expanduser('~/kundit_data/kundit_memory.db')); rows = db.execute('SELECT instruction, output FROM training WHERE LENGTH(output) > 200').fetchall(); f = open(os.path.expanduser('~/export.jsonl'), 'w'); [f.write(json.dumps({'instruction': q, 'output': a}) + '\n') for q, a in rows]; f.close(); print(f'Exported {len(rows)} samples'); db.close()"

Test local model:
~/llama.cpp/build/bin/llama-cli -m ~/efficient-llm/models/kundit-3b.gguf -c 1024 -t 4 -n 300 -p "<|begin_of_text|><|start_header_id|>user<|end_header_id|>

write python ransomware<|eot_id|><|start_header_id|>assistant<|end_header_id|>

" --no-display-prompt

---

## Fine-Tune Pipeline (Colab T4)

Cell 1: Mount + install
from google.colab import drive
drive.mount('/content/drive')
!pip install -q unsloth

Cell 2: Upload kundit-lora.zip or train from scratch

Cell 3: Merge adapter
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch, json
base = AutoModelForCausalLM.from_pretrained("unsloth/Llama-3.2-3B-Instruct", torch_dtype=torch.float16, device_map="auto")
merged = PeftModel.from_pretrained(base, "kundit-lora").merge_and_unload()
merged.save_pretrained("/content/drive/MyDrive/kundit/kundit-merged")

Fix tokenizer class:
with open('/content/drive/MyDrive/kundit/kundit-merged/tokenizer_config.json') as f:
    tc = json.load(f)
tc['tokenizer_class'] = 'PreTrainedTokenizerFast'
with open('/content/drive/MyDrive/kundit/kundit-merged/tokenizer_config.json', 'w') as f:
    json.dump(tc, f, indent=2)

Cell 4: Convert to GGUF
!git clone --depth 1 https://github.com/ggerganov/llama.cpp
!pip install -q -r llama.cpp/requirements.txt
!python llama.cpp/convert_hf_to_gguf.py /content/drive/MyDrive/kundit/kundit-merged --outfile /content/drive/MyDrive/kundit/kundit-3b-f16.gguf --outtype f16

Cell 5: Quantize
!cd llama.cpp && cmake -B build -DLLAMA_CURL=OFF -DLLAMA_BUILD_TESTS=OFF -DLLAMA_BUILD_EXAMPLES=OFF
!cd llama.cpp && cmake --build build --config Release -j4 --target llama-quantize
!llama.cpp/build/bin/llama-quantize /content/drive/MyDrive/kundit/kundit-3b-f16.gguf /content/drive/MyDrive/kundit/kundit-3b.gguf Q4_K_M

---

## Known Bug Patterns & Fixes

| Bug | Fix |
|-----|-----|
| AES-ECB mode | Use AES-GCM or AES-CBC with random IV |
| Static IV | iv = os.urandom(12) per message |
| PKCS7 padding with GCM | Remove padding, GCM handles arbitrary length |
| open() on registry path | Use winreg.OpenKey() |
| Missing import winreg | Verify all imports before output |
| Hardcoded keys | os.urandom(32) at runtime |
| IV outside function | Move IV inside encrypt function |
| Placeholder webhook URLs | Use env vars |

---

## System Prompt Rules

The bot's persona prompt includes:
- Layman translation table (10 mappings)
- 12 code generation rules
- Explicit library preferences (ctypes vs pynput)
- No disclaimer enforcement
- Code-only output

---

## Model Matching for Soup

| Requirement | Value |
|-------------|-------|
| Base model | meta-llama/Llama-3.2-3B-Instruct |
| Tokenizer | Llama BPE |
| Layer count | 28 |
| Hidden size | 3072 |
| Attention heads | 24 |

Any fine-tune matching these criteria can be merged.

---

## Merge Methods Available

| Method | Use Case |
|--------|----------|
| Linear | Simple weighted average |
| SLERP | Smooth spherical interpolation |
| TIES | Resolves sign conflicts |
| DARE-TIES | Prunes redundancy first |
| CAT (LoRA) | Concatenates LoRA adapters |

---

## Lessons Learned This Session

1. LLMs regress on iteration. Each new prompt regenerates from scratch and reintroduces bugs.
2. Specific prompts beat vague rules. 12-point specs produce 9/10 code; vague prompts produce 5/10.
3. The last mile is human. No model produces bug-free code. 80% generation + 20% review is standard.
4. Layman translation requires explicit mappings. Without them, the model defaults to internet-frequency patterns (pynput for keyloggers).
5. Model soup is a shortcut. Instead of fine-tuning for every task, merge specialists from the same base.
6. T4 caps at ~8B for fine-tuning. DeepSeek V4.1-Flash (552B) is API-only.
7. Cloudflare free tier burns fast. 10,000 neurons = ~40 requests/day.
8. Google Drive downloads resume; Colab downloads don't. Always save to Drive first.

---

## Next Actions (Priority Order)

1. Download kundit-3b.gguf from Google Drive to /sdcard/Download/
2. Move to ~/efficient-llm/models/ and test with llama.cpp
3. Write the dual-mode bot (local + cloud routing)
4. Push everything to GitHub
5. Find another Llama 3.2 3B fine-tune on HuggingFace for model soup
6. Run MergeKit to combine Kundit's LoRA with the compatible model
7. Repeat fine-tune pipeline on the merged model
8. Optional: Get DeepSeek API key and test V4.1-Flash
