    /**
     * Represents a slider for displaying images.
     * @type {HTMLElement}
     */
    const slider = document.querySelector('.image-container');
    /**
     * A variable representing the navigation container element.
     *
     * @type {HTMLElement}
     */
    const navContainer = document.querySelector(".nav-container");
    /**
     * Access token is a string that represents the authorization to access a specific resource.
     *
     * @type {string}
     * @since 1.0.0
     */
    const accessToken = 'IGQWRQVXpoZADU1eWVnZAXMyX2doVlNkUUh1NGprT0ZAzLW1INHQ0cXQ0cFRqQWRoTVdPSUlwTUcwNmZAZAOEcxOFByOGh4S2tWQ0VfR2JaSG5aX0FhbVJBY0NDWlB1TE5KUGExeW80RV9OemxqRUV4bVdwRU5DU1NITFkZD';  // Замените на ваш фактический токен доступа

    /**
     * Fetches images from Instagram API and displays them in a slider.
     *
     * @returns {void} This method does not return a value.
     */
    function loadImages() {
      fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
          data.data.forEach(media => {
            if (media.media_type === "IMAGE") {
              const img = document.createElement('img');
              img.src = media.media_url;
              img.alt = 'Instagram photo';
              slider.appendChild(img);
            }
          });
          initializeSlider(); 
        })
        .catch(error => {
          console.error('Error fetching Instagram images:', error);
          alert('Failed to load images from Instagram.');
        });
    }

    /**
     * Initializes the slider element.
     * The slider consists of a list of images and navigation buttons.
     * The active image and button will be updated based on user interaction and auto play.
     */
    function initializeSlider() {
      const images = document.querySelectorAll(".image-container img");
      const totalImages = images.length;
      let imageIndex = 0;
      let interval;

      images.forEach((img, index) => {
        const button = document.createElement("button");
        button.classList.add("nav-btn");
        if (index === 0) button.classList.add("btn-active");
        button.addEventListener('click', () => {
          imageIndex = index;
          updateSlider();
          resetInterval();
        });
        navContainer.appendChild(button);
      });

      const buttons = document.querySelectorAll(".nav-btn");

      function updateSlider() {
        images.forEach((image, index) => {
          image.classList.remove("image-active");
          if (index === imageIndex) {
            image.classList.add("image-active");
          }
        });
        buttons.forEach((button, index) => {
          button.classList.remove("btn-active");
          if (index === imageIndex) {
            button.classList.add("btn-active");
          }
        });
      }

      function nextImage() {
        imageIndex = (imageIndex + 1) % totalImages;
        updateSlider();
      }

      function autoPlay() {
        interval = setInterval(nextImage, 3000);
      }

      function resetInterval() {
        clearInterval(interval);
        autoPlay();
      }

      updateSlider();
      autoPlay();
    }

    loadImages();