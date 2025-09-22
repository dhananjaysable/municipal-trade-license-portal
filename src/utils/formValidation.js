// utils/formValidation.js

// Email validation with multiple checks
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  const checks = {
    isEmpty: !email || email.trim() === '',
    format: emailRegex.test(email),
    length: email.length >= 5 && email.length <= 254,
    hasAtSymbol: email.includes('@'),
    hasDomain: email.includes('.'),
  };

  const isValid = !checks.isEmpty && checks.format && checks.length;
  
  let message = '';
  if (checks.isEmpty) message = 'Email is required';
  else if (!checks.hasAtSymbol) message = 'Email must contain @ symbol';
  else if (!checks.hasDomain) message = 'Email must contain a domain';
  else if (!checks.format) message = 'Please enter a valid email address';
  else if (!checks.length) message = 'Email length must be between 5-254 characters';

  return { isValid, message, checks };
};

// Phone number validation with Indian format
export const validatePhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  const internationalRegex = /^\+91[6-9]\d{9}$/;
  
  const checks = {
    isEmpty: !phone || phone.trim() === '',
    format: indianPhoneRegex.test(cleanPhone) || internationalRegex.test(phone),
    length: cleanPhone.length === 10,
    startsValid: cleanPhone.length > 0 && ['6', '7', '8', '9'].includes(cleanPhone[0]),
  };

  const isValid = !checks.isEmpty && checks.format;
  
  let message = '';
  if (checks.isEmpty) message = 'Phone number is required';
  else if (!checks.length) message = 'Phone number must be 10 digits';
  else if (!checks.startsValid) message = 'Phone number must start with 6, 7, 8, or 9';
  else if (!checks.format) message = 'Please enter a valid Indian phone number';

  return { isValid, message, checks, cleanPhone };
};

// Password validation with strength checking
export const validatePassword = (password) => {
  const checks = {
    isEmpty: !password || password.trim() === '',
    minLength: password.length >= 8,
    maxLength: password.length <= 128,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noSpaces: !/\s/.test(password),
    notCommon: !['password', '123456', 'qwerty', 'admin'].includes(password.toLowerCase()),
  };

  const strength = Object.values(checks).filter(Boolean).length - 1; // Exclude isEmpty
  const isValid = checks.minLength && checks.hasUpperCase && checks.hasLowerCase && checks.hasNumbers && checks.noSpaces;
  
  let message = '';
  if (checks.isEmpty) message = 'Password is required';
  else if (!checks.minLength) message = 'Password must be at least 8 characters';
  else if (!checks.hasUpperCase) message = 'Password must contain uppercase letters';
  else if (!checks.hasLowerCase) message = 'Password must contain lowercase letters';
  else if (!checks.hasNumbers) message = 'Password must contain numbers';
  else if (!checks.noSpaces) message = 'Password cannot contain spaces';
  else if (!checks.notCommon) message = 'Password is too common, choose a stronger one';

  return { isValid, message, checks, strength };
};

// Name validation with Indian names support
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s.'-]+$/;
  const cleanName = name.trim();
  
  const checks = {
    isEmpty: !name || name.trim() === '',
    format: nameRegex.test(cleanName),
    minLength: cleanName.length >= 2,
    maxLength: cleanName.length <= 50,
    noNumbers: !/\d/.test(cleanName),
    validChars: /^[a-zA-Z\s.'-]+$/.test(cleanName),
  };

  const isValid = !checks.isEmpty && checks.format && checks.minLength && checks.maxLength;
  
  let message = '';
  if (checks.isEmpty) message = 'Name is required';
  else if (!checks.minLength) message = 'Name must be at least 2 characters';
  else if (!checks.maxLength) message = 'Name cannot exceed 50 characters';
  else if (!checks.noNumbers) message = 'Name cannot contain numbers';
  else if (!checks.validChars) message = 'Name can only contain letters, spaces, dots, hyphens and apostrophes';

  return { isValid, message, checks, cleanName };
};

// Address validation
export const validateAddress = (address) => {
  const cleanAddress = address.trim();
  
  const checks = {
    isEmpty: !address || address.trim() === '',
    minLength: cleanAddress.length >= 10,
    maxLength: cleanAddress.length <= 200,
    hasLetters: /[a-zA-Z]/.test(cleanAddress),
    hasNumbers: /\d/.test(cleanAddress),
  };

  const isValid = !checks.isEmpty && checks.minLength && checks.maxLength && checks.hasLetters;
  
  let message = '';
  if (checks.isEmpty) message = 'Address is required';
  else if (!checks.minLength) message = 'Address must be at least 10 characters';
  else if (!checks.maxLength) message = 'Address cannot exceed 200 characters';
  else if (!checks.hasLetters) message = 'Address must contain letters';

  return { isValid, message, checks, cleanAddress };
};

// Business name validation
export const validateBusinessName = (businessName) => {
  const cleanName = businessName.trim();
  const businessRegex = /^[a-zA-Z0-9\s&.,'-]+$/;
  
  const checks = {
    isEmpty: !businessName || businessName.trim() === '',
    format: businessRegex.test(cleanName),
    minLength: cleanName.length >= 3,
    maxLength: cleanName.length <= 100,
    hasLetters: /[a-zA-Z]/.test(cleanName),
    validChars: businessRegex.test(cleanName),
  };

  const isValid = !checks.isEmpty && checks.format && checks.minLength && checks.maxLength;
  
  let message = '';
  if (checks.isEmpty) message = 'Business name is required';
  else if (!checks.minLength) message = 'Business name must be at least 3 characters';
  else if (!checks.maxLength) message = 'Business name cannot exceed 100 characters';
  else if (!checks.hasLetters) message = 'Business name must contain letters';
  else if (!checks.validChars) message = 'Business name contains invalid characters';

  return { isValid, message, checks, cleanName };
};

// File validation for document uploads
export const validateFile = (file, maxSize = 5 * 1024 * 1024) => { // 5MB default
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
  
  const fileExtension = file.name.split('.').pop().toLowerCase();
  
  const checks = {
    hasFile: !!file,
    size: file.size <= maxSize,
    type: allowedTypes.includes(file.type),
    extension: allowedExtensions.includes(fileExtension),
    name: file.name.length > 0 && file.name.length <= 255,
  };

  const isValid = checks.hasFile && checks.size && checks.type && checks.extension && checks.name;
  
  let message = '';
  if (!checks.hasFile) message = 'Please select a file';
  else if (!checks.size) message = `File size must be less than ${maxSize / 1024 / 1024}MB`;
  else if (!checks.type || !checks.extension) message = 'Only PDF, JPG, JPEG, PNG files are allowed';
  else if (!checks.name) message = 'File name is invalid';

  return { isValid, message, checks };
};

// Real-time validation hook
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validateField = (name, value) => {
    if (validationRules[name]) {
      const result = validationRules[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: result.isValid ? '' : result.message
      }));
      return result.isValid;
    }
    return true;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, values[name]);
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const result = validationRules[name](values[name] || '');
      if (!result.isValid) {
        newErrors[name] = result.message;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {}));

    return isValid;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    isValid: Object.keys(errors).every(key => !errors[key])
  };
};
