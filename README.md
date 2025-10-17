# ConcernedCarrot's Game Notes (GitHub Pages / Jekyll)

This repo is ready for GitHub Pages.
- Edit `_config.yml` (title, author, url).
- Write posts in `_posts/YYYY-MM-DD-title.md`.
- Images: `assets/img/`.
- Enable Pages: Settings → Pages → Build and deployment → Deploy from a branch → Branch: `main` (`/root`).

## Local preview (optional)
If you want to run locally:

```bash
# Ruby & Bundler required
bundle init
bundle add jekyll webrick jekyll-paginate
bundle exec jekyll serve --livereload
```