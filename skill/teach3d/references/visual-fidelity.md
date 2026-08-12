# Visual fidelity

## Choose the fidelity tier

- `diagrammatic`: intentionally schematic. Geometry may be simplified, but relationships and labels must be unambiguous.
- `recognizable`: the subject is identifiable without labels from the default camera. Main proportions, silhouette, signature parts, material families, and context are present.
- `reference-led`: built from several reliable visual references or a trusted 3D asset. The model preserves characteristic form, surface behavior, environment relationship, and close-detail cues while clearly labeling anything not verified.

Public showcases default to `recognizable`. Cultural heritage, anatomy, branded products, and subjects whose teaching value depends on appearance should default to `reference-led`.

## Reference plan

Before final geometry, record:

1. a whole-form or environmental reference;
2. a structure or construction-detail reference;
3. a material or surface reference when texture changes recognition;
4. the features that must be recognizable in the default view;
5. which parts are verified, estimated, illustrative, or unknown.

References support form and facts; they are not permission to copy a protected asset. Keep source links or user-provided filenames in the lesson spec.

## Model gates

### Silhouette and context

- The default camera communicates the subject before labels appear.
- Terrain-bound structures follow the terrain rather than floating above a flat plane.
- Assemblies preserve major proportion and attachment relationships.
- Organic subjects preserve the outer silhouette and major landmarks before internal overlays.

### Geometry

- Replace large primitive blocks with continuous or shaped forms where the real subject is continuous, tapered, curved, eroded, folded, or irregular.
- Repeated details use reusable geometry or instancing, but spacing and orientation must follow the underlying form.
- Avoid floating, intersecting, disconnected, and visibly duplicated parts.
- Add edge profiles, openings, recesses, thickness, or taper wherever they are signature recognition cues.

### Materials, light, and depth

- Use roughness, color variation, and small-scale surface cues appropriate to the material family.
- Use texture repetition carefully; obvious tiling is a failure at the default camera.
- Lighting must reveal form, not flatten it. Include contact shadows and atmospheric depth for exterior scenes.
- Background and context should support scale without competing with the lesson.

## Default-view acceptance

Before delivery, inspect one desktop default view and, when relevant, one close component view. Pass only if:

- a new viewer can name the subject without reading the title;
- at least three signature features are visible;
- the scene has foreground, subject, and background separation;
- materials do not look like unshaded plastic or single-color cardboard;
- important components still read when selected or exploded;
- the chosen fidelity tier is honest about what was simplified.

If any item fails, return to `blockout` or `fidelity`. Do not compensate with more text, labels, gradients, or interface polish.

## When to use an external 3D asset

Prefer a trusted GLB/GLTF or user-supplied model when the subject needs organic topology, a highly specific manufactured shape, sculpture, damage patterns, or photogrammetric detail that procedural code cannot reproduce credibly within scope. Confirm the license, keep attribution, optimize for the browser, and retain a lightweight fallback.
