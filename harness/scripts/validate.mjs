#!/usr/bin/env node
// Checks the harness without dependencies, so a project created from the template can run it as is.
import { existsSync, lstatSync, readFileSync, readdirSync, readlinkSync } from 'node:fs';
import { dirname, join, normalize, relative } from 'node:path';

const root = process.cwd();
const skillsDir = join(root, '.agents/skills');
const errors = [];
const fail = (where, message) => errors.push(`${relative(root, where) || '.'}: ${message}`);

const readText = (path) => readFileSync(path, 'utf8');

function filesUnder(dir, keep) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isSymbolicLink() || ['node_modules', '.git'].includes(entry.name)) return [];
    if (entry.isDirectory()) return filesUnder(path, keep);
    return keep(entry.name) ? [path] : [];
  });
}

function parseFrontmatter(path) {
  const match = readText(path).match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return fail(path, 'missing frontmatter');
  const fields = {};
  let parent = null;
  for (const line of match[1].split('\n')) {
    const entry = line.match(/^(\s*)([\w-]+):\s*(.*)$/);
    if (!entry) return fail(path, `unparseable frontmatter line: ${line}`);
    const [, indent, key, value] = entry;
    if (indent === '' && value === '') { parent = key; fields[key] = {}; continue; }
    const target = indent === '' ? fields : fields[parent];
    if (indent === '') parent = null;
    const quoted = /^".*"$/.test(value);
    if (!quoted && (/: /.test(value) || / #/.test(value) || /^[{[&*!|>%@`]/.test(value))) {
      fail(path, `${key} must be quoted: YAML reads ": ", " #" or a leading symbol as syntax`);
    }
    target[key] = value;
  }
  return fields;
}

function checkSkills() {
  const names = readdirSync(skillsDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  for (const name of names) {
    const path = join(skillsDir, name, 'SKILL.md');
    if (!existsSync(path)) { fail(join(skillsDir, name), 'missing SKILL.md'); continue; }
    const fields = parseFrontmatter(path);
    if (!fields) continue;
    if (fields.name !== name) fail(path, `name "${fields.name}" differs from folder "${name}"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) fail(path, 'name must be kebab-case, at most 64 characters');
    if (!fields.description || fields.description.length > 1024) fail(path, 'description must exist and be at most 1024 characters');
    for (const flag of ['disable-model-invocation', 'user-invocable']) {
      if (!['true', 'false'].includes(fields[flag])) fail(path, `${flag} must be true or false`);
    }
    const metadata = fields.metadata ?? {};
    if (!/^"\d+\.\d+"$/.test(metadata.version ?? '')) fail(path, 'metadata.version must be a quoted "major.minor"');
    if (!metadata.author) fail(path, 'metadata.author is missing');
    if (!metadata.license) fail(path, 'metadata.license is missing');
  }
  return names;
}

function checkLinksAndDashes() {
  const docs = [
    ...['AGENTS.md', 'README.md'].map((f) => join(root, f)).filter(existsSync),
    ...filesUnder(join(root, 'docs'), (n) => n.endsWith('.md')),
    ...filesUnder(join(root, 'harness'), (n) => n.endsWith('.md')),
    ...filesUnder(skillsDir, (n) => n.endsWith('.md')),
  ];
  for (const path of docs) {
    const prose = readText(path).replace(/^(```|~~~)[\s\S]*?^\1/gm, '');
    for (const [, target] of prose.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|mailto:|#|<)/.test(target)) continue;
      const file = normalize(join(dirname(path), target.split('#')[0]));
      if (!existsSync(file)) fail(path, `broken link ${target}`);
    }
  }
  const text = [...docs, ...filesUnder(root, (n) => /\.(sh|json|mjs|ya?ml)$/.test(n))];
  for (const path of new Set(text)) {
    if (readText(path).includes(String.fromCodePoint(0x2014))) fail(path, 'contains an em dash (U+2014)');
  }
}

function checkSymlinks() {
  const expected = { 'CLAUDE.md': 'AGENTS.md', '.claude/skills': '../.agents/skills', '.opencode/skills': '../.agents/skills' };
  for (const [link, target] of Object.entries(expected)) {
    const path = join(root, link);
    if (!existsSync(path) || !lstatSync(path).isSymbolicLink() || readlinkSync(path) !== target) {
      fail(path, `must be a symlink to ${target} (run make symlinks)`);
    }
  }
}

function checkLiveCopies() {
  const templates = join(skillsDir, 'ra-foundations/resources/templates');
  const copies = {
    '.claude/settings.json': 'claude/settings.json',
    '.claude/hooks/block-env-leak.sh': 'claude/hooks/block-env-leak.sh',
  };
  if (existsSync(join(root, 'AGENTS.md')) && readText(join(root, 'AGENTS.md')).startsWith('# <Project>')) {
    copies['AGENTS.md'] = 'AGENTS.md';
  }
  for (const [live, template] of Object.entries(copies)) {
    const livePath = join(root, live);
    if (!existsSync(livePath)) { fail(livePath, 'missing'); continue; }
    if (readText(livePath) !== readText(join(templates, template))) fail(livePath, `differs from templates/${template}`);
  }
}

function checkSkillsShGrouping(names) {
  const path = join(root, 'skills.sh.json');
  if (!existsSync(path)) return;
  const grouped = JSON.parse(readText(path)).groupings.flatMap((g) => g.skills);
  for (const name of names) if (!grouped.includes(name)) fail(path, `skill ${name} is in no grouping`);
  for (const name of grouped) if (!names.includes(name)) fail(path, `grouping lists unknown skill ${name}`);
}

const names = checkSkills();
checkLinksAndDashes();
checkSymlinks();
checkLiveCopies();
checkSkillsShGrouping(names);

if (errors.length > 0) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s).`);
  process.exit(1);
}
console.log(`OK: ${names.length} skills, links, symlinks and template copies.`);
