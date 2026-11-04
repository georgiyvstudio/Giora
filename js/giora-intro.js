
document.addEventListener('DOMContentLoaded', function () {

    const intro = document.getElementById('gioraIntro');
    const door = document.getElementById('gioraDoorTrigger');
    const skip = document.getElementById('gioraSkip');

    if (!intro || !door || !skip) return;

    // true = показва интрото при всяко презареждане
    // false = показва го само веднъж
    const INTRO_TEST_MODE = true;

    const OPEN_DURATION = 2100;
    const VIEW_DURATION = 900;
    const EXIT_DURATION = 850;

    if (!INTRO_TEST_MODE &&
        localStorage.getItem('gioraIntroSeen')) {
        intro.hidden = true;
        return;
    }

    document.body.classList.add('no-scroll');

    let closed = false;
    let closeTimer;
    let exitTimer;

    function closeIntro() {

        if (closed) return;

        closed = true;

        clearTimeout(closeTimer);
        clearTimeout(exitTimer);

        intro.classList.add('is-leaving');

        if (!INTRO_TEST_MODE) {
            localStorage.setItem('gioraIntroSeen', 'true');
        }

        exitTimer = setTimeout(function () {
            intro.hidden = true;
            document.body.classList.remove('no-scroll');
        }, EXIT_DURATION);
    }

    // Отваряне на вратичката
    door.addEventListener('click', function () {

        if (closed ||
            intro.classList.contains('is-door-open')) {
            return;
        }

        intro.classList.add('is-door-open');

        closeTimer = setTimeout(
            closeIntro,
            OPEN_DURATION + VIEW_DURATION
        );
    });

    // Пропускане
    skip.addEventListener('click', closeIntro);

});
