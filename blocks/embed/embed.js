function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/);
  return match?.[1];
}

export default function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;

  const url = link.href;
  const ytId = getYouTubeId(url);

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'embed-video';

  if (ytId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}`;
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    wrapper.append(iframe);
  } else {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.setAttribute('playsinline', '');
    wrapper.append(video);
  }

  block.append(wrapper);
}
