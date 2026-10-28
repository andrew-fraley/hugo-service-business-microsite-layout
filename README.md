# microsite-layout

A Hugo base layout for single-page local-service microsites (accounting, professional services, contractors, and similar businesses). The page is assembled from reusable shortcodes, and all business details live in config, so a new site is mostly a matter of editing two files.

## What's included

Shortcodes in `layouts/_shortcodes/`:

- hero
- services
- problem-solution
- process-steps
- objections
- faq
- service-area
- lead-form
- final-cta

Also included:

- Partials for head, header, footer, and SEO meta (`layouts/_partials/`)
- `robots.txt` template and sitemap generation
- Self-hosted fonts (Inter, Source Sans 3, Barlow, Barlow Semi Condensed, Lora, Plus Jakarta Sans)
- Lead form script that posts to a backend endpoint (`assets/js/lead-form.js`)

## Requirements

Hugo (extended) 0.158.0 or newer.

## Getting started

1. Edit `hugo.toml`: business name, type, URL, tagline, service area, contact info, logo, and social image.
2. Edit `content/_index.md`: hero, services, FAQ, and other section copy.
3. Replace the placeholder images in `static/images/`.
4. Set `params.leadForm.apiURL` and `params.leadForm.siteKey` to your lead-capture backend.
5. Preview with `hugo server`.
6. Build with `hugo`. Output goes to `public/`.

## Notes

- All values in `hugo.toml` are placeholders, and `apiURL` defaults to a local dev server.
- `public/` is build output and is git-ignored.
