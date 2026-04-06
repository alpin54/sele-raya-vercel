/* ------------------------------------------------------------------------------
@name: Awards
@description: Awards
--------------------------------------------------------------------------------- */

import { Scrolllable } from '@utilities';

const AwardsList = (() => {
  const SELECTOR = {
    card: '.js-awards-card',
    cardTrigger: '.js-awards-card-trigger',
    modal: '.js-awards-card-modal',
    modalTitle: '.js-awards-modal-title',
    modalDesc: '.js-awards-modal-desc',
    modalImage: '.js-awards-modal-image',
    modalClose: '.js-awards-modal-close',
    payloadTitle: '.js-awards-card-title',
    payloadDesc: '.js-awards-card-desc',
    payloadImage: '.js-awards-card-image'
  };

  const hideModal = () => {
    const $modal = $(SELECTOR.modal);
    $modal.removeClass('is-active');
    Scrolllable.enable();
  };

  const showModal = ($card) => {
    const $modal = $(SELECTOR.modal);
    if (!$modal.length || !$card.length) return;

    const title = $card.find(SELECTOR.payloadTitle).first().text().trim();
    const descHtml = $card.find(SELECTOR.payloadDesc).first().html() || '';
    const $payloadImage = $card.find(SELECTOR.payloadImage).first();

    $modal.find(SELECTOR.modalTitle).text(title);
    $modal.find(SELECTOR.modalDesc).html(descHtml);
    $modal.find(SELECTOR.modalImage).attr({
      src: $payloadImage.attr('src') || '',
      alt: $payloadImage.attr('alt') || title
    });

    $modal.addClass('is-active');
    Scrolllable.disable();
  };

  const handleShowModal = () => {
    $(document)
      .on('click', SELECTOR.cardTrigger, (e) => {
        const $card = $(e.currentTarget).closest(SELECTOR.card);
        showModal($card);
      })
      .on('click', SELECTOR.modalClose, () => {
        hideModal();
      })
      .on('keyup', (e) => {
        if (e.key === 'Escape' || e.which === 27) {
          hideModal();
        }
      });
  };

  // - init
  const init = () => {
    if (!$(SELECTOR.card).length || !$(SELECTOR.modal).length) return;
    handleShowModal();
  };

  return {
    init
  };
})();

export default AwardsList;
