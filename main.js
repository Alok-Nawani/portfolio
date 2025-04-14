function portfolioApp() {
    return {
      current: 'profile',
      darkMode: false,
      newUploadDescription: '',
      uploads: JSON.parse(localStorage.getItem('portfolioUploads') || '{}'),

      sections: [
        { key: 'profile', name: 'Profile', description: 'I am a B.Tech student with a passion for web development and digital design. Skilled in Java, HTML, and CSS, I enjoy bringing creativity and functionality together to craft engaging user experiences. With a perfectionist mindset, I continuously refine designs to enhance interaction and aesthetics. My goal is to create innovative digital experiences that seamlessly blend creativity with technology.' },
        { key: 'education', name: 'Education', description: 'A little about my education.' },
         {
            key: 'personality',
            name: 'Personality',
            description: `Traits that define me.<br>
            Ambitious & Driven | Creative & Expressive | Detail-Oriented & Perfectionist | Adaptable & Curious | Energetic & Enthusiastic | Resilient & Determined | Balanced & Thoughtful | Confident & Visionary Leader`
          },
          
        { key: 'skills', name: 'Skills', description: 'My skills and expertise.' },        
        { key: 'projects', name: 'Projects', description: 'A showcase of my development projects.' },
        { key: 'resume', name: 'Resume', description: 'Downloadable resume with qualifications and skills.' },
        { key: 'certificates', name: 'Certificates', description: 'My verified certifications and achievements.' },
        { key: 'contact', name: 'Contact', description: 'Get in touch with me.' },
      ],

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  },

  

      uploadFile(event, sectionKey) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          // Check if uploads for this section exist
          if (!this.uploads[sectionKey]) {
            this.uploads[sectionKey] = [];
          }

          // Add file with description to the uploads
          this.uploads[sectionKey].push({
            name: file.name,
            type: file.type,
            url: e.target.result,
            description: this.newUploadDescription
          });

          // Reset description and save to localStorage
          this.newUploadDescription = '';
          localStorage.setItem('portfolioUploads', JSON.stringify(this.uploads));
        };
        reader.readAsDataURL(file);
      },

      saveUpload() {
        localStorage.setItem('portfolioUploads', JSON.stringify(this.uploads));
      },

      deleteUpload(sectionKey, index) {
        this.uploads[sectionKey].splice(index, 1);
        localStorage.setItem('portfolioUploads', JSON.stringify(this.uploads));
      }
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("mediaModal");
    const modalImg = document.getElementById("modalImg");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.getElementById("closeModal");
    const downloadBtn = document.getElementById("downloadBtn");
    const loadingSpinner = document.getElementById("loadingSpinner");

    // Add click event to all images and videos
    document.querySelectorAll("img, video").forEach(media => {
        media.style.cursor = "zoom-in";
        media.addEventListener("click", function () {
            modal.style.display = "block";
            loadingSpinner.style.display = "block"; // Show the spinner

            // Hide buttons initially
            closeBtn.style.opacity = "0";
            downloadBtn.style.opacity = "0";

            if (this.tagName === "IMG") {
                modalImg.style.display = "none"; // Hide the image initially
                modalVideo.style.display = "none";

                modalImg.src = this.src;
                modalImg.onload = () => {
                    loadingSpinner.style.display = "none"; // Hide the spinner once the image loads
                    modalImg.style.display = "block"; // Show the image

                    // Show buttons after 1 second
                    setTimeout(() => {
                        closeBtn.style.opacity = "1";
                        downloadBtn.style.opacity = "1";
                    }, 1000);
                };

                // Set the download link for the image
                downloadBtn.href = this.src;
                downloadBtn.download = this.alt || "image.jpg"; // Ensure a valid filename
            } else if (this.tagName === "VIDEO") {
                modalVideo.style.display = "none"; // Hide the video initially
                modalImg.style.display = "none";

                modalVideo.src = this.currentSrc || this.src;
                modalVideo.onloadeddata = () => {
                    loadingSpinner.style.display = "none"; // Hide the spinner once the video loads
                    modalVideo.style.display = "block"; // Show the video

                    // Show buttons after 1 second
                    setTimeout(() => {
                        closeBtn.style.opacity = "1";
                        downloadBtn.style.opacity = "1";
                    }, 1000);
                };

                // Set the download link for the video
                downloadBtn.href = this.currentSrc || this.src;
                downloadBtn.download = "video.mp4"; // Ensure a valid filename
            }
        });
    });

    // Prevent the modal's click event from interfering with the download button
    downloadBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the modal's click event
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
        modalVideo.pause(); // Pause the video if it's playing
    });

    // Close the modal when clicking outside the content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modalVideo.pause(); // Pause the video if it's playing
        }
    });
});

// Initialize particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 2 }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            repulse: { distance: 100 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
    
});
