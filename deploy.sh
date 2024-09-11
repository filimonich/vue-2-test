#!/usr/bin/env sh

# Остановка скрипта при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd docs

git init
git add -A
git commit -m 'deploy'

# публикация на ветку gh-pages
git push -f git@github.com:filimonich/vue-2-test.git master:gh-pages

cd -
