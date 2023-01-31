#!/bin/bash
# @eg bash scripts/runPackages.sh --bail --eval "yarn test"

eval="$1"
excludedPackages=()
exitStatus=0
underline=`tput smul`
nounderline=`tput rmul`

# Flags & options
while [ $# -ne 0 ]
do
  ARG="$1"
  shift
  case "$ARG" in
  --eval)
    eval="$1"
    shift;;
  esac
done

allTemplates=$(find templates -maxdepth 1 -mindepth 1 -type d | awk -F'/' 'NF!=1{print $2}' | sort -u)

for template in ${allTemplates[@]}; do
  cd templates/${template}
  name="${underline}$(basename $(pwd))${nounderline}"
  echo -e "\n📦 ${name}"
  echo "$ ${eval}"
  eval $eval || exitStatus=$?
  if [[ $exitStatus -ne 0 ]]; then
    echo -e "💥 ${name} failed! (exited with ${exitStatus})"
    if [[ $bail -eq 1 ]]; then
      exit ${exitStatus}
    fi
  else
    echo "✨ ${name} done"
  fi
  cd - > /dev/null
done

echo -ne "\n"

if [[ "$exitStatus" -ne 0 ]]; then
  exit 1;
fi
