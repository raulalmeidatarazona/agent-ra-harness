import { check, idsIn, report, section } from '../lib.mjs';
import { commonAnalysisChecks } from '../analysis-checks.mjs';

const analysis = commonAnalysisChecks();
const examples = section(analysis, 'Worked examples');
const requirements = analysis.match(/^\| R\d+ /gm) ?? [];
check('at least 12 atomic requirements', requirements.length >= 12, `${requirements.length}`);

const rowFor = (query) => examples.split('\n').find((line) => line.includes(query)) ?? '';
const q1 = idsIn(rowFor('refund AND NOT duplicate'));
check('refund AND NOT duplicate gives 1, 3, 7, 8, 10', [1, 3, 7, 8, 10].every((id) => q1.has(id)) && !q1.has(2), [...q1].join(','));
const q2 = idsIn(rowFor('chargeback'));
check('"credit card" OR chargeback gives 3, 5, 7', [3, 5, 7].every((id) => q2.has(id)), [...q2].join(','));
check('monthly counts 2026-09: 4 and 2026-10: 6', /2026-09\D{1,8}4\b/.test(analysis) && /2026-10\D{1,8}6\b/.test(analysis));
check('adversarial case for HTML in ticket text', /script|xss/i.test(examples));
check('adversarial case for instructions in ticket text', /inject|ignore previous/i.test(examples));
report();
