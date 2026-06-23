(function () {
    const paths = ['./matomo-tracking.js', '../matomo-tracking.js', '../../matomo-tracking.js', '../../../matomo-tracking.js'];
    let index = 0;

    const tryLoad = () => {
        if (index >= paths.length) return;
        const s = document.createElement('script');
        s.src = paths[index++];
        s.onerror = tryLoad;
        document.head.appendChild(s);
    };

    tryLoad();
})();
