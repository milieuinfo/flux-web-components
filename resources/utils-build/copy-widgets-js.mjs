#!/usr/bin/env node

import { copyFile, copyFiles } from './file-processors.mjs';

copyFiles('build/tsc/lib-widgets/widgets/src', 'build/dist/libs/widgets', '');
copyFiles('libs/widgets/src', 'build/dist/libs/widgets', '.js');
copyFiles('libs/widgets/src', 'build/dist/libs/widgets', '.css');
copyFiles('libs/widgets/src', 'build/dist/libs/widgets', '.web-types.json');
copyFile('libs/widgets/package.template.json', 'build/dist/libs/widgets/package.json');
