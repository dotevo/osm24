CC=gpp

SRCS:=$(wildcard *.src)
OBJS:=$(SRCS:.src=)

$(OBJS):
	$(CC) $(CFLAGS) $@.src -o $@ -T

clean:
	find . -type f -not -name '*.src' -not -name '*.inc' -not -name "Makefile" | xargs rm
