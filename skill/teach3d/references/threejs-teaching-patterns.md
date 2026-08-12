# Three.js teaching patterns

## Contents

- Scene structure
- Interaction
- Teaching layer
- Performance and access

## Scene structure

Create one named group for every teachable system and stable IDs for every selectable component. Keep display labels, descriptions, facts, and lesson-step references in plain data rather than mesh names alone.

Recommended runtime shape:

```text
root
├── systems
│   ├── system-a
│   └── system-b
├── helpers
│   ├── labels
│   ├── dimensions
│   └── loads
└── userData.teaching
    ├── components
    ├── defaultView
    └── lessonStepIds
```

Keep explode offsets on system groups so the intact assembly remains the single source of truth. Store original transforms before animation.

## Interaction

- Orbit around a meaningful subject center.
- Give reset a deterministic camera position and target.
- Raycast only selectable component groups.
- Keep click selection distinct from drag by measuring pointer movement.
- Highlight without destroying original material values.
- Provide labeled buttons or a select menu as a non-raycast path.
- Pause auto-rotation when the learner begins direct manipulation.

## Teaching layer

Show a concise label in the scene and a separate information card with:

- system and component name;
- structure or function;
- course knowledge point;
- observation or checking prompt;
- accuracy status when a value is estimated.

Use a guided step rail outside the canvas so it remains readable during complex views. Use animation only when it reveals a process that a static view cannot.

## Performance and access

- Cap device pixel ratio near 2.
- Reuse geometry and materials for repeated parts.
- Prefer instancing for repeated fasteners, spokes, cells, or markers.
- Respect `prefers-reduced-motion` and provide manual controls.
- Keep a text fallback and WebGL error state.
- Test narrow screens, touch orbit, keyboard focus, full-screen projection, and long translated labels.
- Do not rely on color alone for system identity; pair color with labels or shapes.
