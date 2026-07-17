import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html", host: "localhost" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders Ahmed's complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ahmed Mansour — Full-Stack Founder Partner<\/title>/i);
  assert.match(html, /I build the business/);
  assert.match(html, /Pick your Ahmed/i);
  assert.match(html, /Builder/);
  assert.match(html, /Strategist/);
  assert.match(html, /Designer/);
  assert.match(html, /Growth/);
  assert.match(html, /Nexfiy/);
  assert.match(html, /Growth Console/);
  assert.match(html, /PeopleOS/);
  assert.match(html, /role-builder\.png/);
  assert.match(html, /role-strategist\.png/);
  assert.match(html, /role-designer\.png/);
  assert.match(html, /role-growth\.png/);
  assert.match(html, /العربية/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the final social asset and removes starter scaffolding", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  assert.match(page, /type Language = "en" \| "ar"/);
  assert.match(page, /document\.documentElement\.dir/);
  assert.match(layout, /generateMetadata/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /codex-preview|_sites-preview/);
  await access(projectRoot);
});
