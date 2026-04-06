/* ------------------------------------------------------------------------------
@name: Contact Us
@description: Contact Us
--------------------------------------------------------------------------------- */

// --- utilities
import { Scrolllable, Validation } from '@utilities';

const ElementSelector = [
  { id: 'name', validation: { required: true } },
  { id: 'phone', validation: { required: true, phone: true } },
  { id: 'email', validation: { required: true, email: true } },
  { id: 'company', validation: { required: true } },
  { id: 'message', validation: { required: true } }
];

const ContactUsForm = (() => {
  const $modal = $('.js-modal-success');
  const $form = $('.js-form-contact');
  const CONSENT_SELECTOR = '.js-contact-consent';
  const CONSENT_ERROR_SELECTOR = '.js-contact-consent-error';
  const SUBMIT_SELECTOR = "button[type='submit']";
  const SUCCESS_MODAL_DELAY = 1500;
  let successModalTimer = null;

  const updateSubmitState = () => {
    const isChecked = $form.find(CONSENT_SELECTOR).is(':checked');
    $form.find(SUBMIT_SELECTOR).prop('disabled', !isChecked);
    return isChecked;
  };

  const toggleConsentError = (show) => {
    $form.find(CONSENT_ERROR_SELECTOR).toggleClass('is-visible', show);
  };

  const clearSuccessModalTimer = () => {
    if (successModalTimer) {
      clearTimeout(successModalTimer);
      successModalTimer = null;
    }
  };

  const resetFormState = () => {
    $form.get(0)?.reset();

    ElementSelector.forEach(({ id }) => {
      const $input = $('#' + id);
      const target = $input.attr('data-target');

      $input.removeClass('error');
      $input.closest('.form-control').removeClass('error focused show-select');

      if (target) {
        $('#' + target)
          .removeClass('error')
          .text('');
      }
    });

    $form.find('.js-remove-input').remove();
    toggleConsentError(false);
    updateSubmitState();
  };

  const scheduleHideModalSuccess = () => {
    clearSuccessModalTimer();
    successModalTimer = setTimeout(() => {
      hideModalSuccess();
    }, SUCCESS_MODAL_DELAY);
  };

  // - showModalSuccess
  const showModalSuccess = () => {
    clearSuccessModalTimer();
    $modal.addClass('is-visible');
    Scrolllable.disable();
  };

  // - hideModalSuccess
  const hideModalSuccess = () => {
    clearSuccessModalTimer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $modal.removeClass('is-visible');
    resetFormState();
    Scrolllable.enable();
  };

  // - handleModalClose
  const handleModalClose = () => {
    // Close modal when clicking outside modal content
    $modal.on('click', () => {
      hideModalSuccess();
    });

    // Prevent modal from closing when clicking inside the content
    $modal.find('.modal-success__content').on('click', (e) => {
      e.stopPropagation();
    });
  };

  // - handleValidationAndSubmit
  const handleValidationAndSubmit = () => {
    $form.find(SUBMIT_SELECTOR).on('click', (e) => {
      console.log('hello');
      e.preventDefault();

      const hasConsent = updateSubmitState();

      if (!hasConsent) {
        toggleConsentError(true);
        return;
      }

      toggleConsentError(false);

      ElementSelector.forEach(({ id }) => $('#' + id).blur());

      if (!$form.find('.error').length) {
        handleSubmitSuccess();
      }
    });

    $form.find(CONSENT_SELECTOR).on('change', () => {
      toggleConsentError(false);
      updateSubmitState();
    });
  };

  // - handleSubmitSuccess
  const handleSubmitSuccess = () => {
    const formData = {};
    const submitUrl = $form.attr('data-url');
    $.each(ElementSelector, (_, el) => {
      formData[el.id] = $('#' + el.id).val();
    });

    // Bersihkan error (jika ada)
    ElementSelector.forEach(({ id }) => {
      $('#' + id).removeClass('error');
      $('#' + id + '_error').text('');
    });

    if (!submitUrl || submitUrl === '#') {
      showModalSuccess();
      scheduleHideModalSuccess();
      return;
    }

    $.ajax({
      url: submitUrl,
      method: 'POST',
      data: formData,
      dataType: 'json',
      success: (response) => {
        if (response.status === 'success') {
          showModalSuccess();
          scheduleHideModalSuccess();
          // Optionally reset label states
        } else if (response.errors) {
          // Show validation errors
          $.each(response.errors, (key, msg) => {
            $('#' + key + '_error').text(msg);
          });
        } else {
          alert(response.message || 'Submission failed.');
        }
      },
      error: () => {
        alert('An error occurred. Please try again.');
      }
    });
  };

  // - init
  const init = () => {
    if (!$form.length) return;
    Validation.config(['input', 'change', 'blur'], ElementSelector);
    updateSubmitState();
    handleValidationAndSubmit();
    handleModalClose();
  };

  return { init };
})();

export default ContactUsForm;
