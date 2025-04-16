https://github.com/dependents/node-dependency-tree
dependency-tree --directory=path/to/all/supported/files [--list-form] [-c path/to/require/config] [-w path/to/webpack/config] filename

dependency-tree --directory=libs/components/src index.ts
dependency-tree --directory=./libs/components/src ./libs/components/src/index.ts


https://github.com/dependents/node-precinct

precinct [options] path/to/file
precinct ./libs/components/src/index.ts
precinct libs/components/src/index.ts


https://github.com/elysiumphase/js-dependency-extractor
jsde -p ./libs/components -e .js .ts -i .node_modules -m
jsde -p ./libs/map/src -e .js .ts -i .node_modules -m


https://www.npmjs.com/package/madge


https://nx.dev/nx-api/eslint-plugin/documents/dependency-checks
https://dev.to/this-is-learning/manage-nx-library-dependencies-with-the-nxdependency-checks-eslint-rule-2lem

https://www.npmjs.com/package/depcheck
node -p "require('jsts/package.json').version"

npm list @nx/eslint-plugin @types/cypress @types/cypress-axe @types/jest @types/node lit @open-wc/testing sinon proj4 @storybook/addon-actions @storybook/web-components @domg-wc/components @domg-wc/common lit-html resize-observer-polyfill jsts --json --depth 1

npm pkg set dependencies.ol="8.0"

------------------------------

cd ./build/dist/libs/map
DEPENDENCIES="$(npx depcheck --oneline | tail -n +2)"
echo ${DEPENDENCIES}
cd ../../../..
npm list ${DEPENDENCIES} --json --depth 1

mkdir ./build/dep-to-add
npm list $(npx depcheck ./build/dist/libs/map --oneline | tail -n +2) --json --depth 1 > ./build/dep-to-add/map-dta.json

npm list @domg-wc/common proj4 lit @domg-wc/components jsts --json --depth 1

------------------------------

cat map-dta.json | jq '.dependencies | keys[]'
cat map-dta.json | jq '.dependencies.jsts.version'
jq -r '.dependencies | to_entries[] | "\(.key): \(.value.version)"' map-dta.json
jq -r '.dependencies | to_entries[] | "npm pkg set dependencies.\(.key)=\(.value.version)"' map-dta.json
jq -r '.dependencies | to_entries[] | "npm pkg set dependencies.\(.key)=\(.value.version)"' ../../../dep-to-add/map-dta.json | bash


npm pkg set dependencies.ol="8.0"
