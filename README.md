<div align="center">

# Teach3D

**把实物、结构、系统和过程，变成学生可以亲手操作的 3D 课程。**  
**Turn objects, structures, systems, and processes into interactive 3D lessons.**

[中文](#中文) · [English](#english) · [在线演示 / Live demo](https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site) · [下载 Skill](https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site/teach3d-skill.zip)

![Teach3D 首个公开案例：Trek Marlin 6 机械系统教学](public/assets/teach3d-showcase.jpg)

</div>

---

## 中文

Teach3D 是面向教学大类的可复用 Codex Skill，不限定山地车或机械专业。它可以把参考图片、真实物体、结构、设备、过程或已有 Three.js 模型，改造成浏览器可用的互动课程。

Trek Marlin 6 是第一个公开案例，用于展示完整效果：可旋转模型、可选部件、分解视图、过程动画、载荷示意、课堂导学、提问和教学边界说明。

### 在线查看

- [打开项目首页与在线案例](https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site)
- [直接打开独立 Marlin 6 教学模型](https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site/trek-marlin-6-teaching-3d.html)

![Marlin 6 互动模型实际效果](public/assets/marlin-6-demo.jpg)

### 适用教学方向

- 工程与机械：设备、车辆、机构、装配、传动和受力
- 科学与实验：实验仪器、物理过程、化学现象和操作步骤
- 生命与医学：器官、细胞、解剖结构和流程示意
- 建筑与文化：建筑构造、文物、地理空间和历史场景

### 直接安装 Skill

推荐直接从 GitHub 安装，后续更新也更方便：

```bash
git clone https://github.com/Eternity-487/Teach3D.git ~/.codex/skills/teach3d
```

也可以[下载 `teach3d-skill.zip`](https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site/teach3d-skill.zip)，再运行：

```bash
mkdir -p ~/.codex/skills
unzip ~/Downloads/teach3d-skill.zip -d ~/.codex/skills
```

安装后应存在：

```text
~/.codex/skills/teach3d/SKILL.md
```

如果同时使用 Claude Code，可以让两个工具共用同一份 Skill：

```bash
mkdir -p ~/.claude/skills
ln -s ~/.codex/skills/teach3d ~/.claude/skills/teach3d
```

### 调用示例

```text
$teach3d 把这台显微镜做成面向中学生的双语 3D 互动课，包含部件讲解、操作步骤和课堂提问。
```

```text
$teach3d 把现有 Three.js 人体心脏模型改造成高校入门课程，增加血流演示、导学步骤和事实来源说明。
```

### Skill 的制作流程

`教学约定 → 事实边界 → 结构建模 → 互动导学 → 公开交付`

Skill 使用分阶段验收。模型不仅要“能看”，还要满足：学生知道先做什么、能观察到什么、教师可以问什么、回答需要哪些可见证据。

### 本地运行案例网站

```bash
npm install
npm run dev
```

主要文件：

- `skill/teach3d/`：可单独安装的 Skill 源文件
- `app/`：中英文项目首页、在线案例和安装说明
- `public/trek-marlin-6-teaching-3d.html`：首个独立 Three.js 教学案例
- `public/showcase/`：真实效果截图

### 教学与事实边界

Teach3D 要求区分已核实事实、视觉估算和教学简化。不得编造官方尺寸、材料、扭矩、标准、文献或配置。精确参数须核对权威资料或实物测量；示意模型不能替代制造图、维修资料、医学或实验操作规范。

---

## English

Teach3D is a reusable Codex Skill for education as a broad category. It is not limited to mountain bikes or mechanical engineering. It turns reference images, real objects, structures, equipment, processes, or existing Three.js models into browser-based interactive lessons.

The Trek Marlin 6 is the first public showcase. It demonstrates the complete output: an orbitable model, selectable components, exploded views, process animation, load diagrams, guided lesson steps, classroom questions, and visible accuracy limits.

### Live demo

- [Open the project homepage and live showcase](https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site)
- [Open the standalone Marlin 6 teaching model](https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site/trek-marlin-6-teaching-3d.html)

![Real Marlin 6 interactive lesson output](public/assets/marlin-6-demo.jpg)

### Teaching categories

- Engineering: machines, vehicles, assemblies, transmission, and loads
- Science and labs: instruments, physical processes, chemistry, and procedures
- Life and medicine: organs, cells, anatomy, and process explanations
- Built and cultural subjects: architecture, artifacts, geography, and history

### Install the Skill

The recommended installation keeps the Skill easy to update from GitHub:

```bash
git clone https://github.com/Eternity-487/Teach3D.git ~/.codex/skills/teach3d
```

Alternatively, [download `teach3d-skill.zip`](https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site/teach3d-skill.zip), then run:

```bash
mkdir -p ~/.codex/skills
unzip ~/Downloads/teach3d-skill.zip -d ~/.codex/skills
```

The installed entry point should be:

```text
~/.codex/skills/teach3d/SKILL.md
```

To share one canonical checkout with Claude Code:

```bash
mkdir -p ~/.claude/skills
ln -s ~/.codex/skills/teach3d ~/.claude/skills/teach3d
```

### Example prompt

```text
$teach3d Turn this microscope into a bilingual interactive 3D lesson for secondary students, with component explanations, guided actions, and classroom questions.
```

### Workflow

`lesson contract → truth boundary → structure build → guided interaction → public delivery`

Teach3D uses staged review gates. A model must do more than look good: learners need a clear first action, an observable change, a meaningful question, and visible evidence for an answer.

### Run the showcase locally

```bash
npm install
npm run dev
```

Project surfaces:

- `skill/teach3d/`: installable Skill source
- `app/`: bilingual homepage, live showcase, and install guide
- `public/trek-marlin-6-teaching-3d.html`: first standalone Three.js lesson
- `public/showcase/`: real output screenshots

### Accuracy boundary

Teach3D separates verified facts, visual estimates, and teaching simplifications. Do not invent official dimensions, materials, torque values, standards, references, or configurations. Check precise claims against authoritative sources or measurements. An illustrative model does not replace manufacturing, repair, medical, or laboratory instructions.
