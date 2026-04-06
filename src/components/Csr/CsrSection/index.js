/* ------------------------------------------------------------------------------
@name: Csr Section
@description: Csr Section
--------------------------------------------------------------------------------- */

const CsrSection = (() => {
  const $selector = $('.js-csr-carousel');
  let autoplayTimeout = 3000;
  let progressDuration = 3000;
  let activeIndex = 0;
  let pendingIndex = 0;
  let progressStartTime = 0;
  let rafId = null;
  let isPaused = false;
  let pausedAt = 0;

  const updateDotsState = (currentIndex, currentProgress = 0) => {
    const carousel = $selector.data('owl.carousel');
    if (!carousel) return;

    const $dots = $selector.find('.owl-dot');

    $dots.each((index, dot) => {
      const $dot = $(dot);
      let fill = 0;

      if (index < currentIndex) {
        fill = 1;
      } else if (index === currentIndex) {
        fill = Math.max(0, Math.min(1, currentProgress));
      }

      $dot.get(0).style.setProperty('--csr-dot-fill', fill);
    });
  };

  const stopProgressLoop = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const runProgressLoop = () => {
    stopProgressLoop();

    const tick = () => {
      if (!isPaused) {
        const elapsed = performance.now() - progressStartTime;
        const progress = Math.max(0, Math.min(1, elapsed / progressDuration));
        updateDotsState(activeIndex, progress);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
  };

  const bindCarouselEvents = () => {
    $selector
      .off('initialized.owl.carousel change.owl.carousel translate.owl.carousel')
      .on('initialized.owl.carousel', () => {
        const carousel = $selector.data('owl.carousel');
        if (!carousel) return;

        activeIndex = carousel.relative(carousel.current());
        pendingIndex = activeIndex;
        progressStartTime = performance.now();
        updateDotsState(activeIndex, 0);
      })
      .on('change.owl.carousel', (event) => {
        const carousel = $selector.data('owl.carousel');
        if (!carousel || !event.property || event.property.name !== 'position') return;

        pendingIndex = carousel.relative(event.property.value);
      })
      .on('translate.owl.carousel', () => {
        activeIndex = pendingIndex;
        progressStartTime = performance.now();
        updateDotsState(activeIndex, 0);
      });

    $selector
      .off('mouseenter.csrProgress mouseleave.csrProgress')
      .on('mouseenter.csrProgress', () => {
        isPaused = true;
        pausedAt = performance.now();
      })
      .on('mouseleave.csrProgress', () => {
        if (!isPaused) return;
        isPaused = false;
        progressStartTime += performance.now() - pausedAt;
      });
  };

  // - handleRunCarousel
  const handleRunCarousel = () => {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }

    bindCarouselEvents();

    // --- init carousel
    $selector.addClass('owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      rewind: false,
      touchDrag: true,
      nav: false,
      mouseDrag: true,
      pullDrag: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 1250
    });

    autoplayTimeout = $selector.data('owl.carousel').settings.autoplayTimeout;
    progressDuration = Math.max(300, autoplayTimeout);
    runProgressLoop();
  };

  // - init
  const init = () => {
    if (!$selector.length) return;
    setTimeout(() => {
      handleRunCarousel();
    }, 200);
  };

  return {
    init
  };
})();

export default CsrSection;
