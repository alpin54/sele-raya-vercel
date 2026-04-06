/* ------------------------------------------------------------------------------
@name: Footer
@description: Footer
--------------------------------------------------------------------------------- */

const Footer = (() => {
  const titleSelector = '.footer__menu__grup-title';
  const listSelector = '.footer__menu__grup-list';
  const rowSelector = '.footer__menu__grup-item';
  const footerSelector = '.footer';
  const mainSiteSelector = '.main-site';
  const outTransitionDelay = 200;
  const accordionBreakpoint = 767.98;

  // Sticky Footer
  const handleFooterSticky = () => {
    const $footer = $(footerSelector);
    const $mainSite = $(mainSiteSelector);
    if (!$footer.length || !$mainSite.length) return;

    if ($(window).width() >= 992) {
      const footerHeight = $footer.outerHeight();
      $mainSite.css('padding-bottom', `${footerHeight}px`);
      $footer.css('position', 'absolute');
    } else {
      $mainSite.removeAttr('style');
      $footer.removeAttr('style');
    }
  };

  // Accordion Mobile dengan delay tutup
  const handleAccordion = () => {
    if (window.matchMedia(`(max-width: ${accordionBreakpoint}px)`).matches) {
      // Hide all nav__list
      $(listSelector).each(function () {
        $(this).slideUp(0);
      });
      $(titleSelector).removeClass('is-active');
      $(rowSelector).removeClass('active');

      $(titleSelector)
        .off('click.footerAccordion')
        .on('click.footerAccordion', function () {
          const $title = $(this);
          const $list = $title.nextAll(listSelector).first();
          const $row = $title.closest(rowSelector);

          const isOpen = $list.is(':visible');
          if (isOpen) {
            $row.removeClass('active');
            setTimeout(() => {
              $title.removeClass('is-active');
              $list.slideUp(300);
            }, outTransitionDelay);
            return;
          }

          // Tutup semua list lain
          $(listSelector).each(function () {
            const $otherList = $(this);
            if ($otherList.is(':visible')) {
              const $otherTitle = $otherList.prevAll(titleSelector).first();
              const $otherRow = $otherList.closest(rowSelector);
              $otherTitle.removeClass('is-active');
              $otherRow.removeClass('active');
              setTimeout(() => {
                $otherList.slideUp(300);
              }, outTransitionDelay);
            }
          });

          // Buka list yang diklik
          $list.slideDown(300, function () {
            $title.addClass('is-active');
            $row.addClass('active');
          });
        });
    } else {
      // Desktop: semua list harus open
      $(listSelector).each(function () {
        $(this).show();
      });
      $(titleSelector).removeClass('is-active');
      $(rowSelector).removeClass('active');
      $(titleSelector).off('click.footerAccordion');
    }
  };

  const handleAccordionDesktop = () => {
    if ($(window).width() > accordionBreakpoint) {
      $(listSelector).removeAttr('style');
      $(titleSelector).removeClass('is-active');
      $(rowSelector).removeClass('active');
      $(titleSelector).off('click.footerAccordion');
    }
  };

  const init = () => {
    if ($(footerSelector).length) {
      setTimeout(() => {
        handleFooterSticky();
        handleAccordion();
        handleAccordionDesktop();
      }, 100);

      $(window).on('resize.footer', () => {
        handleFooterSticky();
        handleAccordion();
        handleAccordionDesktop();
      });
    }
  };

  return {
    init,
    handleFooterSticky,
    handleAccordionDesktop
  };
})();

export default Footer;
