/* ------------------------------------------------------------------------------
@name: MilestonesSection
@description: MilestonesSection
--------------------------------------------------------------------------------- */

const MilestonesSection = (() => {
  const $carousel = $('.js-milestones-carousel');
  const $timelineDots = $('.milestones__timeline-dot');
  const $timelineList = $('.milestones__timeline-list');
  const $wrap = $('.milestones__wrapp');
  const itemCount = $carousel.find('.milestones__item').length;
  const DOT_GAP_INACTIVE = 112;
  const DOT_GAP_INACTIVE_MEDIUM = 72;
  const DOT_GAP_ACTIVE_MEDIUM = 136;
  const SLIDE_SPEED = 1000;
  const FADE_SPEED = 900;
  let previousMediumMode = null;

  const isMediumLayout = () => {
    if (!$wrap.length) return false;

    const mediumFlag = window.getComputedStyle($wrap.get(0)).getPropertyValue('--is-medium-layout').trim();

    return mediumFlag === '1';
  };

  const getActiveIndex = () => {
    const activeIdx = $timelineDots.index($timelineDots.filter('.is-active').first());
    return activeIdx > -1 ? activeIdx : 0;
  };

  const getActiveGap = () => {
    const $activeItem = $carousel.find('.owl-item.active .milestones__item').first();
    const $fallbackItem = $carousel.find('.milestones__item').first();
    const itemWidth = ($activeItem.length ? $activeItem : $fallbackItem).outerWidth() || 792;

    return Math.max(Math.round(itemWidth), DOT_GAP_INACTIVE);
  };

  const getActiveItemHeight = () => {
    const $activeItem = $carousel.find('.owl-item.active .milestones__item').first();
    const $fallbackItem = $carousel.find('.milestones__item').first();
    return ($activeItem.length ? $activeItem : $fallbackItem).outerHeight() || 0;
  };

  const updateTimelineLayout = (activeIdx) => {
    if (!$timelineList.length || !$timelineDots.length) return;

    const mediumMode = isMediumLayout();
    const activeGap = mediumMode ? DOT_GAP_ACTIVE_MEDIUM : getActiveGap();
    const inactiveGap = mediumMode ? DOT_GAP_INACTIVE_MEDIUM : DOT_GAP_INACTIVE;
    const dotPositions = [];
    const activeItemHeight = getActiveItemHeight();

    for (let i = 0; i < $timelineDots.length; i += 1) {
      if (i === 0) {
        dotPositions.push(0);
      } else {
        const prevGap = i - 1 === activeIdx ? activeGap : inactiveGap;
        dotPositions.push(dotPositions[i - 1] + prevGap);
      }
    }

    if (mediumMode) {
      const maxDotOffset = Math.max(activeItemHeight - 12, 0);
      const rawTotal = dotPositions.length > 1 ? dotPositions[dotPositions.length - 1] : 0;
      const scale = rawTotal > 0 ? maxDotOffset / rawTotal : 0;

      for (let i = 0; i < $timelineDots.length; i += 1) {
        const scaledPos = Math.round(dotPositions[i] * scale);

        $timelineDots.eq(i).css('--dot-y', `${scaledPos}px`);
        $timelineDots.eq(i).css('--dot-x', '0px');
      }
    } else {
      for (let i = 0; i < $timelineDots.length; i += 1) {
        $timelineDots.eq(i).css('--dot-x', `${dotPositions[i]}px`);
        $timelineDots.eq(i).css('--dot-y', '0px');
      }
    }

    const lineSize = mediumMode
      ? Math.max(activeItemHeight - 12, 0)
      : dotPositions.length > 1
        ? dotPositions[dotPositions.length - 1]
        : 0;

    $timelineList.css('--timeline-line-size', `${lineSize}px`);
    $timelineList.css('--timeline-height', `${activeItemHeight}px`);
    $timelineList.css('--timeline-shift', '0px');
  };

  const setActiveDot = (idx) => {
    $timelineDots.removeClass('is-active');
    $timelineDots.eq(idx).addClass('is-active');
    updateTimelineLayout(idx);
  };

  // Inisialisasi carousel
  const handleRunCarousel = () => {
    const mediumMode = isMediumLayout();
    const useFadeTransition = true;

    if ($carousel.hasClass('owl-carousel')) {
      $carousel.owlCarousel('destroy');
    }

    if (itemCount > 1) {
      $carousel.addClass('owl-carousel').owlCarousel({
        items: 1,
        loop: false,
        touchDrag: !useFadeTransition && !mediumMode,
        mouseDrag: !useFadeTransition && !mediumMode,
        pullDrag: !useFadeTransition && !mediumMode,
        freeDrag: false,
        dots: false,
        nav: false,
        rewind: false,
        autoplay: false,
        smartSpeed: useFadeTransition ? FADE_SPEED : SLIDE_SPEED,
        dragEndSpeed: useFadeTransition ? FADE_SPEED : SLIDE_SPEED,
        animateOut: useFadeTransition ? 'fadeOut' : false,
        animateIn: useFadeTransition ? 'fadeIn' : false,
        onChanged: function (e) {
          // Sinkronkan Dot Timeline Saat Slide Berubah
          const idx = Math.max(0, Math.min(e.item.index, itemCount - 1));
          setActiveDot(idx);
        }
      });
    }

    previousMediumMode = mediumMode;
    updateTimelineLayout(getActiveIndex());
  };

  // Klik dot pindahkan slide
  $(document).on('click', '.milestones__timeline-dot', function () {
    const idx = Number($(this).data('index'));
    if (!$carousel.hasClass('owl-loaded')) return;

    const clickSpeed = FADE_SPEED;

    $carousel.trigger('to.owl.carousel', [idx, clickSpeed, false]);
    setActiveDot(idx);
  });

  $(window).on('resize', () => {
    const mediumMode = isMediumLayout();
    if (previousMediumMode !== null && previousMediumMode !== mediumMode) {
      handleRunCarousel();
      return;
    }

    updateTimelineLayout(getActiveIndex());
  });

  // Init
  const init = () => {
    if (!$carousel.length) return;
    setTimeout(() => {
      handleRunCarousel();
    }, 100);
  };

  return { init };
})();

export default MilestonesSection;
