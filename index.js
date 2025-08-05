const getElById = (id) => {
  return document.getElementById(id);
};

const setErrorStyle = (input, errorEl, msg) => {
  if (msg) {
    errorEl.textContent = msg;
    input.classList.add("input-error");
  } else {
    errorEl.textContent = "";
    input.classList.remove("input-error");
  }
};

const registerForm = getElById("registerForm");
const emailError = getElById("emailError");
const passError = getElById("passError");
const confError = getElById("confError");
const email = getElById("email");
const password = getElById("password");
const confirmPassword = getElById("confirmPassword");

const clearError = (input, errorElement) => {
  input.addEventListener("input", () => {
    errorElement.textContent = "";
    input.classList.remove("input-error");
  });
};

clearError(email, emailError);
clearError(password, passError);
clearError(confirmPassword, confError);

email.addEventListener("blur", () => {
  let msg = "";
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email.value.trim()) {
    msg = "please enter email";
  } else if (!emailPattern.test(email.value)) {
    msg = "please enter a valid email";
  }
  setErrorStyle(email, emailError, msg);
});

password.addEventListener("blur", () => {
  let msg = "";
  if (!password.value.trim()) {
    msg = "please enter password";
  } else if (password.value.length < 8) {
    msg = "password must be at least 8 digit";
  } else if (!/[A-Z]/.test(password.value)) {
    msg = "password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(password.value)) {
    msg = "password must contain at least one number";
  }
  setErrorStyle(password, passError, msg);
});
confirmPassword.addEventListener("blur", () => {
  let msg = "";
  if (!confirmPassword.value.trim()) {
    msg = "please confirm the password";
  } else if (password.value !== confirmPassword.value) {
    msg = "the password does not match";
  }
  setErrorStyle(confirmPassword, confError, msg);
});
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  emailError.textContent = "";
  passError.textContent = "";
  confError.textContent = "";
  let hasError = false;

  if (!email.value.trim()) {
    setErrorStyle(email, emailError, "please enter email");
    hasError = true;
  } else if (!emailPattern.test(email.value)) {
    setErrorStyle(email, emailError, "please enter a valid email");
    hasError = true;
  }
  if (!password.value.trim()) {
    setErrorStyle(password, passError, "please enter password");
    hasError = true;
  } else if (password.value.length < 8) {
    setErrorStyle(password, passError, "password must be at least 8 digit");
    hasError = true;
  } else if (!/[A-Z]/.test(password.value)) {
    setErrorStyle(
      password,
      passError,
      "password must contain at least one uppercase letter"
    );
    hasError = true;
  } else if (!/[0-9]/.test(password.value)) {
    setErrorStyle(
      password,
      passError,
      "password must contain at least one number"
    );
    hasError = true;
  } else {
    setErrorStyle(password, passError, "");
  }
  if (!confirmPassword.value.trim()) {
    setErrorStyle(confirmPassword, confError, "please confirm the password");
    hasError = true;
  } else if (password.value !== confirmPassword.value) {
    setErrorStyle(confirmPassword, confError, "the password does not match");
    hasError = true;
  } else {
    setErrorStyle(confirmPassword, confError, "");
  }
  if (!hasError) {
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
  }
});
