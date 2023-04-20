function validatePhoneNumber(phone: string): boolean {
   const regexPhone = "^\\([0-9]{2}\\)\\-\\(0[0-9]{9}\\)$";
   if(phone.match(regexPhone)) {
      return true;
   } else {
      return false;
   }
}

console.log(validatePhoneNumber("(84)-(0905345555)"))
