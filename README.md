# Human Atlas

React and Three.js anatomy explorer with Framer Motion transitions, real segmented male and female anatomical reference geometry, selectable structures, system isolation, text search, view sharing and an educational pain notebook.

## Development

- `npm install`
- `npm run dev` — opens the server on port 5173
- `npx tsc --noEmit` — type checking
- `node scripts/validate-models.mjs` — verifies every compressed mesh buffer, position, index and triangle count
- `npm run build` — production build

Anatomical assets are included and served locally. `python3 scripts/download-anatomy.py` restores missing assets from the credited public dataset mirror. The first visit downloads approximately 34 MB for the male reference or 37 MB for the female reference. Three fetch workers progressively load the geometry. Current browsers with WebGL and DecompressionStream support are required for the 3D view.

## Anatomy and licensing

The male reference contains 2,234 BodyParts3D meshes. The female assembly contains 1,220 meshes, including optional supplements. The female dataset is incomplete; upper limb muscle coverage is absent. Its 180 male-derived supplementary bones and 76 muscles from another female donor are off by default and explicitly labeled. Pregnancy reference geometry is excluded from the viewer. Presets are reference anatomy, not a claim to represent every person or variation.

See [full attribution](public/ATTRIBUTION.md), which preserves dataset authors, licenses, source links and upstream transformations. Geometry is CC BY 4.0. This app changes display materials, lighting and highlighting; it does not change source mesh vertices. Mesh packing/optimization is credited to the Human-Atlas repository and its upstream human-atlas project:

- https://github.com/slorksmo/Human-Atlas
- https://github.com/ashemag/human-atlas

BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International. Female reference: Kristen Browne and Heidi Schlehlein, Human Reference Atlas / HuBMAP; supplementary female lower-limb anatomy: Andreassen et al. (2023).

The 3D list preserves exact source identifiers and names. Curated structure-family educational descriptions are based on OpenStax Anatomy and Physiology; source-specific details are distinguished from related anatomy and function. The app is not a comprehensive clinical anatomy reference.

## Pain explorer

The explorer records location, sensation, intensity, onset and notes, and highlights relevant anatomy. It cannot diagnose a cause or identify organ malfunction. Guidance links to NHS chest and abdominal pain resources; emergency symptom selection immediately directs users to emergency care. Notes are held only in page memory. Share links contain the anatomy preset and selected structure; pain links also contain region, sensation and intensity. The copy action explains what will be shared. Free-text notes and emergency answers are excluded. A separate download exports the user's own symptom notes as a text file.

## Validation

TypeScript and the production build pass. All 3,454 binary mesh records were checked for valid buffer sizes, finite coordinates and in-range triangle indices. Browser visual and interaction testing has not been performed. The optional `configure_anatomy_view` WebMCP tool is feature-detected and unregisters on teardown; no supported WebMCP validation context was available, so its runtime contract is unverified.
