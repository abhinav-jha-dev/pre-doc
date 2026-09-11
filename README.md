# PreDoc

React and Three.js anatomy explorer with Framer Motion transitions, real segmented male and female anatomical reference geometry, selectable structures, system isolation, text search, view sharing and an educational pain notebook.

## Development

- `npm install`
- `npm run dev` — opens the server on port 5173
- `npx tsc --noEmit` — type checking
- `node scripts/validate-models.mjs` — verifies every compressed mesh buffer, position, index and triangle count
- `npm run build` — production build

Anatomical assets are included and served locally. `python3 scripts/download-anatomy.py` restores missing assets from the credited public dataset mirror. The first visit downloads approximately 34 MB for the male reference or 37 MB for the female reference. Three fetch workers progressively load the geometry. Current browsers with WebGL and DecompressionStream support are required for the 3D view.

## Anatomy and licensing

The male reference contains 2,234 BodyParts3D meshes. The distributed female archive contains 1,220 meshes; the viewer exposes 956 source-reference elements plus 256 optional adapted elements. Pregnancy structures are excluded. The female dataset is incomplete; upper limb muscle coverage is absent. Its 180 fitted male-derived bone pieces and 76 fitted muscles from a separate female donor are enabled by default with explicit adapted-reference labels. The female toggle removes them consistently from rendering, search, selection and counts. Pregnancy reference geometry is excluded from the viewer. Presets are reference anatomy, not a claim to represent every person or variation.

See [full attribution](public/ATTRIBUTION.md), which preserves dataset authors, licenses, source links and upstream transformations. Geometry is CC BY 4.0. This app changes display materials, lighting and highlighting; it does not change source mesh vertices. Mesh packing/optimization is credited to the Human-Atlas repository and its upstream human-atlas project:

- https://github.com/slorksmo/Human-Atlas
- https://github.com/ashemag/human-atlas

BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International. Female reference: Kristen Browne and Heidi Schlehlein, Human Reference Atlas / HuBMAP; supplementary female lower-limb data: Andreassen et al. (2023).

The 3D list preserves exact source identifiers and names. Curated structure-family educational descriptions are based on OpenStax Anatomy and Physiology; the four learning sections distinguish structure-group explanations from system-level overviews. See public/EDUCATION_COVERAGE.md for the audited scope. The app is not a comprehensive clinical anatomy reference.

## Pain explorer

The explorer records location, sensation, intensity, onset and notes, and highlights relevant anatomy. It cannot diagnose a cause or identify organ malfunction. Guidance links to NHS chest and abdominal pain resources; emergency symptom selection immediately directs users to emergency care. Pain drafts, exact source-space marker positions and conversation snapshots are persisted to localStorage under human-atlas.pain-conversations.v1. Notes are device-local and not encrypted; the UI provides restore, per-conversation deletion and clear-all controls. Share links contain the anatomy preset and selected structure; pain links also contain region, sensation and intensity. The copy action explains what will be shared. Free-text notes and emergency answers are excluded. A separate download exports symptom notes and marker coordinates as a text file.

## Validation

TypeScript and the production build pass. All 3,454 binary mesh records were checked for valid buffer sizes, finite coordinates and in-range triangle indices. Browser visual and interaction testing covered the default systems, fixed opacity controls, reported-only symptoms, confirmation without a pin, and progression to the summary. Live microphone behavior was not exercised in that browser test; dictation lifecycle has automated regression coverage. The optional `configure_anatomy_view` WebMCP tool is feature-detected and unregisters on teardown; no supported WebMCP validation context was available, so its runtime contract is unverified.

## Local-only work

The user authorized publishing to abhinav-jha-dev/pre-doc and building for GitHub Pages.

Female surface rendering uses the source skin mesh at the requested opacity when shown alone; it becomes transparent context only when internal systems are visible. Female presets offer body surface, internal organs and pelvic anatomy. Source vertices and body proportions remain unchanged. Missing skeletal and muscular regions cannot be recovered through rendering changes. Category counts are numbers of modeled mesh elements, including substructures and connective tissue, not anatomical totals such as 206 bones. `node scripts/test-reference-policy.mjs` verifies source exclusions, reproductive coverage, surface opacity and category totals.

## Adapted anatomy and source research

The user authorized reuse after a female-model search. This viewer now offers 1,212 female-view mesh elements: 956 native-reference elements, 180 adapted BodyParts3D male bone pieces, and 76 fitted lower-limb muscles from a separate female donor. Native pelvic and reproductive geometry is preserved. No new vertex fitting is introduced; upstream fitted transforms and documented errors are retained. Adapted parts have separate materials, provenance descriptions, hover labels, list labels and per-category count breakdowns. Upper-body muscular coverage remains incomplete. This is an educational composite, not verified sex-specific anatomy.

Sources checked: NIH female GLB (https://3d.nih.gov/entries/20992?version=1), Kabe-Tech female 673-mesh artist reference (https://kabe-tech.com/anatomy/en; distributed through Gumroad/BOOTH, files not acquired), and BALENSOVA Sketchfab female model (listing found but detail access returned 403, so reuse terms/files could not be verified). No purchase or account access was performed.

## Precise pain-location workflow

Body-region choices include Upper back and Lower back. Free-text mentions of lower back or lumbar offer the lower-back view. Point on body turns the camera posteriorly for back regions and focuses the selected region. A Three.js raycaster intersects the source skin surface and stores the clicked point in source coordinates (not viewport pixels), with sex/preset, region and patient-relative side. A persistent marker remains anchored when orbiting and restores with its conversation. Marker location is patient-reported, not a diagnosis or a validated estimate of damaged tissue. The journal uses deterministic educational replies rather than a medical LLM or diagnostic model. It handles corrupted or unavailable storage without silently replacing unreadable history.

Source validation results and access limitations: [RESOURCE_VALIDATION.md](public/RESOURCE_VALIDATION.md).

## Current local assistant and voice UI

The browser GPU approach has been removed. Pain Explorer now calls a same-origin Node middleware endpoint backed by the existing local Ollama `llama3.2:latest` model. Start Ollama and run `npm run dev`; no model is downloaded by the browser. The local speech endpoint still uses Edge TTS. Both local adapters intentionally return an unavailable message in a Worker-only deployment.

Opening Pain Explorer checks microphone permission, requests it if needed, speaks the current short prompt and begins continuous dictation. Stop voice pauses the interaction; leaving Pain Explorer stops playback and microphone capture. If permission or autoplay is blocked, the interface provides Start voice and a text composer. Online speech processing is disclosed under Voice & privacy.

Left and right panel dividers can be dragged on desktop or resized with arrow keys when focused; sizes persist locally. Recent messages are displayed compactly; all conversation messages remain in local storage and PDF export.

## Current symptom and summary workflow

The flow is Describe → Confirm → Summary. Final spoken phrases submit after a 2.8-second pause; interim speech postpones submission. There is no Send button. Typed text submits on Enter or leaving the composer; Shift+Enter inserts a newline. Explicit proceed/confirmation replies advance deterministically rather than asking the model the same question again. Users may confirm the highlighted region or add an exact surface pin.

Only evidence-backed reported symptoms appear in the list and summary. Numerical intensity requires an explicit rating; missing details remain unknown. The current conversation persists under `human-atlas.guided-intake.v1`. The isolated `?test=1` session uses a separate storage key and disables automatic microphone activation. Snapshots remain in memory and are included in PDF export.

The PDF includes the confirmed reference-atlas view, original conversation, optional patient/history details, unknown statuses, timestamps and provenance. See [patient-summary alignment](public/PATIENT_SUMMARY_ALIGNMENT.md): this is an EU-guideline-informed patient-generated symptom report, not a conformant cross-border clinical record.

All 13 systems are visible on a fresh session. The Body Systems list scrolls above persistent opacity controls. Selected structures use a purple highlight. Anatomy education uses four sections: what it is, why it matters, care, and potential effects of dysfunction. [Coverage](public/EDUCATION_COVERAGE.md) identifies 49 group profiles and 599 mesh pieces using system overviews; these are not independently reviewed definitions for every mesh.

Validation: `node scripts/test-intake.mjs`, `node scripts/test-dictation.mjs`, `node scripts/test-pain.mjs`, `node scripts/test-reference-policy.mjs`, `npx tsc --noEmit`, and the production build. A browser test entered synthetic left lower-back symptoms, proceeded to location confirmation and then to a summary with only the reported facts, and exercised the PDF export action. The automated PDF fixture was rendered and visually inspected separately. Live spoken auto-submit and clinician validation remain outside that verification.

Pain intake follow-up update: known locations now lead to targeted questions about intensity, timing, sensation, side, triggers, spreading pain and other symptoms. The assistant receives question context so short answers are interpretable. A contextual “number part” dictation mismatch prompts confirmation of lumbar wording; original user replies remain in the transcript. Location phrases cannot populate onset or additional-symptom fields merely because a model quoted them. `node scripts/test-intake-dialogue.mjs` covers clarification, semantic field checks, contextual intensity and correction precedence.

New conversations first offer three optional patient-intake screens: identity/contact/emergency contacts, current and past medical history, and prescribed medicines with dose/frequency. Each screen can be skipped; progress and entered details persist locally. Voice dictation fills the selected field without sending demographics or medical history to symptom extraction. Blank fields remain unprovided, never “none”. Existing conversations without an intake-progress marker retain their symptom workflow; patient details remain editable in the summary. These fields are included automatically in the doctor-facing PDF. No report is sent automatically.

PreDoc branding uses a stethoscope logo, blue interface and a decorative medical staff-and-serpent background behind the 3D view. Original anatomical source attribution and legacy storage keys are preserved.

## GitHub Pages

`npm run build:pages` creates `dist-pages/` for `/pre-doc/`. The generated build is published on the `gh-pages` branch, using that branch’s root as the Pages source. An optional Actions template is saved at `deployment/pages-workflow.yml`; move it to `.github/workflows/pages.yml` when your GitHub credentials have workflow scope and switch Pages to GitHub Actions. Branch publishing requires rebuilding and pushing `dist-pages` after source changes. The static edition includes anatomy, local patient details/notes, basic deterministic symptom capture and PDF export. It does not run Ollama or the Node Edge TTS service. Browser dictation remains browser-dependent. Run `npm run dev` locally for AI extraction and Microsoft voice. Storage remains in the browser for each origin; local notes are not uploaded or migrated to the public site.
