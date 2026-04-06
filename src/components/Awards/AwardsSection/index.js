/* ------------------------------------------------------------------------------
@name: Awards
@description: Awards
--------------------------------------------------------------------------------- */

const Awards = (() => {
  const $selector = $('.js-awards-carousel');
  const $imageElement = $('.awards__image-el');

  const setActiveCardAndImage = (target) => {
    const $target = $(target);
    const $activeItems = $target.find('.owl-item.active .awards__item');
    const $carousel = $target.closest('.awards__carousel');
    const carouselRect = $carousel.length
      ? $carousel.get(0).getBoundingClientRect()
      : $target.get(0).getBoundingClientRect();

    let rightMostInside = Number.NEGATIVE_INFINITY;
    let $insideCard = $();
    let closestDistance = Number.POSITIVE_INFINITY;
    let $fallbackCard = $();

    $activeItems.each((_, item) => {
      const $item = $(item);
      const rect = item.getBoundingClientRect();
      const distanceToRight = Math.abs(carouselRect.right - rect.right);

      const isVerticallyVisible = rect.bottom > carouselRect.top && rect.top < carouselRect.bottom;
      const isHorizontallyVisible = rect.left < carouselRect.right && rect.right > carouselRect.left;
      const isInsideRightBoundary = rect.right <= carouselRect.right + 2;

      if (isVerticallyVisible && isHorizontallyVisible && isInsideRightBoundary && rect.right > rightMostInside) {
        rightMostInside = rect.right;
        $insideCard = $item;
      }

      if (!$fallbackCard.length) {
        $fallbackCard = $item;
        closestDistance = distanceToRight;
        return;
      }

      if (distanceToRight < closestDistance) {
        $fallbackCard = $item;
        closestDistance = distanceToRight;
      }
    });

    const $activeCard = $insideCard.length ? $insideCard : $fallbackCard;

    if (!$activeCard.length) return;

    $target.find('.awards__item').removeClass('is-active');
    $activeCard.addClass('is-active');

    if (!$imageElement.length) return;

    const nextImageSrc = $activeCard.attr('data-awards-img');
    const nextImageAlt = $activeCard.attr('data-awards-alt');

    if (nextImageSrc) {
      $imageElement.attr('src', nextImageSrc);
    }

    if (nextImageAlt) {
      $imageElement.attr('alt', nextImageAlt);
    }
  };

  // - handleRunCarousel
  const handleRunCarousel = () => {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }

    // --- init carousel
    $selector.addClass('owl-carousel').owlCarousel({
      items: 1,
      margin: 24,
      loop: true,
      rewind: false,
      touchDrag: true,
      nav: true,
      rtl: false,
      mouseDrag: true,
      pullDrag: true,
      dots: true,
      autoplay: false,
      autoplayTimeout: 8000,
      autoplayHoverPause: true,
      smartSpeed: 1250,
      autoWidth: true,
      // responsive: {
      //   0: {
      //     items: 1
      //     // margin: 16
      //   },
      //   520: {
      //     items: 2
      //     // margin: 16
      //   },
      //   740: {
      //     items: 2
      //     // margin: 20
      //   },
      //   992: {
      //     items: 2
      //     // margin: 20
      //   }
      // },
      onInitialized: (e) => {
        $(e.target).find('.owl-prev').html('<i class="sr sr-caret-left"></i>');
        $(e.target).find('.owl-next').html('<i class="sr sr-caret-right"></i>');

        setActiveCardAndImage(e.target);
      },
      onChanged: (e) => {
        if (!e || !e.item) return;
        setActiveCardAndImage(e.target);
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

export default Awards;
