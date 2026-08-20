# Data Layer

Recommended minimal folders:

```text
00_System/   Control Plane: CORE, USER, STATE, SKILLS
10_Inbox/    Unprocessed inputs
20_Sources/  External originals and source metadata
30_Notes/    Source-bound learning and topic records
40_Insights/ Reusable judgments under review
50_Models/   Validated decision structures
60_Cases/    Real-world applications and results (optional in v1)
90_History/  Migration, audit and system iteration records
```

The folder number is navigation, not epistemic status. Status is expressed in the file's Properties and content.

## Minimal Properties

Note:

```yaml
---
type: note
status: active
created: YYYY-MM-DD
source: "[[Source]]"
---
```

Insight:

```yaml
---
type: insight
status: candidate
created: YYYY-MM-DD
origin:
  - "[[Topic Note]]"
---
```

Model:

```yaml
---
type: model
status: candidate
created: YYYY-MM-DD
---
```

Add fields only when they materially improve retrieval, validation, or governance.
