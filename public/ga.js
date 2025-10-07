(function() {
  var s = document.currentScript;
  var gaId = s && s.dataset ? s.dataset.gaId : undefined;
  if (!gaId) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId, { send_page_view: true });
})();
