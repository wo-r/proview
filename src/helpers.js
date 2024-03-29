/**
 * A simple function to make api links stand out.
 * 
 * NOTE: The string must start with "/".
 * @param path {string}
 * @returns {string}
 */
export const api = (path) => { 
    return `https://api.agilixbuzz.com${path}`
};

/**
 * Shortens getItem from localStorage.
 * @param {string} name
 * @param {boolean} parse
 */
export function get(name, parse = true) {
    return parse ? JSON.parse(localStorage.getItem(name)) : localStorage.getItem(name);
};

/**
 * Shortens setItem from localStorage.
 * @param {string} name
 * @param {string|array} data
 * @param {boolean} stringify
 */
export function set(name, data, stringify = true) {
    return stringify ? localStorage.setItem(name, JSON.stringify(data)) : localStorage.setItem(name, data);
}

/**
 * Shortens removeItem from localStorage.
 * @param {string} name
 */
export function remove(name) {
    localStorage.removeItem(name);
}

/** 
 * Shortens JSON.parse().
 * @param {array} data
 */
export function parse(data) {
    return JSON.parse(data);
}

/** 
 * Shortens JSON.stringify(). 
 * @param {array} data
 */
export function string(data) {
    return JSON.stringify(data);
}

/**
 * Checks if an image is valid and can appear on a web page.
 * @param {string} url
 * @param {function} callback
 */
export function image_valid(url, callback) {
    let image = new Image();
    image.onload = () => {callback(url, true)};
    image.onerror = () => {callback(url, false)};
    image.src = url;
};

/**
 * Checks if a url redirects to another url.
 * 
 * NOTE: CORS will make this not work sometimes. If this happens it will error and provide the original url.
 * @param {string} url
 * @param {function} callback
 */
export function url_redirects(url, callback) {
    fetch(url, {
        method: "get",
        redirect: "follow", // This instructs fetch to follow redirects
    })
    .then(response => {
        callback(response.url, response.ok);
    })
    .catch(error => {
        callback(url, false);
    });
};

/**
 * Shortens the need to use localStorage for commonly used objects.
 * @example hlp.session.token;
 */
export const session = {
    get exists() {return get("session") ? true : false},
    get token() {return get("session") ? get("session").token : undefined},
    get id() {return get("session") ? get("session").user.userid : undefined},
    get domainid() {return get("session") ? get("session").user.userspace : undefined},
    get username() {return get("session") ? get("session").user.username : undefined},
    get firstname() {return get("session") ? get("session").user.firstname : undefined},
    get lastname() {return get("session") ? get("session").user.lastname : undefined},
    get fullname() {return get("session") ? get('session').user.fullname : undefined}
};

/**
 * Wraps a overlay loader over the code to show that things are happening.
 * @param {function} main
 * @returns {void}
 */
export async function load(main) {
    $("#overlays").append(`
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div class="loader"><div></div><div></div><div></div><div></div></div>
        </div>
    `);

    await main();

    $("#overlays").empty();
}

/** 
 * Animates the top bars.
 * @returns {void}
 */
export async function animate_nav() {
    if ($(window).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(window).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
        $("#topnav").fadeIn(0);
    } else {
        $("#topnav").fadeOut(0);
    }
    
    // Manages when we scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(this).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
            $("#topnav").fadeIn(50);
        } else {
            $("#topnav").fadeOut(100);
        }
    });
}

/**
 * Sets the url for history back affects.
 * @param {string} title
 * @param {string} url
 */
export async function url(title, url) {
    history.pushState({}, title, url);
}