import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react';
import { copyToClipboardMethod } from '@/services/base.services'
import { isMobile } from "react-device-detect";
import useDeviceType from '@/services/useDeviceType';

const  PasswordGenerator = () =>  {

  const [passwordLength, setPasswordLength] = useState(12);
  const [hasSpecialCharacters, setSpecialCharacters] = useState(true);
  const [password, setPassword] = useState('');
  const areaElement = useRef();

  const mobileDevice = useDeviceType();

  useEffect(() => {
    generateCode();
  }, [])

  const getPasswordLength = (e) => {
    const currentLength = e.target.value ? e.target.value : passwordLength;
    setPasswordLength(currentLength);
  }

  const setSpecialCharactersBox = (status) => {
    setSpecialCharacters(status.target.checked);
  }

  const generateCode = () => {
    let generatePassword = "";
    const characters = hasSpecialCharacters ?
      "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*?" :
      "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < passwordLength; i++) {
      generatePassword
        += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
    }
    setPassword(generatePassword);
  }

  const generateFromForm = (e) => {
    e.preventDefault();
    generateCode();
  }

  const copyToClipBoard = () => {
    copyToClipboardMethod(areaElement);
    //alert('Copy to clipboard')
  }

  const getLabelColor = () => {
    let labelClass =  passwordLength > 7 ? 
     'password__label__normal' :
     'password__label__short'
    passwordLength > 12 && (labelClass = 'password__label__strong');
     return labelClass;
  } 


  useEffect(() => {
     setPasswordLength(passwordLength);
  }, [passwordLength]);

  //NOTE: HTML 
  return (
    <>
      <Head>
        <title>LemonCheck</title>
        <meta name="author" content="LemonCheck LTD"></meta>
        <meta
          name="description"
          content="LemonCheck, Strong password generator"
        />
        <meta
          name="keywords"
          content="Strong password generator, Strong password, online generate password"
        />
        <meta name="title" content="Strong password generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="generator__page">
        <main className="main_content generator__content">
          <div className="main__heading">
            <h1 className="h1_heading">Generate strong password</h1>
          </div>
          <div
            className={`container__limit ${mobileDevice ? "" : "fit-content"}`}
          >
            <section className="generator__content--actions no-x-paddings">
              <textarea
                defaultValue={password}
                name="password-content"
                className="generator__content--area"
                id="passwordContent"
                ref={areaElement}
                onClick={copyToClipBoard}
              ></textarea>
            </section>
            <div className="">
              <section className="generator__content__settings">
                <form
                  name="generatorForm"
                  id="generatorFormId"
                  onSubmit={generateFromForm}
                >
                  <div className="flex__grid justify-center align-center gap-x-6">
                    <label className={getLabelColor()} htmlFor="passwordLength">
                      LENGTH
                    </label>

                    <div className="flex__grid --column justify-center ">
                      <input
                        className="generator__input no-x-paddings"
                        id="passwordLengthRange"
                        type="range"
                        value={passwordLength}
                        onChange={getPasswordLength}
                      />

                      <br />

                      <input
                        className="bace_input"
                        id="passwordLength"
                        value={passwordLength}
                        type="text"
                        onChange={getPasswordLength}
                      />
                    </div>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="specialCharacters">
                      Use special characters:{" "}
                    </label>
                    <input
                      id="specialCharacters"
                      type="checkbox"
                      checked={hasSpecialCharacters}
                      onChange={setSpecialCharactersBox}
                    />
                  </div>
                </form>
              </section>
              <br />
              <div className="en_generate_controls">
                <button
                  id="btn"
                  className="generator__content--btn --small-margin --secondary-btn"
                  onClick={() => copyToClipBoard()}
                >
                  Copy
                </button>
                <button
                  id="btn"
                  className="generator__content--btn"
                  onClick={() => generateCode()}
                >
                  Generate password
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}


export default PasswordGenerator