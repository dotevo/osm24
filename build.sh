#!/bin/sh

mkdir out
cp img  out/img -R
cp css out/css -R
cp js out/js -R
cp fonts out/fonts -R
cp main.html out/main.html
cp *.php out/
cp *.json out/
mkdir out/locales
i18next-conv -l en -s locales/en.po -t out/locales/en.json
i18next-conv -l ru -s locales/ru.po -t out/locales/ru.json
i18next-conv -l it -s locales/it.po -t out/locales/it.json
