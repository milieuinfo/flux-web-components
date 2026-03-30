#!/usr/bin/env node

import { copyFiles } from './file-processors.mjs';

copyFiles('build/tsc/lib-map/map/src', 'build/dist/libs/map', '');
copyFiles('libs/map/src', 'build/dist/libs/map', '.js');
copyFiles('libs/map/src', 'build/dist/libs/map', '.css');
copyFiles('libs/map', 'build/dist/libs/map', 'package.json');
copyFiles('libs/map', 'build/dist/libs/map', '.web-types.json');
