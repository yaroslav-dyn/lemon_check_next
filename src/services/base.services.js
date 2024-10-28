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

function isBase64(base64String) {
  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  return base64Regex.test(base64String);
}

export function base64ToImage(base64String, filename) {

  const base64Data = base64String.replace(
    /^data:image\/(png|jpeg|webp);base64,/,
    ""
  );
   
  if (!isBase64(base64Data)) {
    return;
  }
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: "image/png" });

  return blob;

  // Create a download link
  // const link = document.createElement("a");
  // link.href = URL.createObjectURL(blob);
  // link.download = filename || "image.png";
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
}

