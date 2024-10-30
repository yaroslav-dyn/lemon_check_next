const generateId = () => `id_${Date.now()}`;

// Initialize IndexedDB
export function initializeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("LockBoxDB", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("encryptedPasswords")) {
        db.createObjectStore("encryptedPasswords", { keyPath: "alias" });
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject("Database initialization failed: " + event.target.error);
    };
  });
}

// IndexedDB functions
export async function saveEncryptedPassword(alias, encryptedString) {

  const db = await initializeDB();
  const transaction = db.transaction(["encryptedPasswords"], "readwrite");
  const store = transaction.objectStore("encryptedPasswords");
  const record = { id: generateId(), alias, encryptedString };  
  const request = store.add(record);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
}

export async function getAllEncryptedPasswords() {
  const db = await initializeDB();
  const transaction = db.transaction(["encryptedPasswords"], "readonly");
  const store = transaction.objectStore("encryptedPasswords");

  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export async function deleteEncryptedPassword(alias) {
  const db = await initializeDB();
  const transaction = db.transaction(["encryptedPasswords"], "readwrite");
  const store = transaction.objectStore("encryptedPasswords");

  const request = store.delete(alias);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
}
