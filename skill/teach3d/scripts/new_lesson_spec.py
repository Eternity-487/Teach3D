#!/usr/bin/env python3
"""Create a small, editable lesson contract for a Teach3D project."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def build_spec(subject: str, audience: str, duration: int, language: str) -> dict:
    step_time = max(1, duration // 4)
    return {
        "schemaVersion": "1.1",
        "subject": subject,
        "audience": audience,
        "durationMinutes": duration,
        "languages": [language],
        "verifiedSources": [],
        "assumptions": ["未由资料确认的尺寸、材料和隐藏结构必须标注为教学示意。"],
        "learningObjectives": [
            f"识别 {subject} 的主要组成部分",
            "解释部件之间的结构与功能关系",
            "根据可见证据回答一个应用问题",
        ],
        "components": [],
        "visualPlan": {
            "fidelityTier": "recognizable",
            "references": [],
            "signatureFeatures": [],
            "acceptanceCriteria": [
                "默认视角不看标题也能识别主题",
                "至少三个标志性特征清晰可见",
                "材质、光影与环境能够表现体积和尺度",
                "最终模型不是未完成的基础几何体拼装",
            ],
        },
        "lessonSteps": [
            {
                "id": "observe",
                "title": "整体观察",
                "minutes": step_time,
                "action": "旋转模型并打开主要部件标注。",
                "question": "这个对象由哪些系统或部分组成？",
                "evidence": "学生能指出至少三个主要部分。",
            },
            {
                "id": "structure",
                "title": "结构拆解",
                "minutes": step_time,
                "action": "选择或分解一个关键系统。",
                "question": "各部分如何连接，为什么这样布置？",
                "evidence": "学生能描述一个连接或装配关系。",
            },
            {
                "id": "process",
                "title": "过程追踪",
                "minutes": step_time,
                "action": "运行动画、载荷或状态演示。",
                "question": "输入如何经过系统形成输出？",
                "evidence": "学生能按顺序说明过程。",
            },
            {
                "id": "apply",
                "title": "应用解释",
                "minutes": max(1, duration - step_time * 3),
                "action": "切换视图并比较关键部件。",
                "question": "如果一个条件改变，系统会怎样变化？",
                "evidence": "学生用模型中的可见证据支持回答。",
            },
        ],
        "requiredInteractions": ["orbit", "zoom", "reset", "component-selection"],
        "optionalInteractions": ["explode", "animation", "loads", "section-view", "comparison"],
        "delivery": {
            "classroomProjection": True,
            "mobileReview": True,
            "bilingualPublicReadme": True,
            "liveDemo": "",
            "previewImage": "",
        },
        "boundaryNote": "本模型用于教学示意，不替代官方技术资料、制造图纸或专业操作规范。",
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("subject", help="Teaching subject or object name")
    parser.add_argument("--audience", default="中学及高校入门学习者")
    parser.add_argument("--duration", type=int, default=8)
    parser.add_argument("--language", default="zh-CN")
    parser.add_argument("--out", type=Path, default=Path("lesson-spec.json"))
    args = parser.parse_args()
    if args.duration < 4:
        parser.error("--duration must be at least 4 minutes")
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(
        json.dumps(build_spec(args.subject, args.audience, args.duration, args.language), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Created {args.out}")


if __name__ == "__main__":
    main()
