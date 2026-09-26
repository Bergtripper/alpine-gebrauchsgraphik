# Research Audit 0.1 — Pilot Corpus

This document defines the methodological baseline for the Alpine Gebrauchsgraphik data-model v2.

## Core principle

Certainty belongs to individual claims and relationships, not only to whole entities.

The atlas must distinguish:

- documented facts;
- curatorial interpretation;
- computed visual analysis;
- curator/user-supplied knowledge;
- unresolved hypotheses.

A source-backed historical record and an analytical visualization are separate layers.

## Five-author pilot matrix

| Author | Identity | Corpus condition | Primary stress test |
| --- | --- | --- | --- |
| Franz Lenhart | Confirmed | Large, institutionally documented corpus | object-level metadata, conflicting catalogue data, exact/range dating |
| Alexander Erwin Merlet | Confirmed | Fragmented corpus across posters, illustration, mountaineering and commercial activity | dispersed evidence and cross-domain activity |
| Gustavo Ruprich | Canonical project identity | Signed works documented; biographical record remains sparse in public catalogues | identity provenance, signature evidence, publisher/printer networks, unresolved biography |
| Herbert Matter | Confirmed | Strong museum and bibliographic documentation | high-confidence benchmark, photography/photomontage and object metadata |
| Otto Baumberger | Confirmed | Strong museum and bibliographic documentation | high-confidence benchmark and typological breadth |

## Gustavo Ruprich research note

The project uses **Gustavo Ruprich** as the canonical name.

Known signed works and the RUPRICH signature form the object-level evidence base. The connection to B. V. Levi / Cortina must be recorded per object when an imprint or source supports it.

Stylistic similarity to Franz Lenhart is a **CURATED** observation.

Any claim of direct influence, studio collaboration, pseudonymity, or death during wartime remains a research hypothesis until supported by documentary evidence.

## Data layers

### 1. Entity
Person, Work, Place, Organization, Publication, ArchiveItem.

### 2. Claim
A discrete assertion attached to an entity.

Examples:
- death year;
- creator attribution;
- printer;
- place of design;
- nationality;
- active period.

Each claim stores:
- status;
- evidence kind;
- source IDs;
- optional note.

### 3. Object date
Dates must support exact dates, circa dates, ranges, before/after dates and unknown dates.

### 4. Attribution
Creator attribution is separate from person identity.

A signed object can have a confirmed creator attribution even when the creator's biography is incomplete.

### 5. Image asset
The digital representation is not the historical object.

Keep separate:
- image URL;
- catalogue page URL;
- institution;
- inventory/catalogue ID;
- metadata rights;
- image rights;
- verification state.

### 6. Visual analysis
Visual DNA is an analytical layer.

Values should eventually distinguish:
- DOCUMENTED;
- CURATED;
- COMPUTED.

Do not present manually assigned palette percentages or stylistic classifications as object metadata.

### 7. Relationship
Relationships require their own status and evidence.

Example:
- Work -> printed-by -> B. V. Levi: CONFIRMED when imprint/source documents it.
- Ruprich -> influenced-by -> Lenhart: UNVERIFIED unless documentary evidence is found.

## Migration rules

1. Preserve the current UI while the corpus migrates incrementally.
2. Do not create fictitious values to satisfy required fields.
3. Prefer an unknown value over an invented year, nationality, printer or relationship.
4. Use institutional catalogue identifiers whenever available.
5. Keep catalogue metadata rights separate from image reproduction rights.
6. Anonymous and unidentified works must remain globally discoverable.
7. Object-level evidence outranks biographical inference.
8. User/curator knowledge can be recorded explicitly as USER_SUPPLIED evidence rather than silently presented as external documentation.
9. Conflicting sources should coexist as claims with notes rather than being silently reconciled.
10. A work enters the research corpus when it represents an identifiable historical object, not merely a plausible reconstruction.

## Next migration sequence

1. SourceReference v2
2. Person identity claims
3. Work attribution/date/image metadata
4. Relationship evidence
5. Real-object pilot corpus
6. Dossier UI
7. Visual DNA provenance
8. Map geographic/cartographic separation
