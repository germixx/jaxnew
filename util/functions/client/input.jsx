const sanitizeInput = (name, value, setemail, setpassword, setconfirmpass,setusername) => {

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

const Register = (setloading) => {
  setloading(true);
  
}

const Login = (setloading) => {
  setloading(true);
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