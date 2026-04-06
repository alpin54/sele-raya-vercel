(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _utilities = require("./utilities");
var _components = require("../../components");
var _templates = require("../../templates");
// --- utilities

// --- components

// --- templates

// --- App
var App = function () {
  // --- run transition
  var runTransition = function runTransition() {
    $('body').removeClass('hold-transition');
  };

  // --- show site content
  var showSiteContent = function showSiteContent() {
    $('.js-main-site').removeClass('main-site--hide');
    // --- disable scroll
    _utilities.Scrolllable.enable();
  };

  // --- ready
  var ready = function ready() {
    (function ($) {
      // --- disable scroll
      _utilities.Scrolllable.disable();

      // --- global
      runTransition();
      showSiteContent();
      _utilities.BrowserCheck.init();

      // --- components
      _components.Header.init();
      _components.Footer.init();
      _components.HeroBanner.init();
      _components.ContentTransition.init();
      _components.BusinessesSection.init();
      _components.AboutUsSection.init();
      _components.Awards.init();
      _components.MilestonesSection.init();
      _components.CsrSection.init();
      _components.AboutHighlight.init();
      _components.FormControl.init();
      _components.ContactUsForm.init();
      _components.ContactUsAccordion.init();
      _components.AwardsList.init();
      _components.BusinessesHSE.init();
      _components.BusinessesOverview.init();
      _components.BusinessesPortofolio.init();
      _components.BusinessesTeam.init();
      _components.CareerDetails.init();
      _components.CareerList.init();
      _components.CareerForm.init();

      // --- templates
      _templates.Default.init();
    })(jQuery);
  };

  // --- load
  var load = function load() {
    (function ($) {
      $(window).on('load', function () {});
    })(jQuery);
  };

  // --- init
  var init = function init() {
    load();
    ready();
  };

  // --- return
  return {
    init: init
  };
}();

// ---  run main js
App.init();

},{"../../components":33,"../../templates":35,"./utilities":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: BrowserCheck
@description: BrowserCheck
--------------------------------------------------------------------------------- */

// --- BrowserCheck
var BrowserCheck = function () {
  // --- handleCheck
  var handleCheck = function handleCheck() {
    var _browser = 'dekstop-browser';
    var HTMLElement = document.getElementsByTagName('html')[0];
    if (navigator.userAgent.match(/Android/i)) {
      _browser = 'android-browser';
    } else if (navigator.userAgent.match(/BlackBerry/i)) {
      _browser = 'blackberry-browser';
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      _browser = 'ios-browser';
    } else if (navigator.userAgent.match(/IEMobile/i)) {
      _browser = 'windows-phone-browser';
    }
    $('html').addClass(_browser);
  };

  // --- init
  var init = function init() {
    handleCheck();
  };

  // --- return
  return {
    init: init
  };
}();
var _default = exports.default = BrowserCheck;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Scrolllable
@description: Scrolllable
--------------------------------------------------------------------------------- */

// --- Scrolllable
var Scrolllable = function () {
  // --- handleEnable
  var handleEnable = function handleEnable() {
    $('body').removeClass('rm-scroll');
  };

  // --- handleDisable
  var handleDisable = function handleDisable() {
    $('body').addClass('rm-scroll');
  };

  // --- return
  return {
    enable: handleEnable,
    disable: handleDisable
  };
}();
var _default = exports.default = Scrolllable;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Session
@description: Session
--------------------------------------------------------------------------------- */

// --- Session
var Session = function () {
  var _timeoutSession;

  // --- handleSet
  var handleSet = function handleSet(key, value) {
    return localStorage.setItem(key, value);
  };

  // --- handleGet
  var handleGet = function handleGet(key, value) {
    return localStorage.getItem(key, value);
  };

  // --- handleRemove
  var handleRemove = function handleRemove(key) {
    return localStorage.removeItem(key);
  };

  // --- handleClear
  var handleClear = function handleClear(key) {
    return localStorage.clear();
  };

  // --- handleTimeout
  var handleTimeout = function handleTimeout(callbackFunction) {
    var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    _timeoutSession = setTimeout(function () {
      callbackFunction();
    }, timer * 1000);
    document.addEventListener('mousemove', function (e) {
      clearTimeout(_timeoutSession);
      _timeoutSession = setTimeout(function () {
        callbackFunction();
      }, timer * 1000);
    }, true);
  };

  // --- return
  return {
    set: handleSet,
    get: handleGet,
    remove: handleRemove,
    clear: handleClear,
    timeout: handleTimeout
  };
}();
var _default = exports.default = Session;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _variables = require("../variables");
/* ------------------------------------------------------------------------------
@name: Validation
@description: Validation
--------------------------------------------------------------------------------- */

// --- variables

var Validation = function () {
  // - handleInput
  var handleInput = function handleInput(eventsEl, selectorEl) {
    $.each(eventsEl, function (ie, ve) {
      $.each(selectorEl, function (i, v) {
        $("#" + v.id).on(ve, function (e) {
          var _this = $(e.currentTarget),
            _val = _this.val(),
            _target = _this.attr("data-target"),
            _alertEl = $("#" + _target);
          var _errorMessage;

          // Condition if validation does not error
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");

          // Minimum Validation
          if (v.validation.minimum) {
            if (_val.length < v.validation.minimumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Maximum Validation
          if (v.validation.maximum) {
            if (_val.length < v.validation.maximumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Minimum Validation
          if (v.validation.name) {
            if (!_variables.PERSON_NAME.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Email validation
          if (v.validation.email) {
            if (!_variables.EMAIL.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Numeric validation
          if (v.validation.phone) {
            if (!_variables.PHONE_NUMBER.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid-phone");
            }
          }

          // Required validation
          if (_variables.WHITESPACE.test(_val)) {
            _errorMessage = _alertEl.attr("data-req");
          }

          // Error Message
          if (_errorMessage !== undefined) {
            _alertEl.text(_errorMessage);
            _alertEl.addClass("error");
            _this.parent().addClass("error");
          }
        });
      });
    });

    // Return Handle keypress
    handleKeypress();
  };

  // handleKeypress
  var handleKeypress = function handleKeypress() {
    $(".number-only").on("keypress", function (e) {
      var _this = $(e.currentTarget),
        _val = _this.val(),
        _target = _this.attr("data-target"),
        _alertEl = $("#" + _target);
      var _errorMessage;
      if (!_variables.NUMBERIC.test(e.key)) {
        _errorMessage = _alertEl.attr("data-invalid");
        _alertEl.text(_errorMessage);
        _alertEl.addClass("error");
        _this.parent().addClass("error");
        // remove error after few second
        setTimeout(function () {
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");
        }, 2000);
        e.preventDefault();
      }
    });
  };
  return {
    config: handleInput
  };
}();
var _default = exports.default = Validation;

},{"../variables":11}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Window Resize
@description: Window Resize
--------------------------------------------------------------------------------- */

// --- WindowResize
var WindowResize = function () {
  var $rtime;
  var $timeout = false;
  var $delta = 200;
  var $lastWindowWidth = 0;
  var $callbackFunction = [];

  // --- handleResize
  var handleResize = function handleResize(callback) {
    $callbackFunction.push(callback);
    $(window).resize(function () {
      $rtime = new Date();
      if ($timeout === false) {
        if ($lastWindowWidth !== $(window).width()) {
          $timeout = true;
          $("body").addClass("hold-transition");
          setTimeout(_handleResizeEnd(), $delta);
        }
      }
    });
  };

  // --- handleResizeEnd
  var _handleResizeEnd = function handleResizeEnd() {
    if (new Date() - $rtime < $delta) {
      setTimeout(_handleResizeEnd, $delta);
    } else {
      $timeout = false;
      // Run Function on Resize end
      $("body").removeClass("hold-transition");
      $lastWindowWidth = $(window).width();
      $.each($callbackFunction, function (index, callback) {
        if (typeof callback === "function") {
          callback();
        }
      });
    }
  };

  // --- return
  return {
    resize: handleResize
  };
}();
var _default = exports.default = WindowResize;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Window Scroll
@description: Window Scroll
--------------------------------------------------------------------------------- */

// --- WindowScroll
var WindowScroll = function () {
  var $callbackFunction = [];

  // --- handleScrollTop
  var handleScrollTop = function handleScrollTop() {
    return $(window).scrollTop();
  };

  // --- handleScroll
  var handleScroll = function handleScroll(callback) {
    var $didScroll;
    $callbackFunction.push(callback);
    $(window).scroll(function () {
      $didScroll = true;
      setInterval(function () {
        if ($didScroll) {
          $.each($callbackFunction, function (index, callback) {
            if (typeof callback === "function") {
              callback();
            }
          });
          $didScroll = false;
        }
      }, 200);
    });
  };

  // --- run
  var run = function run(callback) {
    handleScroll(callback);
  };

  // --- return
  return {
    run: run,
    top: handleScrollTop
  };
}();
var _default = exports.default = WindowScroll;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BrowserCheck", {
  enumerable: true,
  get: function get() {
    return _BrowserCheck.default;
  }
});
Object.defineProperty(exports, "Scrolllable", {
  enumerable: true,
  get: function get() {
    return _Scrolllable.default;
  }
});
Object.defineProperty(exports, "Session", {
  enumerable: true,
  get: function get() {
    return _Session.default;
  }
});
Object.defineProperty(exports, "Validation", {
  enumerable: true,
  get: function get() {
    return _Validation.default;
  }
});
Object.defineProperty(exports, "WindowResize", {
  enumerable: true,
  get: function get() {
    return _WindowResize.default;
  }
});
Object.defineProperty(exports, "WindowScroll", {
  enumerable: true,
  get: function get() {
    return _WindowScroll.default;
  }
});
Object.defineProperty(exports, "isOS", {
  enumerable: true,
  get: function get() {
    return _isOS.default;
  }
});
var _isOS = _interopRequireDefault(require("./isOS"));
var _BrowserCheck = _interopRequireDefault(require("./BrowserCheck"));
var _Scrolllable = _interopRequireDefault(require("./Scrolllable"));
var _Validation = _interopRequireDefault(require("./Validation"));
var _Session = _interopRequireDefault(require("./Session"));
var _WindowScroll = _interopRequireDefault(require("./WindowScroll"));
var _WindowResize = _interopRequireDefault(require("./WindowResize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./BrowserCheck":2,"./Scrolllable":3,"./Session":4,"./Validation":5,"./WindowResize":6,"./WindowScroll":7,"./isOS":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: isOS
@description: isOS
--------------------------------------------------------------------------------- */

var isOS = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  mac: function mac() {
    return navigator.platform.indexOf('Mac') > -1;
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  win: function win() {
    return navigator.platform.indexOf('Win') > -1;
  },
  winMobile: function winMobile() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isOS.android() || isOS.blackberry() || isOS.iOS() || isOS.mac() || isOS.opera() || isOS.win() || isOS.winMobile();
  }
};
var _default = exports.default = isOS;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITESPACE = exports.PHONE_NUMBER = exports.PERSON_NAME = exports.NUMBERIC = exports.FULL_NAME = exports.EMAIL = void 0;
/* ------------------------------------------------------------------------------
@name: Regex
@description: Regex
--------------------------------------------------------------------------------- */

var WHITESPACE = exports.WHITESPACE = /^ *$/;
var EMAIL = exports.EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
var NUMBERIC = exports.NUMBERIC = /[0-9]+$/i;
var PHONE_NUMBER = exports.PHONE_NUMBER = /^(?:0|\+62)\d{9,13}$/;
var FULL_NAME = exports.FULL_NAME = /^(?:[\u00c0-\u01ffa-zA-Z-\s\.']){3,}(?:[\u00c0-\u01ffa-zA-Z-\s\.']{3,})+$/i;
var PERSON_NAME = exports.PERSON_NAME = /^[a-zA-Z][a-zA-Z\-' ]*[a-zA-Z ]$/i;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Regex = require("./Regex");
Object.keys(_Regex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Regex[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Regex[key];
    }
  });
});

},{"./Regex":10}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: AboutHighlight
@description: AboutHighlight
--------------------------------------------------------------------------------- */

var AboutHighlight = function () {
  var isCountingRun = false;
  var prepareCounters = function prepareCounters() {
    $('.js-count').each(function () {
      var $el = $(this);
      var end = parseInt($el.text().replace(/\D/g, ''), 10) || 0;
      $el.attr('data-count-end', end);
      $el.text('0');
    });
  };
  var countUp = function countUp($el, end, duration) {
    var current = 0;
    var step = end / (duration / 10);
    var interval = setInterval(function () {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      $el.text(Math.floor(current));
    }, 10);
  };
  var handleCounting = function handleCounting() {
    $('.js-count').each(function () {
      var $el = $(this);
      var end = parseInt($el.attr('data-count-end'), 10) || 0;
      countUp($el, end, 1250);
    });
  };
  var handleCheckScroll = function handleCheckScroll() {
    if (!isCountingRun && $(window).scrollTop() + $(window).height() > $('.about-highlight__stats').offset().top + 100) {
      isCountingRun = true;
      handleCounting();
    }
  };
  var handleWindowScroll = function handleWindowScroll() {
    $(window).on('scroll', handleCheckScroll);
  };
  var init = function init() {
    if ($('.about-highlight__stats').length) {
      prepareCounters();
      handleWindowScroll();
      handleCheckScroll();
    }
  };
  return {
    init: init
  };
}();
var _default = exports.default = AboutHighlight;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: AboutUs
@description: AboutUs
--------------------------------------------------------------------------------- */

var AboutUsSection = function () {
  var isCountingRun = false;
  var prepareCounters = function prepareCounters() {
    $('.js-count').each(function () {
      var $el = $(this);
      var end = parseInt($el.text().replace(/\D/g, ''), 10) || 0;
      $el.attr('data-count-end', end);
      $el.text('0');
    });
  };
  var countUp = function countUp($el, end, duration) {
    var current = 0;
    var step = end / (duration / 10);
    var interval = setInterval(function () {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      $el.text(Math.floor(current));
    }, 10);
  };
  var handleCounting = function handleCounting() {
    $('.js-count').each(function () {
      var $el = $(this);
      var end = parseInt($el.attr('data-count-end'), 10) || 0;
      countUp($el, end, 1250);
    });
  };
  var handleCheckScroll = function handleCheckScroll() {
    if (!isCountingRun && $(window).scrollTop() + $(window).height() > $('.about-us__stats').offset().top + 100) {
      isCountingRun = true;
      handleCounting();
    }
  };
  var handleWindowScroll = function handleWindowScroll() {
    $(window).on('scroll', handleCheckScroll);
  };
  var init = function init() {
    if ($('.about-us__stats').length) {
      prepareCounters();
      handleWindowScroll();
      handleCheckScroll();
    }
  };
  return {
    init: init
  };
}();
var _default = exports.default = AboutUsSection;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utilities = require("../../../_core/scripts/utilities");
/* ------------------------------------------------------------------------------
@name: Awards
@description: Awards
--------------------------------------------------------------------------------- */

var AwardsList = function () {
  var SELECTOR = {
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
  var hideModal = function hideModal() {
    var $modal = $(SELECTOR.modal);
    $modal.removeClass('is-active');
    _utilities.Scrolllable.enable();
  };
  var showModal = function showModal($card) {
    var $modal = $(SELECTOR.modal);
    if (!$modal.length || !$card.length) return;
    var title = $card.find(SELECTOR.payloadTitle).first().text().trim();
    var descHtml = $card.find(SELECTOR.payloadDesc).first().html() || '';
    var $payloadImage = $card.find(SELECTOR.payloadImage).first();
    $modal.find(SELECTOR.modalTitle).text(title);
    $modal.find(SELECTOR.modalDesc).html(descHtml);
    $modal.find(SELECTOR.modalImage).attr({
      src: $payloadImage.attr('src') || '',
      alt: $payloadImage.attr('alt') || title
    });
    $modal.addClass('is-active');
    _utilities.Scrolllable.disable();
  };
  var handleShowModal = function handleShowModal() {
    $(document).on('click', SELECTOR.cardTrigger, function (e) {
      var $card = $(e.currentTarget).closest(SELECTOR.card);
      showModal($card);
    }).on('click', SELECTOR.modalClose, function () {
      hideModal();
    }).on('keyup', function (e) {
      if (e.key === 'Escape' || e.which === 27) {
        hideModal();
      }
    });
  };

  // - init
  var init = function init() {
    if (!$(SELECTOR.card).length || !$(SELECTOR.modal).length) return;
    handleShowModal();
  };
  return {
    init: init
  };
}();
var _default = exports.default = AwardsList;

},{"../../../_core/scripts/utilities":8}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Awards
@description: Awards
--------------------------------------------------------------------------------- */

var Awards = function () {
  var $selector = $('.js-awards-carousel');
  var $imageElement = $('.awards__image-el');
  var setActiveCardAndImage = function setActiveCardAndImage(target) {
    var $target = $(target);
    var $activeItems = $target.find('.owl-item.active .awards__item');
    var $carousel = $target.closest('.awards__carousel');
    var carouselRect = $carousel.length ? $carousel.get(0).getBoundingClientRect() : $target.get(0).getBoundingClientRect();
    var rightMostInside = Number.NEGATIVE_INFINITY;
    var $insideCard = $();
    var closestDistance = Number.POSITIVE_INFINITY;
    var $fallbackCard = $();
    $activeItems.each(function (_, item) {
      var $item = $(item);
      var rect = item.getBoundingClientRect();
      var distanceToRight = Math.abs(carouselRect.right - rect.right);
      var isVerticallyVisible = rect.bottom > carouselRect.top && rect.top < carouselRect.bottom;
      var isHorizontallyVisible = rect.left < carouselRect.right && rect.right > carouselRect.left;
      var isInsideRightBoundary = rect.right <= carouselRect.right + 2;
      if (isVerticallyVisible && isHorizontallyVisible && isInsideRightBoundary && rect.right > rightMostInside) {
        rightMostInside = rect.right;
        $insideCard = $item;
      }
      if (!$fallbackCard.length) {
        $fallbackCard = $item;
        closestDistance = distanceToRight;
        return;
      }
      if (distanceToRight < closestDistance) {
        $fallbackCard = $item;
        closestDistance = distanceToRight;
      }
    });
    var $activeCard = $insideCard.length ? $insideCard : $fallbackCard;
    if (!$activeCard.length) return;
    $target.find('.awards__item').removeClass('is-active');
    $activeCard.addClass('is-active');
    if (!$imageElement.length) return;
    var nextImageSrc = $activeCard.attr('data-awards-img');
    var nextImageAlt = $activeCard.attr('data-awards-alt');
    if (nextImageSrc) {
      $imageElement.attr('src', nextImageSrc);
    }
    if (nextImageAlt) {
      $imageElement.attr('alt', nextImageAlt);
    }
  };

  // - handleRunCarousel
  var handleRunCarousel = function handleRunCarousel() {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }

    // --- init carousel
    $selector.addClass('owl-carousel').owlCarousel({
      items: 1,
      margin: 24,
      loop: true,
      rewind: false,
      touchDrag: true,
      nav: true,
      rtl: false,
      mouseDrag: true,
      pullDrag: true,
      dots: true,
      autoplay: false,
      autoplayTimeout: 8000,
      autoplayHoverPause: true,
      smartSpeed: 1250,
      autoWidth: true,
      // responsive: {
      //   0: {
      //     items: 1
      //     // margin: 16
      //   },
      //   520: {
      //     items: 2
      //     // margin: 16
      //   },
      //   740: {
      //     items: 2
      //     // margin: 20
      //   },
      //   992: {
      //     items: 2
      //     // margin: 20
      //   }
      // },
      onInitialized: function onInitialized(e) {
        $(e.target).find('.owl-prev').html('<i class="sr sr-caret-left"></i>');
        $(e.target).find('.owl-next').html('<i class="sr sr-caret-right"></i>');
        setActiveCardAndImage(e.target);
      },
      onChanged: function onChanged(e) {
        if (!e || !e.item) return;
        setActiveCardAndImage(e.target);
      }
    });
  };

  // - init
  var init = function init() {
    if (!$selector.length) return;
    setTimeout(function () {
      handleRunCarousel();
    }, 200);
  };
  return {
    init: init
  };
}();
var _default = exports.default = Awards;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WindowResize = _interopRequireDefault(require("../../../_core/scripts/utilities/WindowResize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* ------------------------------------------------------------------------------
@name: BusinessesHSE
@description: BusinessesHSE
--------------------------------------------------------------------------------- */

var BusinessesHSE = function () {
  var $selector = $('.js-businesses-hse-slider');

  // init slider
  var handleRunCarousel = function handleRunCarousel() {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }
    if ($(window).width() > 992.98) {
      $selector.addClass('owl-carousel').owlCarousel({
        items: 3,
        loop: false,
        nav: true,
        navText: ['<i class="sr sr-caret-left"></i>', '<i class="sr sr-caret-right"></i>'],
        dots: false,
        autoplay: false,
        smartSpeed: 600
      });
    } else {
      if ($selector.hasClass('owl-carousel')) {
        // destroy carousel
        $selector.owlCarousel('destroy');
      }
    }
  };

  // init
  var init = function init() {
    if (!$selector.length) return;
    var run = function run() {
      _WindowResize.default.resize(handleRunCarousel);
      handleRunCarousel();
    };
    if (document.readyState === 'complete') {
      setTimeout(run, 300);
    } else {
      window.addEventListener('load', function () {
        setTimeout(run, 300);
      });
    }
  };
  return {
    init: init
  };
}();
var _default = exports.default = BusinessesHSE;

},{"../../../_core/scripts/utilities/WindowResize":6}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var BusinessesOverview = function () {
  // - handleClickAccordion
  var handleClickAccordion = function handleClickAccordion() {
    $('.js-businesses-ovw-acc .businesses-ovw__acc__title').on('click', function (e) {
      var $this = $(e.currentTarget);
      var $parents = $this.parents('.businesses-ovw__acc__item');
      if ($parents.hasClass('expanded')) {
        $parents.find('.businesses-ovw__acc__body').delay(250).slideUp(300);
        $parents.removeClass('expanded');
      } else {
        $parents.siblings('.businesses-ovw__acc__item').removeClass('expanded').find('.businesses-ovw__acc__body').slideUp(300);
        $parents.find('.businesses-ovw__acc__body').slideDown(300);
        $parents.addClass('expanded');
      }
    });
  };

  // - expandFirstItem
  var expandFirstItem = function expandFirstItem() {
    var $firstItem = $('.js-businesses-ovw-acc .businesses-ovw__acc__item').first();
    $firstItem.addClass('expanded');
    $firstItem.find('.businesses-ovw__acc__body').show();
  };

  // - init
  var init = function init() {
    if (!$('.js-businesses-ovw-acc').length) return;
    expandFirstItem();
    handleClickAccordion();
  };
  return {
    init: init
  };
}();
var _default = exports.default = BusinessesOverview;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utilities = require("../../../_core/scripts/utilities");
/* ------------------------------------------------------------------------------
@name: Awards
@description: Awards
--------------------------------------------------------------------------------- */

var BusinessesPortofolio = function () {
  var SELECTOR = {
    card: '.js-businesses-show-modal',
    modal: '.js-businesses-modal',
    modalType: '.js-businesses-modal-type',
    modalTagline: '.js-businesses-modal-tagline',
    modalLink: '.js-businesses-modal-link',
    modalLogo: '.js-businesses-modal-logo',
    modalImage: '.js-businesses-modal-img',
    modalContent: '.js-businesses-modal-content',
    modalClose: '.js-businesses-modal-close'
  };
  var hideModal = function hideModal() {
    var $modal = $(SELECTOR.modal);
    $modal.removeClass('is-active');

    // Tunggu animasi selesai sebelum enable scroll
    setTimeout(function () {
      _utilities.Scrolllable.enable();
    }, 300); // Sesuaikan dengan durasi CSS transition
  };
  var showModal = function showModal($card) {
    var $modal = $(SELECTOR.modal);
    if (!$modal.length || !$card.length) return;
    var type = $card.attr('data-type');
    var tagline = $card.attr('data-tagline');
    var link = $card.attr('data-link');
    var content = $card.attr('data-content');
    var logo = $card.attr('data-logo');
    var image = $card.attr('data-img');
    $modal.find(SELECTOR.modalType).text(type);
    $modal.find(SELECTOR.modalTagline).text(tagline);
    $modal.find(SELECTOR.modalLink).attr('href', link);
    $modal.find(SELECTOR.modalLink).find('.js-businesses-modal-link-text').text(link);
    $modal.find(SELECTOR.modalContent).html(content);
    $modal.find(SELECTOR.modalLogo).attr({
      src: logo || '',
      alt: type
    });
    $modal.find(SELECTOR.modalImage).attr({
      src: image || '',
      alt: type
    });
    $modal.addClass('is-active');
    _utilities.Scrolllable.disable();
  };
  var handleShowModal = function handleShowModal() {
    $(document).on('click', SELECTOR.card, function (e) {
      var $card = $(e.currentTarget).closest(SELECTOR.card);
      showModal($card);
    }).on('click', SELECTOR.modalClose, function () {
      hideModal();
    }).on('keyup', function (e) {
      if (e.key === 'Escape' || e.which === 27) {
        hideModal();
      }
    });
  };

  // - init
  var init = function init() {
    if (!$(SELECTOR.card).length || !$(SELECTOR.modal).length) return;
    handleShowModal();
  };
  return {
    init: init
  };
}();
var _default = exports.default = BusinessesPortofolio;

},{"../../../_core/scripts/utilities":8}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: BusinessesSection
@description: BusinessesSection
--------------------------------------------------------------------------------- */

var BusinessesSection = function () {
  var $selector = $('.js-businesses-content');

  // - handleRunCarousel
  var handleRunCarousel = function handleRunCarousel() {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }

    // --- init carousel
    $selector.addClass('owl-carousel').owlCarousel({
      items: 4,
      margin: 0,
      loop: false,
      rewind: false,
      touchDrag: true,
      nav: true,
      mouseDrag: true,
      pullDrag: true,
      dots: false,
      autoplay: false,
      autoplayTimeout: 8000,
      autoplayHoverPause: true,
      smartSpeed: 1250,
      responsive: {
        0: {
          items: 1
          // margin: 16
        },
        520: {
          items: 2
          // margin: 16
        },
        740: {
          items: 2
          // margin: 20
        },
        992: {
          items: 3
          // margin: 20
        }
      },
      onInitialized: function onInitialized(e) {
        $(e.target).find('.owl-prev').html('<i class="sr sr-caret-left"></i>');
        $(e.target).find('.owl-next').html('<i class="sr sr-caret-right"></i>');
      }
    });
  };

  // - init
  var init = function init() {
    if (!$selector.length) return;
    setTimeout(function () {
      handleRunCarousel();
    }, 200);
  };
  return {
    init: init
  };
}();
var _default = exports.default = BusinessesSection;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WindowResize = _interopRequireDefault(require("../../../_core/scripts/utilities/WindowResize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* ------------------------------------------------------------------------------
@name: BusinessesTeam
@description: BusinessesTeam
--------------------------------------------------------------------------------- */

var BusinessesTeam = function () {
  var $selector = $('.js-businesses-team-slider');
  var $section = $selector.closest('.businesses-team');
  var $btnPrev = $section.find('.js-businesses-team-prev');
  var $btnNext = $section.find('.js-businesses-team-next');
  var $dots = $section.find('.js-businesses-team-dots');
  var $itemLength = $('.js-businesses-team-slider .businesses-team__item').length;
  var updateNavState = function updateNavState(currentIndex, totalItems) {
    if (!$btnPrev.length || !$btnNext.length) return;
    var isFirst = currentIndex <= 0;
    var isLast = currentIndex >= totalItems - 1;
    $btnPrev.toggleClass('disabled', isFirst).prop('disabled', isFirst);
    $btnNext.toggleClass('disabled', isLast).prop('disabled', isLast);
  };
  var renderDots = function renderDots(totalItems) {
    if (!$dots.length) return;
    if (totalItems <= 1) {
      $dots.empty();
      return;
    }
    var dotsHtml = Array.from({
      length: totalItems
    }, function (_, idx) {
      return "<button class=\"businesses-team__dots__item js-businesses-team-dot\" type=\"button\" data-index=\"".concat(idx, "\" aria-label=\"Go to slide ").concat(idx + 1, "\"></button>");
    }).join('');
    $dots.html(dotsHtml);
  };
  var updateDotsState = function updateDotsState(currentIndex) {
    if (!$dots.length) return;
    $dots.find('.js-businesses-team-dot').removeClass('active').eq(currentIndex).addClass('active');
  };
  var parseEducation = function parseEducation(value) {
    if (!value) return [];
    try {
      var parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return value.split('|').map(function (item) {
        return item.trim();
      }).filter(Boolean);
    }
  };
  var renderTeamText = function renderTeamText($item) {
    if (!$item || !$item.length) return;
    var name = $item.attr('data-name') || '';
    var username = $item.attr('data-username') || '';
    var partnerContent = $item.attr('data-content-partner') || '';
    var education = parseEducation($item.attr('data-education'));
    var $wrapper = $selector.closest('.businesses-team__body').find('.businesses-team__text');
    var $name = $wrapper.find('.businesses-team__name');
    var $username = $wrapper.find('.businesses-team__username span');
    var $partner = $wrapper.find('.businesses-team__desc');
    var $education = $wrapper.find('.businesses-team__education');
    $name.text(name);
    $username.text(username);
    $partner.html(partnerContent);
    var educationHtml = education.map(function (item) {
      return "<li class=\"businesses-team__education__item\">".concat(item, "</li>");
    }).join('');
    $education.html(educationHtml);
  };
  var updateTextByIndex = function updateTextByIndex(index) {
    var $items = $selector.find('.businesses-team__item');
    var $activeItem = $items.eq(index);
    if (!$activeItem.length) return;
    renderTeamText($activeItem);
  };
  var bindCarouselEvents = function bindCarouselEvents() {
    $selector.off('initialized.owl.carousel changed.owl.carousel').on('initialized.owl.carousel', function () {
      var carousel = $selector.data('owl.carousel');
      if (!carousel) return;
      var currentIndex = carousel.relative(carousel.current());
      var totalItems = carousel._items ? carousel._items.length : $itemLength;
      updateTextByIndex(currentIndex);
      updateNavState(currentIndex, totalItems);
      updateDotsState(currentIndex);
    }).on('changed.owl.carousel', function (event) {
      var carousel = $selector.data('owl.carousel');
      if (!carousel || !event.property || event.property.name !== 'position') return;
      var currentIndex = carousel.relative(event.property.value);
      var totalItems = carousel._items ? carousel._items.length : $itemLength;
      updateTextByIndex(currentIndex);
      updateNavState(currentIndex, totalItems);
      updateDotsState(currentIndex);
    });
  };
  var bindCustomNav = function bindCustomNav() {
    $btnPrev.off('click.businessesTeamNav').on('click.businessesTeamNav', function () {
      if ($btnPrev.hasClass('disabled')) return;
      $selector.trigger('prev.owl.carousel');
    });
    $btnNext.off('click.businessesTeamNav').on('click.businessesTeamNav', function () {
      if ($btnNext.hasClass('disabled')) return;
      $selector.trigger('next.owl.carousel');
    });
  };
  var bindCustomDots = function bindCustomDots() {
    $dots.off('click.businessesTeamDots').on('click.businessesTeamDots', '.js-businesses-team-dot', function (event) {
      var $target = $(event.currentTarget);
      var index = Number($target.attr('data-index'));
      if (Number.isNaN(index)) return;
      $selector.trigger('to.owl.carousel', [index, 1200, true]);
    });
  };

  // init slider
  var handleRunCarousel = function handleRunCarousel() {
    updateTextByIndex(0);
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }
    bindCarouselEvents();
    bindCustomNav();
    bindCustomDots();

    // init carousel
    if ($itemLength > 1) {
      renderDots($itemLength);
      updateDotsState(0);
      updateNavState(0, $itemLength);

      // --- init carousel
      $selector.addClass('owl-carousel').owlCarousel({
        items: 1,
        startPosition: 0,
        loop: false,
        rewind: false,
        autoWidth: true,
        touchDrag: true,
        mouseDrag: true,
        pullDrag: true,
        nav: false,
        dots: true,
        autoplay: false,
        smartSpeed: 1200,
        margin: 16,
        responsive: {
          0: {
            rtl: false
          },
          992: {
            rtl: true
          }
        }
      });
    } else {
      $selector.addClass('businesses-team--single');
      updateTextByIndex(0);
      updateNavState(0, 1);
      renderDots(1);
    }
  };

  // init
  var init = function init() {
    if (!$selector.length) return;
    var run = function run() {
      _WindowResize.default.resize(handleRunCarousel);
      handleRunCarousel();
    };
    if (document.readyState === 'complete') {
      setTimeout(run, 300);
    } else {
      window.addEventListener('load', function () {
        setTimeout(run, 300);
      });
    }
  };
  return {
    init: init
  };
}();
var _default = exports.default = BusinessesTeam;

},{"../../../_core/scripts/utilities/WindowResize":6}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utilities = require("../../../_core/scripts/utilities");
/* ------------------------------------------------------------------------------
@name: Career Details
@description: Career Details
--------------------------------------------------------------------------------- */

var CareerDetails = function () {
  var accordionBreakpoint = 991.98;
  var bodySelector = 'body';
  var itemSelector = '.career-details__item';
  var triggerSelector = '.career-details__item-trigger';
  var descSelector = '.career-details__item-desc';
  var closeSelector = '.career-details__button';
  var applySelector = '.career-details__wr-button';
  var detailsClass = 'show--career-details';
  var formClass = 'show--career-form';
  var closeDetails = function closeDetails() {
    $(bodySelector).removeClass("".concat(detailsClass, " ").concat(formClass));
    _utilities.Scrolllable.enable();
  };
  var showForm = function showForm() {
    $(bodySelector).addClass(formClass);
    _utilities.Scrolllable.disable();
  };
  var handleAccordion = function handleAccordion() {
    if (!$('.career-details').length) return;
    if (window.matchMedia("(max-width: ".concat(accordionBreakpoint, "px)")).matches) {
      $(descSelector).each(function (_, element) {
        var $desc = $(element);
        if (!$desc.closest(itemSelector).hasClass('is-open')) {
          $desc.stop(true, true).slideUp(0);
        }
      });
      $(document).off('click.careerDetailsAccordion', triggerSelector).on('click.careerDetailsAccordion', triggerSelector, function () {
        var $trigger = $(this);
        var $item = $trigger.closest(itemSelector);
        var $desc = $item.find(descSelector);
        var isOpen = $item.hasClass('is-open');
        if (isOpen) {
          $item.removeClass('is-open');
          $trigger.attr('aria-expanded', 'false');
          $desc.stop(true, true).slideUp(300);
          return;
        }
        $item.addClass('is-open');
        $trigger.attr('aria-expanded', 'true');
        $desc.stop(true, true).slideDown(300);
      });
      return;
    }
    $(document).off('click.careerDetailsAccordion', triggerSelector);
    $(itemSelector).removeClass('is-open');
    $(triggerSelector).attr('aria-expanded', 'true');
    $(descSelector).stop(true, true).show();
  };
  var init = function init() {
    if (!$('.career-details').length) return;
    handleAccordion();
    $(window).off('resize.careerDetailsAccordion').on('resize.careerDetailsAccordion', handleAccordion);
    $(document).off('click.careerDetailsClose', closeSelector).on('click.careerDetailsClose', closeSelector, closeDetails).off('click.careerFormOpen', applySelector).on('click.careerFormOpen', applySelector, showForm).off('keyup.careerDetailsEsc').on('keyup.careerDetailsEsc', function (e) {
      if (e.which !== 27) return;
      if ($(bodySelector).hasClass(formClass)) {
        $(bodySelector).removeClass(formClass);
        _utilities.Scrolllable.disable();
        return;
      }
      if ($(bodySelector).hasClass(detailsClass)) {
        closeDetails();
      }
    });
  };
  return {
    init: init
  };
}();
var _default = exports.default = CareerDetails;

},{"../../../_core/scripts/utilities":8}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utilities = require("../../../_core/scripts/utilities");
/* ------------------------------------------------------------------------------
@name: Career Form
@description: Career Form
--------------------------------------------------------------------------------- */

// --- utilities

var ElementSelector = [{
  id: 'name',
  validation: {
    required: true
  }
}, {
  id: 'phone',
  validation: {
    required: true,
    phone: true
  }
}, {
  id: 'email',
  validation: {
    required: true,
    email: true
  }
}, {
  id: 'resume',
  validation: {
    required: true
  }
}];
var CareerForm = function () {
  var $modal = $('.js-modal-success');
  var $form = $('.js-form-career');
  var bodySelector = 'body';
  var closeSelector = '.js-career-form-close';
  var SUBMIT_SELECTOR = "button[type='submit']";
  var SUCCESS_MODAL_DELAY = 1500;
  var successModalTimer = null;
  var fileSelector = '#resume';
  var detailsClass = 'show--career-details';
  var formClass = 'show--career-form';
  var hideForm = function hideForm() {
    $(bodySelector).removeClass(formClass);
    if ($(bodySelector).hasClass(detailsClass) || $modal.hasClass('is-visible')) {
      _utilities.Scrolllable.disable();
      return;
    }
    _utilities.Scrolllable.enable();
  };
  var validateFileInput = function validateFileInput() {
    var _$input$get;
    var $input = $form.find(fileSelector);
    if (!$input.length) return true;
    var files = (_$input$get = $input.get(0)) === null || _$input$get === void 0 ? void 0 : _$input$get.files;
    var hasFile = !!(files && files.length);
    var target = $input.attr('data-target');
    var $alert = target ? $('#' + target) : $();
    var $ctrl = $input.closest('.form-control');
    if (!hasFile) {
      $ctrl.addClass('error');
      if ($alert.length) {
        $alert.text($alert.attr('data-req')).addClass('error');
      }
      return false;
    }
    $ctrl.removeClass('error').addClass('focused');
    if ($alert.length) {
      $alert.removeClass('error').text('');
    }
    return true;
  };
  var clearSuccessModalTimer = function clearSuccessModalTimer() {
    if (successModalTimer) {
      clearTimeout(successModalTimer);
      successModalTimer = null;
    }
  };
  var resetFormState = function resetFormState() {
    var _$form$get;
    (_$form$get = $form.get(0)) === null || _$form$get === void 0 || _$form$get.reset();
    ElementSelector.forEach(function (_ref) {
      var id = _ref.id;
      var $input = $('#' + id);
      var target = $input.attr('data-target');
      $input.removeClass('error');
      $input.closest('.form-control').removeClass('error focused show-select');
      if (target) {
        $('#' + target).removeClass('error').text('');
      }
    });
    $form.find('.js-remove-input').remove();
    $form.find('.form-control__file-chosen').text('Choose file');
  };
  var scheduleHideModalSuccess = function scheduleHideModalSuccess() {
    clearSuccessModalTimer();
    successModalTimer = setTimeout(function () {
      hideModalSuccess();
    }, SUCCESS_MODAL_DELAY);
  };

  // - showModalSuccess
  var showModalSuccess = function showModalSuccess() {
    clearSuccessModalTimer();
    $modal.addClass('is-visible');
    _utilities.Scrolllable.disable();
  };

  // - hideModalSuccess
  var hideModalSuccess = function hideModalSuccess() {
    clearSuccessModalTimer();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    $modal.removeClass('is-visible');
    resetFormState();
    if ($(bodySelector).hasClass(detailsClass) || $(bodySelector).hasClass(formClass)) {
      _utilities.Scrolllable.disable();
      return;
    }
    _utilities.Scrolllable.enable();
  };

  // - handleModalClose
  var handleModalClose = function handleModalClose() {
    // Close modal when clicking outside modal content
    $modal.on('click', function () {
      hideModalSuccess();
    });

    // Prevent modal from closing when clicking inside the content
    $modal.find('.modal-success__content').on('click', function (e) {
      e.stopPropagation();
    });
  };
  var handleFormVisibility = function handleFormVisibility() {
    $(document).off('click.careerFormClose', closeSelector).on('click.careerFormClose', closeSelector, hideForm).off('keyup.careerFormEsc').on('keyup.careerFormEsc', function (e) {
      if (e.which !== 27 || !$(bodySelector).hasClass(formClass)) return;
      hideForm();
    });
  };

  // - handleValidationAndSubmit
  var handleValidationAndSubmit = function handleValidationAndSubmit() {
    $form.find(SUBMIT_SELECTOR).on('click', function (e) {
      e.preventDefault();
      ElementSelector.forEach(function (_ref2) {
        var id = _ref2.id;
        return $('#' + id).blur();
      });
      var hasValidFile = validateFileInput();
      if (hasValidFile && !$form.find('.error').length) {
        handleSubmitSuccess();
      }
    });
    $form.find(fileSelector).on('change', function () {
      validateFileInput();
    });
  };

  // - handleSubmitSuccess
  var handleSubmitSuccess = function handleSubmitSuccess() {
    var formData = {};
    var submitUrl = $form.attr('data-url');
    $.each(ElementSelector, function (_, el) {
      formData[el.id] = $('#' + el.id).val();
    });

    // Bersihkan error (jika ada)
    ElementSelector.forEach(function (_ref3) {
      var id = _ref3.id;
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
      success: function success(response) {
        if (response.status === 'success') {
          showModalSuccess();
          scheduleHideModalSuccess();
          // Optionally reset label states
        } else if (response.errors) {
          // Show validation errors
          $.each(response.errors, function (key, msg) {
            $('#' + key + '_error').text(msg);
          });
        } else {
          alert(response.message || 'Submission failed.');
        }
      },
      error: function error() {
        alert('An error occurred. Please try again.');
      }
    });
  };

  // - init
  var init = function init() {
    if (!$form.length) return;
    _utilities.Validation.config(['input', 'change', 'blur'], ElementSelector);
    handleValidationAndSubmit();
    handleModalClose();
    handleFormVisibility();
  };
  return {
    init: init
  };
}();
var _default = exports.default = CareerForm;

},{"../../../_core/scripts/utilities":8}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utilities = require("../../../_core/scripts/utilities");
/* ------------------------------------------------------------------------------
@name: Career List
@description: Career List
--------------------------------------------------------------------------------- */

var CareerList = function () {
  var bodySelector = 'body';
  var itemTriggerSelector = '.career-list__item-box';
  var detailsClass = 'show--career-details';
  var handleShowModal = function handleShowModal() {
    if (!$('.career-list').length || !$('.career-details').length) return;
    $(document).off('click.careerDetailsOpen', itemTriggerSelector).on('click.careerDetailsOpen', itemTriggerSelector, function () {
      $(bodySelector).addClass(detailsClass);
      _utilities.Scrolllable.disable();
    });
  };
  var init = function init() {
    handleShowModal();
  };
  return {
    init: init
  };
}();
var _default = exports.default = CareerList;

},{"../../../_core/scripts/utilities":8}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Contact US Accordion
@description: Contact Us Accordion
--------------------------------------------------------------------------------- */

var ContactUSAccordion = function () {
  var ITEM_SELECTOR = '.contact-acd__item';
  var BOX_SELECTOR = '.contact-acd__box';
  var MENU_SELECTOR = '.contact-acd__menu';
  var ACTIVE_CLASS = 'is-active';
  var setMenuHeight = function setMenuHeight($item) {
    var $menu = $item.find(MENU_SELECTOR).first();
    var menuEl = $menu.get(0);
    if (!menuEl) return;
    $menu.css('--menu-max-height', "".concat(menuEl.scrollHeight, "px"));
  };
  var closeItem = function closeItem($item) {
    $item.removeClass(ACTIVE_CLASS);
    $item.find(MENU_SELECTOR).first().css('--menu-max-height', '0px');
  };
  var openItem = function openItem($item) {
    setMenuHeight($item);
    $item.addClass(ACTIVE_CLASS);
  };

  // - handleAccordion
  var handleAccordion = function handleAccordion() {
    var $items = $(ITEM_SELECTOR);
    if (!$items.length) return;
    $items.each(function (_, item) {
      closeItem($(item));
    });
    $(document).on('click', BOX_SELECTOR, function (e) {
      var $item = $(e.currentTarget).closest(ITEM_SELECTOR);
      var isActive = $item.hasClass(ACTIVE_CLASS);
      $items.not($item).each(function (_, item) {
        closeItem($(item));
      });
      if (isActive) {
        closeItem($item);
        return;
      }
      openItem($item);
    });
    $(window).on('resize', function () {
      $items.filter(".".concat(ACTIVE_CLASS)).each(function (_, item) {
        setMenuHeight($(item));
      });
    });
  };

  // - init
  var init = function init() {
    handleAccordion();
  };
  return {
    init: init
  };
}();
var _default = exports.default = ContactUSAccordion;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utilities = require("../../../_core/scripts/utilities");
/* ------------------------------------------------------------------------------
@name: Contact Us
@description: Contact Us
--------------------------------------------------------------------------------- */

// --- utilities

var ElementSelector = [{
  id: 'name',
  validation: {
    required: true
  }
}, {
  id: 'phone',
  validation: {
    required: true,
    phone: true
  }
}, {
  id: 'email',
  validation: {
    required: true,
    email: true
  }
}, {
  id: 'company',
  validation: {
    required: true
  }
}, {
  id: 'message',
  validation: {
    required: true
  }
}];
var ContactUsForm = function () {
  var $modal = $('.js-modal-success');
  var $form = $('.js-form-contact');
  var CONSENT_SELECTOR = '.js-contact-consent';
  var CONSENT_ERROR_SELECTOR = '.js-contact-consent-error';
  var SUBMIT_SELECTOR = "button[type='submit']";
  var SUCCESS_MODAL_DELAY = 1500;
  var successModalTimer = null;
  var updateSubmitState = function updateSubmitState() {
    var isChecked = $form.find(CONSENT_SELECTOR).is(':checked');
    $form.find(SUBMIT_SELECTOR).prop('disabled', !isChecked);
    return isChecked;
  };
  var toggleConsentError = function toggleConsentError(show) {
    $form.find(CONSENT_ERROR_SELECTOR).toggleClass('is-visible', show);
  };
  var clearSuccessModalTimer = function clearSuccessModalTimer() {
    if (successModalTimer) {
      clearTimeout(successModalTimer);
      successModalTimer = null;
    }
  };
  var resetFormState = function resetFormState() {
    var _$form$get;
    (_$form$get = $form.get(0)) === null || _$form$get === void 0 || _$form$get.reset();
    ElementSelector.forEach(function (_ref) {
      var id = _ref.id;
      var $input = $('#' + id);
      var target = $input.attr('data-target');
      $input.removeClass('error');
      $input.closest('.form-control').removeClass('error focused show-select');
      if (target) {
        $('#' + target).removeClass('error').text('');
      }
    });
    $form.find('.js-remove-input').remove();
    toggleConsentError(false);
    updateSubmitState();
  };
  var scheduleHideModalSuccess = function scheduleHideModalSuccess() {
    clearSuccessModalTimer();
    successModalTimer = setTimeout(function () {
      hideModalSuccess();
    }, SUCCESS_MODAL_DELAY);
  };

  // - showModalSuccess
  var showModalSuccess = function showModalSuccess() {
    clearSuccessModalTimer();
    $modal.addClass('is-visible');
    _utilities.Scrolllable.disable();
  };

  // - hideModalSuccess
  var hideModalSuccess = function hideModalSuccess() {
    clearSuccessModalTimer();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    $modal.removeClass('is-visible');
    resetFormState();
    _utilities.Scrolllable.enable();
  };

  // - handleModalClose
  var handleModalClose = function handleModalClose() {
    // Close modal when clicking outside modal content
    $modal.on('click', function () {
      hideModalSuccess();
    });

    // Prevent modal from closing when clicking inside the content
    $modal.find('.modal-success__content').on('click', function (e) {
      e.stopPropagation();
    });
  };

  // - handleValidationAndSubmit
  var handleValidationAndSubmit = function handleValidationAndSubmit() {
    $form.find(SUBMIT_SELECTOR).on('click', function (e) {
      console.log('hello');
      e.preventDefault();
      var hasConsent = updateSubmitState();
      if (!hasConsent) {
        toggleConsentError(true);
        return;
      }
      toggleConsentError(false);
      ElementSelector.forEach(function (_ref2) {
        var id = _ref2.id;
        return $('#' + id).blur();
      });
      if (!$form.find('.error').length) {
        handleSubmitSuccess();
      }
    });
    $form.find(CONSENT_SELECTOR).on('change', function () {
      toggleConsentError(false);
      updateSubmitState();
    });
  };

  // - handleSubmitSuccess
  var handleSubmitSuccess = function handleSubmitSuccess() {
    var formData = {};
    var submitUrl = $form.attr('data-url');
    $.each(ElementSelector, function (_, el) {
      formData[el.id] = $('#' + el.id).val();
    });

    // Bersihkan error (jika ada)
    ElementSelector.forEach(function (_ref3) {
      var id = _ref3.id;
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
      success: function success(response) {
        if (response.status === 'success') {
          showModalSuccess();
          scheduleHideModalSuccess();
          // Optionally reset label states
        } else if (response.errors) {
          // Show validation errors
          $.each(response.errors, function (key, msg) {
            $('#' + key + '_error').text(msg);
          });
        } else {
          alert(response.message || 'Submission failed.');
        }
      },
      error: function error() {
        alert('An error occurred. Please try again.');
      }
    });
  };

  // - init
  var init = function init() {
    if (!$form.length) return;
    _utilities.Validation.config(['input', 'change', 'blur'], ElementSelector);
    updateSubmitState();
    handleValidationAndSubmit();
    handleModalClose();
  };
  return {
    init: init
  };
}();
var _default = exports.default = ContactUsForm;

},{"../../../_core/scripts/utilities":8}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Csr Section
@description: Csr Section
--------------------------------------------------------------------------------- */

var CsrSection = function () {
  var $selector = $('.js-csr-carousel');
  var autoplayTimeout = 3000;
  var progressDuration = 3000;
  var activeIndex = 0;
  var pendingIndex = 0;
  var progressStartTime = 0;
  var rafId = null;
  var isPaused = false;
  var pausedAt = 0;
  var updateDotsState = function updateDotsState(currentIndex) {
    var currentProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var carousel = $selector.data('owl.carousel');
    if (!carousel) return;
    var $dots = $selector.find('.owl-dot');
    $dots.each(function (index, dot) {
      var $dot = $(dot);
      var fill = 0;
      if (index < currentIndex) {
        fill = 1;
      } else if (index === currentIndex) {
        fill = Math.max(0, Math.min(1, currentProgress));
      }
      $dot.get(0).style.setProperty('--csr-dot-fill', fill);
    });
  };
  var stopProgressLoop = function stopProgressLoop() {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
  var runProgressLoop = function runProgressLoop() {
    stopProgressLoop();
    var _tick = function tick() {
      if (!isPaused) {
        var elapsed = performance.now() - progressStartTime;
        var progress = Math.max(0, Math.min(1, elapsed / progressDuration));
        updateDotsState(activeIndex, progress);
      }
      rafId = window.requestAnimationFrame(_tick);
    };
    rafId = window.requestAnimationFrame(_tick);
  };
  var bindCarouselEvents = function bindCarouselEvents() {
    $selector.off('initialized.owl.carousel change.owl.carousel translate.owl.carousel').on('initialized.owl.carousel', function () {
      var carousel = $selector.data('owl.carousel');
      if (!carousel) return;
      activeIndex = carousel.relative(carousel.current());
      pendingIndex = activeIndex;
      progressStartTime = performance.now();
      updateDotsState(activeIndex, 0);
    }).on('change.owl.carousel', function (event) {
      var carousel = $selector.data('owl.carousel');
      if (!carousel || !event.property || event.property.name !== 'position') return;
      pendingIndex = carousel.relative(event.property.value);
    }).on('translate.owl.carousel', function () {
      activeIndex = pendingIndex;
      progressStartTime = performance.now();
      updateDotsState(activeIndex, 0);
    });
    $selector.off('mouseenter.csrProgress mouseleave.csrProgress').on('mouseenter.csrProgress', function () {
      isPaused = true;
      pausedAt = performance.now();
    }).on('mouseleave.csrProgress', function () {
      if (!isPaused) return;
      isPaused = false;
      progressStartTime += performance.now() - pausedAt;
    });
  };

  // - handleRunCarousel
  var handleRunCarousel = function handleRunCarousel() {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }
    bindCarouselEvents();

    // --- init carousel
    $selector.addClass('owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      rewind: false,
      touchDrag: true,
      nav: false,
      mouseDrag: true,
      pullDrag: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 1250
    });
    autoplayTimeout = $selector.data('owl.carousel').settings.autoplayTimeout;
    progressDuration = Math.max(300, autoplayTimeout);
    runProgressLoop();
  };

  // - init
  var init = function init() {
    if (!$selector.length) return;
    setTimeout(function () {
      handleRunCarousel();
    }, 200);
  };
  return {
    init: init
  };
}();
var _default = exports.default = CsrSection;

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Footer
@description: Footer
--------------------------------------------------------------------------------- */

var Footer = function () {
  var titleSelector = '.footer__menu__grup-title';
  var listSelector = '.footer__menu__grup-list';
  var rowSelector = '.footer__menu__grup-item';
  var footerSelector = '.footer';
  var mainSiteSelector = '.main-site';
  var outTransitionDelay = 200;
  var accordionBreakpoint = 767.98;

  // Sticky Footer
  var handleFooterSticky = function handleFooterSticky() {
    var $footer = $(footerSelector);
    var $mainSite = $(mainSiteSelector);
    if (!$footer.length || !$mainSite.length) return;
    if ($(window).width() >= 992) {
      var footerHeight = $footer.outerHeight();
      $mainSite.css('padding-bottom', "".concat(footerHeight, "px"));
      $footer.css('position', 'absolute');
    } else {
      $mainSite.removeAttr('style');
      $footer.removeAttr('style');
    }
  };

  // Accordion Mobile dengan delay tutup
  var handleAccordion = function handleAccordion() {
    if (window.matchMedia("(max-width: ".concat(accordionBreakpoint, "px)")).matches) {
      // Hide all nav__list
      $(listSelector).each(function () {
        $(this).slideUp(0);
      });
      $(titleSelector).removeClass('is-active');
      $(rowSelector).removeClass('active');
      $(titleSelector).off('click.footerAccordion').on('click.footerAccordion', function () {
        var $title = $(this);
        var $list = $title.nextAll(listSelector).first();
        var $row = $title.closest(rowSelector);
        var isOpen = $list.is(':visible');
        if (isOpen) {
          $row.removeClass('active');
          setTimeout(function () {
            $title.removeClass('is-active');
            $list.slideUp(300);
          }, outTransitionDelay);
          return;
        }

        // Tutup semua list lain
        $(listSelector).each(function () {
          var $otherList = $(this);
          if ($otherList.is(':visible')) {
            var $otherTitle = $otherList.prevAll(titleSelector).first();
            var $otherRow = $otherList.closest(rowSelector);
            $otherTitle.removeClass('is-active');
            $otherRow.removeClass('active');
            setTimeout(function () {
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
  var handleAccordionDesktop = function handleAccordionDesktop() {
    if ($(window).width() > accordionBreakpoint) {
      $(listSelector).removeAttr('style');
      $(titleSelector).removeClass('is-active');
      $(rowSelector).removeClass('active');
      $(titleSelector).off('click.footerAccordion');
    }
  };
  var init = function init() {
    if ($(footerSelector).length) {
      setTimeout(function () {
        handleFooterSticky();
        handleAccordion();
        handleAccordionDesktop();
      }, 100);
      $(window).on('resize.footer', function () {
        handleFooterSticky();
        handleAccordion();
        handleAccordionDesktop();
      });
    }
  };
  return {
    init: init,
    handleFooterSticky: handleFooterSticky,
    handleAccordionDesktop: handleAccordionDesktop
  };
}();
var _default = exports.default = Footer;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WindowScroll = _interopRequireDefault(require("../../_core/scripts/utilities/WindowScroll"));
var _Scrolllable = _interopRequireDefault(require("../../_core/scripts/utilities/Scrolllable"));
var _WindowResize = _interopRequireDefault(require("../../_core/scripts/utilities/WindowResize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* ------------------------------------------------------------------------------
@name: Header
@description: Header
--------------------------------------------------------------------------------- */

var Header = function () {
  var MOBILE_BREAKPOINT = 992;
  var DESKTOP_HOVER_BREAKPOINT = 1200;
  var NAV_CONTENT_OUT_DURATION = 320;
  var NAV_WRAPPER_OUT_DURATION = 420;
  var $headerHeight = $('.header').length ? $('.header').height() : 0;
  var closeContentTO;
  var closeWrapperTO;
  var clearCloseTimers = function clearCloseTimers() {
    if (closeContentTO) {
      clearTimeout(closeContentTO);
      closeContentTO = null;
    }
    if (closeWrapperTO) {
      clearTimeout(closeWrapperTO);
      closeWrapperTO = null;
    }
  };
  var isMobile = function isMobile() {
    return $(window).width() < MOBILE_BREAKPOINT;
  };
  var clearSubmenuState = function clearSubmenuState() {
    var $items = $('.header .header__main-nav__item--has-sub');
    $items.removeClass('expanded is-active header__main-nav__item--active');
    $items.find('.header__submenu').stop(true, true).removeAttr('style');
  };
  var openMenu = function openMenu() {
    clearCloseTimers();
    $('body').removeClass('nav--closing nav--collapsing').addClass('show--nav');
    _Scrolllable.default.disable();
  };
  var closeMenu = function closeMenu() {
    var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!$('body').hasClass('show--nav') && !$('body').hasClass('nav--closing') && !$('body').hasClass('nav--collapsing')) return;
    clearCloseTimers();
    $('body').removeClass('show--nav nav--collapsing').addClass('nav--closing');
    _Scrolllable.default.enable();
    clearSubmenuState();
    if (immediate) {
      $('body').removeClass('show--nav nav--closing nav--collapsing');
      return;
    }
    closeContentTO = setTimeout(function () {
      $('body').removeClass('nav--closing').addClass('nav--collapsing');
    }, NAV_CONTENT_OUT_DURATION);
    closeWrapperTO = setTimeout(function () {
      $('body').removeClass('nav--collapsing');
      clearCloseTimers();
    }, NAV_CONTENT_OUT_DURATION + NAV_WRAPPER_OUT_DURATION);
  };

  // - handleToggleMenu
  var handleToggleMenu = function handleToggleMenu() {
    $('.js-toggle-menu').off('click.header').on('click.header', function (e) {
      if ($('body').hasClass('show--nav')) {
        closeMenu();
      } else {
        openMenu();
      }
      e.stopPropagation();
    });
    $(document).off('keyup.header').on('keyup.header', function (e) {
      if (e.which === 27) {
        closeMenu();
      }
    });
  };

  // - handleHoverSubMenu
  var handleHoverSubMenu = function handleHoverSubMenu() {
    var $items = $('.header .header__main-nav__item--has-sub');
    $items.off('mouseenter.headerSub mouseleave.headerSub').on('mouseenter.headerSub', function (e) {
      if ($(window).width() > DESKTOP_HOVER_BREAKPOINT) {
        var $this = $(e.currentTarget);
        $this.addClass('expanded');
      }
    }).on('mouseleave.headerSub', function (e) {
      if ($(window).width() > DESKTOP_HOVER_BREAKPOINT) {
        var $this = $(e.currentTarget);
        $this.removeClass('expanded');
      }
    });

    // Tablet click behavior (without slide accordion)
    $items.off('click.headerTablet').on('click.headerTablet', function (e) {
      if ($(window).width() >= MOBILE_BREAKPOINT && $(window).width() <= DESKTOP_HOVER_BREAKPOINT) {
        var $this = $(e.currentTarget);
        $this.addClass('expanded');
      }
    });
  };

  // - handleMobileAccordion
  var handleMobileAccordion = function handleMobileAccordion() {
    $(document).off('click.headerAccordion', '.header .header__main-nav__item--has-sub > .header__main-nav__link').on('click.headerAccordion', '.header .header__main-nav__item--has-sub > .header__main-nav__link', function (e) {
      if (!isMobile()) return;
      e.preventDefault();
      e.stopPropagation();
      var $item = $(e.currentTarget).closest('.header__main-nav__item--has-sub');
      var $submenu = $item.find('> .header__submenu');
      var isOpen = $item.hasClass('expanded');
      var $siblings = $item.siblings('.header__main-nav__item--has-sub');
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
  var handleScroll = function handleScroll() {
    // --- Scrolled > $headerHeight
    if (_WindowScroll.default.top() > $headerHeight / 4) {
      if (!$('body').hasClass('window--scrolled')) {
        $('body').addClass('window--scrolled');
      }
    } else {
      // --- Scrolled < $headerHeight
      $('body').removeClass('window--scrolled');
    }
  };
  var handleResize = function handleResize() {
    $headerHeight = $('.header').height() || 0;
    if (!isMobile()) {
      closeMenu(true);
      clearSubmenuState();
    }
  };

  // - init
  var init = function init() {
    if (!$('.header').length) return;
    handleHoverSubMenu();
    handleMobileAccordion();
    handleToggleMenu();
    handleScroll();
    _WindowScroll.default.run(handleScroll);
    _WindowResize.default.resize(handleResize);
  };
  return {
    init: init
  };
}();
var _default = exports.default = Header;

},{"../../_core/scripts/utilities/Scrolllable":3,"../../_core/scripts/utilities/WindowResize":6,"../../_core/scripts/utilities/WindowScroll":7}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: HeroBanner
@description: HeroBanner
--------------------------------------------------------------------------------- */

var HeroBanner = function () {
  var $selector = $('.js-hero-banner');
  var $itemLength = $('.js-hero-banner .hero-banner__item').length;
  var caretMarkup = "\n  <span class=\"mouse-caret-group\">\n    <i class=\"sr sr-caret-down bounce-caret\"></i>\n    <i class=\"sr sr-caret-down bounce-caret bounce-delay\"></i>\n  </span>\n";

  // - handleRunCarousel
  var handleRunCarousel = function handleRunCarousel() {
    if ($selector.hasClass('owl-carousel')) {
      // destroy carousel
      $selector.owlCarousel('destroy');
    }
    $('.hero-banner__mouse--single').remove();

    // init carousel
    if ($itemLength > 1) {
      // --- init carousel
      $selector.addClass('owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        rewind: true,
        touchDrag: true,
        nav: false,
        mouseDrag: true,
        pullDrag: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        smartSpeed: 1250,
        animateOut: 'fadeOut',
        onInitialized: function onInitialized(e) {
          // 1. Wrap owl-dots: .container > .container-dots > .owl-dots
          $(e.target).find('.owl-dots').wrap('<div class="container"><div class="container-dots"></div></div>');

          // 2. Lalu select .container-dots dan wrap isinya pakai .container-dots-wrapp
          var $containerDots = $(e.target).find('.owl-dots').closest('.container-dots');
          $containerDots.children().wrapAll('<div class="container-dots-wrapp"></div>');

          // 3. Select .container-dots-wrapp (anak langsung .container-dots), lalu prepend mouse
          var $containerDotsWrapp = $containerDots.find('.container-dots-wrapp');
          $containerDotsWrapp.prepend("<div class='hero-banner__mouse js-hero-mouse' tabindex='0' role='button'>\n            <img src='assets/img/logo/mouse.png' alt='mouse' />\n              ".concat(caretMarkup, "\n            </div>"));

          // SISANYA TETAP
          $(e.target).find('.owl-dot').removeClass('active');
          var showDotTO = setTimeout(function () {
            $(e.target).find('.owl-dots').addClass('owl-dots--show');
            clearTimeout(showDotTO);
          }, 100);
          var showDotActive = setTimeout(function () {
            $(e.target).find('.owl-dot:nth-child(1)').addClass('active');
            clearTimeout(showDotActive);
          }, 500);
          $(e.target).find('.owl-item:not(.cloned) .hero-banner__item').each(function (i, s) {
            var text = $(s).data('indicator');
            var number = String(i + 1).padStart(2);
            $(e.target).find(".owl-dot:nth-child(".concat(i + 1, ")")).prepend("<span class=\"dot-text\">\n                  <span class=\"dot-number\">".concat(number, "</span>\n                  <span class=\"dot-label\">").concat(text, "</span>\n                </span>\n                <span class=\"dot-bar\"></span>"));
          });
        }
      });
    } else {
      $selector.addClass('hero-banner--single');
      // Keep single mouse inside hero banner area (no extra block below section)
      if (!$('.hero-banner__mouse--single').length) {
        $selector.closest('.hero-banner').append("<div class='hero-banner__mouse hero-banner__mouse--single js-hero-mouse' tabindex='0' role='button'><img src='assets/img/logo/mouse.png' alt='mouse' />".concat(caretMarkup, "</div>"));
      }
    }
  };
  var scrollToNextSection = function scrollToNextSection() {
    var $next = $('.hero-banner').next();
    var headerHeight = $('.header').outerHeight() || 0;
    if ($next.length) {
      var targetPosition = $next.offset().top - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };
  $(document).on('click', '.js-hero-mouse', function (e) {
    e.preventDefault();
    scrollToNextSection();
  });
  $(document).on('keypress', '.js-hero-mouse', function (e) {
    // Akses keyboard (Enter/Space)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToNextSection();
    }
  });

  // - init
  var init = function init() {
    if (!$selector.length) return;
    setTimeout(function () {
      handleRunCarousel();
    }, 200);
  };
  return {
    init: init
  };
}();
var _default = exports.default = HeroBanner;

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: MilestonesSection
@description: MilestonesSection
--------------------------------------------------------------------------------- */

var MilestonesSection = function () {
  var $carousel = $('.js-milestones-carousel');
  var $timelineDots = $('.milestones__timeline-dot');
  var $timelineList = $('.milestones__timeline-list');
  var $wrap = $('.milestones__wrapp');
  var itemCount = $carousel.find('.milestones__item').length;
  var DOT_GAP_INACTIVE = 112;
  var DOT_GAP_INACTIVE_MEDIUM = 72;
  var DOT_GAP_ACTIVE_MEDIUM = 136;
  var SLIDE_SPEED = 1000;
  var FADE_SPEED = 900;
  var previousMediumMode = null;
  var isMediumLayout = function isMediumLayout() {
    if (!$wrap.length) return false;
    var mediumFlag = window.getComputedStyle($wrap.get(0)).getPropertyValue('--is-medium-layout').trim();
    return mediumFlag === '1';
  };
  var getActiveIndex = function getActiveIndex() {
    var activeIdx = $timelineDots.index($timelineDots.filter('.is-active').first());
    return activeIdx > -1 ? activeIdx : 0;
  };
  var getActiveGap = function getActiveGap() {
    var $activeItem = $carousel.find('.owl-item.active .milestones__item').first();
    var $fallbackItem = $carousel.find('.milestones__item').first();
    var itemWidth = ($activeItem.length ? $activeItem : $fallbackItem).outerWidth() || 792;
    return Math.max(Math.round(itemWidth), DOT_GAP_INACTIVE);
  };
  var getActiveItemHeight = function getActiveItemHeight() {
    var $activeItem = $carousel.find('.owl-item.active .milestones__item').first();
    var $fallbackItem = $carousel.find('.milestones__item').first();
    return ($activeItem.length ? $activeItem : $fallbackItem).outerHeight() || 0;
  };
  var updateTimelineLayout = function updateTimelineLayout(activeIdx) {
    if (!$timelineList.length || !$timelineDots.length) return;
    var mediumMode = isMediumLayout();
    var activeGap = mediumMode ? DOT_GAP_ACTIVE_MEDIUM : getActiveGap();
    var inactiveGap = mediumMode ? DOT_GAP_INACTIVE_MEDIUM : DOT_GAP_INACTIVE;
    var dotPositions = [];
    var activeItemHeight = getActiveItemHeight();
    for (var i = 0; i < $timelineDots.length; i += 1) {
      if (i === 0) {
        dotPositions.push(0);
      } else {
        var prevGap = i - 1 === activeIdx ? activeGap : inactiveGap;
        dotPositions.push(dotPositions[i - 1] + prevGap);
      }
    }
    if (mediumMode) {
      var maxDotOffset = Math.max(activeItemHeight - 12, 0);
      var rawTotal = dotPositions.length > 1 ? dotPositions[dotPositions.length - 1] : 0;
      var scale = rawTotal > 0 ? maxDotOffset / rawTotal : 0;
      for (var _i = 0; _i < $timelineDots.length; _i += 1) {
        var scaledPos = Math.round(dotPositions[_i] * scale);
        $timelineDots.eq(_i).css('--dot-y', "".concat(scaledPos, "px"));
        $timelineDots.eq(_i).css('--dot-x', '0px');
      }
    } else {
      for (var _i2 = 0; _i2 < $timelineDots.length; _i2 += 1) {
        $timelineDots.eq(_i2).css('--dot-x', "".concat(dotPositions[_i2], "px"));
        $timelineDots.eq(_i2).css('--dot-y', '0px');
      }
    }
    var lineSize = mediumMode ? Math.max(activeItemHeight - 12, 0) : dotPositions.length > 1 ? dotPositions[dotPositions.length - 1] : 0;
    $timelineList.css('--timeline-line-size', "".concat(lineSize, "px"));
    $timelineList.css('--timeline-height', "".concat(activeItemHeight, "px"));
    $timelineList.css('--timeline-shift', '0px');
  };
  var setActiveDot = function setActiveDot(idx) {
    $timelineDots.removeClass('is-active');
    $timelineDots.eq(idx).addClass('is-active');
    updateTimelineLayout(idx);
  };

  // Inisialisasi carousel
  var handleRunCarousel = function handleRunCarousel() {
    var mediumMode = isMediumLayout();
    var useFadeTransition = true;
    if ($carousel.hasClass('owl-carousel')) {
      $carousel.owlCarousel('destroy');
    }
    if (itemCount > 1) {
      $carousel.addClass('owl-carousel').owlCarousel({
        items: 1,
        loop: false,
        touchDrag: !useFadeTransition && !mediumMode,
        mouseDrag: !useFadeTransition && !mediumMode,
        pullDrag: !useFadeTransition && !mediumMode,
        freeDrag: false,
        dots: false,
        nav: false,
        rewind: false,
        autoplay: false,
        smartSpeed: useFadeTransition ? FADE_SPEED : SLIDE_SPEED,
        dragEndSpeed: useFadeTransition ? FADE_SPEED : SLIDE_SPEED,
        animateOut: useFadeTransition ? 'fadeOut' : false,
        animateIn: useFadeTransition ? 'fadeIn' : false,
        onChanged: function onChanged(e) {
          // Sinkronkan Dot Timeline Saat Slide Berubah
          var idx = Math.max(0, Math.min(e.item.index, itemCount - 1));
          setActiveDot(idx);
        }
      });
    }
    previousMediumMode = mediumMode;
    updateTimelineLayout(getActiveIndex());
  };

  // Klik dot pindahkan slide
  $(document).on('click', '.milestones__timeline-dot', function () {
    var idx = Number($(this).data('index'));
    if (!$carousel.hasClass('owl-loaded')) return;
    var clickSpeed = FADE_SPEED;
    $carousel.trigger('to.owl.carousel', [idx, clickSpeed, false]);
    setActiveDot(idx);
  });
  $(window).on('resize', function () {
    var mediumMode = isMediumLayout();
    if (previousMediumMode !== null && previousMediumMode !== mediumMode) {
      handleRunCarousel();
      return;
    }
    updateTimelineLayout(getActiveIndex());
  });

  // Init
  var init = function init() {
    if (!$carousel.length) return;
    setTimeout(function () {
      handleRunCarousel();
    }, 100);
  };
  return {
    init: init
  };
}();
var _default = exports.default = MilestonesSection;

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WindowScroll = _interopRequireDefault(require("../../../_core/scripts/utilities/WindowScroll"));
var _WindowResize = _interopRequireDefault(require("../../../_core/scripts/utilities/WindowResize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /* ------------------------------------------------------------------------------
@name: ContentTransition
@description: ContentTransition
--------------------------------------------------------------------------------- */
var ContentTransition = function () {
  var $scaleHeight = $(window).width() < 992 ? 1.05 : 0.95;
  console.log('content transition');

  // - handlePositionCheck
  var handlePositionCheck = function handlePositionCheck() {
    $('.content-transition').each(function (idx, el) {
      var $elementTop = $(el).offset().top;
      var $viewportTop = _WindowScroll.default.top();
      var $viewportBottom = $viewportTop + $scaleHeight * $(window).height();
      if ($elementTop <= $viewportBottom) {
        $(el).addClass('visible');
      } else {
        $(el).removeClass('visible');
      }
    });
  };

  // - handleScrollContentTransition
  var handleScrollContentTransition = function handleScrollContentTransition() {
    var contentList = [
    // -- home page
    '.hero-banner', '.businesses__head', '.businesses__body', '.about-us__content', '.section-header', '.news-card', '.career-section__content', '.csr-section__content__head', '.csr-section__content__body', '.csr-section__slide', '.milestones__wrapp',
    // - About Us
    '.about-highlight__content', '.about-highlight__image', '.about-legacy__top', '.about-legacy__video ', '.about-legacy__text ', '.about-vm__content__card', '.about-cv__content', '.about-cv__image', '.about-team__subtitle', '.about-team__title', '.about-team__card', '.about-bs__subtitle', '.about-bs__title', '.about-bs__desc', '.about-be__title', '.about-be__desc', '.about-be__item',
    // Privacy Policy
    '.privacy-policy__head', '.privacy-policy__content', '.contact-acd__item',
    // Contact Us
    '.contact-form__text', '.contact-form__input',
    // Awards
    '.awards-banner__text', '.awards-banner__image', '.awards-banner__desc--mobile', '.filter', '.awards-card',
    // Milestones
    '.milestones-pc__item',
    // CSR
    '.csr-content__head__left', '.csr-content__head__right', '.csr-content__card', '.pagination', '.csr-details__head', '.csr-details__banner', '.csr-details__content-wr', '.csr-details__content-text', '.csr-details__recomendation-head',
    // News
    '.news-banner__large', '.news-banner__small-item', '.news-list__title', '.news-item', '.news-details__head', '.news-details__banner', '.news-details__content-text', '.news-details__content-top', '.news-details__content__latest-label', '.news-details__content__latest-item', '.news-details__recomendation-head',
    // - Not Found
    '.not-found__inner',
    // - Businesses
    '.businesses-key__head', '.businesses-key__body', '.businesses-ovw__img', '.businesses-ovw__text', '.businesses-why__head', '.businesses-why__body', '.businesses-about__head', '.businesses-about__body'].concat(_toConsumableArray($('.businesses-value--agri').length > 0 || $('.businesses-value--amindo-wana-persada').length > 0 || $('.businesses-value--investidea-ventures').length > 0 || $('.businesses-value--sele-ingredients').length > 0 ? ['.businesses-value__content', '.businesses-value__list', '.businesses-value__img'] : ['.businesses-value__img', '.businesses-value__head', '.businesses-value__body']), ['.businesses-vm__list',
    // - Belida
    '.belida-core__head', '.belida-core__body',
    // - Sejati
    '.sejati-num__head', '.sejati-num__body',
    // - Aryasatya
    '.aryasatya-ovw__text', '.aryasatya-ovw__content', '.businesses-res__head', '.businesses-res__body', '.aryasatya-impact__head', '.aryasatya-impact__body', '.businesses-commit__text',
    // - Mining Why
    '.mining-why__head', '.mining-why__body',
    // - Career
    '.career-mosaic__item', '.career-mosaic-subtitle', '.career-mosaic-title', '.career-cp__media', '.career-cp__subtitle', '.career-cp__title', '.career-cp__desc', '.career-cp__item', '.career-list__title', '.career-list__empty-img', '.career-list__empty-title', '.career-list__empty-desc', '.career-list__item',
    // - Businesses HSE
    '.businesses-hse__head', '.businesses-hse__body',
    // - Under Construction
    '.under-construction__inner',
    // - Sele Principals
    '.businesses-principal__head', '.businesses-principal__body',
    // - Sele Portofolio
    '.businesses-portofolio__head', '.businesses-portofolio__body',
    // - Sele Team
    '.businesses-team__head', '.businesses-team__body']);
    $.each(contentList, function (idx, el) {
      $(el).addClass('content-transition');
    });
    _WindowScroll.default.run(handlePositionCheck);
  };

  // - handlePageTransition
  var handleLeavePage = function handleLeavePage() {
    $('a').on('click', function (e) {
      var $this = $(e.currentTarget);
      var $href = $this.attr('href');
      var $target = $this.attr('target');
      var isHeaderSubTrigger = $this.closest('.header__main-nav__item--has-sub, .header__nav__item--has-sub').length > 0;
      if (!isHeaderSubTrigger) {
        if ($href && !$target) {
          if ($('.header .header__nav__item--has-sub').hasClass('expanded')) {
            $('.header .header__nav__item--has-sub').removeClass('expanded');
          }
          if ($href && !$href.includes('#')) {
            // 👉 simpan penanda sebelum pindah halaman
            sessionStorage.setItem('fromPageLeave', 'true');
            $('body').addClass('page--leave');
            var locationHrefTO = setTimeout(function () {
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
  var handleShowBackToTop = function handleShowBackToTop() {
    if (!$('.js-main-site').height() > $(window).height() * 2) return;
    var $viewportTop = _WindowScroll.default.top();
    var $elementStart = $(window).height() * 1.5;
    var $elementChangeColor = $('.footer').offset().top;
    var $viewportBottom = $viewportTop + $(window).height();
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
  var handleBackToTop = function handleBackToTop() {
    $('.js-back-to-top').on('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // - handlePageEnter
  var handlePageEnter = function handlePageEnter() {
    // Cek apakah datang dari transisi page-leave
    var fromLeave = sessionStorage.getItem('fromPageLeave');
    sessionStorage.removeItem('fromPageLeave');

    // Kalau dari page-leave, skip animasi masuk overlay
    if (fromLeave) return;

    // Kalau bukan dari transisi (misalnya first load / reload)
    $('body').removeClass('page--leave');
    $('body').addClass('page--enter');
    var pageEnterTO = setTimeout(function () {
      $('body').removeClass('page--enter');
      clearTimeout(pageEnterTO);
    }, 700);
  };

  // - init
  var init = function init() {
    if (!$('.main-site').length) return;
    handlePageEnter();
    handleScrollContentTransition();
    handleLeavePage();
    handleBackToTop();
    var HPCTO = setTimeout(function () {
      handlePositionCheck();
      clearTimeout(HPCTO);
    }, 50);
    _WindowResize.default.resize(handlePositionCheck);
    _WindowScroll.default.run(handleShowBackToTop);
  };
  return {
    init: init
  };
}();
var _default = exports.default = ContentTransition;

},{"../../../_core/scripts/utilities/WindowResize":6,"../../../_core/scripts/utilities/WindowScroll":7}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utilities = require("../../../_core/scripts/utilities");
/* ---------------------------------------------------------
@name: FormControl
@description : FormControl
---------------------------------------------------------- */

// --- utilities

var FormControl = function () {
  // -  Selectors & class helpers
  var CONTROL = '.form-control';
  var INPUT = '.form-control__input';
  var FOCUSED_CLASS = 'focused';
  var SELECT_CLASS = 'show-select';
  var SELECT_BTN = '.form-control__select__btn';
  var SELECT_CLOSE_BTN = '.form-control__select__close';
  var SELECT_ITEM = '.form-control__select__item';
  var SELECTED_ITEM = 'form-control__select__item--selected';
  var APPLY_BTN = '.form-control__apply';
  var GROUPED_FILTER = '.filter--grouped';
  var GROUPED_TRIGGER = '.filter__mobile-trigger';
  var GROUPED_CLOSE = '.filter__panel__close';
  var GROUPED_APPLY = '.filter__panel__apply';
  var GROUPED_ITEM = '.filter__group__item';
  var renderSelectButtonContent = function renderSelectButtonContent($btn, text) {
    var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var safeText = text || '';
    if (icon) {
      $btn.html("\n        <i class=\"form-control__select__btn-icon sr sr-".concat(icon, "\"></i>\n        <span class=\"form-control__select__btn-text\">").concat(safeText, "</span>\n      "));
      return;
    }
    $btn.html("<span class=\"form-control__select__btn-text\">".concat(safeText, "</span>"));
  };
  $(function () {
    // ini memastikan semua event di bawah terpasang setelah DOM siap
    $(document).on('click', '.form-control__file-btn', function (e) {
      e.preventDefault();
      var $inputFile = $(this).closest('.form-control__file-wrapper').find('.form-control__input-file');
      $inputFile.click();
    });
    $(document).on('change', '.form-control__input-file', function (e) {
      var file = this.files[0];
      var $input = $(this);
      var $ctrl = $input.closest(CONTROL);
      var $alert = $('#' + $input.attr('data-target'));
      var $chosen = $(this).closest('.form-control__file-wrapper').find('.form-control__file-chosen');
      $chosen.text(file ? file.name : 'Choose file');
      if (file) {
        $ctrl.removeClass('error').addClass(FOCUSED_CLASS);
        $alert.removeClass('error').text('');
      }
    });
  });

  // - handleToggleFocus
  var handleToggleFocus = function handleToggleFocus($ctrl) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    $(CONTROL).each(function (_, e) {
      var _$input$;
      var $this = $(e);
      var $input = $this.find(INPUT);
      var isEmpty = !$input.val();
      var isInvalid = !((_$input$ = $input[0]) !== null && _$input$ !== void 0 && _$input$.checkValidity());
      if (isEmpty || isInvalid) {
        $this.removeClass(FOCUSED_CLASS);
        $this.removeClass(SELECT_CLASS);
      }
    });
    if (state) $ctrl.addClass(FOCUSED_CLASS);
  };

  // - handleSelectButtonLabel
  var handleSelectButtonLabel = function handleSelectButtonLabel($ctrl) {
    var $btn = $ctrl.find(SELECT_BTN);
    var mobileLabel = $btn.attr('data-mobile-label');
    var defaultLabel = $btn.attr('data-default-label');
    var value = $ctrl.find(INPUT).val();
    var hasValue = !!value;
    var $selectedItem = $ctrl.find("".concat(SELECT_ITEM, "[data-value=\"").concat(value, "\"]")).first();
    if ($(window).width() < 768 && mobileLabel) {
      renderSelectButtonContent($btn, mobileLabel);
      return;
    }
    if (hasValue && $selectedItem.length) {
      renderSelectButtonContent($btn, $selectedItem.attr('data-text') || $selectedItem.text().trim(), $selectedItem.attr('data-icon'));
      return;
    }
    if (!hasValue && defaultLabel) {
      renderSelectButtonContent($btn, defaultLabel);
    }
  };

  // - handleSyncSelectButtons
  var handleSyncSelectButtons = function handleSyncSelectButtons() {
    $(CONTROL).each(function (_, el) {
      var $ctrl = $(el);
      if ($ctrl.hasClass('form-control--select')) {
        handleSelectButtonLabel($ctrl);
      }
    });
  };

  // - handleSelectItem
  var handleSelectItem = function handleSelectItem($item) {
    var value = $item.attr('data-value');
    var text = $item.attr('data-text') || $item.text().trim();
    var icon = $item.attr('data-icon');
    var $ctrl = $item.closest(CONTROL);
    var $input = $ctrl.find(INPUT);
    var $btn = $ctrl.find(SELECT_BTN);
    var isMobileApply = $(window).width() < 768 && $ctrl.hasClass('js-filter-select');

    // -- set value
    $input.attr('data-ignore-clear', 'true');
    $input.val(value).trigger('input');
    renderSelectButtonContent($btn, text, icon);

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
      _utilities.Scrolllable.enable();
    }
  };

  // - handleEvents
  var handleEvents = function handleEvents() {
    $(document).on('click', CONTROL, function (e) {
      var $this = $(e.currentTarget);
      handleToggleFocus($this);
      $this.find(INPUT).focus();
      if ($(window).width() < 768) {
        _utilities.Scrolllable.enable();
      }
      e.stopPropagation();
    }).on('click', GROUPED_TRIGGER, function (e) {
      var $filter = $(e.currentTarget).closest('.filter');
      $filter.addClass('show-filters');
      if ($(window).width() < 768) {
        _utilities.Scrolllable.disable();
      }
      e.stopPropagation();
    }).on('click', GROUPED_CLOSE, function (e) {
      $(e.currentTarget).closest('.filter').removeClass('show-filters');
      if ($(window).width() < 768) {
        _utilities.Scrolllable.enable();
      }
      e.stopPropagation();
    }).on('click', GROUPED_APPLY, function (e) {
      var $filter = $(e.currentTarget).closest('.filter');
      $filter.removeClass('show-filters');
      if ($(window).width() < 768) {
        _utilities.Scrolllable.enable();
      }
      $filter.submit();
      e.stopPropagation();
    }).on('click', GROUPED_ITEM, function (e) {
      var $item = $(e.currentTarget);
      var $group = $item.closest('.filter__group');
      var inputId = $group.attr('data-input-id');
      var value = $item.attr('data-value');
      var text = $item.attr('data-text');
      var icon = $item.attr('data-icon');
      var $filter = $item.closest('.filter');
      var $input = $filter.find("#".concat(inputId));
      var $ctrl = $input.closest(CONTROL);
      var $btn = $ctrl.find(SELECT_BTN);
      if (!$input.length) return;
      $input.attr('data-ignore-clear', 'true');
      $input.val(value).trigger('input');
      renderSelectButtonContent($btn, text, icon);
      $ctrl.find(SELECT_ITEM).removeClass(SELECTED_ITEM);
      $ctrl.find("".concat(SELECT_ITEM, "[data-value=\"").concat(value, "\"]")).addClass(SELECTED_ITEM);
      $group.find(GROUPED_ITEM).removeClass('is-selected');
      $item.addClass('is-selected');
      e.stopPropagation();
    }).on('click', function () {
      $(CONTROL).each(function (_, e) {
        var _$input$2;
        var $this = $(e);
        var $input = $this.find(INPUT);
        var isEmpty = !$input.val();
        var isInvalid = !((_$input$2 = $input[0]) !== null && _$input$2 !== void 0 && _$input$2.checkValidity());
        if (isEmpty || isInvalid) {
          $this.removeClass(FOCUSED_CLASS);
          $this.removeClass(SELECT_CLASS);
        } else {
          $this.removeClass(SELECT_CLASS);
        }
      });
    })

    // Keyup Esc to hide select
    .on('keyup', function (e) {
      if (e.which === 27) {
        $(CONTROL).removeClass(SELECT_CLASS);
        if ($(window).width() < 768) {
          _utilities.Scrolllable.enable();
        }
      }
    })

    // Klik item select
    .on('click', SELECT_ITEM, function (e) {
      var $item = $(e.currentTarget);
      handleSelectItem($item);
      e.stopPropagation();
    })

    // Tombol apply (khusus small filter select)
    .on('click', APPLY_BTN, function (e) {
      var $btn = $(e.currentTarget);
      var $ctrl = $btn.closest(CONTROL);
      $ctrl.removeClass(SELECT_CLASS);
      $ctrl.closest('form').submit();
      if ($(window).width() < 768) {
        _utilities.Scrolllable.enable();
      }
      e.stopPropagation();
    })

    // Tombol close di header select box (small)
    .on('click', SELECT_CLOSE_BTN, function (e) {
      var $btn = $(e.currentTarget);
      var $ctrl = $btn.closest(CONTROL);
      $ctrl.removeClass(SELECT_CLASS);
      if ($(window).width() < 768) {
        _utilities.Scrolllable.enable();
      }
      e.stopPropagation();
    })

    // Toggle select
    .on('click', '.form-control__select__btn', function (e) {
      var $btn = $(e.currentTarget);
      var $ctrl = $btn.parents(CONTROL);
      var isOpen = $ctrl.hasClass(SELECT_CLASS);
      $(CONTROL).removeClass(SELECT_CLASS);
      if (!isOpen) {
        $ctrl.addClass(SELECT_CLASS);
        if ($(window).width() < 768) {
          _utilities.Scrolllable.disable();
        }
      } else {
        if ($(window).width() < 768) {
          _utilities.Scrolllable.enable();
        }
      }
      e.stopPropagation();
    });
    $(window).on('resize', handleSyncSelectButtons);
  };

  // - init
  var init = function init() {
    if (!$(CONTROL).length) return;
    handleSyncSelectButtons();
    handleEvents();
  };
  return {
    init: init
  };
}();
var _default = exports.default = FormControl;

},{"../../../_core/scripts/utilities":8}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AboutHighlight", {
  enumerable: true,
  get: function get() {
    return _AboutHighlight.default;
  }
});
Object.defineProperty(exports, "AboutUsSection", {
  enumerable: true,
  get: function get() {
    return _AboutUsSection.default;
  }
});
Object.defineProperty(exports, "Awards", {
  enumerable: true,
  get: function get() {
    return _AwardsSection.default;
  }
});
Object.defineProperty(exports, "AwardsList", {
  enumerable: true,
  get: function get() {
    return _AwardsList.default;
  }
});
Object.defineProperty(exports, "BusinessesHSE", {
  enumerable: true,
  get: function get() {
    return _BusinessesHSE.default;
  }
});
Object.defineProperty(exports, "BusinessesOverview", {
  enumerable: true,
  get: function get() {
    return _BusinessesOverview.default;
  }
});
Object.defineProperty(exports, "BusinessesPortofolio", {
  enumerable: true,
  get: function get() {
    return _BusinessesPortofolio.default;
  }
});
Object.defineProperty(exports, "BusinessesSection", {
  enumerable: true,
  get: function get() {
    return _BusinessesSection.default;
  }
});
Object.defineProperty(exports, "BusinessesTeam", {
  enumerable: true,
  get: function get() {
    return _BusinessesTeam.default;
  }
});
Object.defineProperty(exports, "CareerDetails", {
  enumerable: true,
  get: function get() {
    return _CareerDetails.default;
  }
});
Object.defineProperty(exports, "CareerForm", {
  enumerable: true,
  get: function get() {
    return _CareerForm.default;
  }
});
Object.defineProperty(exports, "CareerList", {
  enumerable: true,
  get: function get() {
    return _CareerList.default;
  }
});
Object.defineProperty(exports, "ContactUsAccordion", {
  enumerable: true,
  get: function get() {
    return _ContactUsAccordion.default;
  }
});
Object.defineProperty(exports, "ContactUsForm", {
  enumerable: true,
  get: function get() {
    return _ContactUsForm.default;
  }
});
Object.defineProperty(exports, "ContentTransition", {
  enumerable: true,
  get: function get() {
    return _ContentTransition.default;
  }
});
Object.defineProperty(exports, "CsrSection", {
  enumerable: true,
  get: function get() {
    return _CsrSection.default;
  }
});
Object.defineProperty(exports, "Footer", {
  enumerable: true,
  get: function get() {
    return _Footer.default;
  }
});
Object.defineProperty(exports, "FormControl", {
  enumerable: true,
  get: function get() {
    return _FormControl.default;
  }
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return _Header.default;
  }
});
Object.defineProperty(exports, "HeroBanner", {
  enumerable: true,
  get: function get() {
    return _Herobanner.default;
  }
});
Object.defineProperty(exports, "MilestonesSection", {
  enumerable: true,
  get: function get() {
    return _MilestonesSection.default;
  }
});
var _ContentTransition = _interopRequireDefault(require("./_Elements/ContentTransition"));
var _Header = _interopRequireDefault(require("./Header"));
var _Footer = _interopRequireDefault(require("./Footer"));
var _Herobanner = _interopRequireDefault(require("./Herobanner"));
var _BusinessesSection = _interopRequireDefault(require("./Businesses/BusinessesSection"));
var _AboutUsSection = _interopRequireDefault(require("./AboutUs/AboutUsSection"));
var _AwardsSection = _interopRequireDefault(require("./Awards/AwardsSection"));
var _MilestonesSection = _interopRequireDefault(require("./Milestones/MilestonesSection"));
var _CsrSection = _interopRequireDefault(require("./Csr/CsrSection"));
var _AboutHighlight = _interopRequireDefault(require("./AboutUs/AboutHighlight"));
var _FormControl = _interopRequireDefault(require("./_Elements/FormControl"));
var _ContactUsForm = _interopRequireDefault(require("./ContactUs/ContactUsForm"));
var _ContactUsAccordion = _interopRequireDefault(require("./ContactUs/ContactUsAccordion"));
var _AwardsList = _interopRequireDefault(require("./Awards/AwardsList"));
var _BusinessesHSE = _interopRequireDefault(require("./Businesses/BusinessesHSE"));
var _BusinessesOverview = _interopRequireDefault(require("./Businesses/BusinessesOverview"));
var _BusinessesPortofolio = _interopRequireDefault(require("./Businesses/BusinessesPortofolio"));
var _BusinessesTeam = _interopRequireDefault(require("./Businesses/BusinessesTeam"));
var _CareerDetails = _interopRequireDefault(require("./Career/CareerDetails"));
var _CareerList = _interopRequireDefault(require("./Career/CareerList"));
var _CareerForm = _interopRequireDefault(require("./Career/CareerForm"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./AboutUs/AboutHighlight":12,"./AboutUs/AboutUsSection":13,"./Awards/AwardsList":14,"./Awards/AwardsSection":15,"./Businesses/BusinessesHSE":16,"./Businesses/BusinessesOverview":17,"./Businesses/BusinessesPortofolio":18,"./Businesses/BusinessesSection":19,"./Businesses/BusinessesTeam":20,"./Career/CareerDetails":21,"./Career/CareerForm":22,"./Career/CareerList":23,"./ContactUs/ContactUsAccordion":24,"./ContactUs/ContactUsForm":25,"./Csr/CsrSection":26,"./Footer":27,"./Header":28,"./Herobanner":29,"./Milestones/MilestonesSection":30,"./_Elements/ContentTransition":31,"./_Elements/FormControl":32}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* ------------------------------------------------------------------------------
@name: Default
@description: Default
--------------------------------------------------------------------------------- */

var Default = function () {
  // - handleSayHello
  var handleSayHello = function handleSayHello() {
    console.log("hello world example template");
  };

  // - init
  var init = function init() {
    handleSayHello();
  };
  return {
    init: init
  };
}();
var _default = exports.default = Default;

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Default", {
  enumerable: true,
  get: function get() {
    return _Default.default;
  }
});
var _Default = _interopRequireDefault(require("./Default"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./Default":34}]},{},[1])

//# sourceMappingURL=maps/app.js.map
