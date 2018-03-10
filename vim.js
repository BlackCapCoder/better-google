// ==UserScript==
// @name         google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/search?*
// @grant        none
// ==/UserScript==

(function () {
    let ix   = 0;
    let cnt  = 0;
    let gs   = [];
    let zoom = false;
    let wasg = false;

    function setIx (old, _new, zoomDir) {
        //if (old == _new) return;
        ix = _new;

        gs[old].classList.remove('selected');
        gs[ix].classList.add('selected');

        if (ix == 0) {
            window.scrollTo(0,0);
        } else if (ix == gs.length-1) {
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            const b = gs[ix].getBoundingClientRect();
            if (zoom || b.y < 0 || b.y + b.height >= window.innerHeight) {
                if (zoomDir == 't') window.scrollTo(0, b.y + window.scrollY - 20);
                if (zoomDir == 'b') window.scrollTo(0, b.y + window.scrollY - window.innerHeight + b.height + 20);
                if (zoomDir == 'c') window.scrollTo(0, b.y + window.scrollY - window.innerHeight/2 + b.height/2);
            }
        }

        zoom = false;

        if (shouldHandleKeys ()) gs[ix].focus();
    }

    function shouldHandleKeys () {
        if (document.activeElement.id == 'lst-ib') return false;

        // vimium search window
        if ( document.activeElement.tagName == 'DIV'
          && document.activeElement.children.length == 1
          && document.activeElement.children[0].tagName == 'STYLE'
           ) return false;

        return true;
    }

    let init = _ => {
        gs = document.querySelectorAll('._NId > .srg > .g, ._NId > .g');
        if (gs.length > 0) gs[0].classList.add('selected');
        for (let i = 0; i < gs.length; i++)
            gs[i].setAttribute('tabindex', '-1');
    };

    if (document.readyState == 'loading') {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init ();
    }

    document.addEventListener('selectionchange', _ => {
        let s = document.getSelection();
        if (s.type != 'Range') return;
        let e = s.focusNode.parentNode;
        let i = 0;
        for (; i < gs.length; i++)
            if (gs[i].contains(e)) break;
        setIx (ix, i, 'c');
    });

    window.addEventListener('keyup', e => {
        if (!shouldHandleKeys()) return;

        if (e.key == 'i') {
            let tb;

            if (wasg) {
                tb = document.querySelector('#lst-ib');
            } else {
                tb = gs[ix].querySelector('input');
                if (tb == null)
                    tb = document.querySelector('#lst-ib');
            }

            tb.selectionStart = tb.value.length;
            tb.focus();
            wasg = false;

            return true;
        } else if (e.key == 'Enter' || e.key == 'l') {
            gs[ix].querySelector('h3 > a').click();
        }

        wasg = e.key == 'g';
    });

    window.addEventListener('keydown', e => {
        if (!shouldHandleKeys()) return;

        const old = ix;
        let zoomDir = 't';

        if (zoom) {
            zoomDir = e.key == 'k' ? zoomDir = 't'
                    : e.key == 'j' ? zoomDir = 'b'
                    : e.key == 'z' ? zoomDir = 'c'
                    : '';
        } else {
            if (e.key == 'j') { ix = Math.min(ix+Math.max(cnt, 1), gs.length-1); cnt = 0;
            } else if (e.key == 'k') { ix = Math.max(ix-Math.max(cnt, 1), 0); cnt = 0;
            } else if (e.key == 'G') { ix = gs.length-1;
            } else if (e.key == 'g') { ix = 0;
            } else if (e.key == 'z') { zoom = true; return;
            } else if (!isNaN(parseInt(e.key))) {
              if (cnt == 0) {
                  cnt = e.key;
              } else {
                  cnt += e.key;
              }
            } else {
                return;
            }
        }

        setIx (old, ix, zoomDir);
    });
})();

