/* ---------------------------------------------------------
@name: FormControl
@description : FormControl
---------------------------------------------------------- */

// --- utilities
import { Scrolllable } from '@utilities';

const FormControl = (() => {
  // -  Selectors & class helpers
  const CONTROL = '.form-control';
  const INPUT = '.form-control__input';
  const CLEAR_BTN = 'js-remove-input';
  const FOCUSED_CLASS = 'focused';
  const SELECT_CLASS = 'show-select';
  const SELECT_BTN = '.form-control__select__btn';
  const SELECT_CLOSE_BTN = '.form-control__select__close';
  const SELECT_ITEM = '.form-control__select__item';
  const SELECTED_ITEM = 'form-control__select__item--selected';
  const APPLY_BTN = '.form-control__apply';
  const GROUPED_FILTER = '.filter--grouped';
  const GROUPED_TRIGGER = '.filter__mobile-trigger';
  const GROUPED_CLOSE = '.filter__panel__close';
  const GROUPED_APPLY = '.filter__panel__apply';
  const GROUPED_ITEM = '.filter__group__item';

  $(function () {
    // ini memastikan semua event di bawah terpasang setelah DOM siap
    $(document).on('click', '.form-control__file-btn', function (e) {
      console.log('Custom file button clicked!');
      e.preventDefault();
      const $inputFile = $(this).closest('.form-control__file-wrapper').find('.form-control__input-file');
      $inputFile.click();
    });

    $(document).on('change', '.form-control__input-file', function (e) {
      const file = this.files[0];
      const $chosen = $(this).closest('.form-control__file-wrapper').find('.form-control__file-chosen');
      $chosen.text(file ? file.name : '');
    });
  });

  // - handleToggleFocus
  const handleToggleFocus = ($ctrl, state = true) => {
    $(CONTROL).each((_, e) => {
      const $this = $(e);
      const $input = $this.find(INPUT);

      const isEmpty = !$input.val();
      const isInvalid = !$input[0]?.checkValidity();

      if (isEmpty || isInvalid) {
        $this.removeClass(FOCUSED_CLASS);
        $this.removeClass(SELECT_CLASS);
      }
    });

    if (state) $ctrl.addClass(FOCUSED_CLASS);
  };

  // - handleUpdateClear
  const handleUpdateClear = ($input) => {
    if ($input.attr('data-ignore-clear') === 'true') {
      $input.removeAttr('data-ignore-clear');
      return;
    }

    const $ctrl = $input.closest(CONTROL);
    $ctrl.find(`.${CLEAR_BTN}`).remove();

    if ($input.val()) {
      $ctrl.append(`
      <button type="button" class="form-control__icon form-control__icon--after ${CLEAR_BTN}">
        <i class="fi fi-x-circle"></i>
      </button>
    `);
    }
  };

  // - handleSelectButtonLabel
  const handleSelectButtonLabel = ($ctrl) => {
    const $btn = $ctrl.find(SELECT_BTN);
    const mobileLabel = $btn.attr('data-mobile-label');
    const defaultLabel = $btn.attr('data-default-label');
    const hasValue = !!$ctrl.find(INPUT).val();

    if ($(window).width() < 768 && mobileLabel) {
      $btn.text(mobileLabel);
      return;
    }

    if (!hasValue && defaultLabel) {
      $btn.text(defaultLabel);
    }
  };

  // - handleSyncSelectButtons
  const handleSyncSelectButtons = () => {
    $(CONTROL).each((_, el) => {
      const $ctrl = $(el);

      if ($ctrl.hasClass('form-control--select')) {
        handleSelectButtonLabel($ctrl);
      }
    });
  };

  // - handleSelectItem
  const handleSelectItem = ($item) => {
    const value = $item.attr('data-value');
    const text = $item.text();
    const $ctrl = $item.closest(CONTROL);
    const $input = $ctrl.find(INPUT);
    const $btn = $ctrl.find(SELECT_BTN);
    const isMobileApply = $(window).width() < 768 && $ctrl.hasClass('js-filter-select');

    // -- set value
    $input.attr('data-ignore-clear', 'true');
    $input.val(value).trigger('input');
    $btn.text(text);

    // -- set class
    $ctrl.removeClass(SELECT_CLASS);
    $ctrl.find(SELECT_ITEM).removeClass(SELECTED_ITEM);
    $item.addClass(SELECTED_ITEM);

    if (isMobileApply) {
      $ctrl.addClass(SELECT_CLASS);
      handleSelectButtonLabel($ctrl);
      return;
    }

    // -- handle toggle
    handleToggleFocus($ctrl);

    // -- submit form
    $item.parents('form').submit();

    // -- enable scroll
    if ($(window).width() < 768) {
      Scrolllable.enable();
    }
  };

  // - handleEvents
  const handleEvents = () => {
    $(document)
      .on('click', CONTROL, (e) => {
        const $this = $(e.currentTarget);
        handleToggleFocus($this);
        $this.find(INPUT).focus();
        if ($(window).width() < 768) {
          Scrolllable.enable();
        }
        e.stopPropagation();
      })

      .on('click', GROUPED_TRIGGER, (e) => {
        const $filter = $(e.currentTarget).closest('.filter');
        $filter.addClass('show-filters');
        if ($(window).width() < 768) {
          Scrolllable.disable();
        }
        e.stopPropagation();
      })

      .on('click', GROUPED_CLOSE, (e) => {
        $(e.currentTarget).closest('.filter').removeClass('show-filters');
        if ($(window).width() < 768) {
          Scrolllable.enable();
        }
        e.stopPropagation();
      })

      .on('click', GROUPED_APPLY, (e) => {
        const $filter = $(e.currentTarget).closest('.filter');
        $filter.removeClass('show-filters');
        if ($(window).width() < 768) {
          Scrolllable.enable();
        }
        $filter.submit();
        e.stopPropagation();
      })

      .on('click', GROUPED_ITEM, (e) => {
        const $item = $(e.currentTarget);
        const $group = $item.closest('.filter__group');
        const inputId = $group.attr('data-input-id');
        const value = $item.attr('data-value');
        const text = $item.attr('data-text');
        const $filter = $item.closest('.filter');
        const $input = $filter.find(`#${inputId}`);
        const $ctrl = $input.closest(CONTROL);
        const $btn = $ctrl.find(SELECT_BTN);

        if (!$input.length) return;

        $input.attr('data-ignore-clear', 'true');
        $input.val(value).trigger('input');
        $btn.text(text);

        $ctrl.find(SELECT_ITEM).removeClass(SELECTED_ITEM);
        $ctrl.find(`${SELECT_ITEM}[data-value="${value}"]`).addClass(SELECTED_ITEM);

        $group.find(GROUPED_ITEM).removeClass('is-selected');
        $item.addClass('is-selected');
        e.stopPropagation();
      })

      .on('click', () => {
        $(CONTROL).each((_, e) => {
          const $this = $(e);
          const $input = $this.find(INPUT);
          const isEmpty = !$input.val();
          const isInvalid = !$input[0]?.checkValidity();

          if (isEmpty || isInvalid) {
            $this.removeClass(FOCUSED_CLASS);
            $this.removeClass(SELECT_CLASS);
            $this.find(`.${CLEAR_BTN}`).remove();
          } else {
            $this.removeClass(SELECT_CLASS);
          }
        });
      })

      // Input ketik (termasuk filter select)
      .on('input', INPUT, (e) => {
        const $this = $(e.currentTarget);
        handleUpdateClear($this);
      })

      // Keyup Esc to hide select
      .on('keyup', (e) => {
        if (e.which === 27) {
          $(CONTROL).removeClass(SELECT_CLASS);
          if ($(window).width() < 768) {
            Scrolllable.enable();
          }
        }
      })

      // Klik item select
      .on('click', SELECT_ITEM, (e) => {
        const $item = $(e.currentTarget);
        handleSelectItem($item);
        e.stopPropagation();
      })

      // Tombol apply (khusus small filter select)
      .on('click', APPLY_BTN, (e) => {
        const $btn = $(e.currentTarget);
        const $ctrl = $btn.closest(CONTROL);

        $ctrl.removeClass(SELECT_CLASS);
        $ctrl.closest('form').submit();

        if ($(window).width() < 768) {
          Scrolllable.enable();
        }

        e.stopPropagation();
      })

      // Tombol close di header select box (small)
      .on('click', SELECT_CLOSE_BTN, (e) => {
        const $btn = $(e.currentTarget);
        const $ctrl = $btn.closest(CONTROL);

        $ctrl.removeClass(SELECT_CLASS);

        if ($(window).width() < 768) {
          Scrolllable.enable();
        }

        e.stopPropagation();
      })

      // Tombol clear
      .on('click', `.${CLEAR_BTN}`, (e) => {
        const $this = $(e.currentTarget);
        const $input = $this.siblings(INPUT);
        $input.val('').trigger('input').focus();
        e.stopPropagation();
      })

      // Toggle select
      .on('click', '.form-control__select__btn', (e) => {
        const $btn = $(e.currentTarget);
        const $ctrl = $btn.parents(CONTROL);
        const isOpen = $ctrl.hasClass(SELECT_CLASS);

        $(CONTROL).removeClass(SELECT_CLASS);

        if (!isOpen) {
          $ctrl.addClass(SELECT_CLASS);
          if ($(window).width() < 768) {
            Scrolllable.disable();
          }
        } else {
          if ($(window).width() < 768) {
            Scrolllable.enable();
          }
        }

        e.stopPropagation();
      });

    $(window).on('resize', handleSyncSelectButtons);
  };

  // - init
  const init = () => {
    if (!$(CONTROL).length) return;
    handleSyncSelectButtons();
    handleEvents();
  };

  return { init };
})();

export default FormControl;
