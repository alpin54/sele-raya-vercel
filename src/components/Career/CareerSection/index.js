/* ------------------------------------------------------------------------------
@name: AboutUs
@description: AboutUs
--------------------------------------------------------------------------------- */

const AboutUsSection = (() => {
  let isCountingRun = false;

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
      const end = parseInt($el.text().replace(/\D/g, ''), 10);
      $el.text('0');
      countUp($el, end, 1250);
    });
  };

  const handleCheckScroll = () => {
    if (!isCountingRun && $(window).scrollTop() + $(window).height() > $('.about-us__stats').offset().top + 100) {
      isCountingRun = true;
      handleCounting();
    }
  };

  const handleWindowScroll = () => {
    $(window).on('scroll', handleCheckScroll);
  };

  const init = () => {
    if ($('.about-us__stats').length) {
      handleWindowScroll();
      handleCheckScroll();
    }
  };

  return { init };
})();

export default AboutUsSection;
