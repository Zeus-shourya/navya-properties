/* ==========================================================================
   Navya Properties — contact.js
   Property cards link here as contact.html?ref=np-102, so the enquiry arrives
   already saying which listing it is about instead of "the one on your site".

   Runs on DOMContentLoaded rather than at script-eval time: site.js fills the
   type and city dropdowns from data.js in its own DOMContentLoaded handler,
   which was registered first and therefore runs first.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  const field = document.querySelector('#c-ref');
  if (!field) return;

  const ref = new URLSearchParams(location.search).get('ref');
  if (!ref) return;

  const p = (typeof PROPERTIES !== 'undefined') && PROPERTIES.find(x => x.id === ref);
  field.value = p ? p.id.toUpperCase() + ' — ' + p.title : ref;

  /* Pre-set the surrounding fields so the visitor only fills in their name. */
  const set = (sel, val) => {
    const el = document.querySelector(sel);
    if (el && val && Array.from(el.options).some(o => o.value === val)) el.value = val;
  };
  if (p) {
    set('#c-type', p.type);
    set('#c-city', p.city);
    const intent = document.querySelector('#c-intent');
    if (intent) intent.value = 'Buy a property';
  }

  /* Say so on the page, so it does not read as a stray value in a box. */
  const note = document.createElement('p');
  note.className = 'form__note';
  note.style.color = 'var(--brand)';
  note.textContent = p ? 'Enquiring about: ' + p.title : 'Enquiring about listing ' + ref;
  field.closest('.field').appendChild(note);
});
