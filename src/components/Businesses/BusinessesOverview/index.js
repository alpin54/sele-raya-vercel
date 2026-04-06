const BusinessesOverview = (() => {
  // - handleClickAccordion
  const handleClickAccordion = () => {
    $('.js-businesses-ovw-acc .businesses-ovw__acc__title').on('click', (e) => {
      const $this = $(e.currentTarget);
      const $parents = $this.parents('.businesses-ovw__acc__item');

      if ($parents.hasClass('expanded')) {
        $parents.find('.businesses-ovw__acc__body').delay(250).slideUp(300);
        $parents.removeClass('expanded');
      } else {
        $parents
          .siblings('.businesses-ovw__acc__item')
          .removeClass('expanded')
          .find('.businesses-ovw__acc__body')
          .slideUp(300);

        $parents.find('.businesses-ovw__acc__body').slideDown(300);
        $parents.addClass('expanded');
      }
    });
  };

  // - expandFirstItem
  const expandFirstItem = () => {
    const $firstItem = $('.js-businesses-ovw-acc .businesses-ovw__acc__item').first();
    $firstItem.addClass('expanded');
    $firstItem.find('.businesses-ovw__acc__body').show();
  };

  // - init
  const init = () => {
    if (!$('.js-businesses-ovw-acc').length) return;
    expandFirstItem();
    handleClickAccordion();
  };

  return {
    init
  };
})();

export default BusinessesOverview;
