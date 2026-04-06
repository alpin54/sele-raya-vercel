/* ------------------------------------------------------------------------------
@name: ContentTransition
@description: ContentTransition
--------------------------------------------------------------------------------- */

import WindowScroll from '@utilities/WindowScroll';
import WindowResize from '@utilities/WindowResize';

const ContentTransition = (() => {
  const $scaleHeight = $(window).width() < 992 ? 1.05 : 0.95;
  console.log('content transition');

  // - handlePositionCheck
  const handlePositionCheck = () => {
    $('.content-transition').each((idx, el) => {
      var $elementTop = $(el).offset().top;
      var $viewportTop = WindowScroll.top();
      var $viewportBottom = $viewportTop + $scaleHeight * $(window).height();

      if ($elementTop <= $viewportBottom) {
        $(el).addClass('visible');
      } else {
        $(el).removeClass('visible');
      }
    });
  };

  // - handleScrollContentTransition
  const handleScrollContentTransition = () => {
    const contentList = [
      // -- home page
      '.hero-banner',
      '.businesses__head',
      '.businesses__body',
      '.about-us__content',
      '.section-header',
      '.news-card',
      '.career-section__content',
      '.csr-section__content__head',
      '.csr-section__content__body',
      '.csr-section__slide',
      '.milestones__wrapp',

      // - About Us
      '.about-highlight__content',
      '.about-highlight__image',
      '.about-legacy__top',
      '.about-legacy__video ',
      '.about-legacy__text ',
      '.about-vm__content__card',
      '.about-cv__content',
      '.about-cv__image',
      '.about-team__subtitle',
      '.about-team__title',
      '.about-team__card',
      '.about-bs__subtitle',
      '.about-bs__title',
      '.about-bs__desc',
      '.about-be__title',
      '.about-be__desc',
      '.about-be__item',

      // Privacy Policy
      '.privacy-policy__head',
      '.privacy-policy__content',
      '.contact-acd__item',

      // Contact Us
      '.contact-form__text',
      '.contact-form__input',

      // Awards
      '.awards-banner__text',
      '.awards-banner__image',
      '.awards-banner__desc--mobile',
      '.filter',
      '.awards-card',

      // Milestones
      '.milestones-pc__item',

      // CSR
      '.csr-content__head__left',
      '.csr-content__head__right',
      '.csr-content__card',
      '.pagination',
      '.csr-details__head',
      '.csr-details__banner',
      '.csr-details__content-wr',
      '.csr-details__content-text',
      '.csr-details__recomendation-head',

      // News
      '.news-banner__large',
      '.news-banner__small-item',
      '.news-list__title',
      '.news-item',
      '.news-details__head',
      '.news-details__banner',
      '.news-details__content-text',
      '.news-details__content-top',
      '.news-details__content__latest-label',
      '.news-details__content__latest-item',
      '.news-details__recomendation-head',

      // - Not Found
      '.not-found__inner',

      // - Businesses
      '.businesses-key__head',
      '.businesses-key__body',
      '.businesses-ovw__img',
      '.businesses-ovw__text',
      '.businesses-why__head',
      '.businesses-why__body',
      '.businesses-about__head',
      '.businesses-about__body',
      ...($('.businesses-value--agri').length > 0 ||
      $('.businesses-value--amindo-wana-persada').length > 0 ||
      $('.businesses-value--investidea-ventures').length > 0
        ? ['.businesses-value__content', '.businesses-value__list', '.businesses-value__img']
        : ['.businesses-value__img', '.businesses-value__head', '.businesses-value__body']),
      '.businesses-vm__list',

      // - Belida
      '.belida-core__head',
      '.belida-core__body',

      // - Sejati
      '.sejati-num__head',
      '.sejati-num__body',

      // - Aryasatya
      '.aryasatya-ovw__text',
      '.aryasatya-ovw__content',
      '.businesses-res__head',
      '.businesses-res__body',
      '.aryasatya-impact__head',
      '.aryasatya-impact__body',
      '.businesses-commit__text',

      // - Mining Why
      '.mining-why__head',
      '.mining-why__body',

      // - Career
      '.career-mosaic__item',
      '.career-mosaic-subtitle',
      '.career-mosaic-title',
      '.career-cp__media',
      '.career-cp__subtitle',
      '.career-cp__title',
      '.career-cp__desc',
      '.career-cp__item',

      // - Businesses HSE
      '.businesses-hse__head',
      '.businesses-hse__body',

      // - Under Construction
      '.under-construction__inner'
    ];

    $.each(contentList, (idx, el) => {
      $(el).addClass('content-transition');
    });

    WindowScroll.run(handlePositionCheck);
  };

  // - handlePageTransition
  const handleLeavePage = () => {
    $('a').on('click', (e) => {
      const $this = $(e.currentTarget);
      const $href = $this.attr('href');
      const $target = $this.attr('target');
      const isHeaderSubTrigger =
        $this.closest('.header__main-nav__item--has-sub, .header__nav__item--has-sub').length > 0;

      if (!isHeaderSubTrigger) {
        if ($href && !$target) {
          if ($('.header .header__nav__item--has-sub').hasClass('expanded')) {
            $('.header .header__nav__item--has-sub').removeClass('expanded');
          }

          if ($href && !$href.includes('#')) {
            // 👉 simpan penanda sebelum pindah halaman
            sessionStorage.setItem('fromPageLeave', 'true');

            $('body').addClass('page--leave');
            const locationHrefTO = setTimeout(() => {
              window.location.href = $href;
              clearTimeout(locationHrefTO);
            }, 1000);
            e.preventDefault();
          }
        }
      }
    });
  };

  // - handleShowBackToTop
  const handleShowBackToTop = () => {
    if (!$('.js-main-site').height() > $(window).height() * 2) return;

    const $viewportTop = WindowScroll.top();
    const $elementStart = $(window).height() * 1.5;
    let $elementChangeColor = $('.footer').offset().top;
    const $viewportBottom = $viewportTop + $(window).height();

    if ($elementStart <= $viewportBottom) {
      $('body').addClass('show--btt');
    } else {
      $('body').removeClass('show--btt');
    }

    if ($('.about-key-values').length) {
      $elementChangeColor = $('.about-key-values').offset().top;
    }
    if ($elementChangeColor <= $viewportBottom) {
      $('body').addClass('change-color--btt');
    } else {
      $('body').removeClass('change-color--btt');
    }
  };

  // - handleBackToTop
  const handleBackToTop = () => {
    $('.js-back-to-top').on('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // - handlePageEnter
  const handlePageEnter = () => {
    // Cek apakah datang dari transisi page-leave
    const fromLeave = sessionStorage.getItem('fromPageLeave');

    sessionStorage.removeItem('fromPageLeave');

    // Kalau dari page-leave, skip animasi masuk overlay
    if (fromLeave) return;

    // Kalau bukan dari transisi (misalnya first load / reload)
    $('body').removeClass('page--leave');
    $('body').addClass('page--enter');

    const pageEnterTO = setTimeout(() => {
      $('body').removeClass('page--enter');
      clearTimeout(pageEnterTO);
    }, 700);
  };

  // - init
  const init = () => {
    if (!$('.main-site').length) return;
    handlePageEnter();
    handleScrollContentTransition();
    handleLeavePage();
    handleBackToTop();
    const HPCTO = setTimeout(() => {
      handlePositionCheck();
      clearTimeout(HPCTO);
    }, 50);
    WindowResize.resize(handlePositionCheck);
    WindowScroll.run(handleShowBackToTop);
  };

  return {
    init
  };
})();

export default ContentTransition;
