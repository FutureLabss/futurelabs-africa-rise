# AI economy briefing launch

- `blog-post.md`: the post as written (Claude Docs export). Published as `ai-boom-short-of-cheap-money` in `src/data/blogPosts.ts`.
- `briefing.md`: the briefing text (Claude Docs export).
- `ai-economy-briefing-2026-10.pdf`: the download, rendered from `briefing.md` by `build-pdf.mjs`
  (`node ai-economy-launch/build-pdf.mjs`; needs Playwright). Upload it to the private Supabase
  `briefings` bucket; the site never serves it from `public/`.
- `screenshots/`: form, success state and blog post, captured for the PR.
