export const offline = (() => {

    const alert = document.getElementById('offline-mode');

    const show = (isUp) => {
        return new Promise((res) => {
            let op = parseFloat(alert.style.opacity);
            let clear = null;

            const callback = () => {
                if (!isUp && op > 0) {
                    op -= 0.05;
                    alert.style.opacity = op.toFixed(2);
                } else if (isUp && op < 1) {
                    op += 0.05;
                    alert.style.opacity = op.toFixed(2);
                } else {
                    if (op <= 0) {
                        alert.style.opacity = '0';
                    } else if (op >= 1) {
                        alert.style.opacity = '1';
                    }
                    res();
                    clearInterval(clear);
                    clear = null;
                }
            };

            clear = setInterval(callback, 10);
        });
    };

    const setOffline = () => {
        alert.firstElementChild.firstElementChild.classList.remove('bg-success');
        alert.firstElementChild.firstElementChild.classList.add('bg-danger');
        alert.firstElementChild.firstElementChild.firstElementChild.innerText = 'Koneksi tidak tersedia';
    };

    const setOnline = () => {
        alert.firstElementChild.firstElementChild.classList.remove('bg-danger');
        alert.firstElementChild.firstElementChild.classList.add('bg-success');
        alert.firstElementChild.firstElementChild.firstElementChild.innerText = 'Koneksi tersedia kembali';
    };

    const onOffline = () => {
        setOffline();
        show(true);
    };

    const onOnline = () => {
        setOnline();

        let timeout = null;
        timeout = setTimeout(async () => {
            clearTimeout(timeout);
            timeout = null;
            await show(false);
            setOffline();
        }, 3000);
    };

    const init = () => {
        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);
    };

    return {
        init
    };
})();