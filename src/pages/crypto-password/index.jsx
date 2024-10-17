import React, { useState, useRef } from "react";
import Head from "next/head";
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

const operationOptions = [
  {
    label: "Encrypt",
    value: "encrypt",
    selectedBackgroundColor: "#E94E3D",
  },
  {
    label: "Decrypt",
    value: "decrypt",
    selectedBackgroundColor: "#E94E3D",
  },
];

const infoIcon = "/assets/img/icons8-question-mark-48.png";


const CryptoPassword = () => {
  const areaElement = useRef();
  const defaultFormObject = {
    alias: "",
    sourceText: "",
    secret: "",
    cryptedText: "",
  };
  const [modelObject, setModelObject] = useState(defaultFormObject);
  const [actionState, setActionState] = useState("encrypt"); // encrypt | decrypt
  const [instr, setInstructionStatus] = useState(false);
  const [instrB, setInstructioBStatus] = useState(false);
  const [instrC, setInstructioCStatus] = useState(false);
  const encryptForm = useRef(null);
  const outTextInput = useRef(null);
  const outTextCrypted = useRef(null);

  const mobileDevice = useDeviceType();

  const copyToClipBoard = () => {
    copyToClipboardMethod(
      actionState === "encrypt" ? outTextCrypted : outTextInput
    );
  };

  const clearForm = () => {
    setModelObject(defaultFormObject);
    encryptForm && encryptForm.current.reset();
  };

  const onChangeOperation = (e) => {
    setActionState(e);
    clearForm();
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

      console.log("cryptedText", mutatedModel);
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

  return (
    <>
      <Head>
        <title>LockBox</title>
        <meta name="author" content="LockBox"></meta>
        <meta
          name="description"
          content="LockBox, Encrypt your password, Crypted password"
        />
        <meta
          name="keywords"
          content="Encrypt your password, Crypted password"
        />
        <meta name="title" content="Encrypt your password" />
      </Head>
      <div className="generator__page">
        <main className="main_content generator__content">
          <div className="main__heading --x-small-bm">
            <h1 className="h1_heading">
              Protect your <span className="--color-primary">password</span>
            </h1>
            {/* Type Switcher */}
            <div className={styles.instructionActionControls}>
              <UISwitcher
                options={operationOptions}
                onSwitch={onChangeOperation}
                elementWidth={160}
              />
            </div>
          </div>

          <div
            className={`container__limit --x-small ${
              mobileDevice ? "w-100" : ""
            }`}
          >
            {/* Instruction */}
            <InstructionModule
              mobileDevice={mobileDevice}
              actionState={actionState}
              instr={instr}
              instrB={instrB}
              triggerInstruction={triggerInstruction}
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
                        setInstructioCStatus((tolltipState = !tolltipState));
                      }}
                    >
                      <div
                        className={`instruction_info_icon  ${
                          instrC ? "active" : ""
                        }`}
                      >
                        <img src={infoIcon} width={30} />
                      </div>
                      <span> Alias for your password</span>
                    </h2>
                    {instrC && (
                      <div className="mb2">
                        <InstructionTooltip>
                          <>
                            Once encrypted You can save crypted password string
                            and alias for current record into .csv (simple
                            table) file to your device.
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
                      className="generator__content--btn"
                      onClick={() => saveToFile()}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

/**
 * Support components
 */
const InstructionModal = ({ tape }) => (
  <div className={styles.instructionWindow} data-left-text>
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
            in the &apos;Encrypted Output&apos; field.
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
            1. Enter Encrypted Data: In the "Encrypted Output" field, input the
            encrypted password you wish to decrypt.
          </li>
          <li>
            2. Provide the Secret Phrase: Enter the same secret phrase you used
            during the encryption process into the "Secret Phrase" field.
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
          className={`${
            styles.instructionHeading
          } flex__grid align-center ${
            instr ? styles.instrOpen : ""
          } ${!mobileDevice ? "cursor-pointer-screen" : ""}`}
          onClick={() => triggerInstruction("A")}
        >
          <div className={`instruction_info_icon  ${instr ? "active" : ""}`}>
            <img src={infoIcon} width={30} />
          </div>
          <span>How to Encrypt Your Password?</span>
        </h2>
        {instr && (
          <div className={styles.instructionModalContainer}>
            <InstructionModal tape="A" />
          </div>
        )}
      </div>
    ) : (
      <div>
        <h2
          data-left-text
          className={`${
            styles.instructionHeading
          } flex__grid align-center justify-center ${
            instrB ? styles.instrOpen : ""
          } ${!mobileDevice ? "cursor-pointer-screen" : ""}`}
          onClick={() => triggerInstruction("B")}
        >
          {/* <div
            className={`instruction_info_icon--text ${instrB ? "active" : ""}`}
          >
            ?
          </div> */}
          <div className={`instruction_info_icon  ${instrB ? "active" : ""}`}>
            <img src={infoIcon} width={30} />
          </div>
          <span>How to Decrypt Your Password?</span>
        </h2>
        {instrB && (
          <div className={styles.instructionModalContainer}>
            <InstructionModal tape="B" />
          </div>
        )}
      </div>
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
