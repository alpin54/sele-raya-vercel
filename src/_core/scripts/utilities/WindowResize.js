/* ------------------------------------------------------------------------------
@name: Window Resize
@description: Window Resize
--------------------------------------------------------------------------------- */

// --- WindowResize
const WindowResize = (() => {
  let $rtime;
  let $timeout = false;
  let $delta = 200;
  let $lastWindowWidth = 0;
  let $callbackFunction = [];

  // --- handleResize
  const handleResize = (callback) => {
    $callbackFunction.push(callback);
    $(window).resize(() => {
      $rtime = new Date();
      if ($timeout === false) {
        if ($lastWindowWidth !== $(window).width()) {
          $timeout = true;
          $("body").addClass("hold-transition");
          setTimeout(handleResizeEnd(), $delta);
        }
      }
    });
  };

  // --- handleResizeEnd
  const handleResizeEnd = () => {
    if (new Date() - $rtime < $delta) {
      setTimeout(handleResizeEnd, $delta);
    } else {
      $timeout = false;
      // Run Function on Resize end
      $("body").removeClass("hold-transition");
      $lastWindowWidth = $(window).width();
      $.each($callbackFunction, (index, callback) => {
        if (typeof callback === "function") {
          callback();
        }
      });
    }
  };

  // --- return
  return {
    resize: handleResize,
  };
})();

export default WindowResize;
