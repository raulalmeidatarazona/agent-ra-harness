import { analysisPhases, check, report } from '../lib.mjs';

const [first, second, third] = analysisPhases();
check('phase 1 agreed before the cut', /status: agreed/.test(first.text));
check('phase 2 saved as draft at the cut', /status: draft/.test(second.text));
check('phase 3 not started', third.text === '');
report();
