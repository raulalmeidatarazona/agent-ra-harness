import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const repo = process.argv[2];
const results = [];

export const read = (path) => (existsSync(join(repo, path)) ? readFileSync(join(repo, path), 'utf8') : '');
export const exists = (path) => existsSync(join(repo, path));
export const list = (path) => (exists(path) ? readdirSync(join(repo, path)) : []);
export const check = (name, passed, detail = '') => results.push({ name, passed: Boolean(passed), detail });

export const section = (text, heading) => {
  const start = text.indexOf(`## ${heading}`);
  if (start === -1) return '';
  const next = text.indexOf('\n## ', start + 1);
  return text.slice(start, next === -1 ? undefined : next);
};

export const idsIn = (line) =>
  new Set((line.replace(/\b[A-Z]+\d+\b/g, '').replace(/\d{4}-\d{2}(-\d{2})?/g, '').match(/\b\d+\b/g) ?? []).map(Number));

export function analysisPhases() {
  const [folder] = list('.agents/analysis');
  const dir = folder ? `.agents/analysis/${folder}` : '';
  const files = ['1-understand', '2-decompose', '3-solutions', '4-design', '5-examples'].map((p) => `${dir}/${p}.md`);
  return files.map((path) => ({ path, text: read(path) }));
}

export function report() {
  for (const r of results) console.log(`${r.passed ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  (${r.detail})` : ''}`);
  const failed = results.filter((r) => !r.passed).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed === 0 ? 0 : 1);
}
