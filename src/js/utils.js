const imagesLoaded = require('imagesloaded');

/**
 * Preload images
 * @param {String} selector - Selector/scope from where images need to be preloaded. Default is 'img'
 */
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

/**
 * Map number x from range [a, b] to [c, d] 
 * @param {Number} x - changing value
 * @param {Number} a 
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 */
 const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
 
/** 
 * Calculates how much (x and y) the element1 needs to move away from the center of the screen for a distance of [spread]px
 * @param {Element} element1
 * @param {JSON} position
 * @param {Number} spread - The maximum distance the element1 could have from element2. This will depend on how far the elements are from each other. The closer they are, the higher the returned values. If the distance equals or is higher than [maxDistance] then the return value will be {0,0}
 * @param {Number} maxDistance - The maximum distance for a possible translation to occur
 * @returns {JSON} the x,y translation values
 */
 const getTranslationDistance = (element1, spread = 400, maxDistance = 5000) => {
    const winsize = {width: window.innerWidth, height: window.innerHeight}
    const rect = element1.getBoundingClientRect();
    const elCenter = {x: rect.left + element1.offsetWidth/2, y: rect.top + element1.offsetHeight/2};
    const win = {x: winsize.width/2, y: winsize.height/2};

    spread = Math.max( map(getDistanceToCenter(element1), 0, maxDistance, spread, 0) , 0);
    
    const angle = Math.atan2(Math.abs(win.y - elCenter.y), Math.abs(win.x - elCenter.x));

    let x = Math.abs(Math.cos(angle) * spread);
    let y = Math.abs(Math.sin(angle) * spread);

    return {
        x: elCenter.x < win.x ? x*-1 : x,
        y: elCenter.y < win.y ? y*-1 : y
    };
};

/**
 * Gets the distance between the element and the center of the viewport
 * @param {Element} element1
 * @returns {Number} The distance value
 */
 const getDistanceToCenter = (element1) => {
    const winsize = {width: window.innerWidth, height: window.innerHeight}
    const elCenter = {x: element1.offsetLeft + element1.offsetWidth/2, y: element1.offsetTop + element1.offsetHeight/2};
    const wincenter = {x:winsize.width/2, y: winsize.height/2};
    return Math.hypot(elCenter.x - wincenter.x, elCenter.y - wincenter.y);
}

export {
    preloadImages,
    map,
    getTranslationDistance,
    getDistanceToCenter,
};