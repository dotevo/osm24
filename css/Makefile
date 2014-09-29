CC=gpp
COMPRESSOR=yui-compressor
JOIN=cat
PROJ=osm24

OBJS=main.part

$(PROJ): osm24.joined
	cp $^ $@.css

$(PROJ).min: osm24.joined
	$(COMPRESSOR) $^ > $@.css

osm24.joined: $(OBJS)
	$(JOIN) $^ > $@

$(OBJS): %.part: %.css
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm -f *.part
	rm -f *.joined
	rm -f $(PROJ).css
	rm -f $(PROJ).min.css
