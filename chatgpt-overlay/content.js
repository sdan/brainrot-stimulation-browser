// Video overlay injection for ChatGPT
(() => {
  // Wait for page to be fully loaded
  const initOverlays = () => {
    console.log('ChatGPT Video Overlay: Initializing...');
    
    // Check if we're on the actual chat interface
    if (!document.body || document.body.innerHTML.includes('Cloudflare')) {
      console.log('ChatGPT Video Overlay: Waiting for page load...');
      setTimeout(initOverlays, 1000);
      return;
    }
    
    // 1. Create left overlay container
    const leftContainer = document.createElement('div');
    leftContainer.style.position = 'fixed';
    leftContainer.style.left = 0;
    leftContainer.style.top = 0;
    leftContainer.style.width = '20%';
    leftContainer.style.height = '100%';
    leftContainer.style.zIndex = '9999';
    leftContainer.style.overflow = 'hidden';

    // 2. Instead of a <video>, create an iframe
    const leftIframe = document.createElement('iframe');
    leftIframe.style.width = '100%';
    leftIframe.style.height = '100%';
    leftIframe.frameBorder = "0";
    leftIframe.allow = "autoplay; fullscreen";
    leftIframe.style.objectFit = 'cover';
    leftContainer.appendChild(leftIframe);

    // 3. Similar approach for right container
    const rightContainer = document.createElement('div');
    rightContainer.style.position = 'fixed';
    rightContainer.style.right = 0;
    rightContainer.style.top = 0;
    rightContainer.style.width = '20%';
    rightContainer.style.height = '100%';
    rightContainer.style.zIndex = '9999';
    rightContainer.style.overflow = 'hidden';

    const rightIframe = document.createElement('iframe');
    rightIframe.style.width = '100%';
    rightIframe.style.height = '100%';
    rightIframe.frameBorder = "0";
    rightIframe.allow = "autoplay; fullscreen";
    rightIframe.style.objectFit = 'cover';
    rightContainer.appendChild(rightIframe);

    // 4. Add a button to manually enable/disable video overlays
    let videosEnabled = false;
    const toggleButton = document.createElement('button');
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.left = '20px';
    toggleButton.style.zIndex = '10000';
    toggleButton.style.padding = '8px 16px';
    toggleButton.style.backgroundColor = '#4CAF50';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '4px';
    toggleButton.style.cursor = 'pointer';

    function updateButtonText() {
      toggleButton.innerText = videosEnabled ? 'disable brainrot' : 'enable brainrot';
    }
    updateButtonText();

    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
      if (!videosEnabled) {
        document.body.appendChild(leftContainer);
        document.body.appendChild(rightContainer);
        videosEnabled = true;
      } else {
        leftContainer.remove();
        rightContainer.remove();
        videosEnabled = false;
      }
      updateButtonText();
    });

    // 5. YouTube video IDs to cycle through
    const videos = [
      '7yl7Wc1dtWc', // minecraft
      's600FYgI5-s', // Minecraft
      'zZ7AimPACzc', // subway surfers good
      'RbVMiu4ubT0', // subway again
    ];

    function getRandomVideo() {
      const randomIndex = Math.floor(Math.random() * videos.length);
      const videoId = videos[randomIndex];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    }

    function setVideos() {
      // 30% chance both videos will be the same
      const useSameVideo = Math.random() < 0.3;
      
      if (useSameVideo) {
        const videoUrl = getRandomVideo();
        leftIframe.src = videoUrl;
        rightIframe.src = videoUrl;
      } else {
        leftIframe.src = getRandomVideo();
        rightIframe.src = getRandomVideo();
      }
    }

    // Initial video load
    setVideos();

    // Switch videos every 30 seconds
    setInterval(setVideos, 30000);
    
    console.log('ChatGPT Video Overlay: Setup complete');
  };

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOverlays);
  } else {
    initOverlays();
  }
})();
