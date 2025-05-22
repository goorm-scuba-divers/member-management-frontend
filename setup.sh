#!/bin/bash

# Check if corepack is already installed and enabled
if command -v corepack >/dev/null 2>&1; then
  # Check if corepack is enabled (by checking if yarn is available via corepack)
  if corepack yarn --version >/dev/null 2>&1; then
    echo "Corepack is already installed and enabled"
  else
    corepack enable
    echo "Corepack enabled"
  fi
else
  npm install -g corepack && corepack enable
  echo "Corepack installed and enabled"
fi

# Set config file
CONFIG_FILE="$HOME/.$(basename "$SHELL")rc"

# Check if aliases already exist
if [ -f "$CONFIG_FILE" ]; then
  if grep -Fx 'alias y="corepack yarn"' "$CONFIG_FILE" >/dev/null; then
    echo "Aliases already exist in $CONFIG_FILE"
  else
    # Remove existing aliases if any
    grep -v -E 'alias (yarn|y)="corepack yarn"' "$CONFIG_FILE" > "${CONFIG_FILE}.tmp" 2>/dev/null || true
    # Add aliases
    echo '\n#Corepack' >> "${CONFIG_FILE}.tmp"
    echo 'alias y="corepack yarn"' >> "${CONFIG_FILE}.tmp"
    mv "${CONFIG_FILE}.tmp" "$CONFIG_FILE"
    echo "Aliases updated in $CONFIG_FILE"
  fi
else
  echo "Config file $CONFIG_FILE not found"
fi
