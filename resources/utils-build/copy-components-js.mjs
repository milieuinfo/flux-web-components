#!/usr/bin/env node

import { copyFile, copyFiles } from './file-processors.mjs';

copyFiles('build/tsc/lib-components/components/src', 'build/dist/libs/components', '');
copyFiles('libs/components/src', 'build/dist/libs/components', '.js');
copyFiles('libs/components/src', 'build/dist/libs/components', '.css');
copyFiles('libs/components/src', 'build/dist/libs/components', '.web-types.json');
copyFile('libs/components/package.template.json', 'build/dist/libs/components/package.json');
