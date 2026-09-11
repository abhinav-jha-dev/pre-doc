# Local anatomy resource validation

Checked 10 September 2026. This is a source, license and technical compatibility review, not independent clinical validation.

## Human Reference Atlas / HuBMAP

- Primary resource: https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html
- Female model listing: https://3d.nih.gov/entries/20992?version=1
- Published license: CC BY 4.0, allowing adaptation and redistribution with attribution.
- Format: GLB reference objects. The app uses the existing optimized female mesh archive with preserved names and identifiers; its packing and source provenance are recorded in ATTRIBUTION.md.
- Local verification: all binary ranges, finite positions, triangle indices, and advertised triangle totals pass. The actual female skin supports a rear-facing lower-back raycast.
- Scope: body surface and selected organs, including female reproductive structures. Skeletal and muscle coverage is incomplete. This does not establish that all meshes came from one donor or that fitted additions are clinically accurate.
- Decision: suitable for the local educational atlas with source attribution and coverage labels. Already in use.

## University of Denver — Visible Human Female

- Primary resource: https://digitalcommons.du.edu/visiblehuman/1/
- Dataset DOI: https://doi.org/10.56902/COB.vh.2022.1
- Paper: https://doi.org/10.1038/s41597-022-01905-2
- Published license: CC BY 4.0.
- The source lists a final STL archive of approximately 87.8 MB, covering lower-extremity geometry. It contains bones from the pelvis through feet, muscles, cartilage and ligaments; it is not a full female atlas.
- The authors describe inspecting final models and correcting mesh overlap. This is author-reported validation, not an independent review performed for this app.
- Download check: the official final-STL endpoint returned HTTP 403 both through web retrieval and a direct download attempt. No files were obtained from that endpoint and no claim is made to have validated the undownloaded original archive.
- Existing local data: 76 pre-fitted female lower-limb muscle meshes, obtained from the previously credited open Human-Atlas derivative distribution, pass local binary checks. They remain labeled as adapted reference geometry from a separate donor.
- Decision: license is suitable. Continue using the locally available, checked derivative muscles. Defer additional female foot-bone imports until the original archive can be accessed and its coordinate registration verified. No new foot geometry was fabricated or imported in this update.

## National Library of Medicine — Visible Human Project

- Primary resource: https://www.nlm.nih.gov/research/visible/visible_human.html
- Published status: public-domain cross-sectional cryosection, CT and MRI images from male and female cadavers.
- Format: imaging data, not a ready-to-use collection of individually labeled web meshes.
- Decision: suitable input for a separate segmentation and review pipeline, but not directly loadable by this Three.js atlas. No bulk scans were downloaded, segmented, or certified as geometry in this update. NLM provenance is already acknowledged through the HRA/Denver derivatives.

## Technical checks performed

- `node scripts/validate-models.mjs`: verifies all 3,454 mesh records in the distributed male/female archives, including data excluded from display.
- `node scripts/test-reference-policy.mjs`: verifies native/adapted counts, preserved pelvic/reproductive geometry, provenance labels and skin opacity.
- `node scripts/test-pain.mjs`: verifies lower-back note parsing, stored conversation validation, coordinate round-trip, invalid-data handling, emergency response wording, and rear-facing ray intersections with actual male and female skin meshes.
- TypeScript and a production build are run after implementation changes.

No browser visual QA or clinical validation is claimed. All work remains local; no source push or deployment is authorized.
