SUBDIRS = js css locales html

.PHONY: osm24 $(SUBDIRS)

osm24: $(SUBDIRS)
	mkdir out/js -p
	mkdir out/css -p
	mkdir out/locales -p
	cp js/osm24*.js out/js/osm24.js
	cp css/osm24*.css out/css/osm24.css
	cp locales/*.json out/locales/
	find ./html/ -type f -not -name '*.src' -not -name "Makefile" -not -name "*.inc" | xargs -i cp "{}" ./out/

$(SUBDIRS):
	$(MAKE) CFLAGS="$(CFLAGS)" -C $@

clean:
	for d in $(SUBDIRS); do $(MAKE) -C $$d clean; done
	rm -rf out
