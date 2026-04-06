/* ------------------------------------------------------------------------------
@name: AboutHighlight
@description: AboutHighlight
--------------------------------------------------------------------------------- */

const AboutHighlight = (() => {
  let isCountingRun = false;

  const prepareCounters = () => {
    $('.js-count').each(function () {
      const $el = $(this);
      const end = parseInt($el.text().replace(/\D/g, ''), 10) || 0;
      $el.attr('data-count-end', end);
      $el.text('0');
    });
  };

  const countUp = ($el, end, duration) => {
    let current = 0;
    const step = end / (duration / 10);
    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      $el.text(Math.floor(current));
    }, 10);
  };

  const handleCounting = () => {
    $('.js-count').each(function () {
      const $el = $(this);
      const end = parseInt($el.attr('data-count-end'), 10) || 0;
      countUp($el, end, 1250);
    });
  };

  const handleCheckScroll = () => {
    if (
      !isCountingRun &&
      $(window).scrollTop() + $(window).height() > $('.about-highlight__stats').offset().top + 100
    ) {
      isCountingRun = true;
      handleCounting();
    }
  };

  const handleWindowScroll = () => {
    $(window).on('scroll', handleCheckScroll);
  };

  const init = () => {
    if ($('.about-highlight__stats').length) {
      prepareCounters();
      handleWindowScroll();
      handleCheckScroll();
    }
  };

  return { init };
})();

export default AboutHighlight;
