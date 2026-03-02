document.addEventListener('DOMContentLoaded', () => {
    const videoFacade = document.getElementById('video-facade');
    if (videoFacade) {
        videoFacade.addEventListener('click', () => {
            const videoUrl = videoFacade.getAttribute('data-src');
            if (videoUrl) {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', videoUrl);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media; web-share');
                iframe.setAttribute('title', 'Az InnovationX Video');

                videoFacade.innerHTML = '';
                videoFacade.appendChild(iframe);
            }
        }, { once: true });
    }
});
