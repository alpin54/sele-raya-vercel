/* ------------------------------------------------------------------------------
@name: HeroBanner
@description: HeroBanner
--------------------------------------------------------------------------------- */

const HeroBanner = (() => {
  const $selector = $('.js-hero-banner');
  const $itemLength = $('.js-hero-banner .hero-banner__item').length;

  const caretMarkup = `
  <span class="mouse-caret-group">
    <i class="sr sr-caret-down bounce-caret"></i>
    <i class="sr sr-caret-down bounce-caret bounce-delay"></i>
  </span>
`;

  // - handleRunCarousel
  const handleRunCarousel = () => {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }

    $('.hero-banner__mouse--single').remove();

    // init carousel
    if ($itemLength > 1) {
      // --- init carousel
      $selector.addClass('owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        rewind: true,
        touchDrag: true,
        nav: false,
        mouseDrag: true,
        pullDrag: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        smartSpeed: 1250,
        animateOut: 'fadeOut',
        onInitialized: (e) => {
          // 1. Wrap owl-dots: .container > .container-dots > .owl-dots
          $(e.target).find('.owl-dots').wrap('<div class="container"><div class="container-dots"></div></div>');

          // 2. Lalu select .container-dots dan wrap isinya pakai .container-dots-wrapp
          const $containerDots = $(e.target).find('.owl-dots').closest('.container-dots');
          $containerDots.children().wrapAll('<div class="container-dots-wrapp"></div>');

          // 3. Select .container-dots-wrapp (anak langsung .container-dots), lalu prepend mouse
          const $containerDotsWrapp = $containerDots.find('.container-dots-wrapp');
          $containerDotsWrapp.prepend(
            `<div class='hero-banner__mouse js-hero-mouse' tabindex='0' role='button'>
            <img src='assets/img/logo/mouse.png' alt='mouse' />
              ${caretMarkup}
            </div>`
          );

          // SISANYA TETAP
          $(e.target).find('.owl-dot').removeClass('active');
          const showDotTO = setTimeout(() => {
            $(e.target).find('.owl-dots').addClass('owl-dots--show');
            clearTimeout(showDotTO);
          }, 100);

          const showDotActive = setTimeout(() => {
            $(e.target).find('.owl-dot:nth-child(1)').addClass('active');
            clearTimeout(showDotActive);
          }, 500);

          $(e.target).find('.owl-item:not(.cloned) .hero-banner__item').each((i, s) => {
            const text = $(s).data('indicator');
            const number = String(i + 1).padStart(2);

            $(e.target)
              .find(`.owl-dot:nth-child(${i + 1})`)
              .prepend(
                `<span class="dot-text">
                  <span class="dot-number">${number}</span>
                  <span class="dot-label">${text}</span>
                </span>
                <span class="dot-bar"></span>`
              );
          });
        }
      });
    } else {
      $selector.addClass('hero-banner--single');
      // Keep single mouse inside hero banner area (no extra block below section)
      if (!$('.hero-banner__mouse--single').length) {
        $selector.closest('.hero-banner').append(
          `<div class='hero-banner__mouse hero-banner__mouse--single js-hero-mouse' tabindex='0' role='button'><img src='assets/img/logo/mouse.png' alt='mouse' />${caretMarkup}</div>`
        );
      }
    }
  };
  const scrollToNextSection = () => {
    const $next = $('.hero-banner').next();
    const headerHeight = $('.header').outerHeight() || 0;

    if ($next.length) {
      const targetPosition = $next.offset().top - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };
  $(document).on('click', '.js-hero-mouse', function (e) {
    e.preventDefault();
    scrollToNextSection();
  });

  $(document).on('keypress', '.js-hero-mouse', function (e) {
    // Akses keyboard (Enter/Space)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToNextSection();
    }
  });

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

export default HeroBanner;
