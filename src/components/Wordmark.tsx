# Few Found — Full Website Stress Test Report
**Date:** 22 April 2026  
**Tested by:** CTO / CMO / Product / CX / Data / CFO  
**Status:** LIVE at fewfound.co

---

## CRITICAL BUGS — Fix today

### 1. /list and /verify show "Loading..." only (SEO catastrophe)
**What happens:** Both pages render only "Loading..." when crawled by Google or fetched without JavaScript. The form never renders for server-side crawlers.  
**Why it kills you:** Google cannot index these pages. Anyone sharing the link on WhatsApp sees a blank page in preview. Search ranking is zero.  
**Fix:** Convert list and verify forms from 'use client' to server-rendered with progressive enhancement, or add a static fallback.  
**Priority:** P0 — fix before LinkedIn post.

### 2. Stats show 0 / 0 / 0 on homepage
**What happens:** "0 Providers listed / 0 Verified / 0 Brands" appears above the fold on the homepage.  
**Why it kills you:** First thing every visitor sees is that nobody is using the platform. Trust destroyed in 2 seconds.  
**Fix:** Hide stats section entirely until you have 25+ listings. Replace with one strong social proof line instead.  
**Priority:** P0 — fix today.

### 3. Scalemind Media listed as "The best agency in India"
**What happens:** Your own test listing with bio "The best agency in India" is live and visible to everyone.  
**Why it kills you:** Looks amateur. Undermines the credibility of a platform built on verified claims. First real listing a visitor sees is a joke bio from the founder.  
**Fix:** Delete this listing from Supabase immediately. Relist ScaleMind with a proper bio.  
**Priority:** P0 — fix right now.

### 4. Confirmation emails not arriving
**What happens:** Resend is configured with hello@fewfound.co as sender but the domain is not verified with Resend. All emails are silently failing.  
**Why it kills you:** Every person who lists gets no confirmation. They think the form failed. They leave. You lose them.  
**Fix:** Either verify fewfound.co domain in Resend OR change RESEND_FROM to onboarding@resend.dev in Vercel env vars temporarily.  
**Priority:** P0 — fix today.

### 5. Page title duplication across site
**What happens:** Multiple pages show "| Few Found | Few Found" — double brand name in title tags.  
Example: "About Few Found | Few Found | Few Found" and "Marketing Agencies in India | Few Found | Few Found"  
**Why it kills you:** Looks broken. Google sees duplicate title tags. Reduces click-through from search results.  
**Fix:** One-line fix in each page's metadata.  
**Priority:** P1.

---

## HIGH PRIORITY — Fix this week

### 6. Profile pages are too thin — no brand would make a decision from them
**What the FuelMyApp profile shows:** Name, category, city, bio, website link. That is all.  
**What is missing:** Logo, LinkedIn URL, team size, founded year, notable clients, multiple skillsets.  
**Impact:** A brand landing on a profile page has insufficient information to shortlist. They leave without acting.  
**Fix:** Add LinkedIn URL and multiple skillsets to the list form. Logo upload after Cashfree approves.

### 7. Category grid on homepage is overwhelming
**What happens:** 9 category groups × 4-6 links each = 54 category links on the homepage. Plus 12 city links. The page never ends.  
**Impact:** Users don't know where to look. High bounce rate.  
**Fix:** Cut to 6 featured categories max. Add a "Browse all categories" link. Let the directory pages do this work.

### 8. /list page "Loading..." is a conversion killer on mobile
**What happens:** The form is client-side only. On slow mobile connections it shows "Loading..." for 2-3 seconds before the form appears.  
**Impact:** Anyone clicking your LinkedIn post on mobile sees a blank page. They leave before the form loads.  
**Fix:** Add a skeleton loader or convert to server-rendered form.

### 9. Search box on homepage does nothing visible
**What happens:** The search form submits to /agencies?q= which is correct. But there's no visual feedback that it worked. No autocomplete. No suggestions.  
**Impact:** Users don't know if it's working. Abandonment at the most important interaction on the page.  
**Fix:** Add a loading state and redirect confirmation. Long-term: live search with Supabase.

### 10. For-brands page has a "v" prefix on all feature bullets
**What happens:** The checkmarks on the For Brands page show as "v" (literal letter v) instead of a tick symbol.  
Example: "vFull verified profiles with score bands" — looks broken.  
**Impact:** The most important sales page on the site looks like it has a bug. Brand buyers see this.  
**Fix:** Replace "v" with a proper checkmark character in the for-brands page code.

### 11. No way to edit a listing after submission
**What happens:** Once you submit the list form, there is no way to update your bio, add your website, fix a typo, or add your LinkedIn. No login. No edit flow.  
**Impact:** Providers who listed with placeholder content (like "Hi" in the bio) are stuck with that forever.  
**Fix:** Add an edit link in the confirmation email: "Edit your profile — click here." Goes to a pre-filled form with a secret token.

---

## MEDIUM PRIORITY — Fix this month

### 12. /agencies shows test listing "Scalemind Media — The best agency in India"
Already covered in Critical #3 but worth noting: this is the second most visible page after the homepage. First real listing visible is embarrassing.

### 13. Footer "Operated by Scalemind Media" missing on homepage
The homepage footer still shows "© 2026 Few Found. All rights reserved." without "Operated by Scalemind Media." Every other page has it. Inconsistent. Cashfree will flag this.

### 14. No Privacy Policy page
Cashfree and any serious brand will look for a privacy policy. You have Terms and Refund Policy but no Privacy Policy. DPDP Act 2023 compliance requires this.  
**Fix:** Build /privacy-policy page. I can generate this in 30 minutes.

### 15. /verification-standards page title triple-duplicated
Title shows "Verification Standards - Few Found | Few Found | Few Found". Three instances of Few Found.

### 16. Verification standards page: star renders as asterisk
The ✦ badge symbol in "✦ FEW FOUND VERIFIED" shows as a plain asterisk on the verification standards page. The badge identity is broken on its own explanation page.

### 17. Review a brand form — radio buttons show all options inline
The payment timing, brief quality, approval speed, and would work again options appear as plain text links, not proper radio button UI. Looks like broken HTML on desktop.

### 18. No WhatsApp button visible on desktop listing pages
The floating WhatsApp button exists but on the agency listing and profile pages the user has scrolled far from the top with no visible contact option. The WhatsApp button at bottom-left is easy to miss.

### 19. City filter on /agencies uses query params but breadcrumb links use path params
Example: Clicking "Delhi" in sidebar goes to /agencies?city=delhi but clicking Delhi in the homepage category section goes to /agencies/delhi. Two URLs for the same page. Confusing for SEO.

### 20. No 404 page
Visiting a non-existent URL gives Next.js default 404. No branding. No navigation. No CTA to list. Every 404 is a lost visitor.  
**Fix:** Build a branded 404 page with "Page not found — but you can list here" CTA.

---

## DATA AND ANALYTICS — Flying blind

### 21. Zero analytics installed
You have no idea how many people are visiting, where they come from, which pages they visit, where they drop off, or which categories get searched.  
**Fix:** Add Vercel Analytics (free, one click in Vercel dashboard) today. Takes 2 minutes.

### 22. No search query logging
When someone searches for "influencer marketing Mumbai" you have no record of it. You cannot see what brands are looking for. You cannot prioritise which city-category combinations to acquire first.  
**Fix:** Log search queries to Supabase with timestamp. Simple API call addition.

### 23. No profile view tracking
Providers have no visibility into whether their profile is being seen. This is your #1 retention hook and it does not exist.  
**Fix:** Increment a view counter in Supabase on each profile page load. Show it on the profile.

---

## CONTENT AND COPY ISSUES

### 24. Homepage hero: "The brands making the best hiring decisions are already here"
This is factually false. No brands are here yet. If a brand reads this and checks, they find 2 listings — one of which is "The best agency in India."  
**Fix:** Change to: "Built for brands who are tired of hiring based on decks. And for providers who deserve to be found based on truth."

### 25. How it works Step 02: "5 to 7 days"
References automated follow-ups that are not actually built yet. You are promising automation you do not have.  
**Fix:** Change to "5 to 21 days depending on reference response time."

### 26. Verification standards: "Automated follow-ups on days 3, 7, and 14"
Same issue — this automation is not built. You are publishing a standard you cannot fulfil yet.  
**Fix:** Either build it or change copy to "Follow-ups sent by the Few Found team."

### 27. For-brands page: "Shortlist service — submit a brief, receive curated matches"
This service does not exist yet. No brief submission form. No matching system. No curated response workflow.  
**Fix:** Either build it or change copy to "coming soon" or remove it until it exists.

---

## UX IMPROVEMENTS

### 28. List form success screen misses a sharing moment
After listing, success screen says "You are listed" but does not give the user a shareable profile link prominently. That link is the one thing they want. Make it the biggest element on the success screen with a "Copy link" button and "Share on LinkedIn" button.

### 29. Verify form asks for references before payment commitment
Users land on /verify, see a long form asking for two reference names and emails, and leave. They are not ready to commit to hunting down reference contact details before they have even decided to pay.  
**Fix:** Two-step verify flow. Step 1: Name, email, type, payment. Step 2 (after payment): Add references.

### 30. No loading state on form submissions
Clicking "List as Agency — Free" shows "Submitting..." text but no visual progress. On slow connections users click again, creating duplicate submissions.  
**Fix:** Disable button + spinner on submit. Already partially done but needs testing.

### 31. Mobile nav not implemented
The Header component has mobile nav code but the hamburger icon is not visible — the nav just collapses with no way to access it on mobile.  
**Fix:** Add hamburger icon that toggles the mobile menu.

---

## SEO ISSUES

### 32. Homepage canonical URL
Homepage meta canonical points to https://fewfound.co but the site redirects to www.fewfound.co. Canonical mismatch. Google may index both versions.  
**Fix:** Set canonical to https://www.fewfound.co consistently.

### 33. No structured data on listing pages
Provider profile pages have JSON-LD schema but it is rendering the same generic OrgSchema on every page. Individual provider schemas are in the code but not confirmed working.

### 34. Sitemap.xml not verified in Google Search Console
The sitemap exists at /sitemap.xml but has not been submitted to Google Search Console. You are not being crawled efficiently.  
**Fix:** Set up Google Search Console, verify ownership, submit sitemap.

---

## SUMMARY SCORECARD

| Area | Score | Verdict |
|---|---|---|
| Core listing flow | 6/10 | Works but email broken, no editing |
| Homepage | 4/10 | Stats at 0, too long, test listing visible |
| Profile pages | 4/10 | Too thin to drive decisions |
| Verify flow | 5/10 | Form works, process incomplete |
| For brands page | 6/10 | Good copy, broken checkmarks, promises unbuilt features |
| Review a brand | 7/10 | Works, good concept |
| Mobile experience | 3/10 | Form loads slow, no mobile nav, not tested |
| SEO | 3/10 | No analytics, canonical issues, title duplication |
| Content accuracy | 5/10 | Promises automation that doesn't exist |
| Overall | **4.7/10** | Functional but not ready for scale |

---

## IMMEDIATE ACTION LIST — In order

1. Delete "The best agency in India" listing from Supabase NOW
2. Fix RESEND_FROM to onboarding@resend.dev in Vercel (emails working)
3. Add Vercel Analytics (2 minutes, free)
4. Hide stats section on homepage until 25+ listings
5. Fix "v" checkmarks on For Brands page
6. Fix page title duplication (| Few Found | Few Found)
7. Add LinkedIn URL field to list form
8. Build Privacy Policy page
9. Cut homepage category grid to 6 items
10. Fix mobile navigation hamburger

**Do not post on LinkedIn until items 1-5 are done.**

