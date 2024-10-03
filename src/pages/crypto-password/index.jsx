import React, { useState, useRef, useEffect } from "react";
import { copyToClipboardMethod } from "@/services/base.services";
import styles from "@/styles/CryptoPassword.module.css";
import aes from "crypto-js/aes";
import device from "current-device";

const CryptoPassword = () => {
  const areaElement = useRef();
  const [modelObject, setModelObject] = useState({
    sourceText: "",
    secret: "",
    cryptedText: "",
    roughCrypto: {},
  });
  const [actionState, setActionState] = useState("encrypt"); // encrypt | decrypt
  const [instr, setInstructionStatus] = useState(false);
  const outTextInput = useRef(null);
  const outTextCrypted = useRef(null);

  const copyToClipBoard = () => {
    copyToClipboardMethod(outTextCrypted);
  };

  const onInputField = (e, field) => {
    const mutatedModel = { alias: "",sourceText: "", secret: "", cryptedText: "" };
    mutatedModel[field] = e.target.value;
    if (
      field === "sourceText" ||
      (field === "secret" && e.target.value.length > 0)
    ) {
      Object.assign(mutatedModel, {
        roughCrypto: aes.encrypt(e.target.value, "secret"),
        cryptedText: aes.encrypt(e.target.value, "secret").toString(),
      });
      outTextCrypted &&
        (outTextCrypted.current.value = aes
          .encrypt(e.target.valuet, mutatedModel.secret)
          .toString());
    } else if (field === "cryptedText" && actionState === "decrypt") {
      outTextInput &&
        (outTextInput.current.value = aes
          .decrypt(mutatedModel.roughCrypto, mutatedModel.secret)
          .toString());
    }

    setModelObject(mutatedModel);
  };

  const triggerInstruction = () => {
    let currentState = instr;
    setInstructionStatus((currentState = !currentState));
  };

  return (
    <>
      <div className="generator__page">
        <main className="main_content generator__content">
          <h1 className="main__heading">Protect your password</h1>

          <div className={styles.instructionActionControls}>
            <div>
              <input
                type="radio"
                name="action-type"
                id="encryptType"
                value="encrypt"
                checked={actionState === "encrypt"}
                onChange={(e) => {
                  console.log("1", e.target.value);
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
            className={`instruction__block container__limit ${styles.instructionContainer}`}
          >
            <h2
              data-left-text
              className={`${styles.instructionHeading} ${
                instr ? styles.instrOpen : ""
              } ${device.desktop() ? "cursor-pointer-screen" : ""}`}
              onClick={() => triggerInstruction()}
            >
              <span className={styles.instructionInfoIcon}>?</span>
              <span>How to Encrypt Your Password:</span>
            </h2>
            {instr && <InstructionModal />}
          </div>

          <div className="container__limit">
            <section className="generator__content--actions no-x-paddings gap-x-6">
              <textarea
                name="password-alias"
                className={`generator__content--area order-0`}
                id="passworAlias"
                onInput={(e) => onInputField(e, "alias")}
                placeholder="Alias"
              ></textarea>

              <textarea
                name="password-text"
                ref={outTextInput}
                className={`${
                  actionState === "encrypt" ? "order-1" : "order-3"
                } generator__content--area`}
                id="inText"
                type="text"
                onInput={(e) => onInputField(e, "sourceText")}
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
                placeholder="crypted password"
                readOnly={actionState !== "decrypt"}
              />
            </section>

            <div>
              <button
                id="btn"
                className="generator__content--btn"
                onClick={() => copyToClipBoard()}
              >
                Copy
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};


const InstructionModal = () => (
  <div className={styles.instructionWindow} data-left-text>
    <ul className={styles.instrustionList}>
      <li>
        1. Enter Your Password: Fill in the "Password" field with your desired
        password. This can be any combination of characters.
      </li>
      <li>
        2. Provide a Secret Phrase: Enter a unique secret phrase in the "Secret
        Phrase" field. This phrase will be used to securely encrypt your
        password.
      </li>
      <li>
        3. View Encrypted Output: Once both fields are filled, the encrypted
        version of your password will be automatically generated and shown in
        the "Encrypted Output" field.
      </li>
    </ul>
    <strong className={styles.instrustionListTips}>
      Tip: Make sure to remember your secret phrase, as you'll need it to
      decrypt your password later!
    </strong>
  </div>
);

export default CryptoPassword;
