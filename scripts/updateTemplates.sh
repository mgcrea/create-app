#!/usr/bin/env bash

set -e # terminate on first failure

ROOT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

${ROOT_DIR}/runTemplates.sh "ncu -f @types/node -t minor -u; ncu -x @types/node -u; rm -rf pnpm-lock.yaml node_modules; pnpm upgrade"
