
default: all

BROWSERIFY = node_modules/.bin/browserify
UGLIFYJS = node_modules/.bin/uglifyjs
MOCHA = node_modules/.bin/mocha

test:
	$(MOCHA) --colors

test-w:
	$(MOCHA) --colors --watch

browser:
	mkdir browser/

backbone-basics.js: browser
	$(BROWSERIFY) ./src/browser-index.js > browser/backbone-basics.js

backbone-basics-min.js: browser/backbone-basics.js
	$(UGLIFYJS) browser/backbone-basics.js --mangle --comments "all" > browser/backbone-basics-min.js

build-browser: backbone-basics.js backbone-basics-min.js

loc:
	wc --lines src/*

clean:
	rm --force --recursive browser

.PHONY: build-browser test test-w loc clean

