#!/usr/bin/env node

import { copyFiles } from './file-processors.mjs';

copyFiles('build/tsc/lib-styles', 'build/dist/libs/styles', '');
copyFiles('libs/styles/src', 'build/dist/libs/styles', '.js');
copyFiles('libs/styles/src', 'build/dist/libs/styles', '.css');
copyFiles('libs/styles', 'build/dist/libs/styles', 'package.json');
copyFiles('libs/styles', 'build/dist/libs/styles', '.web-types.json');
