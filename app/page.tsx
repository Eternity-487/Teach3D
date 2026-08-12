"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Language = "zh" | "en";

const copy = {
  zh: {
    nav: ["能力", "在线案例", "制作流程", "安装 Skill"],
    navIds: ["capabilities", "demo", "workflow", "install"],
    share: "分享项目",
    copied: "链接已复制",
    eyebrow: "通用型 3D 教学内容生成器",
    heroTitle: <>把任何知识对象，<br />变成一堂<em>能操作的课</em></>,
    heroLead: "Teach3D 是面向教学场景的可复用 Skill。它把实物、结构、系统和过程制作成浏览器可用的 3D 互动课程，并同时考虑学习目标、课堂提问、双语说明与公开分享。",
    tryDemo: "查看在线案例",
    install: "直接安装 Skill",
    facts: [["通用", "不限定学科"], ["双语", "中文 / English"], ["免安装", "浏览器学习"], ["可复用", "一套制作流程"]],
    firstCase: "首个公开案例",
    caseName: "Marlin 6 机械系统教学",
    caseDesc: "山地车只是示例。Teach3D 同样适用于科学结构、实验设备、人体解剖、建筑构造、文物与更多教学主题。",
    live: "当前在线显示",
    capabilitiesKicker: "WHAT IT MAKES · 能做什么",
    capabilitiesTitle: "从“看模型”升级为“用模型学习”",
    capabilitiesLead: "每个项目都围绕教学目标设计，而不是只追求三维效果。",
    demoKicker: "LIVE SHOWCASE · 在线案例",
    demoTitle: "Trek Marlin 6：机械系统互动课",
    demoLead: "当前案例用于展示 Teach3D 的完整输出：可操作模型、部件信息、引导步骤、课堂提问、分享页面和边界说明。",
    openLive: "打开独立在线演示",
    fullscreen: "课堂全屏",
    currentUi: "当前模型控件为中文，项目首页可切换中英文。",
    guided: "8 分钟导学",
    action: "操作",
    question: "提问",
    next: "下一步",
    restart: "重新开始",
    workflowKicker: "WORKFLOW · 制作流程",
    workflowTitle: "像备课一样，分阶段制作 3D",
    workflowLead: "参考 img2threejs 的分阶段与质量门思路，但把验收重点扩展到教学目标、可观察证据和课堂使用。",
    installKicker: "QUICK INSTALL · 直接安装",
    installTitle: "下载后放进 Skill 目录，就能开始做新的教学主题",
    installLead: "安装包只包含 Teach3D Skill，不需要复制山地车网站。以后可以用同一流程制作其他学科和对象。",
    download: "下载 teach3d-skill.zip",
    invoke: "调用示例",
    pathTitle: "安装位置",
    pathLead: "解压后确认文件夹名为 teach3d，并且其中直接包含 SKILL.md。",
    repoTitle: "项目公开时建议保留",
    repoItems: ["中文 / English 入口", "在线演示链接", "真实效果截图", "直接安装路径", "调用示例与适用场景"],
    footer: "把结构、过程和知识点，做成学生可以亲手探索的 3D 课程。",
    boundary: "Teach3D 生成的模型应明确区分事实、估算与教学简化；精确参数须核对权威资料。",
  },
  en: {
    nav: ["Capabilities", "Live demo", "Workflow", "Install Skill"],
    navIds: ["capabilities", "demo", "workflow", "install"],
    share: "Share project",
    copied: "Link copied",
    eyebrow: "A general-purpose 3D teaching builder",
    heroTitle: <>Turn any subject into<br /><em>an interactive lesson</em></>,
    heroLead: "Teach3D is a reusable skill for educational experiences. It turns objects, structures, systems, and processes into browser-based 3D lessons with learning goals, guided questions, bilingual documentation, and public sharing built in.",
    tryDemo: "Explore the live demo",
    install: "Install the Skill",
    facts: [["General", "Any subject"], ["Bilingual", "中文 / English"], ["No setup", "Learn in browser"], ["Reusable", "One clear workflow"]],
    firstCase: "First public showcase",
    caseName: "Marlin 6 mechanical systems lesson",
    caseDesc: "The mountain bike is one example, not the project category. Teach3D also fits scientific structures, lab equipment, anatomy, architecture, cultural objects, and more.",
    live: "Current live site",
    capabilitiesKicker: "WHAT IT MAKES",
    capabilitiesTitle: "Move from viewing a model to learning with it",
    capabilitiesLead: "Every output begins with a learning goal—not a visual effect.",
    demoKicker: "LIVE SHOWCASE",
    demoTitle: "Trek Marlin 6: an interactive mechanical lesson",
    demoLead: "This showcase demonstrates the complete Teach3D output: an operable model, component information, guided steps, classroom questions, a shareable page, and honest limits.",
    openLive: "Open standalone live demo",
    fullscreen: "Classroom fullscreen",
    currentUi: "The current model controls are in Chinese; this project page is bilingual.",
    guided: "8-minute guided lesson",
    action: "Action",
    question: "Question",
    next: "Next step",
    restart: "Start again",
    workflowKicker: "WORKFLOW",
    workflowTitle: "Build 3D in stages, the way teachers prepare lessons",
    workflowLead: "Teach3D borrows the staged, quality-gated idea from img2threejs and adds learning objectives, observable evidence, and classroom delivery gates.",
    installKicker: "QUICK INSTALL",
    installTitle: "Place the downloaded folder in your Skills directory and start a new subject",
    installLead: "The package contains the reusable Teach3D Skill only. The mountain-bike website is a showcase, not a required template.",
    download: "Download teach3d-skill.zip",
    invoke: "Example prompt",
    pathTitle: "Install locations",
    pathLead: "After extracting, make sure the folder is named teach3d and contains SKILL.md at its top level.",
    repoTitle: "Keep these visible in a public project",
    repoItems: ["中文 / English entry", "Live demo URL", "Real screenshots", "Direct install path", "Example prompts and use cases"],
    footer: "Turn structures, processes, and knowledge into 3D lessons students can explore themselves.",
    boundary: "Teach3D outputs should separate verified facts, estimates, and teaching simplifications. Check precise values against authoritative sources.",
  },
} as const;

const capabilities = {
  zh: [
    ["01", "工程与机械", "设备、车辆、机构、装配与受力关系"],
    ["02", "科学与实验", "仪器结构、实验过程、物理与化学现象"],
    ["03", "生命与医学", "器官、细胞、解剖结构与操作流程"],
    ["04", "建筑与文化", "建筑构造、文物、地理空间与历史场景"],
  ],
  en: [
    ["01", "Engineering", "Machines, vehicles, assemblies, and loads"],
    ["02", "Science & labs", "Instruments, experiments, physics, and chemistry"],
    ["03", "Life & medicine", "Organs, cells, anatomy, and procedures"],
    ["04", "Built & cultural", "Architecture, artifacts, geography, and history"],
  ],
} as const;

const lessons = {
  zh: [
    ["认识整车系统", "打开“部件标注”，从车架依次找到轮组、前叉、传动和制动系统。", "哪些部件负责承载，哪些部件负责传递运动？"],
    ["追踪动力传递", "点击“传动演示”，观察曲柄、链条、飞轮和后轮的运动关系。", "前盘与后飞轮的齿数为什么会影响骑行感受？"],
    ["理解制动过程", "选择制动碟片与液压碟刹，对照信息卡查看作用位置。", "制动力如何从手指传递到车轮？"],
    ["分析载荷与装配", "打开“载荷示意”和“分解视图”，比较受力方向与装配关系。", "前叉、车架和轮轴分别承受哪些主要载荷？"],
  ],
  en: [
    ["Map the whole system", "Turn on component labels and locate the frame, wheels, fork, drivetrain, and brakes.", "Which parts carry loads, and which transmit motion?"],
    ["Trace power transfer", "Run the drivetrain demo and observe the crank, chain, cassette, and rear wheel.", "Why do chainring and cog sizes change the riding feel?"],
    ["Explain braking", "Select the brake rotor and hydraulic brake, then compare their positions and roles.", "How does force travel from a finger to the wheel?"],
    ["Analyze loads and assembly", "Turn on load arrows and exploded view to compare forces and connections.", "What main loads act on the fork, frame, and axles?"],
  ],
} as const;

const workflow = {
  zh: [["01", "教学约定", "明确对象、学习者、目标与课时"], ["02", "事实边界", "区分已核实、估算与教学简化"], ["03", "结构建模", "按整体、系统、部件逐层制作"], ["04", "互动导学", "把操作、观察、提问与证据连起来"], ["05", "公开交付", "双语说明、在线链接、配图与安装路径"]],
  en: [["01", "Lesson contract", "Define subject, learners, goals, and time"], ["02", "Truth boundary", "Separate verified, estimated, and illustrative claims"], ["03", "Structure build", "Model whole, systems, and parts in stages"], ["04", "Guided inquiry", "Connect actions, observations, questions, and evidence"], ["05", "Public delivery", "Bilingual docs, live URL, screenshots, and install paths"]],
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  const t = copy[language];
  const lesson = lessons[language][lessonIndex];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(language === "zh" ? "复制项目链接" : "Copy this project URL", window.location.href);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top"><span>TEACH</span>3D</a>
        <nav aria-label={language === "zh" ? "页面导航" : "Site navigation"}>
          {t.nav.map((item, index) => <a key={item} href={`#${t.navIds[index]}`}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language">
            <button className={language === "zh" ? "active" : ""} type="button" onClick={() => setLanguage("zh")}>中文</button>
            <span>/</span>
            <button className={language === "en" ? "active" : ""} type="button" onClick={() => setLanguage("en")}>EN</button>
          </div>
          <button className="share-button" type="button" onClick={copyLink}>{copied ? t.copied : t.share}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t.eyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-lead">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#demo">{t.tryDemo} <span>↓</span></a>
            <a className="button button-secondary" href="#install">{t.install}</a>
          </div>
          <dl className="hero-stats">
            {t.facts.map(([value, label]) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>
        </div>
        <figure className="hero-showcase">
          <Image src="/assets/teach3d-showcase.jpg" alt="Teach3D 通用互动教学项目分享图" width={1280} height={640} priority />
          <figcaption>
            <div><span>{t.firstCase}</span><strong>{t.caseName}</strong></div>
            <p>{t.caseDesc}</p>
            <a href="https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site" target="_blank" rel="noreferrer">{t.live} ↗</a>
          </figcaption>
        </figure>
      </section>

      <section className="capabilities" id="capabilities">
        <div className="section-heading">
          <div><p className="section-kicker">{t.capabilitiesKicker}</p><h2>{t.capabilitiesTitle}</h2></div>
          <p>{t.capabilitiesLead}</p>
        </div>
        <div className="capability-grid">
          {capabilities[language].map(([number, title, description]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      <section className="demo-section" id="demo">
        <div className="section-heading demo-heading">
          <div><p className="section-kicker">{t.demoKicker}</p><h2>{t.demoTitle}</h2></div>
          <div className="demo-intro"><p>{t.demoLead}</p><a href="https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site" target="_blank" rel="noreferrer">{t.openLive} ↗</a></div>
        </div>
        <div className="demo-shell" ref={demoRef}>
          <aside className="lesson-rail">
            <div className="rail-label">{t.guided}</div>
            <div className="lesson-tabs" role="tablist">
              {lessons[language].map((item, index) => (
                <button key={item[0]} type="button" role="tab" aria-selected={lessonIndex === index} className={lessonIndex === index ? "active" : ""} onClick={() => setLessonIndex(index)}>
                  <span>0{index + 1}</span><b>{item[0]}</b>
                </button>
              ))}
            </div>
            <div className="lesson-card" role="tabpanel">
              <h3>{lesson[0]}</h3>
              <div><span>{t.action}</span><p>{lesson[1]}</p></div>
              <div className="question"><span>{t.question}</span><p>{lesson[2]}</p></div>
              <button type="button" onClick={() => setLessonIndex((lessonIndex + 1) % 4)}>{lessonIndex === 3 ? t.restart : t.next} →</button>
            </div>
          </aside>
          <div className="model-panel">
            <div className="model-toolbar"><span><i /> LIVE MODEL</span><p>{t.currentUi}</p><button type="button" onClick={() => demoRef.current?.requestFullscreen?.()}>{t.fullscreen}</button></div>
            <iframe className="visualization-frame" src="/trek-marlin-6-teaching-3d.html" title="Trek Marlin 6 mechanical teaching model" sandbox="allow-scripts" loading="eager" />
          </div>
        </div>
        <figure className="real-preview">
          <Image src="/assets/marlin-6-demo.jpg" alt="Trek Marlin 6 互动教学模型实际页面截图" width={960} height={800} />
          <figcaption>{language === "zh" ? "实际效果截图 · 部件标注、传动演示、分解视图与教学信息卡" : "Real output · component labels, drivetrain animation, exploded view, and teaching cards"}</figcaption>
        </figure>
      </section>

      <section className="workflow-section" id="workflow">
        <div className="section-heading">
          <div><p className="section-kicker">{t.workflowKicker}</p><h2>{t.workflowTitle}</h2></div>
          <p>{t.workflowLead}</p>
        </div>
        <ol className="workflow-list">
          {workflow[language].map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}
        </ol>
      </section>

      <section className="install-section" id="install">
        <div className="install-copy">
          <p className="section-kicker">{t.installKicker}</p>
          <h2>{t.installTitle}</h2>
          <p>{t.installLead}</p>
          <a className="button download-button" href="/teach3d-skill.zip" download>{t.download} ↓</a>
        </div>
        <div className="install-panel">
          <div className="terminal">
            <div className="terminal-top"><span /><span /><span /><b>macOS / Linux</b></div>
            <code>mkdir -p ~/.codex/skills<br />unzip ~/Downloads/teach3d-skill.zip -d ~/.codex/skills</code>
          </div>
          <div className="path-grid">
            <div><span>Codex</span><code>~/.codex/skills/teach3d</code></div>
            <div><span>Claude Code</span><code>~/.claude/skills/teach3d</code></div>
          </div>
          <div className="prompt-example"><span>{t.invoke}</span><code>{language === "zh" ? "$teach3d 把这台显微镜做成面向中学生的双语 3D 互动课。" : "$teach3d Turn this microscope into a bilingual interactive 3D lesson for secondary students."}</code></div>
          <p className="path-note"><strong>{t.pathTitle}</strong>{t.pathLead}</p>
        </div>
        <div className="repo-checklist">
          <h3>{t.repoTitle}</h3>
          <div>{t.repoItems.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
        </div>
      </section>

      <footer className="site-footer">
        <div><strong>TEACH3D</strong><p>{t.footer}</p></div>
        <p>{t.boundary}</p>
      </footer>
    </main>
  );
}
