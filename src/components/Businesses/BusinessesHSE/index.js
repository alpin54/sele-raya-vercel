/* ------------------------------------------------------------------------------
@name: BusinessesHSE
@description: BusinessesHSE
--------------------------------------------------------------------------------- */

import WindowResize from '@utilities/WindowResize';

const BusinessesHSE = (() => {
  const $selector = $('.js-businesses-hse-slider');

  // init slider
  const handleRunCarousel = () => {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }

    if ($(window).width() > 992.98) {
      $selector.addClass('owl-carousel').owlCarousel({
        items: 3,
        loop: false,
        nav: true,
        navText: ['<i class="sr sr-caret-left"></i>', '<i class="sr sr-caret-right"></i>'],
        dots: false,
        autoplay: false,
        smartSpeed: 600
      });
    } else {
      if ($selector.hasClass('owl-carousel')) {
        // destroy carousel
        $selector.owlCarousel('destroy');
      }
    }
  };

  // init
  const init = () => {
    if (!$selector.length) return;

    const run = () => {
      WindowResize.resize(handleRunCarousel);
      handleRunCarousel();
    };

    if (document.readyState === 'complete') {
      setTimeout(run, 300);
    } else {
      window.addEventListener('load', () => {
        setTimeout(run, 300);
      });
    }
  };

  return {
    init
  };
})();

export default BusinessesHSE;
