export default function smoothScroll() {
    return window.scrollBy({
    top: -10000,
    left: 0,
    behavior : "smooth"
});
}