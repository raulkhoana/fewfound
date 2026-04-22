# FEW FOUND — Go Live Tonight

Zero spend. Vercel + Supabase + Resend free tiers.

---

## STEP 1 — Register the domain (10 min)

Go to godaddy.com or bigrock.in → search fewfound.co → register (~₹800)

---

## STEP 2 — Supabase

1. supabase.com → Sign up → New project
   - Name: fewfound
   - Region: Asia South 1 (Mumbai)
2. SQL Editor → New query → paste supabase/schema.sql → Run
3. Settings → API → copy these three values:
   - Project URL                → NEXT_PUBLIC_SUPABASE_URL
   - anon public key            → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - service_role key (secret!) → SUPABASE_SERVICE_ROLE_KEY

---

## STEP 3 — Resend

1. resend.com → Sign up → API Keys → Create API Key → copy → RESEND_API_KEY
2. Domains → Add domain → fewfound.co → add DNS records in GoDaddy
   (Emails work before DNS verifies — just wont come from fewfound.co address yet)

---

## STEP 4 — GitHub

```bash
cd fewfound
git init
git add .
git commit -m "Few Found v1 launch"
# Create repo on github.com named fewfound, then:
git remote add origin https://github.com/YOUR_USERNAME/fewfound.git
git branch -M main
git push -u origin main
```

---

## STEP 5 — Vercel

1. vercel.com → Sign up with GitHub → Add New → Project → Import fewfound
2. Framework: Next.js (auto-detected)
3. Add ALL environment variables before clicking Deploy:

```
NEXT_PUBLIC_SUPABASE_URL         = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY    = eyJ...
SUPABASE_SERVICE_ROLE_KEY        = eyJ...  (KEEP SECRET)
RESEND_API_KEY                   = re_...
RESEND_FROM                      = hello@fewfound.co
NEXT_PUBLIC_SITE_URL             = https://fewfound.co
NEXT_PUBLIC_WHATSAPP             = 919810000000  (your number, no + or spaces)
ADMIN_PASSWORD                   = (choose something strong)
```

4. Click Deploy → wait 3 minutes

---

## STEP 6 — Custom domain

Vercel → Settings → Domains → Add fewfound.co
Add the DNS records Vercel shows you in GoDaddy.
Propagates in 15-60 minutes.

---

## STEP 7 — Go-live checklist

- [ ] /list — submit a test listing, check your email
- [ ] Supabase → providers table → your listing appears
- [ ] /verify — submit test application, check hello@fewfound.co
- [ ] /review-brand — submit anonymous review
- [ ] /admin — login with ADMIN_PASSWORD, see all data
- [ ] /sitemap.xml — renders XML
- [ ] /robots.txt — renders text
- [ ] Homepage — FEW spacing clearly visible, wordmark correct

---

## STEP 8 — First 50 listings

1. WhatsApp 10 agency founders you know — "Listed on Few Found yet?"
2. LinkedIn post to your 21K followers
3. DM 20 creators

---

## Costs at launch

Vercel: free | Supabase: free | Resend: free | Domain: ~₹800
Total: ₹800 one-time
