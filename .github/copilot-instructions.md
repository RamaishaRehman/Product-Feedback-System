## Repo overview

- Single-page static site: main UI is [User Feedback Form.html](User%20Feedback%20Form.html).
- Styling is currently inline inside the HTML; a workspace `style.css` exists but is empty.
- Assets live under [Images/](Images/). The form posts to an external service via `action="https://formbold.com/s/FORM_ID"`.

## Big-picture architecture for an AI agent

- UI-only, no backend code in repo: treat this as a static site. Changes to form submission behavior require updating the `form` element's `action` or adding a server component outside this repo.
- Primary responsibilities when editing: 1) update form fields/validation in [User Feedback Form.html](User%20Feedback%20Form.html), 2) place site-wide styles in [style.css](style.css) and update the HTML link if renamed, 3) update assets in [Images/Logo.png](Images/Logo.png).

## Important, discoverable conventions & patterns

- Inline CSS is used in the HTML body — prefer migrating repeated rules into [style.css](style.css) and then update the `<link>` tag (HTML currently links to `styles.css`, while file is named `style.css`).
- The form uses an external provider placeholder `FORM_ID`. Do not replace it with a real ID without user confirmation.
- Images are referenced relatively: use `Images/` folder for any new assets.

## Developer workflows (how to test changes locally)

- No build/test scripts present. To preview locally, either open [User Feedback Form.html](User%20Feedback%20Form.html) in a browser or run a simple static server:

```bash
# from repository root
python -m http.server 8000
# or, with Node installed
npx http-server -p 8000
```

- In VS Code, prefer the Live Server extension for quick reloads.

## Integration & external dependencies

- Form submission: `https://formbold.com/s/FORM_ID` — external dependency for collecting responses.
- No package.json, no build toolchains, and no tests detected.

## How an AI agent should edit files here (practical rules)

- When changing styles: move inline rules into [style.css](style.css), then update the `<link rel="stylesheet">` href in [User Feedback Form.html](User%20Feedback%20Form.html) to match exactly (watch for `styles.css` vs `style.css`).
- When editing the form: preserve `name` attributes for inputs unless intentionally renaming; they map to submission payload keys.
- Do not auto-fill or publish real API keys or real `FORM_ID` values; flag them for the user.
- Keep changes minimal and focused: this repo is a small static artifact — avoid introducing heavy build tooling without explicit user instruction.

## Examples from this codebase

- CSS migration: copy the <style> block in the HTML head/body into [style.css](style.css), remove the inline block, and fix the `<link>` tag to reference the correct file.
- To change where form responses go, update the `action` attribute on the `<form>` element in [User Feedback Form.html](User%20Feedback%20Form.html).

## If you need more context

- Ask for whether form processing should stay external (Formbold) or be implemented here as a backend; if backend is desired, request preferred language and hosting.

---
Please review and tell me which areas you'd like expanded (validation rules, accessibility checks, or example PR message templates).
