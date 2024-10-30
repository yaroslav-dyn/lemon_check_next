import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  getAllEncryptedPasswords,
  deleteEncryptedPassword,
} from "@/services/db.servise";
import DeleteIconlement from "@/components/elements/delete_icon.elment";
import CopyToClipBoardElement from "@/components/elements/copy_clipboard.element";
import {
  copyToClipboardMethod,
  jsonToCsv,
  downloadFile,
} from "@/services/base.services";
import { useSnackbar } from "notistack";
import CONSTANTS from "@/services/constants";

//SECTION Component
const EncryptedPasswordManager = ({ isDarkTheme, mobileDevice }) => {
  const [passwords, setPasswords] = useState([]);
  const cryptedInput = useRef([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //SECTION: LOAD HOOK
  useEffect(() => {
    loadPasswords();
  }, []);

  //TODO: DEPRECATED
  // const action = (snackbarId) => (
  //   <>
  //     <button
  //       className="action__btn--text"
  //       onClick={() => {
  //         alert(`I belong to snackbar with id ${snackbarId}`);
  //       }}
  //     >
  //       Undo
  //     </button>
  //     <button
  //       className="action__btn--text"
  //       onClick={() => {
  //         closeSnackbar(snackbarId);
  //       }}
  //     >
  //       Dismiss
  //     </button>
  //   </>
  // );

  const copyToClipBoard = (index) => {
    if (!cryptedInput || !cryptedInput?.current) {
      return;
    }
    enqueueSnackbar("copied to clipboard", {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 1200,
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
    });
    const selectedRef = { current: cryptedInput.current[index] };
    copyToClipboardMethod(selectedRef);
  };

  const loadPasswords = async () => {
    const allPasswords = await getAllEncryptedPasswords();
    console.log("🚀 ~ loadPasswords ~ allPasswords:", allPasswords);
    setPasswords(allPasswords);
  };

  const handleDelete = async (alias) => {
    // enqueueSnackbar(`Delete record: ${alias}`, {
    //   variant: "warning",
    //   preventDuplicate: true,
    //   autoHideDuration: false,
    //   persist: true,
    //   anchorOrigin: { horizontal: "center", vertical: "top" },
    //   action,
    //   onClose: (e) => console.log('closeoo', e)
    // });
    const acceptdeleting = confirm(`You realy wan\'t to delete: ${alias}`);
    if(!acceptdeleting) return
    await deleteEncryptedPassword(alias);
    loadPasswords();
  };

  const saveToFile = () => {
    const dataToFile = passwords;
    const fileContent = jsonToCsv(dataToFile);
    fileContent &&
      downloadFile(fileContent, `records-${Date.now()}` + ".csv", "text/csv");
  };

  return (
    <div className="password_manager__page">
      <div>
        {/* <input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Enter alias"
        />
        <input
          type="text"
          value={encryptedString}
          onChange={(e) => setEncryptedString(e.target.value)}
          placeholder="Enter encrypted password"
        />
        <button onClick={handleSave}>Save Encrypted Password</button> */}
      </div>
      <div className="--color-base border-bottom --border-2x">
        <div className="records__list py1 border-bottom --border-2x caps">
          <div className="left-align --color-accent">
            <span>#</span>
          </div>
          <div className="left-align --color-accent">
            <span>Alias</span>
          </div>
          <div className="center --color-accent">
            <span>Encrypted String</span>
          </div>
          <div className="right-align --color-accent">
            <span>Action</span>
          </div>
        </div>
        {passwords.length > 0 ? (
          passwords.map((record, index) => (
            <div
              className="records__list records__list__body --small-font lato-thin my2"
              key={record.alias}
            >
              <div className="left-align">
                <span>{index + 1}</span>
              </div>
              <span className="left-align">
                <span> {record.alias}</span>
              </span>
              <div className="center">
                <div className="flex__grid --small-gap">
                  <input
                    className="--no_style-input --color-base flex-1 w-100"
                    ref={(ref) => (cryptedInput.current[index] = ref)}
                    defaultValue={record.encryptedString}
                  />
                </div>
              </div>
              <div>
                <div className="right-align flex__grid justify-end">
                  <div onClick={() => copyToClipBoard(index)}>
                    <CopyToClipBoardElement
                      className={`${
                        !mobileDevice ? "cursor-pointer-screen" : ""
                      }`}
                      color={
                        isDarkTheme
                          ? CONSTANTS.dark.colorAccent
                          : CONSTANTS.light.colorAccent
                      }
                    />
                  </div>
                  <button
                    className="action__btn--text --color-primary"
                    onClick={() => handleDelete(record.alias)}
                  >
                    <DeleteIconlement
                      color={
                        isDarkTheme
                          ? CONSTANTS.dark.colorPrimary
                          : CONSTANTS.light.colorPrimary
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="--color-primary center">No saved passwords found.</h2>
        )}
      </div>
      <div className="ps__manager__actions flex__grid justify-end mt3">
        <button
          id="btn"
          className="action__btn --limit-width --primary-btn"
          onClick={() => saveToFile()}
        >
          Save to CSV
        </button>
      </div>
    </div>
  );
};

export default EncryptedPasswordManager;
