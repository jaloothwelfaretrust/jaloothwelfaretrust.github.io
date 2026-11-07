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


// Country-aware phone formatting. Client-side checks are format checks, not OTP verification.
(function(){
  const form=document.getElementById('membership-form');
  const country=document.getElementById('jwt-country');
  const national=document.getElementById('jwt-phone-national');
  const full=document.getElementById('jwt-phone-full');
  const prefix=document.getElementById('phone-prefix');
  const help=document.getElementById('phone-help');
  if(!form||!country||!national||!full||!prefix||!help)return;
  const rules={
    'Pakistan':{code:'+92',pattern:/^3\d{9}$/,hint:'Enter 10 digits starting with 3, e.g. 3001234567 (omit leading 0).'},
    'Saudi Arabia':{code:'+966',pattern:/^5\d{8}$/,hint:'Enter 9 digits starting with 5, e.g. 501234567 (omit leading 0).'},
    'United Arab Emirates':{code:'+971',pattern:/^5\d{8}$/,hint:'Enter 9 digits starting with 5, e.g. 501234567 (omit leading 0).'},
    'Oman':{code:'+968',pattern:/^[279]\d{7}$/,hint:'Enter an 8-digit Omani number (Muscat uses Oman +968).'},
    'Germany':{code:'+49',pattern:/^\d{6,13}$/,hint:'Enter 6–13 digits without leading 0 or +49.'},
    'Malta':{code:'+356',pattern:/^[279]\d{7}$/,hint:'Enter an 8-digit Maltese number.'},
    'Italy':{code:'+39',pattern:/^\d{6,12}$/,hint:'Enter 6–12 digits. Italian fixed-line numbers may start with 0.'},
    'Japan':{code:'+81',pattern:/^[1-9]\d{8,9}$/,hint:'Enter 9–10 digits without leading 0 or +81.'},
    'United Kingdom':{code:'+44',pattern:/^\d{9,10}$/,hint:'Enter 9–10 digits without leading 0 or +44.'},
    'United States':{code:'+1',pattern:/^[2-9]\d{2}[2-9]\d{6}$/,hint:'Enter a 10-digit US number, e.g. 2025550123.'},
    'Other':{code:'',pattern:/^\+[1-9]\d{6,14}$/,hint:'Enter your full international number starting with +, e.g. +33123456789.'}
  };
  function update(){
    const rule=rules[country.value];
    prefix.textContent=rule&&rule.code?rule.code:'+';
    prefix.style.display=country.value==='Other'?'none':'';
    national.placeholder=country.value==='Other'?'+33123456789':'Phone number';
    help.textContent=rule?rule.hint:'Select your country first.';
    national.value='';full.value='';national.setCustomValidity('');
  }
  function validate(){
    const rule=rules[country.value];
    const raw=national.value.replace(/[\s()-]/g,'');
    if(!rule){national.setCustomValidity('Select your country.');return false;}
    const ok=rule.pattern.test(raw);
    national.setCustomValidity(ok?'':'Please enter a valid number for '+country.value+'. '+rule.hint);
    full.value=ok?(rule.code?rule.code+raw:raw):'';
    national.closest('.phone-field').classList.toggle('invalid',!ok&&raw.length>0);
    return ok;
  }
  country.addEventListener('change',update);
  national.addEventListener('input',validate);
  form.addEventListener('submit',function(event){if(!validate()){event.preventDefault();national.reportValidity();}});
  update();
})();
