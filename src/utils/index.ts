export const emailsIsNotValid = (email: string): boolean => {
   const user: string = email.substring(0, email.indexOf("@"));
   const domain: string = email.substring(email.indexOf("@") + 1, email.length);
   return !((user.length >= 1) &&
     (domain.length >= 3) &&
     (user.search("@") == -1) &&
     (domain.search("@") == -1) &&
     (user.search(" ") == -1) &&
     (domain.search(" ") == -1) &&
     (domain.search(".") != -1) &&
     (domain.indexOf(".") >= 1) &&
     (domain.lastIndexOf(".") < domain.length - 1))
}

export const containsUppercase = (str: string): boolean => /[A-Z]/.test(str)

export const containsLowercase = (str: string): boolean => /[a-z]/.test(str);

export const containsNumbers = (str: string): boolean => /[0-9]/.test(str)

export const containsSpecialChars = (str: string): boolean => /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)