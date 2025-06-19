FROM node:20-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM alpine:3.18 AS export-dist
WORKDIR /export
COPY --from=build /app/dist ./dist
