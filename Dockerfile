FROM acd-docker.repository.milieuinfo.be/node:22.20.0 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm ci

COPY . .

RUN npm run libs:build

RUN CI=true npm run libs:jest

FROM scratch AS test-results
COPY --from=build /app/test-results/ /
