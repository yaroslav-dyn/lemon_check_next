const generateId = () => `id_${Date.now()}`;

// Initialize IndexedDB
export function initializeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("LockBoxDB", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("encryptedPasswords")) {
        const store = db.createObjectStore("encryptedPasswords", {
          keyPath: "id",
        });
        // Create an index on alias with unique constraint to prevent duplicates
        store.createIndex("alias", "alias", { unique: true });
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

  return new Promise((resolve, reject) => {
    // Check if an entry with the given alias already exists
    const aliasCheckRequest = store.index("alias").get(alias);

    aliasCheckRequest.onsuccess = () => {
      if (aliasCheckRequest.result) {
        // Alias already exists
        reject(
           new Error("Alias already exists! Please choose a unique alias.")
        );
      } else {
        // Alias is unique, proceed with adding the record
        const record = { id: generateId(), alias, encryptedString };
        const addRequest = store.add(record);

        addRequest.onsuccess = () => resolve();
        addRequest.onerror = (event) => reject(event.target.error);
      }
    };

    aliasCheckRequest.onerror = (event) => reject(event.target.error);
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

// Retrieve records sorted from newest to oldest
export async function getSortedEncryptedPasswords() {
  const db = await initializeDB();
  const transaction = db.transaction("encryptedPasswords", "readonly");
  const store = transaction.objectStore("encryptedPasswords");
  
  return new Promise((resolve, reject) => {
    const result = [];
    const request = store.openCursor(null, "prev"); // "prev" sorts descending

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        result.push(cursor.value);
        cursor.continue();
      } else {
        resolve(result); // All records retrieved in sorted order
      }
    };
    request.onerror = (event) => reject(event.target.error);
  });
}


export async function deleteEncryptedPassword(id) {
  const db = await initializeDB();
  const transaction = db.transaction(["encryptedPasswords"], "readwrite");
  const store = transaction.objectStore("encryptedPasswords");

  const request = store.delete(id);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
}

//SECTION: Import records from CSV

function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(","); // ['Id', 'Alias', 'Encrypted String']

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index].trim();
      return obj;
    }, {});
  });
}

export async function importRecordsFromCSV(file) {
  const db = await initializeDB();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const csvText = event.target.result;
      const records = parseCSV(csvText);

      const transaction = db.transaction("encryptedPasswords", "readwrite");
      const store = transaction.objectStore("encryptedPasswords");

      for (const record of records) {
        const { Id, Alias, "Encrypted String": EncryptedString } = record;
        const data = { id: Id, alias: Alias, encryptedString: EncryptedString };
        store.put(data); // Add or update the record in the store
      }

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    };

    reader.onerror = () => reject("File reading failed");
    reader.readAsText(file); // Reads the file as text
  });
}


