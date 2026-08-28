# Content & Data Reference

Dev reference for every file that drives page content on this site: the JSON data files
in `src/data/`, the markdown in `src/data/people_blurbs/` and `src/content/`, and the
per-project pages in `src/pages/research_pages/`.

Most page content lives in data, not markup. Adding a person, publication, or research
scope should not require touching an `.astro` file.

**Conventions used below**

- **Required** — the build breaks or the entry renders wrong without it.
- **Optional** — omit the key entirely, or set it to `null`. Both are treated the same.
- Image paths are relative to `public/`, so `public/images/foo.png` is written
  `/images/foo.png`. **Always include the leading slash** — see [Gotchas](#gotchas).

---

## `people.json`

Rendered by [`src/pages/people_index.astro`](../pages/people_index.astro).

| Key | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | ✅ | Display name, shown as the card heading. |
| `group` | string | ✅ | Which section the person appears in. See below. |
| `role` | string \| null | | Muted subtitle line, e.g. `"PhD Student, Guillaud Lab"`. Omitted → no line (used for the PIs). |
| `image` | string \| null | | Headshot path. `null` → `/images/people/generic_avatar.jpeg`. |
| `order` | number | | Sort position within the section. Missing → sorts last, then alphabetically by name. |
| `blurb` | string \| null | | Filename in [`people_blurbs/`](./people_blurbs). Missing → no bio. |
| `links` | object | | Profile links. See below. Use `{}` for none. |

### `group`

Must match a section id defined in the `sections` array in `people_index.astro`:

| `group` | Section heading |
| --- | --- |
| `pi` | Principal Investigators |
| `staff` | Staff |
| `student` | Students |
| `coop` | Past Co-op & Undergraduate Students |
| `alumni` | Alumni |

`coop` vs `alumni`: `coop` is for short-term trainees — co-op terms, summer
studentships, directed studies — who passed through without completing a degree or
position here. `alumni` is for people who finished something with the lab: a PhD or MSc,
a postdoc, a staff role. A graduated PhD student belongs in `alumni`, not `coop`.

For past members, put the dates in `role` — there is no separate date field:
`"role": "Co-op Student, Summer 2025"` or `"role": "PhD, Guillaud Lab, 2019–2025"`.

A person whose `group` matches none of these **renders nowhere and reports no error** —
check spelling first if someone vanishes.

Section order, headings, and the "nobody here yet" text are all set in that same
`sections` array. A section with an `empty` message always shows its heading; a section
with `empty: null` (currently Alumni) is hidden entirely until someone is added to it.

### `links`

Every key is optional; only the ones you fill in render. Order on the page is fixed by
the `LINK_TYPES` array in `people_index.astro`, **not** by key order in the JSON.

| Key | Value |
| --- | --- |
| `website` | Full URL |
| `email` | Bare address — `mailto:` is added automatically |
| `orcid` | Full URL, e.g. `https://orcid.org/0000-0002-1234-5678` |
| `scholar` | Google Scholar profile URL |
| `linkedin` | Full URL |
| `github` | Full URL |

All except `email` open in a new tab. To support another service, add an entry to
`LINK_TYPES` and use the same key in the JSON.

```json
{
  "name": "Jane Doe",
  "group": "student",
  "role": "MSc Student, Guillaud Lab",
  "image": "/images/people/jane.jpg",
  "order": 7,
  "blurb": "jane-doe.md",
  "links": {
    "orcid": "https://orcid.org/0000-0002-1234-5678",
    "github": "https://github.com/janedoe"
  }
}
```

---

## `people_blurbs/*.md`

One markdown file per person, holding only their bio. No frontmatter — just prose.
Referenced by the `blurb` key in `people.json`.

Markdown is compiled to HTML at build time, so `**bold**`, `[links](url)`, lists, and
multiple paragraphs all work.

A `blurb` naming a file that doesn't exist logs a build warning
(`[people] missing blurb file for <name>: <file>`) and renders an empty bio — the build
still succeeds, so watch the build output.

---

## `publications.json`

Rendered by [`src/pages/pubs.astro`](../pages/pubs.astro), grouped by year, newest first.

| Key | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | ✅ | Links to `pdf` when present. |
| `authors` | string | ✅ | `**Name**` renders bold — use it for lab members. Injected as HTML (see [Gotchas](#gotchas)). |
| `venue` | string | | Journal or conference, rendered in italics. |
| `year` | number | | Section grouping and sort order. Missing → grouped under "Unknown", so in practice always set it. |
| `pdf` | string \| null | | URL. Adds a **PDF** button. |
| `code` | string \| null | | Repo URL. Adds a **Code** button. |
| `project` | string \| null | | Project page URL. Adds a **Project** button. Supported but unused so far. |
| `image` | string \| null | | Teaser thumbnail, e.g. a journal cover. |

---

## `research_scopes.json`

Rendered by [`src/pages/research_index.astro`](../pages/research_index.astro), grouped by
`type` in alphabetical order.

| Key | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | ✅ | Links to the detail page when `slug` is set. |
| `authors` | string | ✅ | Rendered as `By: …`. Injected as HTML. Missing → renders the literal text `By: undefined`. |
| `type` | string | | Section grouping, e.g. `"Computational Analyses"`. Missing → grouped under "Other". |
| `slug` | string \| null | | Detail page name. `"foo"` → `/research_pages/foo`, from `src/pages/research_pages/foo.astro`. Omitted → title renders as plain text with no **More Info** button. |
| `image` | string \| null | | Teaser thumbnail. Supported by the template; none set currently. |

Nothing validates that `slug` points at a real page — a typo produces a 404 link. Add the
`.astro` file and the JSON entry together.

---

## `src/pages/research_pages/*.astro`

One page per research scope, named `<slug>.astro` to match the `slug` in
`research_scopes.json`. Each wraps
[`ResearchLayout`](../layouts/ResearchLayout.astro), which supplies the back link,
type label, gradient title, byline, and optional hero image:

| Prop | Required | Notes |
| --- | --- | --- |
| `title` | ✅ | Page heading and browser tab title. |
| `type` | | Small uppercase label above the title. |
| `authors` | | Byline, rendered as `By: …`. |
| `lead` | | Intro paragraph, slightly larger than body text. |
| `image` | | Hero image below the byline. |

Everything inside the component is plain HTML. These global classes are available
(defined in [`global.css`](../styles/global.css), so they work in page markup):

| Class | Use |
| --- | --- |
| `.research-figure` | `<figure>` wrapper for an image or `<video>`, with a styled `<figcaption>`. |
| `.research-grid` | Auto-fitting columns that collapse to one on narrow screens. |
| `.video-embed` | 16:9 responsive wrapper for a YouTube/Vimeo `<iframe>`. |
| `.research-callout` | Accent-bordered box for a key result or caveat. |

[`modern-machine-learning.astro`](../pages/research_pages/modern-machine-learning.astro)
is the worked example showing all four, including commented-out video embeds for both
hosted and self-hosted files.

---

## `src/content/posts/*.md` — news

Astro content collection; schema in [`src/content.config.ts`](../content.config.ts).
Listed on [`/news`](../pages/news.astro) and in the homepage sidebar (5 most recent);
each gets its own page at `/posts/<filename>`.

| Frontmatter | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | ✅ | |
| `date` | date \| string | ✅ | Drives sort order and the year grouping. |
| `image` | string | | Thumbnail in the news list. |
| `layout` | string | | Accepted by the schema but ignored — a leftover from the Jekyll site. |

The **filename becomes the URL**: `2026-02-16-spie-mi.md` → `/posts/2026-02-16-spie-mi`.
The news list shows the first 150 characters of the body as an excerpt, so lead with a
sentence that reads well truncated.

## `src/content/wiki/*.md` — wiki

Identical schema and behaviour, listed at `/wiki_index`, pages at `/wiki/<filename>`.

---

## Gotchas

**Leading slashes on image paths.** `publications.json`, `research_scopes.json`, and news
frontmatter normalize a missing leading slash. `people.json` does **not** — its `image`
is used verbatim, so `images/people/x.jpg` silently 404s. Always write `/images/…`.

**`authors` is injected as raw HTML.** `people.json` links and both `authors` fields use
`set:html` (that's what makes `**bold**` work in publications). Anything you put there is
rendered as markup, so don't paste in untrusted text.

**JSON has no comments.** Keep notes in this file instead.

**Empty vs. missing.** `null` and an absent key behave identically everywhere. `"links": {}`
is kept on people with no links purely to document that the field exists.

**Adding a section, service, or field** means editing the consuming `.astro` file —
`sections` and `LINK_TYPES` in `people_index.astro` are the two arrays most likely to need
it.

**Check the build output.** A missing blurb file warns rather than failing, and a bad
`slug` produces a dead link with no warning at all. `npm run build` catches schema errors
in `src/content/` but does **not** validate the JSON files.
