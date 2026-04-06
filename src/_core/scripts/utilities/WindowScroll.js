/* ------------------------------------------------------------------------------
@name: Window Scroll
@description: Window Scroll
--------------------------------------------------------------------------------- */

// --- WindowScroll
const WindowScroll = (() => {
  let $callbackFunction = [];

  // --- handleScrollTop
  const handleScrollTop = () => {
    return $(window).scrollTop();
  };

  // --- handleScroll
  const handleScroll = (callback) => {
    let $didScroll;
    $callbackFunction.push(callback);

    $(window).scroll(() => {
      $didScroll = true;
      setInterval(() => {
        if ($didScroll) {
          $.each($callbackFunction, (index, callback) => {
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
  const run = (callback) => {
    handleScroll(callback);
  };

  // --- return
  return {
    run,
    top: handleScrollTop,
  };
})();

export default WindowScroll;
