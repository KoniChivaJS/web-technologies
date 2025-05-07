document.getElementById('signup-tab').addEventListener('click', () => {
    document.getElementById('signup-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('signup-tab').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
  });
  
  document.getElementById('login-tab').addEventListener('click', () => {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('signup-form').classList.remove('active');
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('signup-tab').classList.remove('active');
  });

  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
  
      if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = '👁️';
      } else {
        input.type = 'password';
        icon.textContent = '🙈';
      }
    });
  });
  
  
  
  const cities = {
    Ukraine: ['Kyiv', 'Lviv', 'Odesa'],
    Poland: ['Warsaw', 'Krakow', 'Gdansk']
  };
  
  document.getElementById('country').addEventListener('change', e => {
    const country = e.target.value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = `<option value="">Select city</option>`;
    if (cities[country]) {
      cities[country].forEach(city => {
        citySelect.innerHTML += `<option value="${city}">${city}</option>`;
      });
      citySelect.disabled = false;
    } else {
      citySelect.disabled = true;
    }
  });
  
  document.getElementById('signup-form').addEventListener('submit', e => {
    e.preventDefault();
    const firstName = validateText('firstName', 3, 15);
    const lastName = validateText('lastName', 3, 15);
    const email = validateEmail('email');
    const password = validatePassword('password');
    const confirm = matchPasswords('password', 'confirmPassword');
    const phone = validatePhone('phone');
    const dob = validateDOB('dob');
    const sex = validateSelect('sex');
    const country = validateSelect('country');
    const city = validateSelect('city');
  
    if (firstName && lastName && email && password && confirm && phone && dob && sex && country && city) {
      document.getElementById('signup-message').innerText = "Registered successfully!";
      e.target.reset();
      e.target.querySelectorAll('input, select').forEach(i => {
        i.classList.remove('valid', 'invalid');
      });
    }
  });
  
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const username = validateRequired('loginUsername');
    const password = validatePassword('loginPassword');
    if (username && password) {
      document.getElementById('login-message').innerText = "Logged in successfully!";
    }
  });
  
  // --- Validation functions ---
  
  function validateText(id, min, max) {
    const input = document.getElementById(id);
    const val = input.value.trim();
    if (val.length >= min && val.length <= max) {
      markValid(input);
      return true;
    }
    markInvalid(input);
    return false;
  }
  
  function validateEmail(id) {
    const input = document.getElementById(id);
    const re = /^[\w.-]+@[\w.-]+\.\w+$/;
    if (re.test(input.value)) {
      markValid(input);
      return true;
    }
    markInvalid(input);
    return false;
  }
  
  function validatePassword(id) {
    const input = document.getElementById(id);
    if (input.value.length >= 6) {
      markValid(input);
      return true;
    }
    markInvalid(input);
    return false;
  }
  
  function matchPasswords(p1, p2) {
    const i1 = document.getElementById(p1);
    const i2 = document.getElementById(p2);
    if (i1.value === i2.value && i1.value.length >= 6) {
      markValid(i2);
      return true;
    }
    markInvalid(i2);
    return false;
  }
  
  function validatePhone(id) {
    const input = document.getElementById(id);
    const re = /^\+380\d{9}$/;
    if (re.test(input.value)) {
      markValid(input);
      return true;
    }
    markInvalid(input);
    return false;
  }
  
  function validateDOB(id) {
    const input = document.getElementById(id);
    const date = new Date(input.value);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    if (date > now || age < 12) {
      markInvalid(input);
      return false;
    }
    markValid(input);
    return true;
  }
  
  function validateSelect(id) {
    const input = document.getElementById(id);
    if (input.value !== "") {
      markValid(input);
      return true;
    }
    markInvalid(input);
    return false;
  }
  
  function validateRequired(id) {
    const input = document.getElementById(id);
    if (input.value.trim() !== "") {
      markValid(input);
      return true;
    }
    markInvalid(input);
    return false;
  }
  
  function markValid(input) {
    input.classList.remove('invalid');
    input.classList.add('valid');
  }
  
  function markInvalid(input) {
    input.classList.remove('valid');
    input.classList.add('invalid');
  }
  