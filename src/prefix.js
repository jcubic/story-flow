/* Code generated by Gaiman version {{VER}}
 * https://github.com/jcubic/gaiman
 */
function parse_cookies(cookies) {
    const result = {};
    cookies.split(/\s*;\s*/).forEach(function(pair) {
        pair = pair.split(/\s*=\s*/);
        var name = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair.splice(1).join('='));
        result[name] = value;
    });
    return result;
}

function is_node() {
    return typeof process !== 'undefined' &&
        process.release.name === 'node';
}

function is_iframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

class WebAdapter {
    constructor() {
        var body = $('body');
        var options = body.css('--options');
        if (typeof options === 'undefined') {
            options = {};
        } else {
            try {
                options = JSON.parse(options);
            } catch(e) {
                console.warn('Gaiman: Invalid --option CSS variable');
                options = {};
            }
        }
        this._term = body.terminal($.noop, $.extend({
            greetings: false,
            exit: false
        }, options));
    }
    sleep(timeout) {
        this._term.pause();
        return new Promise(resolve => {
            setTimeout(() => {
                this._term.resume();
                resolve();
            }, Number(timeout));
        });
    }
    echo(string) {
        this._term.echo(string);
    }
    ask_animate(message, delay) {
        return this._term.read(message, { typing: true, delay });
    }
    echo_animate(string, delay) {
        return this._term.echo(string, { typing: true, delay });
    }
    prompt_animate(string, delay) {
        return this._term.set_prompt(string, { typing: true, delay });
    }
    input_animate(string, delay) {
        return this._term.typing('enter', delay, string);
    }
    get(url) {
        return fetch(url).then(res => res.text());
    }
    async post(url, data) { }
}

var cookie, argv, term, $$__m;
if (is_node()) {
    argv = process.argv;
} else {
    cookie = parse_cookies(document.cookie);
    term = new WebAdapter();
}
