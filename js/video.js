document.addEventListener('DOMContentLoaded', () => {
    const videoFacade = document.getElementById('video-facade');
    if (videoFacade) {
        videoFacade.addEventListener('click', () => {
            const videoUrl = videoFacade.getAttribute('data-src');
            if (videoUrl) {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', videoUrl);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share');
                iframe.setAttribute('title', 'Servicios Az InnovationX');

                // Limpiar el contenido de la fachada y agregar el iframe
                videoFacade.innerHTML = '';
                videoFacade.appendChild(iframe);
            }
        }, { once: true });
    }
});
