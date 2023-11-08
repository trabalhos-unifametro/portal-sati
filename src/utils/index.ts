import moment from "moment";

const months: Array<string> = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

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

export const getNameFullMonth = (index: number): string => {
   if (index <= (months.length - 1)) {
      return months[index]
   }
   return ' - '
}

export const isFilled = (field: any): boolean => {
   if (field === null || field === undefined) return false
   if (field === 0) return false
   if (field.trim().length === 0) return false

   return true
}

export const formatDate = (date: any, format="DD/MM/YYYY"): string => {
   return moment(date).format(format)
}

export const formatTelephone = (telephone: string): string => {
   telephone = telephone.replace(/\D/g, "")
   return telephone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")
}

export const capitalize = (str: any): string => {
   if (typeof (str) === "string") {
      return str && str[0].toUpperCase() + str.slice(1).toLowerCase();
   } else {
      return `${str}`
   }
}

export const formatCPF = (v: string): string => {
   v = v.replace(/\D/g, "")

   if (v.length <= 13) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
   }

   return v
}

export const formatPhone = (v: string): string => {
   let r = v.replace(/\D/g, "");
   r = r.replace(/^0/, "");
   if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
   } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
   } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
   } else {
      r = r.replace(/^(\d*)/, "($1");
   }
   return r;
}