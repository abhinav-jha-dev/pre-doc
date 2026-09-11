# Patient summary implementation review

Reference read: eHealth Network Patient Summary guideline, release 3.4, November 2024. The supplied URL currently serves this release, despite its 2023 directory name:
https://health.ec.europa.eu/system/files/2023-10/ehn_guidelines_patientsummary_en.pdf

This app produces a patient-generated symptom summary, not a certified or conformant cross-border clinical Patient Summary.

Implemented: optional patient identity details; creation/update dates and record identifier; patient-reported symptoms and confirmed location; original patient wording; optional allergies, medication, conditions and procedures; explicit unknown status for uncollected medical history; source and authoring-process description; disclosure that identity and clinical content are unverified.

Not implemented: clinician authentication/signature, verified patient identity, coded clinical terminology, cross-border exchange, clinical validation, or a complete clinical history. An anatomy preset is a reference-model selection, not verified patient sex or identity. No missing history is turned into “none”.

Only reported symptom fields appear in the symptom list. Numerical severity requires an explicit rating. Proceed/confirmation messages advance the workflow without asking the LLM to infer new symptoms. An exact pin is optional; area-only confirmation is labeled accordingly. The PDF includes the captured reference-atlas image, not a patient scan.
