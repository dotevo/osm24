#!/bin/bash


#Update template
echo "#, fuzzy" > locales/template.pot
echo "msgid \"\"" >> locales/template.pot
echo "msgstr \"\"" >> locales/template.pot
echo "\"Project-Id-Version: OSM24\n\"" >> locales/template.pot
echo "\"MIME-Version: 1.0\n\"" >> locales/template.pot
echo "\"Content-Type: text/plain; charset=utf-8\n\"" >> locales/template.pot
echo "\"Content-Transfer-Encoding: 8bit\n\"" >> locales/template.pot

grep data-i18n= main.html | sed -r  's/^[^\n]*data-i18n="([^\"]+)".*/\1/' | sort | uniq | while read in; do echo "msgid \"$in\""; echo "msgstr \"\""; done  >> locales/template.pot
