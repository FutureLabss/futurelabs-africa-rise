/*
 * Instant Lead Responder embed by FutureLabs.
 * Paste on any page:
 *   <div id="fl-lead-form" data-client="your-slug"></div>
 *   <script src="https://futurelabs.africa/lead-form.js" async></script>
 * Optional attributes: data-button="Send message", data-accent="#14130F".
 */
(function () {
  var ENDPOINT = 'https://futurelabs.africa/api/lead-intake';
  var root = document.getElementById('fl-lead-form');
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');

  var client = root.getAttribute('data-client') || '';
  var accent = root.getAttribute('data-accent') || '#14130F';
  var label = root.getAttribute('data-button') || 'Send message';

  var css =
    '.fl-lf{display:grid;gap:12px;max-width:520px;font:15px/1.5 Helvetica,Arial,sans-serif;color:inherit}' +
    '.fl-lf label{display:grid;gap:4px;font-size:13px;font-weight:600}' +
    '.fl-lf input,.fl-lf textarea{font:inherit;padding:11px 12px;border:1px solid #C9C4B8;border-radius:4px;background:#fff;color:#14130F;width:100%;box-sizing:border-box}' +
    '.fl-lf textarea{min-height:110px;resize:vertical}' +
    '.fl-lf button{font:inherit;font-weight:600;padding:12px 20px;border:0;border-radius:4px;color:#fff;cursor:pointer;justify-self:start}' +
    '.fl-lf button[disabled]{opacity:.6;cursor:default}' +
    '.fl-lf .fl-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}' +
    '.fl-lf .fl-msg{margin:0;font-size:14px}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function field(name, text, type, required) {
    var wrap = document.createElement('label');
    wrap.textContent = text;
    var input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    if (type !== 'textarea') input.type = type;
    input.name = name;
    if (required) input.required = true;
    wrap.appendChild(input);
    return wrap;
  }

  var form = document.createElement('form');
  form.className = 'fl-lf';
  form.noValidate = false;
  form.appendChild(field('name', 'Name', 'text', true));
  form.appendChild(field('email', 'Email', 'email', true));
  form.appendChild(field('phone', 'Phone (optional)', 'tel', false));
  form.appendChild(field('message', 'How can we help?', 'textarea', false));

  var hp = document.createElement('div');
  hp.className = 'fl-hp';
  hp.setAttribute('aria-hidden', 'true');
  hp.innerHTML = '<label>Website <input name="website" tabindex="-1" autocomplete="off"></label>';
  form.appendChild(hp);

  var button = document.createElement('button');
  button.type = 'submit';
  button.textContent = label;
  button.style.background = accent;
  form.appendChild(button);

  var msg = document.createElement('p');
  msg.className = 'fl-msg';
  msg.setAttribute('role', 'status');
  form.appendChild(msg);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {
      client: client,
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      message: form.elements.message.value,
      website: form.elements.website.value,
      page: location.href,
    };
    button.disabled = true;
    msg.textContent = 'Sending...';
    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) {
        return r.json().then(function (body) {
          return { ok: r.ok, body: body };
        });
      })
      .then(function (res) {
        if (!res.ok) throw new Error((res.body && res.body.error) || 'Something went wrong.');
        form.reset();
        msg.textContent = 'Thank you. Check your inbox: we have just sent you a reply.';
      })
      .catch(function (err) {
        msg.textContent = err.message || 'Something went wrong. Please try again.';
      })
      .then(function () {
        button.disabled = false;
      });
  });

  root.appendChild(form);
})();
