CONV=i18next-conv

SRCS:=$(wildcard *.po)
OBJS:=$(SRCS:.po=.json)


$(OBJS):
	$(CONV) -l $(@:.json=) -s $(@:.json=.po) -t $@

clean:
	rm -f *.json
