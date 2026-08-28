# NextPath Lab Website — Content Guide

The lab website, built with [Astro](https://astro.build). This guide is for lab members
adding content: **news posts, wiki entries, people, and publications.**

You do not need to know Astro, HTML, or CSS to do any of that. Adding content means
creating a markdown file or adding an entry to a data file — nothing else.

### Important Note Before You Start
This page is managed with **git** and **github** which tracks changes uploaded to **github**.
* Multiple people can upload their changes
* This can cause conflicts when multiple people edit the same file

To prevent any headaches, ALWAYS run the following before starting to make any changes:
```
$ git pull
```
This will download any changes others have made.
If this may STILL cause a conflict - which is why you should always create your OWN branch, and make a pull request.

**DO NOT COMMIT TO THE MAIN BRANCH**

Before starting your changes, run the following after `git pull`.
```
$ git switch -c <new-branch-name>
```
* You can replace `<new-branch-name>` with any name you like. This will be the branch, or 'version' used to track your own changes.
* By doing so, you are making your own unique 'version' which others do not have access to yet.
* A 'Pull Request' is a request made to the GitHub repository managers to merge your changes into the main version.

### Common files you may need to edit

| I want to… | Edit only this |
| --- | --- |
| Post a news item | a **new** `.md` file in [`src/content/posts/`](src/content/posts/) |
| Add a wiki entry | a **new** `.md` file in [`src/content/wiki/`](src/content/wiki/) |
| Add or update a person | [`src/data/people.json`](src/data/people.json) + a `.md` file in [`src/data/people_blurbs/`](src/data/people_blurbs/) |
| Add a publication | [`src/data/publications.json`](src/data/publications.json) |
| Add a research topic | [`src/data/research_scopes.json`](src/data/research_scopes.json) |
| Add an image | drop the file in [`public/images/`](public/images/) |

> ⚠️ **Everything else in this repo is site-wide.** Page layouts, styling, the nav bar, and
> config affect *every* page — a small mistake there can break the whole site for everyone.
> Please don't edit those unless you know what you're doing. See
> [What not to change](#6-what-not-to-change) if you think you need to.

---

## Contents

1. [What to install](#1-what-to-install) — Git, Node.js, an editor
2. [Getting set up](#2-getting-set-up) — clone the repo and run it locally
3. [Adding content](#3-adding-content) — **the part you actually need**
   - [Post a news item](#post-a-news-item)
   - [Add a wiki entry](#add-a-wiki-entry)
   - [Add or update a person](#add-or-update-a-person)
   - [Add a publication](#add-a-publication)
   - [Add a research topic](#add-a-research-topic)
   - [Adding images](#adding-images)
4. [Checking your work](#4-checking-your-work) — before you push
5. [Publishing your change](#5-publishing-your-change) — branch, commit, pull request
6. [What not to change](#6-what-not-to-change) — and what to do if you must
7. [Troubleshooting](#7-troubleshooting) — when something doesn't work
8. [Step-by-step walkthroughs](#8-step-by-step-walkthroughs) — **exact steps for common jobs**
   - [Add a new publication](#walkthrough-1--add-a-new-publication)
   - [Add a person](#walkthrough-2--add-a-person)
   - [Update your own profile](#walkthrough-3--update-your-own-profile)
   - [Add or update research/project content](#walkthrough-4--add-or-update-researchproject-content)

**New here?** Do sections 1–2 once, then live in section 3.

---

## 1. What to install

Two one-time installs.

### Git

Version control — how you get the site onto your machine and your changes back up.

- **macOS**: usually already installed. Check with `git --version`; if it offers to install
  developer tools, accept.
- **Windows**: install [Git for Windows](https://git-scm.com/download/win). It includes
  *Git Bash* — use that terminal for the commands in this guide.
- **Linux**: `sudo apt install git` or your distro's equivalent.

Set your name and email once so your commits are attributed to you:

```sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### Node.js (version 22.12 or newer)

The site is built with Node. Download the **LTS** build from
[nodejs.org](https://nodejs.org) — it includes `npm`, which you also need.

```sh
node -v    # must be >= 22.12.0
npm -v
```

If `node -v` reports something older, upgrade — the build refuses to run on older versions.

### A text editor

[VS Code](https://code.visualstudio.com) is a good default.

---

## 2. Getting set up

```sh
git clone https://github.com/NextPath-Lab/NextPath-Lab.github.io.git
cd NextPath-Lab.github.io
npm install
```

Run `npm install` once after cloning (and again if someone changes `package.json`).

Then start the local preview:

```sh
npm run dev
```

Open **http://localhost:4321**. Leave it running while you work — it reloads automatically
every time you save. `Ctrl+C` stops it.

---

## 3. Adding content

All of the below are additive: you're creating a new file or adding one entry to a list.
Nothing here affects any other page.

### Post a news item

Create a file in `src/content/posts/` named `YYYY-MM-DD-short-title.md`. **The filename
becomes the URL**, so keep it lowercase with hyphens.

```markdown
---
title: "Congratulations Jane on winning the Best Poster Award!"
date: 2026-05-01
---

Jane presented her work on ... at the 2026 ... conference.

You can use **bold**, *italics*, [links](https://example.com), and lists here.
```

Only `title` and `date` are required. Optionally add `image: /images/news/photo.jpg` for a
thumbnail in the news list.

It appears automatically at `/news`, grouped by year, and in the "Recent News" box on the
homepage. The news list shows the first 150 characters as a preview, so make the opening
sentence read well on its own.

### Add a wiki entry

Same as a news post, but the file goes in `src/content/wiki/` and shows up at
`/wiki_index`. Existing entries prefix the title to mark the type:

```markdown
---
title: "[Journal Club] Paper title or topic"
date: 2026-05-01
---

Your notes here.
```

### Add or update a person

Two steps.

**1.** Add an entry to [`src/data/people.json`](src/data/people.json) — copy an existing
one and edit it:

```json
{
  "name": "Jane Doe",
  "group": "student",
  "role": "MSc Student, Guillaud Lab",
  "image": "/images/people/jane-doe.jpg",
  "order": 7,
  "blurb": "jane-doe.md",
  "links": {
    "orcid": "https://orcid.org/0000-0002-1234-5678",
    "github": "https://github.com/janedoe"
  }
}
```

- `group` decides the section: `pi`, `staff`, `student`, `coop` (past co-op and
  undergraduate students), or `alumni`. **A typo here means the person silently doesn't
  appear anywhere.**
- `image` must start with `/`. Use `null` for the default avatar.
- `links` — any of `website`, `email`, `orcid`, `scholar`, `linkedin`, `github`. Use `{}`
  for none. Write `email` as a bare address.

**2.** Create `src/data/people_blurbs/jane-doe.md` with the bio — plain markdown, no
frontmatter — and make `blurb` match that filename. If you skip this, the person appears
with no bio and **no warning**.

### Add a publication

Add an entry to [`src/data/publications.json`](src/data/publications.json). Sorting and
year grouping are automatic.

```json
{
  "title": "Paper title",
  "authors": "**Jane Doe**, Martial Guillaud",
  "venue": "Journal or conference name",
  "year": 2026,
  "pdf": "https://link-to-the-paper",
  "code": "https://github.com/...",
  "image": "/images/journal-cover.jpg"
}
```

Wrap lab members' names in `**double asterisks**` to bold them. `pdf`, `code`, and `image`
are optional — use `null` or leave them out. Each link you provide adds a button.

### Add a research topic

Add an entry to [`src/data/research_scopes.json`](src/data/research_scopes.json):

```json
{
  "title": "Topic title",
  "authors": "Jane Doe (Guillaud Lab)",
  "type": "Computational Analyses"
}
```

`type` is the section heading it gets grouped under; reuse an existing one to file it
alongside related work.

Entries can also have a `slug` pointing at a full detail page in
`src/pages/research_pages/`. **Writing one of those pages is a code change** — see
[What not to change](#6-what-not-to-change). Leave `slug` out and the topic simply lists
without a "More Info" button.

### Adding images

Put the file in `public/images/` (headshots go in `public/images/people/`), then reference
it with a leading slash and **no** `public`:

| File on disk | What you write |
| --- | --- |
| `public/images/people/jane-doe.jpg` | `/images/people/jane-doe.jpg` |
| `public/images/news/poster.png` | `/images/news/poster.png` |

Paths are case-sensitive on the live server even if they work on your Mac. Resize large
photos before committing — a 10 MB photo makes the site slow for everyone.

### Where to look things up

[`src/data/README.md`](src/data/README.md) is the full reference for every data file:
which keys exist, which are required, and what happens when one is missing.

---

## 4. Checking your work

Before pushing, always:

1. **Look at it** — with `npm run dev` running, check the page at
   http://localhost:4321 (`/news`, `/people_index`, `/pubs`, …).
2. **Build it** — run `npm run build`. If this fails, the live deploy would fail too.

```sh
npm run build
```

A JSON mistake (a trailing comma, a missing quote) is the most common cause of a broken
build. Your editor usually flags it in red.

---

## 5. Publishing your change

The live site deploys from the **`main`** branch. Work on your own branch and open a pull
request so someone can glance over it first.

```sh
git checkout main
git pull                          # get everyone else's changes first

git checkout -b jane-news-post    # short name describing your change

# ...add your content, check it locally...

git add .
git commit -m "Add news post about Jane's poster award"
git push -u origin jane-news-post
```

Then open the repo on GitHub and click **Compare & pull request**.

Once merged into `main`, GitHub Actions rebuilds and publishes the site automatically —
usually a minute or two. **Nothing is public until it's merged**, so pushing your own
branch is always safe.

---

## 6. What not to change

Everything below is **site-wide**: it affects every page, and a small mistake breaks the
site for everyone. Content changes never require touching any of it.

| File / folder | What it controls |
| --- | --- |
| `src/layouts/` | The shell every page sits in |
| `src/components/` | Header, nav bar, footer, homepage sidebar |
| `src/styles/global.css` | All colours, fonts, and shared styling — both themes |
| `src/pages/*.astro` | The page templates that render the data files |
| `src/pages/research_pages/` | Individual research detail pages |
| `astro.config.mjs`, `package.json`, `tsconfig.json` | Build configuration |
| `.github/workflows/` | The deploy pipeline |
| `src/content.config.ts` | Rules for what news/wiki frontmatter is allowed |

**If you do need one of these** — a new nav item, a design tweak, a research detail page,
a whole new page — that's fine, it just deserves a second pair of eyes:

1. Ask the site maintainer first, or open a GitHub issue describing what you want.
2. Work on a branch, never commit straight to `main`.
3. Run `npm run build` and check **several** pages locally, not just the one you changed.
4. Open a pull request and have someone review it before merging.

Two things that are easy to get wrong: the light and dark themes are defined separately in
`global.css` (change a colour in one, change it in both), and `src/pages/` is the router —
renaming a file there changes or breaks a live URL.

---

## 7. Troubleshooting

**`npm run dev` fails right after cloning** — you probably skipped `npm install`.

**My change isn't showing up** — hard-refresh (`Cmd/Ctrl + Shift + R`). If it's still
missing, check the terminal running `npm run dev` for a red error message.

**A person or publication doesn't appear** — it's almost always the JSON:

- every entry wrapped in `{ }`, entries separated by commas, **no comma after the last one**
- all keys and text values in `"double quotes"` (not `'single'`)
- JSON does not allow comments
- for people: check `group` is spelled exactly `pi`, `staff`, `student`, `coop`, or `alumni`

**Someone's bio is missing** — the `blurb` filename in `people.json` must match the file in
`people_blurbs/` exactly, including the `.md`.

**An image is broken** — the path must start with `/`, must not include `public`, and is
case-sensitive.

**The build failed but I don't understand the error** — copy the full terminal message when
you ask for help; the first red line usually names the file and line number.

**The live site didn't update** — check the **Actions** tab on GitHub for a failed run, and
confirm your change was merged into `main`.

---

## 8. Step-by-step walkthroughs

Complete start-to-finish recipes for the most common jobs. Each one is self-contained —
follow it top to bottom and you're done. Section 3 explains what the fields *mean*; this
section is the order to do things in.

Every walkthrough assumes you've already done [Getting set up](#2-getting-set-up) once.

### Walkthrough 1 — Add a new publication

1. **Start from an up-to-date copy and make a branch.**
   ```sh
   git checkout main
   git pull
   git checkout -b add-publication-smith-2026
   ```
2. **Start the preview** in a second terminal, and leave it running:
   ```sh
   npm run dev
   ```
3. **(Optional) Add a cover image.** Drop it in `public/images/`, e.g.
   `public/images/journal-cover.jpg`.
4. **Open** [`src/data/publications.json`](src/data/publications.json).
5. **Copy an existing entry** — everything from one `{` to its matching `}` — and paste it
   as a new entry. Put a comma after the previous entry, and make sure the **last** entry
   in the file has no trailing comma.
6. **Fill in your details:**
   ```json
   {
     "title": "Full paper title",
     "authors": "**Jane Doe**, Martial Guillaud",
     "venue": "Journal or conference name",
     "year": 2026,
     "pdf": "https://link-to-the-paper",
     "code": "https://github.com/...",
     "image": "/images/journal-cover.jpg"
   }
   ```
   Wrap lab members' names in `**asterisks**` to bold them. Set `pdf`, `code`, or `image`
   to `null` if you don't have them.
7. **Check it** at http://localhost:4321/pubs. It files itself under the right year
   automatically.
8. **Build, then publish:**
   ```sh
   npm run build
   git add .
   git commit -m "Add Smith et al. 2026 publication"
   git push -u origin add-publication-smith-2026
   ```
9. **Open a pull request** on GitHub and ask for a review.

### Walkthrough 2 — Add a person

For someone new joining the lab.

1. **Branch:**
   ```sh
   git checkout main && git pull
   git checkout -b add-person-jane-doe
   npm run dev
   ```
2. **Add their headshot** to `public/images/people/`, e.g. `jane-doe.jpg`. Resize it first
   if it's a huge photo. Skip this step to use the default avatar.
3. **Write their bio.** Create `src/data/people_blurbs/jane-doe.md` containing just the
   text — no frontmatter, no title:
   ```markdown
   Jane is an MSc student working on ... She completed her BSc at ...
   ```
4. **Open** [`src/data/people.json`](src/data/people.json) **and copy an existing entry**,
   then edit it:
   ```json
   {
     "name": "Jane Doe",
     "group": "student",
     "role": "MSc Student, Guillaud Lab",
     "image": "/images/people/jane-doe.jpg",
     "order": 7,
     "blurb": "jane-doe.md",
     "links": {}
   }
   ```
   - `group` must be exactly one of `pi`, `staff`, `student`, `coop`, `alumni` — a typo
     means they silently don't show up anywhere.
   - `blurb` must match the filename you made in step 3, `.md` included.
   - `order` sets their position within the section.
5. **Check it** at http://localhost:4321/people_index — photo, role line, and bio should
   all appear.
6. **Build and publish:**
   ```sh
   npm run build
   git add .
   git commit -m "Add Jane Doe to the people page"
   git push -u origin add-person-jane-doe
   ```
7. **Open a pull request.**

### Walkthrough 3 — Update your own profile

Changing your photo, bio, title, or links.

1. **Branch:**
   ```sh
   git checkout main && git pull
   git checkout -b update-profile-jane
   npm run dev
   ```
2. **To change your bio** — edit your file in
   [`src/data/people_blurbs/`](src/data/people_blurbs/). That's the only file involved;
   it's plain markdown, so `**bold**`, *italics*, and [links](https://example.com) work.
3. **To change your photo** — add the new image to `public/images/people/`, then update the
   `image` value in your [`src/data/people.json`](src/data/people.json) entry. It must
   start with `/` and not include `public`.
4. **To change your title** — edit `role`, e.g. from `"MSc Student, Guillaud Lab"` to
   `"PhD Student, Guillaud Lab"`.
5. **To add profile links** — fill in the `links` object in your entry. Any of these:
   ```json
   "links": {
     "website": "https://your-site.com",
     "email": "you@bccrc.ca",
     "orcid": "https://orcid.org/0000-0002-1234-5678",
     "scholar": "https://scholar.google.com/citations?user=...",
     "linkedin": "https://www.linkedin.com/in/you/",
     "github": "https://github.com/you"
   }
   ```
   Include only the ones you want shown. Write `email` as a bare address — the `mailto:`
   is added for you.
6. **Moving on from the lab?** Change your `group` to `alumni` and put the dates in `role`,
   e.g. `"PhD, Guillaud Lab, 2021–2026"`.
7. **Check** http://localhost:4321/people_index, then:
   ```sh
   npm run build
   git add .
   git commit -m "Update Jane's profile"
   git push -u origin update-profile-jane
   ```
8. **Open a pull request.**

### Walkthrough 4 — Add or update research/project content

There are two levels here. Read 4a first — it's all most people need.

#### 4a. List a research topic *(safe — data only)*

1. **Branch:**
   ```sh
   git checkout main && git pull
   git checkout -b add-research-topic
   npm run dev
   ```
2. **Open** [`src/data/research_scopes.json`](src/data/research_scopes.json) and add an
   entry:
   ```json
   {
     "title": "Your project title",
     "authors": "Jane Doe (Guillaud Lab)",
     "type": "Computational Analyses"
   }
   ```
   Reuse an existing `type` to group your project with related work, or write a new one to
   create a new heading.
3. **Check** http://localhost:4321/research_index, then build, commit, push, and open a
   pull request as in the previous walkthroughs.

#### 4b. Write or edit a project detail page *(this is a code change)*

The "More Info" button on a research topic points at a full page under
`src/pages/research_pages/`. These are `.astro` files — editing the text inside one is
low-risk, but you are editing code, so branch and get it reviewed.
See [What not to change](#6-what-not-to-change).

**To edit an existing page:**

1. Find the topic's `slug` in `research_scopes.json` — e.g. `"slug": "my-project"` means
   the file is `src/pages/research_pages/my-project.astro`.
2. Open it. The top block sets the heading:
   ```astro
   <ResearchLayout
       title="Your project title"
       type="Computational Analyses"
       authors="Jane Doe (Guillaud Lab)"
       lead="One or two sentences summarising the project."
   >
   ```
3. Everything below that is ordinary HTML — edit the text between the tags. Leave the tags
   themselves (`<h2>`, `<p>`) intact, and don't touch the `---` block at the very top.
4. To add a figure or video, copy the patterns from
   [`modern-machine-learning.astro`](src/pages/research_pages/modern-machine-learning.astro),
   which has a worked example of each (figures, side-by-side grids, callouts, and video
   embeds — the video ones are commented out, ready to uncomment).
5. Put any images in `public/images/` and reference them starting with `/`.

**To create a new page:** copy an existing `.astro` file in that folder, rename it to
`your-slug.astro`, replace the contents, then add `"slug": "your-slug"` to that topic's
entry in `research_scopes.json`. The two must match exactly or the button leads to a
404.

6. **Always** run `npm run build` and check both `/research_index` **and** your new page
   before pushing, then open a pull request.
