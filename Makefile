
test:
	./node_modules/.bin/mocha \
		--colors

test-w:
	./node_modules/.bin/mocha \
		--colors \
		--watch

.PHONY: test test-w
