// --- utilities
import { Scrolllable, BrowserCheck } from '@utilities';

// --- components
import {
  Header,
  Footer,
  HeroBanner,
  ContentTransition,
  BusinessesSection,
  AboutUsSection,
  Awards,
  MilestonesSection,
  CsrSection,
  AboutHighlight,
  FormControl,
  ContactUsForm,
  ContactUsAccordion,
  AwardsList,
  BusinessesHSE,
  BusinessesOverview
} from '@components';

// --- templates
import { Default } from '@templates';

// --- App
const App = (() => {
  // --- run transition
  const runTransition = () => {
    $('body').removeClass('hold-transition');
  };

  // --- show site content
  const showSiteContent = () => {
    $('.js-main-site').removeClass('main-site--hide');
    // --- disable scroll
    Scrolllable.enable();
  };

  // --- ready
  const ready = () => {
    (($) => {
      // --- disable scroll
      Scrolllable.disable();

      // --- global
      runTransition();
      showSiteContent();
      BrowserCheck.init();

      // --- components
      Header.init();
      Footer.init();
      HeroBanner.init();
      ContentTransition.init();
      BusinessesSection.init();
      AboutUsSection.init();
      Awards.init();
      MilestonesSection.init();
      CsrSection.init();
      AboutHighlight.init();
      FormControl.init();
      ContactUsForm.init();
      ContactUsAccordion.init();
      AwardsList.init();
      BusinessesHSE.init();
      BusinessesOverview.init();

      // --- templates
      Default.init();
    })(jQuery);
  };

  // --- load
  const load = () => {
    (($) => {
      $(window).on('load', () => {});
    })(jQuery);
  };

  // --- init
  const init = () => {
    load();
    ready();
  };

  // --- return
  return {
    init
  };
})();

// ---  run main js
App.init();
