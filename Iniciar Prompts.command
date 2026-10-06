#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "⚡ Iniciando Prompts Célebres..."
sleep 1
open "http://localhost:3018"
npm run dev:all
