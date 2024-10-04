#!/usr/bin/env node

import { copyFiles } from './file-processors.mjs';

copyFiles('build/tsc/lib-common-utilities', 'build/dist/libs/common-utilities', '');
copyFiles('libs/common/utilities/src', 'build/dist/libs/common-utilities', '.js');
copyFiles('libs/common/utilities/src', 'build/dist/libs/common-utilities', '.css');
copyFiles('libs/common/utilities', 'build/dist/libs/common-utilities', 'package.json');
copyFiles('libs/common/utilities', 'build/dist/libs/common-utilities', '.web-types.json');
