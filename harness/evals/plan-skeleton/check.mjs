import { check, list, read, report } from '../lib.mjs';

const [folder] = list('.agents/plans');
const [file] = folder ? list(`.agents/plans/${folder}`).filter((f) => f.endsWith('-plan.md')) : [];
const plan = file ? read(`.agents/plans/${folder}/${file}`) : '';
check('plan saved', plan.length > 0);

const tasks = plan.split('\n').filter((line) => line.startsWith('- [ ]') && !/STOP/.test(line));
const estimates = tasks.map((line) => line.match(/^- \[ \] \((\d+):(\d{2})\)/));
check('every task has an estimate', tasks.length > 0 && estimates.every(Boolean), `${estimates.filter((e) => !e).length} without`);
const minutes = estimates.filter(Boolean).reduce((sum, [, h, m]) => sum + Number(h) * 60 + Number(m), 0);
check('estimates fit the 0:45 budget', minutes > 0 && minutes <= 45, `${minutes} min`);

const phases = plan.split('\n### Phase').slice(1);
check('every phase sets a cadence', phases.length > 0 && phases.every((p) => /\*\*Cadence\*\*/.test(p)));
check('skeleton stays bare', !/playwright|preflight|retry button|outage|recovery/i.test(plan));
check('plan is at most 200 lines', plan.split('\n').length <= 200, `${plan.split('\n').length}`);
check('first task builds the verification command', /verif|toolchain|make verify/i.test(tasks[0] ?? ''));
check('roadmap marks slice 0 planned', /\| 0 \|[^\n]*\| planned \|/.test(read('docs/foundations/roadmap.md')));
report();
