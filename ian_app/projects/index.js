function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000);
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 50) { // Adjust the scroll position threshold as needed
        header.style.backgroundColor = 'rgba(51, 51, 51, 0.5)'; // Lower opacity when scrolling
    } else {
        header.style.backgroundColor = 'rgba(51, 51, 51, 0.8)'; // Original opacity when not scrolling
    }
});
const bubble = document.getElementById('hoverBubble');
        const originalText = "Our Promise";
        const hoverText = "At Base, we're dedicated to simplifying and enhancing everyday experiences through intuitive technology. Our suite of apps - a tip calculator, grocery list organizer, rock-paper-scissors game, and weather companion - is designed to seamlessly integrate into your routine, empowering you to make informed decisions, stay organized, and add a touch offun to your day. We strive to provide practical solutions that effortlessly fit into your lifestyle, ensuring that with Base, you have the essential tools at your fingertips to navigate through life's moments with ease and enjoyment.";

        bubble.addEventListener('mouseenter', () => {
            bubble.textContent = hoverText;
        });

        bubble.addEventListener('mouseleave', () => {
            bubble.textContent = originalText;
        });