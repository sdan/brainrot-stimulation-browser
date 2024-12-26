(() => {
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
  // Example: or dynamically set the src from some video list
  leftVideo.src = 'https://brainrot-vscode-ext.sdan.io/videos_15/subwaysurfer.mp4';
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
  rightVideo.src = 'https://brainrot-vscode-ext.sdan.io/videos_15/subwaysurfer.mp4';
  rightContainer.appendChild(rightVideo);

  // 4. Append containers to the page
  document.body.appendChild(leftContainer);
  document.body.appendChild(rightContainer);

  // 5. Add video list and random selection (from original extension)
  const videos = [
    'subwaysurfer.mp4',
    'minecraft.mp4',
    'sliceit.mp4',
    'slime.mp4'
  ];
  const baseDomain = 'https://brainrot-vscode-ext.sdan.io/videos_15/';

  function getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return baseDomain + videos[randomIndex];
  }

  // 6. Set up video switching
  function switchVideo(videoElement) {
    videoElement.src = getRandomVideo();
    videoElement.load();
    videoElement.play().catch(error => {
      console.error('Auto-play was prevented:', error);
    });
  }

  // Switch videos periodically
  setInterval(() => {
    switchVideo(leftVideo);
    switchVideo(rightVideo);
  }, 30000); // Switch every 30 seconds
})();
