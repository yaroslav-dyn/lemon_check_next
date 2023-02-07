
export const copyToClipboardMethod = (element) => {
  const passwordContent = element.current;
  passwordContent.select();
  passwordContent.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(passwordContent.value);
}