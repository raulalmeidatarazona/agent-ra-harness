import { analysisPhases, check, read } from './lib.mjs';

export function commonAnalysisChecks() {
  const analysis = read('docs/analysis.md');
  const phases = analysisPhases();
  check('docs/analysis.md written', analysis.length > 0);
  check('repository language recorded as English', /Repository language: English/.test(analysis));
  check('five phase files saved', phases.every((p) => p.text.length > 0), phases.filter((p) => !p.text).map((p) => p.path).join(', '));
  check('every phase agreed', phases.every((p) => /status: agreed/.test(p.text)));
  const stamps = phases.map((p) => Date.parse((p.text.match(/updated_at: "([^"]+)"/) ?? [])[1]));
  check('phase timestamps are real', stamps.every((t) => Math.abs(Date.now() - t) < 6 * 3600 * 1000));
  const all = [analysis, ...phases.map((p) => p.text)].join('\n');
  check('no em dash', !all.includes(String.fromCodePoint(0x2014)));
  const inPhases = new Set(phases.map((p) => p.text).join('\n').match(/\bR\d+\b/g));
  const inFinal = new Set(analysis.match(/\bR\d+\b/g));
  const lost = [...inPhases].filter((id) => !inFinal.has(id));
  const unsourced = [...inFinal].filter((id) => !inPhases.has(id));
  check('requirement IDs match phases in both directions', lost.length + unsourced.length === 0, `lost ${lost} unsourced ${unsourced}`);
  return analysis;
}
