import Head from 'next/head'
import AppHeader from '../../components/Header.static';
import React, { useState, useEffect, useRef } from 'react';
import { copyToClipboardMethod } from '@/services/base.services'

const  PasswordGenerator = () =>  {

  const [passwordLength, setPasswordLength] = useState(12);
  const [hasSpecialCharacters, setSpecialCharacters] = useState(true);
  const [password, setPassword] = useState('');
  const areaElement = useRef();

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

  //NOTE: HTML 
  return (
    <>
      <Head>
        <title>LemonCheck</title>
        <meta name="author" content="LemonCheck LTD"></meta>
        <meta name="description" content="LemonCheck, Strong password generator" />
        <meta name="keywords" content="Strong password generator, Strong password, online generate password" />
        <meta name="title" content="Strong password generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <div className="generator__page">
        <main className="main_content generator__content">

          <h1 className="main__heading">Generate strong password</h1>

          <section className="generator__content--actions">
            <textarea
              defaultValue={password}
              name="password-content"
              className="generator__content--area"
              id="passwordContent"
              ref={areaElement}
              onClick={copyToClipBoard}>
            </textarea>
          </section>

          <section className="generator__content__settings">
            <form
              name="generatorForm"
              id="generatorFormId"
              onSubmit={generateFromForm}
            >
              <div className='flex__grid justify-center'>
               
                <label className={getLabelColor()} htmlFor="passwordLength">Length: </label>

                <div className='flex__grid --column justify-center align-center'>

                  <input
                    id="passwordLengthRange"
                    type="range"
                    defaultValue={passwordLength}
                    onChange={getPasswordLength}
                  />

                  <br />

                  <input
                    id="passwordLength"
                    defaultValue={passwordLength}
                    type="text"
                    onChange={getPasswordLength}
                  />

                </div>

              </div>
              <br />
              <div>
                <label htmlFor="specialCharacters">Use special characters: </label>
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
          <div>
            <button
              id="btn"
              className="generator__content--btn"
              onClick={generateCode}
            >
              Generate password
            </button>
          </div>
        </main>
      </div>

    </>
  )
}


export default PasswordGenerator