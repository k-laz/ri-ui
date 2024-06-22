#!/bin/bash

# Create-react-app (cra) requires custom environmental variables
# to be specified in a .env file. The .env file is used by cra
# when building to replace instances of env variables with the value
# in .env, if it exists. This script creates and populates the .env file.

ENV_FILE=".env"

# Create new empty .env page
rm -f $ENV_FILE
touch $ENV_FILE

# Env variables must begin with
# VITE_ to be exposed
CRA="VITE_"

notAdded () {
    echo "$1 env variable does not exist"
}

added() {
    echo "Adding $1 to ${ENV_FILE}"
}

# Add new environmental variables
# to this list
declare -a env_var_list=(
    "FIREBASE_API_KEY"              # Firebase config
    "FIREBASE_AUTH_DOMAIN"          # Firebase config
    "FIREBASE_PROJECT_ID"           # Firebase config
    "FIREBASE_STORAGE_BUCKET"       # Firebase config
    "FIREBASE_MESSAGING_SENDER_ID"  # Firebase config
    "FIREBASE_APP_ID"               # Firebase config
    "FIREBASE_MEASUREMENT_ID"       # Firebase config
)

# Loops through all specified env 
# variables. Ones that exist are 
# added to the .env file.
for env_var in "${env_var_list[@]}"
do
    eval "env_value=\${$env_var}"

    if [[ -z ${env_value} ]]; then
        notAdded ${env_var}
    else
        added ${env_var}
        echo ${CRA}${env_var}=${env_value} >> ${ENV_FILE}
    fi
done
