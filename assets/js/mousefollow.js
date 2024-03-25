const frontpage = $("#frontpage");
const fullname = document.getElementById("fullname");
const isTouchDevice = ('ontouchstart' in window || 'onmsgesturechange' in window);

if (!isTouchDevice && frontpage && fullname) {
    const xOrigin = frontpage.width() / 2;
    const yOrigin = frontpage.height() / 2;
    const maxRotation = 20; // Maximum rotation angle
    const maxShadowOffset = 10; // Maximum drop shadow offset
    frontpage.on('mousemove', (e) => {
        const xRot = ((e.clientY - yOrigin) / yOrigin * -maxRotation);
        const yRot = ((e.clientX - xOrigin) / xOrigin * maxRotation);
        transform(xRot, yRot);
        clearTimeout(thread);
        thread = setTimeout(onmousestop, 1500);
    });

    let onmousestop = function () {
        transform(0, 0);
    }, thread;

    let transform = function (xRot, yRot) {
        fullname.animate({
            transform: `rotateX(${yRot * 0.4}deg) rotateY(${xRot * 0.4}deg)`,
            filter: `drop-shadow(${clamp(-maxShadowOffset, yRot * -0.5, maxShadowOffset)}px ${clamp(-maxShadowOffset, xRot * 0.5, maxShadowOffset)}px 0px var(--name-shadow))`
        }, { duration: 250, fill: "forwards" });
    }
}

// Helper function to clamp a value between a minimum and maximum
function clamp(min, value, max) {
    return Math.min(Math.max(value, min), max);
}
