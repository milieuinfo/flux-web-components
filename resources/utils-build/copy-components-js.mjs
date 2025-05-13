#!/usr/bin/env node

import { copyFiles } from './file-processors.mjs';

copyFiles('build/tsc/lib-components/components/src', 'build/dist/libs/components', '');
copyFiles('libs/components/src', 'build/dist/libs/components', '.js');
copyFiles('libs/components', 'build/dist/libs/components', 'package.json');
copyFiles('libs/components/src', 'build/dist/libs/components', '.web-types.json');
