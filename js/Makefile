CC=gpp
COMPRESSOR=yui-compressor
JOIN=cat
PROJ=osm24

OBJS=main.part

$(PROJ): osm24.joined
	cp $^ $@.js

$(PROJ).min: osm24.joined
	$(COMPRESSOR) $^ > $@.js

osm24.joined: $(OBJS)
	$(JOIN) $^ > $@

$(OBJS): %.part: %.js
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm -f *.part
	rm -f *.joined
	rm -f $(PROJ).min.js
	rm -f $(PROJ).js
