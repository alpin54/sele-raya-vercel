/* ------------------------------------------------------------------------------
@name: Default
@description: Default
--------------------------------------------------------------------------------- */

const Default = (() => {
  // - handleSayHello
  const handleSayHello = () => {
    console.log("hello world example template");
  };

  // - init
  const init = () => {
    handleSayHello();
  };

  return {
    init,
  };
})();

export default Default;
