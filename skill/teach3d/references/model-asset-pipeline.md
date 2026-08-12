# Model asset pipeline

## Source decision

Use the highest-trust source that fits the learning goal:

1. user or project-owned GLB/GLTF;
2. authoritative or openly licensed model from a museum, institution, manufacturer, or scientific repository;
3. licensed photogrammetry for terrain, heritage, specimens, and surface condition;
4. reference-led custom modeling;
5. procedural geometry for schematic relationships or a lightweight fallback.

Search is discovery, not permission. Before importing an external asset, record the model page, creator, license name and URL, attribution text, whether modification is allowed, whether redistribution is allowed, and whether public web display is allowed. If any required right is unknown, do not place the asset in a public repository or deployment.

## Browser preparation

Prefer GLB or glTF 2.0. Preserve a clean original outside the public bundle and create an optimized derivative:

- remove hidden, duplicate, and unused scene data;
- set a meaningful origin, scale, orientation, and default camera target;
- keep or create stable names for teachable systems;
- reduce geometry while protecting silhouette and signature details;
- resize textures by viewing distance and convert them to a browser-efficient format;
- use Meshopt or Draco only when the runtime includes the matching decoder;
- generate normals and sensible roughness/metalness values;
- verify attribution survives packaging.

Suggested starting budgets, adjusted to the actual subject:

- mobile: 80k–180k visible triangles, 1K textures, about 8–15 MB initial 3D payload;
- desktop: 200k–500k visible triangles, 2K textures, about 15–30 MB initial 3D payload;
- scan detail: load on demand rather than blocking the first lesson view.

These are delivery targets, not factual limits. If reduction destroys the teaching evidence, split the asset into levels or close-up modules.

## Teaching overlay

Keep visual truth and teaching semantics separate:

```text
scene
├── visualModel
│   ├── lowLOD
│   └── highLOD
├── teachingHotspots
├── processOverlays
└── environment
```

Hotspots need stable IDs, bilingual labels, a target point, camera framing, accuracy status, and lesson-step references. They may be invisible hit areas, but their visible focus state must be clear. Do not destructively recolor a scanned texture to show selection; use outlines, pins, rings, transparent overlays, or controlled lighting.

## Loading and fallback

- Show a representative preview before WebGL and the main asset are ready.
- Report useful loading progress without inventing exact time remaining.
- On failure, offer retry plus a text/image lesson path.
- Select quality from device capability and user choice; never identify mobile only by screen width.
- Defer high-detail textures and close-up models until the learner requests them.

## Acceptance

Test the default desktop view, a mobile-quality view, one hotspot focus, and one model-load failure. Public delivery fails when attribution is absent, licensing is unresolved, the main payload has no fallback, or optimization removes a signature feature required by the lesson contract.
