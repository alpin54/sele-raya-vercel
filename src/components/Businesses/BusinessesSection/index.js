/* ------------------------------------------------------------------------------
@name: BusinessesSection
@description: BusinessesSection
--------------------------------------------------------------------------------- */

const BusinessesSection = (() => {
  const $selector = $('.js-businesses-content');

  // - handleRunCarousel
  const handleRunCarousel = () => {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }

    // --- init carousel
    $selector.addClass('owl-carousel').owlCarousel({
      items: 4,
      margin: 0,
      loop: false,
      rewind: false,
      touchDrag: true,
      nav: true,
      mouseDrag: true,
      pullDrag: true,
      dots: false,
      autoplay: false,
      autoplayTimeout: 8000,
      autoplayHoverPause: true,
      smartSpeed: 1250,
      responsive: {
        0: {
          items: 1
          // margin: 16
        },
        520: {
          items: 2
          // margin: 16
        },
        740: {
          items: 2
          // margin: 20
        },
        992: {
          items: 3
          // margin: 20
        }
      },
      onInitialized: (e) => {
        $(e.target).find('.owl-prev').html('<i class="sr sr-caret-left"></i>');
        $(e.target).find('.owl-next').html('<i class="sr sr-caret-right"></i>');
      }
    });
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

export default BusinessesSection;
