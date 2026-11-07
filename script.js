const menuButton=document.querySelector('.menu-button');const navigation=document.querySelector('#navigation');menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'✕':'☰'});navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'}));document.querySelector('#year').textContent=new Date().getFullYear();document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);button.textContent='Copied!';setTimeout(()=>button.textContent='Copy',1800)}catch{button.textContent='Select to copy'}}));

// After deploying the Apps Script, paste its /exec URL below.
const JWT_REGISTRATION_ENDPOINT = "";
const jwtForm = document.getElementById('membership-form');
if (jwtForm) {
  const configured = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(JWT_REGISTRATION_ENDPOINT);
  if (configured) {
    jwtForm.action = JWT_REGISTRATION_ENDPOINT;
    document.getElementById('membership-submit').disabled = false;
    document.getElementById('membership-setup').hidden = true;
  }
}
