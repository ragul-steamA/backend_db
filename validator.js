export const validator = (data) => {
  if (
    isNaN(data.id) ||
    typeof data.id == 'undefined' ||
    data.name.length<=0  ||
    typeof data.name == 'undefined' ||
    data.city.length<=0 ||
    typeof data.city == 'undefined'
  ) {
    return { success: false, message: "required feild missing", code: 400 };
  } else if (typeof data.id != "number") {
    return { success: false, message: "invalid format of id", code: 400 };
  } else if (typeof data.name != "string") {
    return { success: false, message: "invalid format of name", code: 400 };
  } else if (typeof data.city != "string") {
    return { success: false, message: "invalid format of city", code: 400 };
  }
  return { success: true, data };
};
