const audio = document.getElementById('myAudio');

// Set volume to 10%
audio.volume = 0.1;

// Function to play audio
function playAudio() {
    audio.play().catch(() => {
        console.log("Autoplay was prevented. Please interact with the page.");
    });
}

// Attempt to autoplay on page load
document.addEventListener('DOMContentLoaded', () => {
    playAudio();

    // Listen for any click on the document to enable audio if autoplay is blocked
    document.addEventListener('click', playAudio, { once: true });
});