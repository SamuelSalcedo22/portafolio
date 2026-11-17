/** Se ejecuta en <head> antes de pintar, para que no parpadee el tema o idioma equivocado. */
export const prefsScript = `(function(){try{var d=document.documentElement;if(localStorage.getItem("theme")==="light")d.dataset.theme="light";if(localStorage.getItem("lang")==="en")d.lang="en";}catch(e){}})();`;
