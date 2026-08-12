#!/usr/bin/env python3
"""Validate the minimum Teach3D lesson contract."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


REQUIRED_TOP = (
    "schemaVersion",
    "subject",
    "audience",
    "learningObjectives",
    "lessonSteps",
    "requiredInteractions",
    "boundaryNote",
)
REQUIRED_STEP = ("id", "title", "action", "question", "evidence")
REQUIRED_VISUAL = ("fidelityTier", "references", "signatureFeatures", "acceptanceCriteria")
REQUIRED_ASSET = ("sourceType", "license", "permissions", "delivery")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("spec", type=Path)
    args = parser.parse_args()
    try:
        data = json.loads(args.spec.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise SystemExit(f"INVALID: {exc}") from exc

    errors: list[str] = []
    for key in REQUIRED_TOP:
        if not data.get(key):
            errors.append(f"missing or empty: {key}")

    steps = data.get("lessonSteps", [])
    if not isinstance(steps, list) or len(steps) < 3:
        errors.append("lessonSteps must contain at least 3 steps")
    else:
        for index, step in enumerate(steps, start=1):
            if not isinstance(step, dict):
                errors.append(f"lessonSteps[{index}] must be an object")
                continue
            for key in REQUIRED_STEP:
                if not step.get(key):
                    errors.append(f"lessonSteps[{index}] missing or empty: {key}")

    interactions = data.get("requiredInteractions", [])
    for required in ("orbit", "reset", "component-selection"):
        if required not in interactions:
            errors.append(f"requiredInteractions must include: {required}")

    if str(data.get("schemaVersion", "1.0")) >= "1.1":
        visual = data.get("visualPlan")
        if not isinstance(visual, dict):
            errors.append("schemaVersion 1.1 requires visualPlan")
        else:
            for key in REQUIRED_VISUAL:
                if key not in visual:
                    errors.append(f"visualPlan missing: {key}")
            if visual.get("fidelityTier") not in {"diagrammatic", "recognizable", "reference-led"}:
                errors.append("visualPlan.fidelityTier must be diagrammatic, recognizable, or reference-led")
            if visual.get("fidelityTier") != "diagrammatic" and len(visual.get("references", [])) < 2:
                errors.append("recognizable/reference-led visualPlan requires at least 2 references")
            if len(visual.get("signatureFeatures", [])) < 3:
                errors.append("visualPlan requires at least 3 signatureFeatures")
            if len(visual.get("acceptanceCriteria", [])) < 3:
                errors.append("visualPlan requires at least 3 acceptanceCriteria")

    if str(data.get("schemaVersion", "1.0")) >= "1.2":
        asset = data.get("assetPlan")
        if not isinstance(asset, dict):
            errors.append("schemaVersion 1.2 requires assetPlan")
        else:
            for key in REQUIRED_ASSET:
                if key not in asset:
                    errors.append(f"assetPlan missing: {key}")
            permissions = asset.get("permissions", {})
            if not isinstance(permissions, dict):
                errors.append("assetPlan.permissions must be an object")
            delivery = asset.get("delivery", {})
            if not isinstance(delivery, dict) or not delivery.get("fallback"):
                errors.append("assetPlan.delivery requires a fallback")

    if errors:
        print("BLOCKED")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(2)
    print(f"PASS: {data['subject']} — {len(steps)} lesson steps")


if __name__ == "__main__":
    main()
