# Longye Tian Personal Website

This repository is being migrated to the [Minimalist Hugo Template for Academic Websites](https://github.com/pmichaillat/hugo-website), built with Hugo and the PaperMod-derived academic theme.

## Local Development

Install Hugo, then run:

```powershell
hugo server
```

The site will be served locally at:

```text
http://localhost:1313/
```

## Current Content Scope

- Home
- Research
- Teaching
- CV
- Contact

The homepage includes a linked QuantEcon affiliation instead of a separate QuantEcon route.

The current content is placeholder-safe and uses only verified details.

## Deployment

The template includes a GitHub Pages workflow in `.github/workflows/hugo.yml`. Pushes or merges to `main` build and deploy the site through GitHub Pages.
