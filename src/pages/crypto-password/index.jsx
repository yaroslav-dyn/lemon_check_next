import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import {
  copyToClipboardMethod,
  jsonToCsv,
  downloadFile,
} from "@/services/base.services";
import styles from "@/styles/CryptoPassword.module.css";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import useDeviceType from "@/services/useDeviceType";

const CryptoPassword = () => {
  const areaElement = useRef();
  const [modelObject, setModelObject] = useState({
    sourceText: "",
    secret: "",
    cryptedText: "",
    alias: "",
  });
  const [actionState, setActionState] = useState("encrypt"); // encrypt | decrypt
  const [instr, setInstructionStatus] = useState(false);
  const [instrB, setInstructioBStatus] = useState(false);
  const outTextInput = useRef(null);
  const outTextCrypted = useRef(null);

  const mobileDevice = useDeviceType();

  const copyToClipBoard = () => {
    copyToClipboardMethod(
      actionState === "encrypt" ? outTextCrypted : outTextInput
    );
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
      outTextInput &&
        (outTextInput.current.value = aes
          .decrypt(mutatedModel.cryptedText, mutatedModel.secret)
          .toString(CryptoJS.enc.Utf8));
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
    const iterableData = [dataToFile];
    const fileContent = jsonToCsv(iterableData);
    fileContent &&
      downloadFile(fileContent, dataToFile.alias + ".csv", "text/csv");
  };

  return (
    <>
      <Head>
        <title>LemonCheck</title>
        <meta name="author" content="LemonCheck"></meta>
        <meta
          name="description"
          content="LemonCheck, Encrypt your password, Crypted password"
        />
        <meta
          name="keywords"
          content="Encrypt your password, Crypted password"
        />
        <meta name="title" content="Encrypt your password" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="generator__page">
        <main className="main_content generator__content">
          <div className="main__heading --x-small-bm">
            <h1 className="h1_heading">
              Protect your <span className="--color-primary">password</span>
            </h1>

            {/* Instruction */}
            <InstructionModule
              mobileDevice={mobileDevice}
              actionState={actionState}
              instr={instr}
              instrB={instrB}
              triggerInstruction={triggerInstruction}
            />
          </div>

          <div className={styles.instructionActionControls}>
            <div>
              <input
                type="radio"
                name="action-type"
                id="encryptType"
                value="encrypt"
                checked={actionState === "encrypt"}
                onChange={(e) => {
                  setActionState(e.target.value);
                }}
              />
              <label htmlFor="encryptType">Encrypt</label>
            </div>
            <div>
              <input
                type="radio"
                name="action-type"
                id="decryptType"
                value="decrypt"
                checked={actionState === "decrypt"}
                onChange={(e) => setActionState(e.target.value)}
              />
              <label htmlFor="decryptType">Decrypt</label>
            </div>
          </div>

          <div
            className={`container__limit --x-small ${
              mobileDevice ? "w-100" : ""
            }`}
          >
            <div>
              <section
                className={`generator__content--actions --column no-x-paddings ${
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
                  readOnly={actionState !== "encrypt"}
                />

                <textarea
                  name="password-secret"
                  className="generator__content--area order-2"
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
                  placeholder="Crypted password"
                  readOnly={actionState !== "decrypt"}
                />
              </section>
              {actionState === "encrypt" && (
                <div data-left-text>
                  <label
                    onClick={() => triggerInstruction("A")}
                    className="inline-block mb2"
                    htmlFor="password-alias"
                  >
                    <span
                      className={`instruction_info_icon mr2${
                        instr ? "active" : ""
                      }`}
                    >
                      ?
                    </span>
                    <spa> Alias for your password</spa>
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
                    <hr className="--base-divider --bg-primary mb3" />
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
      {tape === "A" ? (
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
      ) : (
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
          } flex__grid align-center justify-center ${
            instr ? styles.instrOpen : ""
          } ${!mobileDevice ? "cursor-pointer-screen" : ""}`}
          onClick={() => triggerInstruction("A")}
        >
          <div className={`instruction_info_icon ${instr ? "active" : ""}`}>
            ?
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
          <div className={`instruction_info_icon ${instrB ? "active" : ""}`}>
            ?
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

export default CryptoPassword;
