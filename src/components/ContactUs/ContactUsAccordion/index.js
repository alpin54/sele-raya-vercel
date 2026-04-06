/* ------------------------------------------------------------------------------
@name: Contact US Accordion
@description: Contact Us Accordion
--------------------------------------------------------------------------------- */

const ContactUSAccordion = (() => {
  const ITEM_SELECTOR = '.contact-acd__item';
  const BOX_SELECTOR = '.contact-acd__box';
  const MENU_SELECTOR = '.contact-acd__menu';
  const ACTIVE_CLASS = 'is-active';

  const setMenuHeight = ($item) => {
    const $menu = $item.find(MENU_SELECTOR).first();
    const menuEl = $menu.get(0);
    if (!menuEl) return;

    $menu.css('--menu-max-height', `${menuEl.scrollHeight}px`);
  };

  const closeItem = ($item) => {
    $item.removeClass(ACTIVE_CLASS);
    $item.find(MENU_SELECTOR).first().css('--menu-max-height', '0px');
  };

  const openItem = ($item) => {
    setMenuHeight($item);
    $item.addClass(ACTIVE_CLASS);
  };

  // - handleAccordion
  const handleAccordion = () => {
    const $items = $(ITEM_SELECTOR);
    if (!$items.length) return;

    $items.each((_, item) => {
      closeItem($(item));
    });

    $(document).on('click', BOX_SELECTOR, (e) => {
      const $item = $(e.currentTarget).closest(ITEM_SELECTOR);
      const isActive = $item.hasClass(ACTIVE_CLASS);

      $items.not($item).each((_, item) => {
        closeItem($(item));
      });

      if (isActive) {
        closeItem($item);
        return;
      }

      openItem($item);
    });

    $(window).on('resize', () => {
      $items.filter(`.${ACTIVE_CLASS}`).each((_, item) => {
        setMenuHeight($(item));
      });
    });
  };

  // - init
  const init = () => {
    handleAccordion();
  };

  return {
    init
  };
})();

export default ContactUSAccordion;
