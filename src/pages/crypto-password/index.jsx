import React, { useState, useRef, useMemo, useEffect } from "react";
import Head from "next/head";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  copyToClipboardMethod,
  jsonToCsv,
  downloadFile,
} from "@/services/base.services";
import styles from "@/styles/CryptoPassword.module.css";
import aes, { encrypt } from "crypto-js/aes";
import CryptoJS from "crypto-js";
import useDeviceType from "@/services/useDeviceType";
import UISwitcher from "@/components/ui.switcher";

import EncryptedPasswordManager from "@/components/elements/records_list.element";
import { saveEncryptedPassword } from "@/services/db.servise";

const infoIcon = "/assets/img/icons8-question-mark-48.png";

const defaultFormObject = {
  alias: "",
  sourceText: "",
  secret: "",
  cryptedText: "",
};

const CryptoPassword = (props) => {
  const [modelObject, setModelObject] = useState(defaultFormObject);
  const [actionState, setActionState] = useState("encrypt"); // encrypt | decrypt | list
  const [instr, setInstructionStatus] = useState(false);
  const [instrB, setInstructioBStatus] = useState(false);
  const [instrC, setInstructioCStatus] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const location = usePathname();
  const encryptForm = useRef(null);
  const outTextInput = useRef(null);
  const outTextCrypted = useRef(null);
  const mobileDevice = useDeviceType();
  const isDarkTheme = useMemo(
    () => props.theme === "primary__theme",
    [props.theme]
  );

  const operationOptions = [
    {
      label: "Encrypt",
      value: "encrypt",
      selectedBackgroundColor: !isDarkTheme ? "limegreen" : "#E94E3D",
      fontColor: !isDarkTheme ? "#000" : "#fff",
      selectedFontColor: "#fff",
    },
    {
      label: "Decrypt",
      value: "decrypt",
      selectedBackgroundColor: !isDarkTheme ? "limegreen" : "#E94E3D",
      fontColor: !isDarkTheme ? "#000" : "#fff",
      selectedFontColor: "#fff",
    },
    {
      label: "list",
      value: "list",
      selectedBackgroundColor: !isDarkTheme ? "limegreen" : "#E94E3D",
      fontColor: !isDarkTheme ? "#000" : "#fff",
      selectedFontColor: "#fff",
    },
  ];

  const selectedTypeIndex = useMemo(() => {
    return operationOptions.findIndex(
      (opt) => opt && opt.value === actionState
    );
  }, [actionState]);

  const copyToClipBoard = () => {
    copyToClipboardMethod(
      actionState === "encrypt" ? outTextCrypted : outTextInput
    );
  };

  const clearForm = () => {
    setModelObject(defaultFormObject);
    encryptForm &&
      encryptForm.hasOwnProperty("current") &&
      encryptForm.current.reset();
  };

  const onChangeOperation = (e) => {
    setActionState(e);
    router.replace({ pathname: location, search: `type=${e}` });
    if (actionState !== "list") clearForm();
  };

  const onInputField = (e, field) => {
    const mutatedModel = { ...modelObject };
    mutatedModel[field] = e.target.value;
    if (
      actionState === "encrypt" &&
      (field === "sourceText" ||
        (field === "secret" && e.target.value.length > 0))
    ) {
      (mutatedModel["cryptedText"] = aes
        .encrypt(mutatedModel.sourceText, mutatedModel.secret)
        .toString()),
        outTextCrypted &&
          (outTextCrypted.current.value = mutatedModel.cryptedText);
    } else if (
      actionState === "decrypt" &&
      (field === "cryptedText" || field === "secret")
    ) {
      // if(!mutatedModel.cryptedText || !mutatedModel.secret) {
      //   return
      // }
      const encryptedpasswordObj = aes.decrypt(
        mutatedModel.cryptedText,
        mutatedModel.secret
      );

      outTextInput &&
        (outTextInput.current.value = encryptedpasswordObj.toString(
          CryptoJS.enc.Utf8
        ));
    }

    setModelObject(mutatedModel);
  };

  const triggerInstruction = (type) => {
    let currentState = instr;
    let currentStateb = instrB;
    if (type === "A") {
      setInstructionStatus((currentState = !currentState));
    } else if (type === "B") {
      setInstructioBStatus((currentStateb = !currentStateb));
    }
  };

  const saveToFile = () => {
    const dataToFile = { ...modelObject };
    delete dataToFile.secret;
    delete dataToFile.sourceText;
    const iterableData = [dataToFile];
    const fileContent = jsonToCsv(iterableData);
    fileContent &&
      downloadFile(fileContent, dataToFile.alias + ".csv", "text/csv");
  };

  /**
   * SECTION: SAVE TO DEVICE
   **/
  const saveToDB = async () => {
    const { alias, cryptedText } = modelObject;
    if (alias && cryptedText) {
      await saveEncryptedPassword(alias, cryptedText);
    }
  };

  //SECTION: EFFECTS
  useEffect(() => {
    if (searchParams.has("type")) {
      const sParam = searchParams.get("type");
      setActionState(sParam);
    }
  }, [searchParams]);

  return (
    <>
      <Head>
        <title>
          LockBoxApp | Password encryption - Strong Password Generator &
          Encryption Tools
        </title>
        <meta
          name="description"
          content="Secure your sensitive information with LockBoxApp's password encryption tool. Encrypt your passwords for enhanced security."
        />
        <meta
          name="keywords"
          content="password encryption, encrypt passwords, secure passwords, encrypt password online, password protection, online encryption tool"
        />
      </Head>
      <div className="generator__page">
        <main className="main_content generator__content">
          <div className="main__heading --x-small-bm">
            <h1 className="h1_heading">
              Protect your <span className="--color-primary">password</span>
              <div className="py1 center slogan__text caps">
                {actionState === "list" ? (
                  <span>
                    <span className="--color-primary">Encrypted</span> Password
                    Manager
                  </span>
                ) : (
                  <span>
                    <span className="--color-primary">Encrypte / Decrypt </span>{" "}
                    Your Password
                  </span>
                )}
              </div>
            </h1>

            {/* Type Switcher */}
            <div className={styles.instructionActionControls}>
              <UISwitcher
                isDark={isDarkTheme}
                options={operationOptions}
                onSwitch={onChangeOperation}
                elementWidth={200}
                selected={selectedTypeIndex}
              />
            </div>
          </div>

          <div
            className={`container__limit --x-small ${
              mobileDevice ? "w-100" : ""
            }`}
          >
            {actionState !== "list" && (
              <>
                {/* Instruction */}
                <InstructionModule
                  mobileDevice={mobileDevice}
                  actionState={actionState}
                  instr={instr}
                  instrB={instrB}
                  triggerInstruction={triggerInstruction}
                  isDarkTheme={isDarkTheme}
                />
                <div>
                  <form
                    ref={encryptForm}
                    className={`generator__content--actions --column no-x-paddings pt0 ${
                      mobileDevice ? "gap-x-3" : "gap-x-6"
                    }`}
                  >
                    <textarea
                      name="password-text"
                      ref={outTextInput}
                      className={`${
                        actionState === "encrypt" ? "order-1" : "order-3"
                      } generator__content--area`}
                      id="inText"
                      type="text"
                      onInput={(e) => onInputField(e, "sourceText")}
                      onChange={(e) => onInputField(e, "sourceText")}
                      placeholder="You password"
                    />

                    <textarea
                      name="password-secret"
                      className={`generator__content--area ${
                        actionState === "decrypt" ? "order-0" : "order-2"
                      }`}
                      id="enSecretPassphrase"
                      type="text"
                      onInput={(e) => onInputField(e, "secret")}
                      placeholder="Secret phrase"
                    />

                    <textarea
                      name="password-encypt"
                      ref={outTextCrypted}
                      className={`${
                        actionState === "decrypt" ? "order-1" : "order-3"
                      } generator__content--area`}
                      id="outText"
                      type="text"
                      onInput={(e) => onInputField(e, "cryptedText")}
                      onChange={(e) => onInputField(e, "cryptedText")}
                      placeholder="Enrypted password"
                    />
                  </form>
                  {actionState === "encrypt" && (
                    <div className="left-align">
                      <label className="inline-block" htmlFor="password-alias">
                        <h2
                          className={`${
                            styles.instructionHeading
                          } flex__grid align-center justify-left ${
                            instrC ? styles.instrOpen : ""
                          } ${!mobileDevice ? "cursor-pointer-screen" : ""}`}
                          onClick={() => {
                            let tolltipState = instrC;
                            setInstructioCStatus(
                              (tolltipState = !tolltipState)
                            );
                          }}
                        >
                          <div
                            className={`instruction_info_icon ${
                              instrC ? "active" : ""
                            }`}
                          >
                            <img
                              className={`${
                                isDarkTheme ? "--dark-theme" : "--light-theme"
                              } `}
                              src={infoIcon}
                              width={30}
                            />
                          </div>
                          <span> Alias for your password</span>
                        </h2>
                        {instrC && (
                          <div className="mb2">
                            <InstructionTooltip>
                              <>
                                Once encrypted You can save crypted password
                                string and alias for current record into .csv
                                (simple table) file to your device.
                              </>
                            </InstructionTooltip>
                          </div>
                        )}
                      </label>
                      <textarea
                        name="password-alias"
                        className={`generator__content--area order-0`}
                        id="passworAlias"
                        onInput={(e) => onInputField(e, "alias")}
                        onChange={(e) => onInputField(e, "alias")}
                        placeholder="Alias"
                      />
                    </div>
                  )}

                  <div
                    className={`flex__grig --small-gap ${
                      mobileDevice ? "mt-2.4" : "mt-2.4"
                    }`}
                  >
                    <button
                      id="btn"
                      className="generator__content--btn --small-margin --secondary-btn"
                      onClick={() => copyToClipBoard()}
                    >
                      Copy
                    </button>
                    {actionState === "encrypt" && (
                      <>
                        <hr className="--base-divider --bg-primary mb2" />
                        <button
                          id="btn"
                          className="generator__content--btn --secondary-btn"
                          onClick={() => saveToFile()}
                        >
                          Save to CSV
                        </button>

                        <button
                          id="btn"
                          className="generator__content--btn"
                          onClick={() => saveToDB()}
                        >
                          Save to DB
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="container__limit">
            {actionState === "list" && (
              <EncryptedPasswordManager
                isDarkTheme={isDarkTheme}
                mobileDevice={mobileDevice}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

/**
 * Support components
 */
const InstructionModal = ({ tape, isDarkTheme }) => (
  <div
    className={`${styles.instructionWindow} ${
      !isDarkTheme ? "--light-theme" : "--dark-theme"
    }`}
    data-left-text
  >
    <ul className={styles.instrustionList}>
      {tape === "A" && (
        <>
          <li>
            1. Enter Your Password: Fill in the &apos;Password&apos; field with
            your desired password. This can be any combination of characters.
          </li>
          <li>
            2. Provide a Secret Phrase: Enter a unique secret phrase in the
            &apos;Secret Phrase&apos; field. This phrase will be used to
            securely encrypt your password.
          </li>
          <li>
            3. View Encrypted Output: Once both fields are filled, the encrypted
            version of your password will be automatically generated and shown
            in the "Encrypted password" field.
          </li>
          <strong className={styles.instrustionListTips}>
            Tip: Make sure to remember your secret phrase and crypted password,
            as you'll need it to decrypt your password later!
          </strong>
        </>
      )}
      {tape === "B" && (
        <>
          <li>
            1. Provide the Secret Phrase: Enter the same secret phrase you used
            during the encryption process into the "Secret phrase" field.
          </li>
          <li>
            2. Enter Encrypted Data: In the "Encrypted password" field, input
            the encrypted password you wish to decrypt.
          </li>
          <li>
            3. View Decrypted Password: Once both fields are filled, the
            original password will be automatically decrypted and displayed.
          </li>
          <strong className={styles.instrustionListTips}>
            Note: The secret phrase must match exactly. Otherwise, the password
            cannot be decrypted.
          </strong>
        </>
      )}
    </ul>
  </div>
);

const InstructionModule = ({
  mobileDevice,
  actionState,
  instr,
  instrB,
  triggerInstruction,
  className = "",
  isDarkTheme,
}) => (
  <div
    className={`${className} instruction__block container__limit --x-small no-x-paddings ${
      mobileDevice ? "w-100" : ""
    }`}
  >
    {actionState === "encrypt" ? (
      <div>
        <h2
          data-left-text
          className={`${styles.instructionHeading} flex__grid align-center ${
            instr ? styles.instrOpen : ""
          } ${!mobileDevice ? "cursor-pointer-screen" : ""}`}
          onClick={() => triggerInstruction("A")}
        >
          <div className={`instruction_info_icon  ${instr ? "active" : ""}`}>
            <img
              className={`${isDarkTheme ? "--dark-theme" : "--light-theme"}`}
              src={infoIcon}
              width={30}
            />
          </div>
          <span>How to Encrypt Your Password?</span>
        </h2>
        {instr && (
          <div className={styles.instructionModalContainer}>
            <InstructionModal tape="A" isDarkTheme={isDarkTheme} />
          </div>
        )}
      </div>
    ) : (
      <>
        {actionState === "decrypt" && (
          <div>
            <h2
              data-left-text
              className={`${
                styles.instructionHeading
              } flex__grid align-center ${instrB ? styles.instrOpen : ""} ${
                !mobileDevice ? "cursor-pointer-screen" : ""
              }`}
              onClick={() => triggerInstruction("B")}
            >
              {/* <div
              className={`instruction_info_icon--text ${instrB ? "active" : ""}`}
            >
              ?
            </div> */}
              <div
                className={`instruction_info_icon ${
                  isDarkTheme ? "--dark-theme" : "--light-theme"
                }  ${instrB ? "active" : ""}`}
              >
                <img
                  className={`${
                    isDarkTheme ? "--dark-theme" : "--light-theme"
                  }`}
                  src={infoIcon}
                  width={30}
                />
              </div>
              <span>How to Decrypt Your Password?</span>
            </h2>
            {instrB && (
              <div className={styles.instructionModalContainer}>
                <InstructionModal tape="B" isDarkTheme={isDarkTheme} />
              </div>
            )}
          </div>
        )}
      </>
    )}
  </div>
);

const InstructionTooltip = ({ children }) => (
  <div className={styles.instructionWindow} data-left-text>
    <ul className={styles.instrustionList}>
      <li>{children}</li>
    </ul>
  </div>
);

export default CryptoPassword;
