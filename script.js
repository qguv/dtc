const rosetta = {
    ')': '`',
    '`': '@',
    '{': '^',
    '^': '&',
    ']': '*',
    '*': '(',
    '(': ')',
    '/': '-',
    '&': '_',
    '?': '=',
    ';': '+',
    ')': `'`,
    '@': '"',
    '<': ';',
    '>': ':',
    '-': '/',
    '_': '?',
    '|': '>',
    '\\': '<',
};

function translate(src, dest, rosetta) {
    const cs = Array.from(src.value);
    dest.value = cs.map(c => rosetta[c] ?? c).join('');
}

function invert_obj(o) {
    let entries = Object.entries(o);
    entries = entries.map(([k, v]) => [v, k]);
    return Object.fromEntries(entries);
}

function on_load(ev) {
    const textarea_device = document.getElementById('textarea-device');
    const textarea_standard = document.getElementById('textarea-standard');

    const inverse_rosetta = invert_obj(rosetta);

    // from device to standard 
    for (const type of ['change', 'input']) {
        textarea_device.addEventListener(
            type,
            ({ isTrusted }) => {

                // prevent going back and forth
                if (!isTrusted) {
                    return;
                }

                translate(textarea_device, textarea_standard, rosetta);
            },
        );

        // from standard to device
        textarea_standard.addEventListener(
            type,
            ({ isTrusted }) => {

                // prevent going back and forth
                if (!isTrusted) {
                    return;
                }

                translate(textarea_standard, textarea_device, inverse_rosetta);
            },
        );
    }
}

window.addEventListener('DOMContentLoaded', on_load);
