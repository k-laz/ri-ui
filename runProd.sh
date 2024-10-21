#!/bin/bash
source environment/env.sh
export NODE_ENV="prod"
npm run build
npm run start
