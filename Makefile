
build: components index.js emoji-analyser.css template.js
	@component build --dev --out public/build

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
