"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Language = "zh" | "en";

const copy = {
  zh: {
    nav: ["能力", "模型来源", "在线案例", "制作流程", "安装 Skill"],
    navIds: ["capabilities", "model-source", "demo", "workflow", "install"],
    share: "分享项目",
    copied: "链接已复制",
    eyebrow: "真实模型优先的 3D 教学内容生成器",
    heroTitle: <>把任何知识对象，<br />变成一堂<em>能操作的课</em></>,
    heroLead: "Teach3D 优先接入自有、权威或开放授权的真实 3D 模型，再叠加双语讲解、教学热点、过程演示和课堂提问；只有在教学需要时才使用程序化示意模型。",
    tryDemo: "查看在线案例",
    install: "直接安装 Skill",
    facts: [["真实优先", "GLB / GLTF / 扫描"], ["授权检查", "来源与署名"], ["多端适配", "手机 / 电脑"], ["教学覆盖", "热点与导学"]],
    firstCase: "首个公开案例",
    caseName: "Marlin 6 机械系统教学",
    caseDesc: "山地车只是示例。Teach3D 同样适用于科学结构、实验设备、人体解剖、建筑构造、文物与更多教学主题。",
    live: "当前在线显示",
    capabilitiesKicker: "WHAT IT MAKES · 能做什么",
    capabilitiesTitle: "从“看模型”升级为“用模型学习”",
    capabilitiesLead: "每个项目都围绕教学目标设计，而不是只追求三维效果。",
    sourceKicker: "MODEL SOURCE · 模型来源",
    sourceTitle: "先选可信模型，再设计教学层",
    sourceLead: "Teach3D 会把模型真实性、使用授权和网页性能放在同一条制作流程里。公开项目不会把“网上能看”误当成“可以下载和再发布”。",
    sourceRule: "模型与教学分层：以后更换 GLB、扫描模型或精细版本时，不必重写导学内容。",
    demoKicker: "LIVE SHOWCASE · 在线案例",
    demoTitle: "从机械结构到文化遗产",
    demoLead: "公开案例用于验证同一套 Skill 能覆盖机械系统与历史建筑。Marlin 6 展示部件和传动；长城课程展示地形、节点和防御系统。",
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
    workflowLead: "模型来源、授权、优化、教学和发布分别验收。没有解决授权或真实性问题的模型，不能进入公开交付。",
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
    nav: ["Capabilities", "Model source", "Live demo", "Workflow", "Install Skill"],
    navIds: ["capabilities", "model-source", "demo", "workflow", "install"],
    share: "Share project",
    copied: "Link copied",
    eyebrow: "A real-model-first 3D teaching builder",
    heroTitle: <>Turn any subject into<br /><em>an interactive lesson</em></>,
    heroLead: "Teach3D starts with owned, authoritative, or openly licensed 3D assets, then adds bilingual explanations, teaching hotspots, process overlays, and guided questions. Procedural geometry is reserved for intentional diagrams and fallbacks.",
    tryDemo: "Explore the live demo",
    install: "Install the Skill",
    facts: [["Real first", "GLB / glTF / scans"], ["Rights checked", "Source & credit"], ["Multi-device", "Mobile / desktop"], ["Teaching layer", "Hotspots & inquiry"]],
    firstCase: "First public showcase",
    caseName: "Marlin 6 mechanical systems lesson",
    caseDesc: "The mountain bike is one example, not the project category. Teach3D also fits scientific structures, lab equipment, anatomy, architecture, cultural objects, and more.",
    live: "Current live site",
    capabilitiesKicker: "WHAT IT MAKES",
    capabilitiesTitle: "Move from viewing a model to learning with it",
    capabilitiesLead: "Every output begins with a learning goal—not a visual effect.",
    sourceKicker: "MODEL SOURCE",
    sourceTitle: "Choose a trustworthy model before designing the teaching layer",
    sourceLead: "Teach3D handles fidelity, usage rights, and browser performance in one workflow. A model being publicly viewable does not make it downloadable or redistributable.",
    sourceRule: "Model and teaching stay separate, so a GLB, scan, or higher-detail asset can be replaced without rewriting the lesson.",
    demoKicker: "LIVE SHOWCASE",
    demoTitle: "From mechanical systems to cultural heritage",
    demoLead: "The showcases test one Skill across different subjects: Marlin 6 for components and transmission, and the Great Wall for terrain, nodes, and defensive-system reasoning.",
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
    workflowLead: "Model source, rights, optimization, teaching, and publishing are checked separately. A model with unresolved rights or weak fidelity cannot enter public delivery.",
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

const modelSources = {
  zh: [
    ["01", "自有或用户提供", "优先使用已有 GLB / GLTF、CAD 转换模型或项目自有资产。", "最高优先级"],
    ["02", "权威与开放资源", "核对机构、作者、许可证、修改权、再发布权和网页展示权。", "适合公开课"],
    ["03", "摄影测量与扫描", "用于文物、地形、标本和真实表面；生成轻量与精细两档。", "拟真优先"],
    ["04", "定制与程序建模", "按参考资料制作；简单几何体只用于结构示意或加载失败备用。", "明确边界"],
  ],
  en: [
    ["01", "Owned or supplied", "Start with existing GLB/glTF, converted CAD, or project-owned assets.", "Top priority"],
    ["02", "Authoritative & open", "Verify institution, creator, license, modification, redistribution, and web-display rights.", "Public-ready"],
    ["03", "Photogrammetry & scans", "For heritage, terrain, specimens, and surface truth; prepare light and detailed versions.", "Fidelity first"],
    ["04", "Custom & procedural", "Build from references; primitives remain diagrams or load-failure fallbacks.", "Bounded use"],
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
  zh: [["01", "教学约定", "明确对象、学习者、目标与课时"], ["02", "模型与授权", "选择真实来源并记录许可和署名"], ["03", "网页优化", "压缩模型、纹理并准备手机版本"], ["04", "教学覆盖", "热点、镜头与过程层不破坏原模型"], ["05", "导学验证", "连接操作、观察、提问与证据"], ["06", "公开交付", "双语页面、真实截图、链接和安装包"]],
  en: [["01", "Lesson contract", "Define subject, learners, goals, and time"], ["02", "Model & rights", "Choose a truthful source and record license and credit"], ["03", "Web optimization", "Compress geometry and textures; prepare mobile quality"], ["04", "Teaching overlay", "Add hotspots, cameras, and processes without damaging the model"], ["05", "Lesson validation", "Connect actions, observations, questions, and evidence"], ["06", "Public delivery", "Bilingual page, real screenshots, links, and Skill package"]],
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

      <section className="source-section" id="model-source">
        <div className="section-heading">
          <div><p className="section-kicker">{t.sourceKicker}</p><h2>{t.sourceTitle}</h2></div>
          <p>{t.sourceLead}</p>
        </div>
        <div className="source-grid">
          {modelSources[language].map(([number, title, description, tag]) => <article key={number}><span>{number}</span><b>{tag}</b><h3>{title}</h3><p>{description}</p></article>)}
        </div>
        <p className="source-rule">{t.sourceRule}</p>
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
        <div className="showcase-links">
          <a href="https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site" target="_blank" rel="noreferrer"><span>01 · ENGINEERING</span><strong>{language === "zh" ? "Marlin 6 机械系统课" : "Marlin 6 mechanical systems"}</strong><em>↗</em></a>
          <a href="https://along-the-ridge-great-wall.qitan874.chatgpt.site" target="_blank" rel="noreferrer"><span>02 · CULTURAL HERITAGE</span><strong>{language === "zh" ? "中国长城双语互动课" : "Bilingual Great Wall lesson"}</strong><em>↗</em></a>
        </div>
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
