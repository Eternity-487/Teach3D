import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the bilingual Teach3D project experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /TEACH/);
  assert.match(html, /把任何知识对象/);
  assert.match(html, /在线案例/);
  assert.match(html, /模型来源/);
  assert.match(html, /真实模型优先/);
  assert.match(html, /安装 Skill/);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working/);
});

test("keeps the installable skill, live 3D asset, screenshot, and social preview", async () => {
  const [page, layout, model, skill, screenshot, socialImage, archive] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("public/trek-marlin-6-teaching-3d.html", root), "utf8"),
    readFile(new URL("skill/teach3d/SKILL.md", root), "utf8"),
    readFile(new URL("public/assets/marlin-6-demo.jpg", root)),
    readFile(new URL("public/assets/teach3d-showcase.jpg", root)),
    readFile(new URL("public/teach3d-skill.zip", root)),
  ]);
  assert.match(page, /\/trek-marlin-6-teaching-3d\.html/);
  assert.match(page, /Turn any subject into/);
  assert.match(page, /teach3d-skill\.zip/);
  assert.match(layout, /\/assets\/teach3d-showcase\.jpg/);
  assert.match(model, /THREE\.WebGLRenderer/);
  assert.match(skill, /name: teach3d/);
  assert.match(skill, /model-asset-pipeline/);
  assert.match(skill, /Asset rights/);
  assert.ok(screenshot.byteLength > 30_000);
  assert.ok(socialImage.byteLength > 30_000);
  assert.ok(archive.byteLength > 1_000);
});
