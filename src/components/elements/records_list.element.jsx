import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  getAllEncryptedPasswords,
  deleteEncryptedPassword,
} from "@/services/db.servise";
import DeleteIconlement from "@/components/elements/delete_icon.elment";
import CopyToClipBoardElement from "@/components/elements/copy_clipboard.element";
import { copyToClipboardMethod } from "@/services/base.services";
const copyIcon = "/assets/icons/icons8-clipboard-64.png";
import CONSTANTS from "@/services/constants";

//SECTION Component
const EncryptedPasswordManager = ({ isDarkTheme, mobileDevice }) => {
  const [passwords, setPasswords] = useState([]);
  const cryptedInput = useRef([]);

  //SECTION: LOAD HOOK
  useEffect(() => {
    loadPasswords();
  }, []);

  const copyToClipBoard = (index) => {
    if (!cryptedInput || !cryptedInput?.current) {
      return;
    }
    const selectedRef = { current: cryptedInput.current[index] };
    copyToClipboardMethod(selectedRef);
  };

  const loadPasswords = async () => {
    const allPasswords = await getAllEncryptedPasswords();
    console.log("🚀 ~ loadPasswords ~ allPasswords:", allPasswords);
    setPasswords(allPasswords);
  };

  const handleDelete = async (alias) => {
    await deleteEncryptedPassword(alias);
    loadPasswords();
  };

  return (
    <div>
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
      <div className="">
        <div className="records__list py1 --color-accent border-bottom --border-2x caps">
          <div className="left-align">
            <span>#</span>
          </div>
          <div className="left-align">
            <span>Alias</span>
          </div>
          <div className="center">
            <span>Encrypted String</span>
          </div>
          <div className="right-align">
            <span>Action</span>
          </div>
        </div>
        {passwords.length > 0 ? (
          passwords.map((record, index) => (
            <div className="records__list my2" key={record.alias}>
              <div className="left-align">
                <span>{index + 1}</span>
              </div>
              <span className="left-align">
                <span> {record.alias}</span>
              </span>
              <div className="center">
                <div className="flex__grid --small-gap">
                  <input
                    className="--no_style-input --color-base"
                    ref={(ref) => (cryptedInput.current[index] = ref)}
                    value={record.encryptedString}
                  />
                  <span>...</span>
                  <CopyToClipBoardElement
                    className={`${
                      !mobileDevice ? "cursor-pointer-screen" : ""
                    }`}
                    onClick={() => copyToClipBoard(index)}
                    color={
                      isDarkTheme
                        ? CONSTANTS.dark.colorPrimary
                        : CONSTANTS.light.colorPrimary
                    }
                  />
                </div>
              </div>
              <div>
                <div className="right-align">
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
          <p>No saved passwords found.</p>
        )}
      </div>
    </div>
  );
};

export default EncryptedPasswordManager;
