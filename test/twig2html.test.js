const fs = require('fs');

describe('Twig extending', () => {
    it('should support functions', () => {
        let expected = fs.readFileSync('test/expected/greeting.html');
        let actual = fs.readFileSync('tmp/greeting.html');

        expect(expected.toString()).toEqual(actual.toString());
    });

    it('should support filters', () => {
        let expected = fs.readFileSync('test/expected/tel.html');
        let actual = fs.readFileSync('tmp/tel.html');

        expect(expected.toString()).toEqual(actual.toString());
    });
});

describe('template rendering', () => {
    it('index.html', () => {
        let expected = fs.readFileSync('test/expected/index.html');
        let actual = fs.readFileSync('tmp/index.html');

        expect(expected.toString()).toEqual(actual.toString());
    });

    it('page-1.html', () => {
        let expected = fs.readFileSync('test/expected/page-1.html');
        let actual = fs.readFileSync('tmp/page-1.html');

        expect(expected.toString()).toEqual(actual.toString());
    });

    it('page-2.html', () => {
        let expected = fs.readFileSync('test/expected/page-2.html');
        let actual = fs.readFileSync('tmp/page-2.html');

        expect(expected.toString()).toEqual(actual.toString());
    });
});
