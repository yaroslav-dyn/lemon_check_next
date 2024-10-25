export 
const ipRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;

export const copyToClipboardMethod = (element) => {
  const isSupported = navigator.clipboard && navigator.clipboard.writeText;
  if (!element.hasOwnProperty("current"))
    return
    if (isSupported) {
      const passwordContent = element.current;
      passwordContent.select();
      passwordContent.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(passwordContent.value);
    } else {
      document.execCommand("copy", false, element.current.value);
    }
};

export function camelToSentence(camelCaseStr) {
  const result = camelCaseStr
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
  return result.trim();
}

export function snakeToSentence(camelCaseStr) {
  const result = camelCaseStr
    .replace(/_/g, " ")
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase()); 
  return result.trim();
}


export function jsonToCsv(jsonData) {
  let csv = "";

  // Extract headers
  const headers = Object.keys(jsonData[0]);
  const trimedheaders = headers && headers.map(h => {
    return camelToSentence(h)
  })
  console.log("🚀 ~ jsonToCsv ~ headers:", trimedheaders);
  csv += trimedheaders.join(",") + "\n";

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



