const test = require("ava");
const inclusiveLanguage = require("../inclusive-language");

test("Results not found", t => {
	t.is(inclusiveLanguage("", []).length, 0);
	t.is(inclusiveLanguage("hello, you are cool", []).length, 0);
	t.is(inclusiveLanguage("", ["basically", "just"]).length, 0);
	t.is(inclusiveLanguage("hello, you are cool", ["basically", "just"]).length, 0);
});

test("Results found", t => {
	t.is(inclusiveLanguage("hello, just do this", ["just"]).length, 1);
	t.is(inclusiveLanguage("hello, basically just do this", ["basically", "just"]).length, 2);
});