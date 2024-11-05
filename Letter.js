    gsap.registerPlugin(ScrollTrigger);

    const imageWrappers = document.querySelectorAll('.image-wrapper');
    const images = document.querySelectorAll('.image');
    const categoryLabels = document.querySelectorAll('.category-label');
    const finalContent = document.querySelector('.final-content');

    const positions = [
      { x: -45, y: -45 },
      { x: -35, y: 15 },
      { x: -40, y: 35 },
      { x: 40, y: -35 },
      { x: 35, y: -15 },
      { x: 45, y: 45 },
    ];

    imageWrappers.forEach((wrapper, index) => {
      const targetX = positions[index].x * window.innerWidth / 100;
      const targetY = positions[index].y * window.innerHeight / 100;
      const image = wrapper.querySelector('.image');

      // Create a timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.sticky-container',
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          onUpdate: (self) => {
            categoryLabels[index].style.opacity = self.progress > 0.3 ? 1 : 0;
          }
        }
      });

      // Add animations to the timeline
      tl.to(wrapper, {
        x: targetX,
        y: targetY,
        opacity: 1,
      })
      .to(image, {
        width: '150px',
      }, 0); // The '0' means this animation starts at the same time as the position animation
    });

    gsap.to(finalContent, {
      opacity: 1,
      scrollTrigger: {
        trigger: '.final-content',
        start: 'top bottom-=100',
        end: 'bottom bottom',
        scrub: true
      }
    });

    gsap.fromTo(finalContent.querySelectorAll('h2, p'), 
      { y: 30, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.final-content',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true
        }
      }
    );

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