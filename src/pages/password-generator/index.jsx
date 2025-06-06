import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { copyToClipboardMethod } from "@/services/base.services";
import useDeviceType from "@/services/useDeviceType";
import { useSnackbar } from "notistack";
import CONSTANTS from "@/services/constants";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [passwordLengthInput, setPasswordLengthInput] = useState(12);
  const [hasSpecialCharacters, setSpecialCharacters] = useState(true);
  const [hasDigits, setDigitsCharacters] = useState(true);
  const [password, setPassword] = useState("");
  const areaElement = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const mobileDevice = useDeviceType();


  useEffect(() => {
    generateCode();
  }, [passwordLength, hasDigits, hasSpecialCharacters]);

  const generateCode = () => {
    let generatePassword = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "1234567890";
    const specialCharactersSymbols = "!@#$%^&*?";
    const characters = hasSpecialCharacters
      ? `${alphabet}${hasDigits ? digits : ""}${specialCharactersSymbols}`
      : `${alphabet}${hasDigits ? digits : ""}`;

    for (var i = 0; i < passwordLength; i++) {
      generatePassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(generatePassword);
  };


  const getPasswordLength = (e) => {
    const currentLength = e.target.value;
    setPasswordLength(currentLength);
    setPasswordLengthInput(currentLength);
  };

  const setSpecialCharactersBox = (status) => 
    setSpecialCharacters(status.target.checked);

  const setDigitsBox = (status) => 
    setDigitsCharacters(status.target.checked);



  const generateFromForm = (e) => {
    e.preventDefault();
    generateCode();
  };

  const copyToClipBoard = () => {
    copyToClipboardMethod(areaElement);
    enqueueSnackbar("copied to clipboard", CONSTANTS.defualtSnakeConfig);
  };

  const getLabelColor = () => {
    let labelClass =
      passwordLength > 7 ? "password__label__normal" : "password__label__short";
    passwordLength > 12 && (labelClass = "password__label__strong");
    return labelClass;
  };

  useEffect(() => {
    setPasswordLength(passwordLength);
  }, [passwordLength]);

  //NOTE: HTML
  return (
    <>
      <Head>
        <title>
          LockBoxApp | Password Generator - Strong Password Generator &
          Encryption Tools
        </title>
        <meta
          name="description"
          content="Generate strong, unique passwords with LockBoxApp's free password generator. Strengthen your online security today."
        />
        <meta
          name="keywords"
          content="password generator, strong passwords, secure passwords, generate passwords, online password generator"
        />
      </Head>

      <div className="generator__page">
        <main className="main_content generator__content">
          <div className="main__heading">
            <h1 className="h1_heading">
              Generate <span className="--color-primary">strong</span> password
            </h1>
          </div>
          <div
            className={`container__limit --x-small ${
              mobileDevice ? "w-100" : ""
            }`}
          >
            <section className="generator__content--actions no-x-paddings mb1">
              <textarea
                defaultValue={password}
                name="password-content"
                className="generator__content--area"
                id="passwordContent"
                ref={areaElement}
                onClick={copyToClipBoard}
                readOnly
              ></textarea>
            </section>
            <div className="">
              <section className="generator__content__settings">
                <form
                  name="generatorForm"
                  id="generatorFormId"
                  onSubmit={generateFromForm}
                >
                  <div className="mb2">
                    <input
                      className="generator__input no-x-paddings"
                      id="passwordLengthRange"
                      type="range"
                      value={passwordLength}
                      onChange={getPasswordLength}
                    />
                  </div>
                  <div className="flex__grid justify-between align-center gap-x-6">
                    <input
                      className="base_input"
                      id="passwordLength"
                      value={passwordLengthInput}
                      type="number"
                      onChange={getPasswordLength}
                    />

                    <label className={getLabelColor()} htmlFor="passwordLength">
                      LENGTH
                    </label>
                  </div>
                  <br />

                  <div className="flex__grid align-center justify-between">
                    <div className="custom__checkbox">
                      <input
                        id="digitCharacters"
                        type="checkbox"
                        checked={hasDigits}
                        onChange={setDigitsBox}
                      />
                      <label htmlFor="digitCharacters"></label>
                    </div>
                    <label htmlFor="digitCharacters">Use digitals</label>
                  </div>
                  <br />
                  <div className="flex__grid align-center justify-between">
                    <div className="custom__checkbox">
                      <input
                        id="specialCharacters"
                        type="checkbox"
                        checked={hasSpecialCharacters}
                        onChange={setSpecialCharactersBox}
                      />
                      <label htmlFor="specialCharacters"></label>
                    </div>
                    <label htmlFor="specialCharacters">
                      Use special characters
                    </label>
                  </div>
                </form>
              </section>

              <div className="en_generate_controls">
                <hr className="--base-divider x2 --bg-accent mb2" />
                <button
                  id="btn"
                  className="generator__content--btn --small-margin"
                  onClick={() => generateCode()}
                >
                  Generate password
                </button>

                <button
                  id="btn"
                  className="generator__content--btn --secondary-btn"
                  onClick={() => copyToClipBoard()}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PasswordGenerator;
