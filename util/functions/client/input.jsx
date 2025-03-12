const sanitizeInput = (name, value, setemail, setpassword, setconfirmpass, setusername) => {

  if (typeof value !== "string") return "";

  switch (name) {

    case "email":

      value = value.trim().toLowerCase(); // Trim spaces & lowercase

      // Allow users to type, but validate only when the input resembles an email
      const emailParts = value.split("@");
      if (emailParts.length > 2) return value.slice(0, -1); // Prevent multiple '@' symbols

      if (emailParts.length === 2) {
        emailParts[1] = emailParts[1].replace(/[^a-zA-Z0-9.-]/g, ""); // Sanitize domain
      }

      setemail(emailParts.join("@"));
      return emailParts.join("@");

    case "username":
      setusername(value.trim().replace(/[^a-zA-Z0-9]/g, ""));
      return value.trim().replace(/[^a-zA-Z0-9]/g, ""); // Only letters & numbers

    case "password":
      setpassword(value.trim());
      return value.trim(); // Allow all characters, just trim spaces

    case "password2":
      setconfirmpass(value.trim());
      return value.trim(); // Allow all characters, just trim spaces

    default:
      return value;
  }
};

const Register = (setloading, username, password, confirmPassword, email, latitude, longitude, cb) => {
  return new Promise((resolve, reject) => {
    setloading(true);
    if (username !== '' && email !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) {
        fetch(`/api/users/register`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password,
            latitude,
            longitude
            // userLocation: location
          })
        }).then(res => res.json())
          .then((json) => {

            if (json.status) {
              resolve(json);
            } else {
              cb(json.errorType, json.errorMessage)
              setloading(false);
              resolve(true)
              return
            }
          })
          .catch(err => {
            throw err

          })
      } else {
        cb('password', 'Passwords do not match.')
        setloading(false);
        return;
      }
    }
  }).catch(e => console.log(e))
}

// Check if the input is an email
const isEmail = (input) => /\S+@\S+\.\S+/.test(input);

// Sanitize email/username input
const sanitizeIdentifier = (input) => {

  let sanitizedInput = input.trim();

  if (isEmail(sanitizedInput)) {
    return sanitizedInput; // Return as-is if it's a valid email
  } else {
    return sanitizedInput.replace(/[^a-zA-Z0-9._-]/g, ""); // Remove everything except allowed chars
  }
};

// Validate password (Allow all symbols but ensure length)
const validatePassword = (input) => input.length >= 8;

const Login = async (e, setloading, identifier, password, cbError, cbSuccess) => {
  e.preventDefault();
  setloading(true);

  const sanitizedIdentifier = sanitizeIdentifier(identifier);
  const isValidPassword = validatePassword(password);

  if (!sanitizedIdentifier || !isValidPassword) {
    alert("Invalid input. Username must not contain '@', and password must be at least 8 characters.");
    return;
  }

  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: sanitizedIdentifier,
      password,
      type: isEmail(sanitizedIdentifier) ? "email" : "username",
    }),
    credentials: 'include',
  });

  const data = await response.json();

  if (data.status) {
    cbSuccess(data)
    return true;
  } else {
    cbError(data.type, data.error);
    return false;
  }

}

const ForgotPassword = (setloading) => {
  setloading(true);
}

module.exports = {
  sanitizeInput,
  Register,
  Login,
  ForgotPassword
}