import { check, report, section } from '../lib.mjs';
import { commonAnalysisChecks } from '../analysis-checks.mjs';

const analysis = commonAnalysisChecks();
check('evidence lists the data it needs as assumptions', /assumption/i.test(section(analysis, 'Evidence')));
const rows = section(analysis, 'Worked examples').split('\n').filter((line) => /^\| [^-|]/.test(line) && !/^\| Case/.test(line));
check('at least 5 worked examples', rows.length >= 5, `${rows.length}`);
check('hand-written examples labelled as assumptions', rows.filter((line) => /assumption/i.test(line)).length >= 3);
check('a synthetic adversarial case', rows.some((line) => /synthetic/i.test(line)));
report();
