#!/usr/bin/env bash

set -e # terminate on first failure

ROOT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ncu -f @types/node -t minor -u; ncu -x @types/node -u; pnpm upgrade
${ROOT_DIR}/runTemplates.sh "ncu -f @types/node -t minor -u; ncu -x @types/node -u; pnpm upgrade"
