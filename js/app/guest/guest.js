import { image } from './image.js';
import { progress } from './progress.js';
import { util } from '../../common/util.js';
import { loader } from '../../libs/loader.js';
import { theme } from '../../common/theme.js';
import { lang } from '../../common/language.js';
import { offline } from '../../common/offline.js';
import { pool } from '../../connection/request.js';

export const guest = (() => {

    /**
     * @returns {void}
     */
    const countDownDate = () => {
        const count = (new Date(document.body.getAttribute('data-time').replace(' ', 'T'))).getTime();
        const pad = (num) => num < 10 ? `0${num}` : `${num}`;

        const day = document.getElementById('day');
        const hour = document.getElementById('hour');
        const minute = document.getElementById('minute');
        const second = document.getElementById('second');

        let lastSecond = -1;

        const updateCountdown = () => {
            const distance = Math.abs(count - Date.now());
            const currentSecond = Math.floor(distance / 1000);

            if (currentSecond !== lastSecond) {
                lastSecond = currentSecond;
                day.textContent = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
                hour.textContent = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                minute.textContent = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
                second.textContent = pad(currentSecond % 60);
            }

            requestAnimationFrame(updateCountdown);
        };

        requestAnimationFrame(updateCountdown);
    };

    /**
     * @returns {void}
     */
    const showGuestName = async () => {
        const params = new URLSearchParams(window.location.search);
        const guestId = params.get('id');
        let name = null;

        if (guestId) {
            try {
                const response = await fetch(`./guests/${guestId}.json`);
                if (response.ok) {
                    const guestData = await response.json();
                    if (guestData.name) {
                        name = guestData.name;
                    }
                }
            } catch (error) {
                console.error("Failed to load guest", error);
            }
        }

        if (name) {
            const guestName = document.getElementById('guest-name');
            const div = document.createElement('div');
            div.classList.add('m-2');

            const template = `<small class="mt-0 mb-1 mx-0 p-0">${util.escapeHtml(guestName?.getAttribute('data-message'))}</small><p class="m-0 p-0">${util.escapeHtml(name)}</p>`;
            util.safeInnerHTML(div, template);

            guestName?.appendChild(div);
        }
    };

    /**
     * @returns {Promise<void>}
     */
    const slide = async () => {
        const interval = 6000;
        const slides = document.querySelectorAll('.slide-desktop');

        if (!slides || slides.length === 0) {
            return;
        }

        const desktopEl = document.getElementById('root')?.querySelector('.d-sm-block');
        if (!desktopEl) {
            return;
        }

        desktopEl.dispatchEvent(new Event('invitation.slide.stop'));

        if (window.getComputedStyle(desktopEl).display === 'none') {
            return;
        }

        if (slides.length === 1) {
            await util.changeOpacity(slides[0], true);
            return;
        }

        let index = 0;
        for (const [i, s] of slides.entries()) {
            if (i === index) {
                s.classList.add('slide-desktop-active');
                await util.changeOpacity(s, true);
                break;
            }
        }

        let run = true;
        const nextSlide = async () => {
            await util.changeOpacity(slides[index], false);
            slides[index].classList.remove('slide-desktop-active');

            index = (index + 1) % slides.length;

            if (run) {
                slides[index].classList.add('slide-desktop-active');
                await util.changeOpacity(slides[index], true);
            }

            return run;
        };

        desktopEl.addEventListener('invitation.slide.stop', () => {
            run = false;
        });

        const loop = async () => {
            if (await nextSlide()) {
                util.timeOut(loop, interval);
            }
        };

        util.timeOut(loop, interval);
    };

    /**
     * @param {HTMLButtonElement} button
     * @returns {void}
     */
    const open = (button) => {
        button.disabled = true;
        document.body.scrollIntoView({ behavior: 'instant' });
        document.getElementById('root').classList.remove('opacity-0');

        if (theme.isAutoMode()) {
            document.getElementById('button-theme').classList.remove('d-none');
        }

        slide();
        theme.spyTop();

        document.dispatchEvent(new Event('invitation.open'));
        util.changeOpacity(document.getElementById('welcome'), false).then((el) => el.remove());
    };

    /**
     * @returns {void}
     */
    const normalizeArabicFont = () => {
        document.querySelectorAll('.font-arabic').forEach((el) => {
            el.innerHTML = String(el.innerHTML).normalize('NFC');
        });
    };

    /**
     * @returns {void}
     */
    const animateSvg = () => {
        document.querySelectorAll('svg').forEach((el) => {
            if (el.hasAttribute('data-class')) {
                util.timeOut(() => el.classList.add(el.getAttribute('data-class')), parseInt(el.getAttribute('data-time')));
            }
        });
    };

    /**
     * @returns {void}
     */
    const buildGoogleCalendar = () => {
        const dateStr = document.body.getAttribute('data-time');
        // Parse date explicitly as BRT (UTC-03:00) so it's globally correct
        const startDate = new Date(dateStr.replace(' ', 'T') + '-03:00');
        const endDate = new Date(startDate.getTime() + (4 * 60 * 60 * 1000)); // 4 hours later

        const formatGCalDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.').shift() + 'Z';

        const url = new URL('https://calendar.google.com/calendar/render');
        const data = new URLSearchParams({
            action: 'TEMPLATE',
            text: 'Casamento de Fer e Bibi',
            dates: `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`,
            location: 'Gruta do Poço Certo, Lomba Alta, s/n - Zona Rural, Alfredo Wagner - SC, 88450-000, Brasil',
            ctz: 'America/Sao_Paulo',
        });

        url.search = data.toString();
        document.querySelector('#home button')?.addEventListener('click', () => window.open(url, '_blank'));
    };

    /**
     * @returns {object}
     */
    const loaderLibs = () => {
        progress.add();

        /**
         * @param {{aos: boolean}} opt
         * @returns {void}
         */
        const load = (opt) => {
            loader(opt)
                .then(() => progress.complete('libs'))
                .catch((err) => {
                    console.warn('Failed to load libraries gracefully, proceeding anyway:', err);
                    progress.complete('libs');
                });
        };

        return {
            load,
        };
    };

    /**
     * @returns {Promise<void>}
     */
    const booting = async () => {
        animateSvg();
        countDownDate();
        await showGuestName();
        normalizeArabicFont();
        buildGoogleCalendar();

        // wait until welcome screen is show.
        await util.changeOpacity(document.getElementById('welcome'), true);

        // remove loading screen and show welcome screen.
        await util.changeOpacity(document.getElementById('loading'), false).then((el) => el.remove());
    };

    /**
     * @returns {void}
     */
    const pageLoaded = () => {
        lang.init();
        offline.init();
        progress.init();

        const img = image.init();
        const lib = loaderLibs();

        window.addEventListener('resize', util.debounce(slide));
        document.addEventListener('invitation.progress.done', () => booting());
        document.addEventListener('hide.bs.modal', () => document.activeElement?.blur());

        img.load();
        lib.load();
    };

    /**
     * @returns {object}
     */
    const init = () => {
        theme.init();

        window.addEventListener('load', () => {
            pool.init(pageLoaded, [
                'image',
                'libs',
            ]);
        });

        return {
            util,
            theme,
            guest: {
                open,
            },
        };
    };

    return {
        init,
    };
})();
