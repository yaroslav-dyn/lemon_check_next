import { Main } from 'next/document';
import Head from 'next/head'
import AppHeader from '../../components/Header.static';


import React, { useState, useEffect } from 'react';

const  PasswordGenerator = () =>  {

  const [passwordLength, setPasswordLength] = useState(12);
  const [hasSpecialCharacters, setSpecialCharacters] = useState(true);
  const [password, setPassword] = useState('');

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
    // TODO: ref element
    let passwordContent = document.getElementById('passwordContent');
    passwordContent.select();
    passwordContent.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(passwordContent.value);
    //alert('Copy to clipboard')
  }

  //NOTE: HTML 
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="author" content="LemonCheck LTD"></meta>
        <meta name="description" content="LemonCheck, Strong password generator" />
        <meta name="keywords" content="Strong password generator, Strong password, online generate password" />
        <meta name="title" content="Strong password generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <div className="generator__page">
        <main className="generator__content">

          <h1 className="main__heading">Generate strong password</h1>

          <section className="generator__content--actions">
            <textarea
              defaultValue={password}
              name="password-content"
              className="generator__content--area"
              id="passwordContent"
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
                <label htmlFor="passwordLength">Length: </label>

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