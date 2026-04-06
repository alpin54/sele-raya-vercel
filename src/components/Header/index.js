/* ------------------------------------------------------------------------------
@name: Header
@description: Header
--------------------------------------------------------------------------------- */

import WindowScroll from '@utilities/WindowScroll';
import Scrolllable from '@utilities/Scrolllable';
import WindowResize from '@utilities/WindowResize';

const Header = (() => {
  const MOBILE_BREAKPOINT = 992;
  const DESKTOP_HOVER_BREAKPOINT = 1200;
  const NAV_CONTENT_OUT_DURATION = 320;
  const NAV_WRAPPER_OUT_DURATION = 420;

  let $headerHeight = $('.header').length ? $('.header').height() : 0;
  let closeContentTO;
  let closeWrapperTO;

  const clearCloseTimers = () => {
    if (closeContentTO) {
      clearTimeout(closeContentTO);
      closeContentTO = null;
    }
    if (closeWrapperTO) {
      clearTimeout(closeWrapperTO);
      closeWrapperTO = null;
    }
  };

  const isMobile = () => $(window).width() < MOBILE_BREAKPOINT;

  const clearSubmenuState = () => {
    const $items = $('.header .header__main-nav__item--has-sub');
    $items.removeClass('expanded is-active header__main-nav__item--active');
    $items.find('.header__submenu').stop(true, true).removeAttr('style');
  };

  const openMenu = () => {
    clearCloseTimers();
    $('body').removeClass('nav--closing nav--collapsing').addClass('show--nav');
    Scrolllable.disable();
  };

  const closeMenu = (immediate = false) => {
    if (!$('body').hasClass('show--nav') && !$('body').hasClass('nav--closing') && !$('body').hasClass('nav--collapsing')) return;

    clearCloseTimers();

    $('body').removeClass('show--nav nav--collapsing').addClass('nav--closing');
    Scrolllable.enable();
    clearSubmenuState();

    if (immediate) {
      $('body').removeClass('show--nav nav--closing nav--collapsing');
      return;
    }

    closeContentTO = setTimeout(() => {
      $('body').removeClass('nav--closing').addClass('nav--collapsing');
    }, NAV_CONTENT_OUT_DURATION);

    closeWrapperTO = setTimeout(() => {
      $('body').removeClass('nav--collapsing');
      clearCloseTimers();
    }, NAV_CONTENT_OUT_DURATION + NAV_WRAPPER_OUT_DURATION);
  };

  // - handleToggleMenu
  const handleToggleMenu = () => {
    $('.js-toggle-menu').off('click.header').on('click.header', (e) => {
      if ($('body').hasClass('show--nav')) {
        closeMenu();
      } else {
        openMenu();
      }
      e.stopPropagation();
    });

    $(document).off('keyup.header').on('keyup.header', (e) => {
      if (e.which === 27) {
        closeMenu();
      }
    });
  };

  // - handleHoverSubMenu
  const handleHoverSubMenu = () => {
    const $items = $('.header .header__main-nav__item--has-sub');

    $items
      .off('mouseenter.headerSub mouseleave.headerSub')
      .on('mouseenter.headerSub', (e) => {
        if ($(window).width() > DESKTOP_HOVER_BREAKPOINT) {
          const $this = $(e.currentTarget);
          $this.addClass('expanded');
        }
      })
      .on('mouseleave.headerSub', (e) => {
        if ($(window).width() > DESKTOP_HOVER_BREAKPOINT) {
          const $this = $(e.currentTarget);
          $this.removeClass('expanded');
        }
      });

    // Tablet click behavior (without slide accordion)
    $items.off('click.headerTablet').on('click.headerTablet', (e) => {
      if ($(window).width() >= MOBILE_BREAKPOINT && $(window).width() <= DESKTOP_HOVER_BREAKPOINT) {
        const $this = $(e.currentTarget);
        $this.addClass('expanded');
      }
    });
  };

  // - handleMobileAccordion
  const handleMobileAccordion = () => {
    $(document)
      .off('click.headerAccordion', '.header .header__main-nav__item--has-sub > .header__main-nav__link')
      .on('click.headerAccordion', '.header .header__main-nav__item--has-sub > .header__main-nav__link', (e) => {
        if (!isMobile()) return;

        e.preventDefault();
        e.stopPropagation();

        const $item = $(e.currentTarget).closest('.header__main-nav__item--has-sub');
        const $submenu = $item.find('> .header__submenu');
        const isOpen = $item.hasClass('expanded');

        const $siblings = $item.siblings('.header__main-nav__item--has-sub');
        $siblings.removeClass('expanded is-active header__main-nav__item--active');
        $siblings.find('> .header__submenu').stop(true, true).slideUp(260);

        $item.toggleClass('expanded', !isOpen);
        $item.toggleClass('is-active', !isOpen);
        $item.toggleClass('header__main-nav__item--active', !isOpen);

        $submenu.stop(true, true).slideToggle(280);

        return false;
      });
  };

  // - handleScroll
  const handleScroll = () => {
    // --- Scrolled > $headerHeight
    if (WindowScroll.top() > $headerHeight / 4) {
      if (!$('body').hasClass('window--scrolled')) {
        $('body').addClass('window--scrolled');
      }
    } else {
      // --- Scrolled < $headerHeight
      $('body').removeClass('window--scrolled');
    }
  };

  const handleResize = () => {
    $headerHeight = $('.header').height() || 0;

    if (!isMobile()) {
      closeMenu(true);
      clearSubmenuState();
    }
  };

  // - init
  const init = () => {
    if (!$('.header').length) return;

    handleHoverSubMenu();
    handleMobileAccordion();
    handleToggleMenu();
    handleScroll();

    WindowScroll.run(handleScroll);
    WindowResize.resize(handleResize);
  };

  return {
    init
  };
})();

export default Header;
