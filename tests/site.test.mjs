import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const index = read('index.html');
const appScript = index.match(/<script>([^]*?)<\/script>/)?.[1];

test('inline application JavaScript parses', () => {
    assert.ok(appScript, 'inline application script not found');
    assert.doesNotThrow(() => new Function(appScript));
});

test('machine-readable profiles are valid JSON', () => {
    assert.doesNotThrow(() => JSON.parse(read('about.json')));
    assert.doesNotThrow(() => JSON.parse(read('ai-profile.json')));
});

test('verified scale and modification date stay synchronized', () => {
    const mirrors = ['index.html', 'llms.txt', 'about.json', 'ai-profile.json', 'CLAUDE.md'];
    for (const file of mirrors) {
        const content = read(file);
        const compact = content.replace(/\s+/g, ' ');
        assert.match(compact, /20\+ core systems/, `${file} is missing the verified scale`);
        assert.doesNotMatch(content, /17 backend systems/, `${file} contains the stale scale`);
    }

    for (const file of ['index.html', 'about.json', 'ai-profile.json', 'sitemap.xml']) {
        assert.match(read(file), /2026-07-16/, `${file} has a stale modification date`);
    }
});

test('terminal output remains reflowable', () => {
    assert.doesNotMatch(index, /<pre class="listing"/);
    assert.match(index, /\.listing-row \{[^}]*flex-wrap: wrap/);
    assert.match(index, /\.history-listing \.cmd \{[^}]*overflow-wrap: anywhere/);
});

test('accessibility safeguards remain active', () => {
    assert.doesNotMatch(index, /\.prompt input \{[^}]*outline:\s*none/s);
    assert.match(index, /prefers-reduced-motion: reduce/);
    assert.match(index, /behavior: reduceMotion \? 'auto' : 'smooth'/);

    const dim = '#6a5f4d';
    const bar = '#e6dec9';
    const luminance = (hex) => {
        const channels = hex.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16) / 255);
        const [r, g, b] = channels.map((value) =>
            value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const foreground = luminance(dim);
    const background = luminance(bar);
    const contrast = (Math.max(foreground, background) + 0.05) /
        (Math.min(foreground, background) + 0.05);
    assert.ok(contrast >= 4.5, `light status-bar contrast is ${contrast.toFixed(2)}:1`);
});

test('persisted history is parsed defensively', () => {
    assert.match(index, /try \{\s*const parsed = JSON\.parse\(saved\)/s);
    assert.match(index, /Array\.isArray\(parsed\)/);
    assert.match(index, /filter\(\(entry\) => typeof entry === 'string'\)/);
});
