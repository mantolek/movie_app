export const validate = (formData: any) => {
  let result;

  // if empty
  for (const [, value] of Object.entries(formData)) {
    if (value === '') {
      result = false;
    } else {
      result = true;
    }
  }

  // if email ok
  let regex = /^("(?:[!#-[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z^-\u{10FFFF}])*|\[[!-Z^-\u{10FFFF}]*\])$/u
  if(regex.test(formData.email)){
    result = true
  } else {
    result = false;
  }

  // result
  if (result) {
    return true;
  } else {
    return false;
  }
};

