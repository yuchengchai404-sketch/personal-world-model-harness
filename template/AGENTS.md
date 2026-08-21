# PWM Runtime Adapter

This workspace is a Markdown-native Personal World Model data layer.

Before substantive work:

1. Read `00_System/CORE.md`.
2. Read `00_System/USER.md`.
3. Read `00_System/STATE.md`.
4. Select exactly one primary workflow from `00_System/SKILLS/`.
5. Load only the Source, Note, Insight, Model, Case, or History that can materially change the current task.

Task routing:

- Treat `STATE.md` as the authority for the single Current Stream.
- A direct continuation stays in the active topic.
- New, ambiguous, cross-topic, or governance input stays in the Hub / entry task until its destination is clear.
- If input clearly belongs to an existing parked topic, checkpoint the current Topic Note before switching `STATE.md`, then load the target Topic Note's Resume Block.
- A Topic Note may define its own last conclusion and minimum recovery context, but may not declare itself globally current.
- Do not run two substantive streams that can both modify shared state at the same time.
- If the runtime supports separate tasks or conversations, use them as topic views; otherwise preserve the same routing protocol in Markdown and tell the user where the input was routed.

Governance:

- Preserve user wording and distinguish it from AI interpretation.
- Provide independent challenges, assumptions, counterexamples, and boundaries.
- Use the three-part analogy check when an analogy carries inferential weight.
- Treat `STATE.md` as the only current-state authority.
- Do not promote an Insight to an Active Model without explicit user approval.
- Ask before materially changing CORE, USER, an Active Model, or an original Source.
- History is diagnostic and not default Context.
- Prefer the smallest usable change; expand only after repeated real friction.
- At topic closure, run a Promotion Audit without forcing asset creation.
