export const copyToClipboardMethod = (element) => {
      console.log("vv", element.current.value);
  const isSupported = navigator.clipboard && navigator.clipboard.writeText;
  if (isSupported) {
    const passwordContent = element.current;
    passwordContent.select();
    passwordContent.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(passwordContent.value);
  } else {
    document.execCommand("copy", false, element.current.value);
  }
};
export function jsonToCsv(jsonData) {
  let csv = "";

  // Extract headers
  const headers = Object.keys(jsonData[0]);
  csv += headers.join(",") + "\n";

  // Extract values
  jsonData.forEach((obj) => {
    const values = headers.map((header) => obj[header]);
    csv += values.join(",") + "\n";
  });

  return csv;
}

export function downloadFile(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
