#!/usr/bin/env node

import { copyFile, copyFiles } from './file-processors.mjs';

copyFiles('build/tsc/lib-structures/structures/src', 'build/dist/libs/structures', '');
copyFiles('libs/structures/src', 'build/dist/libs/structures', '.js');
copyFiles('libs/structures/src', 'build/dist/libs/structures', '.css');
copyFiles('libs/structures', 'build/dist/libs/structures', '.web-types.json');
copyFile('libs/structures/package.template.json', 'build/dist/libs/structures/package.json');
