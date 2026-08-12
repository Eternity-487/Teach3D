---
name: teach3d
description: Create browser-based interactive 3D teaching experiences from a real object, structure, process, reference image, or existing Three.js model. Use when Codex needs to build or improve a 3D lesson, interactive science or engineering explainer, clickable component model, bilingual teaching demo, classroom visualization, guided inquiry activity, or reusable educational Three.js website. Also use for requests such as “做成可旋转的教学模型”, “把这个实物做成 3D 课件”, “增加课堂导学/部件讲解/中英文”, and “turn this object into an interactive lesson”.
---

# Teach3D

Turn a subject into a lesson that students can operate, observe, and explain. Treat the 3D model as evidence inside a teaching sequence, not as decoration.

## Required inputs

Collect or infer:

- subject and available references: images, dimensions, existing model, code, or official material;
- audience and course: default to secondary or introductory higher-education learners;
- learning goal: default to structure, function, and system relationships;
- delivery: classroom projection, self-study, or both;
- language: default to Chinese; offer Chinese/English when the work will be shared publicly.

Ask only when a missing answer would materially change the model or lesson. State when geometry, values, unseen sides, or behavior are approximate.

## Workflow

### 1. Write the lesson contract

Run from the skill root:

```bash
python3 scripts/new_lesson_spec.py "<subject>" --audience "<audience>" --duration 8 --out lesson-spec.json
```

Edit the generated JSON so every step has one observable action, one question, and one evidence target. Read [references/teaching-design.md](references/teaching-design.md) before designing a public or multi-step lesson.

Validate before implementation:

```bash
python3 scripts/validate_lesson_spec.py lesson-spec.json
```

Do not begin a large model when the lesson contract is still generic.

### 2. Establish factual boundaries

- Separate verified facts, visual estimates, and teaching simplifications.
- Never invent official dimensions, tolerances, torque values, materials, standards, citations, or manufacturer configurations.
- Link or name authoritative sources when the lesson depends on exact values.
- Add a visible boundary note when the output is illustrative rather than a manufacturing, medical, laboratory, or repair reference.

### 3. Set a visual reference and fidelity target

Read [references/visual-fidelity.md](references/visual-fidelity.md). Fill `visualPlan` in the lesson spec before making final geometry.

- Use at least two references when the subject has a recognizable real-world form: one for the whole silhouette or environment, and one for structure/material detail.
- State the intended fidelity tier: `diagrammatic`, `recognizable`, or `reference-led`.
- Identify the subject's signature features. A model that omits them is still a blockout, even if it is interactive.
- Prefer an existing trusted 3D asset when faithful organic anatomy, cultural heritage, sculpture, or a branded product cannot be represented credibly with procedural geometry.
- Do not use a few boxes, cylinders, or spheres as the final public model unless the requested teaching style is explicitly schematic.
- For terrain-bound subjects, generate the terrain first and make the structure follow it. For assemblies, establish proportions and attachment points before details. For organic subjects, preserve silhouette and major anatomical landmarks before internal teaching overlays.

### 4. Build in gated passes

Use the installed project stack. Prefer plain Three.js or the project's current wrapper.

1. `blockout`: silhouette, scale relationships, camera, orientation, and environment relationship.
2. `fidelity`: signature features, continuous forms, surface variation, material response, lighting, depth, and recognizable context.
3. `systems`: named component groups and correct attachment relationships.
4. `interaction`: orbit, zoom, reset, selection, keyboard/touch access, and optional explode/animation.
5. `teaching`: labels, component cards, guided steps, questions, and learning evidence.
6. `delivery`: responsive layout, projection/fullscreen, performance, bilingual copy, and sharing metadata.

For component hierarchy, interaction patterns, and runtime constraints, read [references/threejs-teaching-patterns.md](references/threejs-teaching-patterns.md).

Do not advance a pass when its visible acceptance criteria fail. Report what improved and what remains approximate.

### 5. Make the lesson operable

Every public teaching model should include:

- a clear first action within the first viewport;
- click or select access to named components;
- reset and a predictable default view;
- at least one guided sequence with action → observation → question;
- concise labels plus a deeper information card;
- mouse, touch, and keyboard-safe controls where feasible;
- a fallback explanation if WebGL fails;
- a shareable URL, preview image, and visible usage boundary.

Add explode, motion, loads, section views, or comparison only when they support the learning goal.

### 6. Package for other users

For a public repository, include:

- bilingual README entry links (`中文` / `English`);
- a live demo link near the top;
- one real screenshot or short preview, not a generic mockup;
- direct install commands for Codex plus optional Claude Code/OpenCode paths;
- a one-line invocation example;
- inputs, outputs, limits, local start instructions, and license status;
- at least one concrete showcase where the model and teaching sequence both work.

Keep one canonical checkout and symlink hosts to it when supporting several agents.

## Review gates

Before delivery, verify:

- `Truth`: claims and displayed values are sourced or labeled as estimates.
- `Fidelity`: the default view is recognizable without labels; signature features, silhouette, material response, context, and depth meet the chosen `visualPlan.fidelityTier`; primitive-only blockouts are rejected unless declared schematic.
- `Structure`: named parts correspond to real selectable groups; no important floating parts.
- `Teaching`: each objective has an observable model action and a student response.
- `Interaction`: selection, reset, labels, and critical demonstrations work.
- `Delivery`: readable at projection distance and on a narrow mobile viewport.
- `Access`: controls have labels; color is not the only information channel; reduced motion is respected.
- `Sharing`: title, description, screenshot, demo link, and install path are current.

Run the existing project build and tests. For a visual model, capture the default view at desktop size and compare it against the `visualPlan.acceptanceCriteria`; do not publish when it still reads as a blockout. If browser inspection is available and requested, test the real deployed route rather than an isolated mock.

## Output

Deliver the working project, `lesson-spec.json`, validation result, live/demo path when available, and a concise note naming factual limits. For repository work, also deliver the installable `teach3d` skill folder or archive.
