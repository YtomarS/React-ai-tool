export function CheckHeading(str){
    return /^(\*)(\*)(.*)\*$/.test(str);   // to check sub-string starting with (**) and end with(*).
  }
export function ReplaceHeadingStars(str){
    return str.replace (/^(\*)(\*)|(\*)$/g,'');
}