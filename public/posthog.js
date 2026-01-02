(function(){
  var s = document.currentScript;
  var key = s && s.dataset ? s.dataset.phKey : undefined;
  var host = (s && s.dataset && s.dataset.phHost) || 'https://app.posthog.com';
  if (!key) return;
  (function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split('.');2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement('script')).type='text/javascript',p.async=!0,p.src=host+'/static/array.js',(r=t.getElementsByTagName('script')[0]).parentNode.insertBefore(p,r);var u=e;void 0!==a?u=e[a]=[]:a='posthog',u.people=u.people||[],u.toString=function(t){var e='posthog';return'a'!==t&&(e+=' (stub)'),e},u.people.toString=function(){return u.toString(1)+'.people (stub)'};var c='capture identify alias people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges reset group set_group add_group remove_group register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing debug'.split(' ');for(n=0;n<c.length;n++)g(u,c[n]);e._i.push([i,s,a])},e.__SV=1)})(document,window.posthog||[]);
  posthog.init(key,{api_host:host,capture_pageview:true});
})();


