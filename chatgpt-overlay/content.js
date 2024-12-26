// Video overlay injection for ChatGPT
console.log("Content script loaded on:", window.location.href);
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
  
  // 2. Add video element to left container
  const leftVideo = document.createElement('video');
  leftVideo.autoplay = true;
  leftVideo.loop = true;
  leftVideo.muted = true;
  leftVideo.playsInline = true;
  leftVideo.style.width = '100%';
  leftVideo.style.height = '100%';
  leftVideo.style.objectFit = 'cover';
  leftVideo.src = 'https://brainrot-vscode-ext.sdan.io/videos_15/subwaysurfer_part9.mp4';
  leftContainer.appendChild(leftVideo);

  // 3. Similar approach for right container
  const rightContainer = document.createElement('div');
  rightContainer.style.position = 'fixed';
  rightContainer.style.right = 0;
  rightContainer.style.top = 0;
  rightContainer.style.width = '20%';
  rightContainer.style.height = '100%';
  rightContainer.style.zIndex = '9999';
  rightContainer.style.overflow = 'hidden';

  const rightVideo = document.createElement('video');
  rightVideo.autoplay = true;
  rightVideo.loop = true;
  rightVideo.muted = true;
  rightVideo.playsInline = true;
  rightVideo.style.width = '100%';
  rightVideo.style.height = '100%';
  rightVideo.style.objectFit = 'cover';
  rightVideo.src = 'https://brainrot-vscode-ext.sdan.io/videos_15/subwaysurfer_part9.mp4';
  rightContainer.appendChild(rightVideo);

  // 4. Create unmute button
  const unmuteButton = document.createElement('button');
  unmuteButton.innerText = "Unmute Videos";
  unmuteButton.style.position = 'fixed';
  unmuteButton.style.bottom = '20px';
  unmuteButton.style.left = '20px';
  unmuteButton.style.zIndex = '10000';
  unmuteButton.style.padding = '8px 16px';
  unmuteButton.style.backgroundColor = '#4CAF50';
  unmuteButton.style.color = 'white';
  unmuteButton.style.border = 'none';
  unmuteButton.style.borderRadius = '4px';
  unmuteButton.style.cursor = 'pointer';
  unmuteButton.onclick = () => {
    leftVideo.muted = false;
    rightVideo.muted = false;
    leftVideo.play().catch(err => console.error('Left video unmute error:', err));
    rightVideo.play().catch(err => console.error('Right video unmute error:', err));
    unmuteButton.style.display = 'none';  // Hide button after unmuting
  };

  // 5. Append containers and button to the page
  document.body.appendChild(leftContainer);
  document.body.appendChild(rightContainer);
  document.body.appendChild(unmuteButton);

  // 6. Add video list and random selection
  const videos = [
    'subwaysurfer_part9.mp4',
    'minecraft_part9.mp4',
    'sliceit_part9.mp4',
    'slime_part9.mp4'
  ];
  const baseDomain = 'https://brainrot-vscode-ext.sdan.io/videos_15/';

  function getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return baseDomain + videos[randomIndex];
  }

  // 6. Set up video switching
  function switchVideo(videoElement) {
    videoElement.src = getRandomVideo();
    videoElement.muted = true;  // Ensure muted state is maintained
    videoElement.load();
    
    // Try to play with retry logic
    const attemptPlay = (retries = 3) => {
      videoElement.play().catch(error => {
        console.error('Auto-play was prevented:', error);
        if (retries > 0) {
          console.log(`Retrying playback, ${retries} attempts remaining...`);
          setTimeout(() => attemptPlay(retries - 1), 1000);
        }
      });
    };
    
    attemptPlay();
  }

  // Switch videos periodically
  setInterval(() => {
    switchVideo(leftVideo);
    switchVideo(rightVideo);
  }, 30000); // Switch every 30 seconds
  
  console.log('ChatGPT Video Overlay: Setup complete');
};

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOverlays);
} else {
  initOverlays();
}
})();
