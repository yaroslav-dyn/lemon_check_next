
import React, { useState, useRef, useEffect } from "react";
import { copyToClipboardMethod } from '@/services/base.services'
import useDeviceType from "@/services/useDeviceType";

const AliasGenerator = () => {
  const areaElement = useRef();
  const [allias, setAlias] = useState('');
    const isMobile = useDeviceType();

  const copyToClipBoard = () => {
    copyToClipboardMethod(areaElement);
  }

  const generateAllias = () => {
    // Create a random string of letters, numbers, and symbols.
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitals = "0123456789";
    const specialCharacters = "!@#$%^&*()_+-={}[]:'\",.<>/?";
    const fullCharacters = `${letters}${digitals}${specialCharacters}`;
    let nickname = "";

    // Function to get a random character from a specific set
    const getRandomCharacter = (fromSet) => {
      return fromSet.charAt(Math.floor(Math.random() * fromSet.length));
    }

    nickname += getRandomCharacter(letters);
    for (let i = 1; i < 10; i++) {
      nickname += getRandomCharacter(fullCharacters);
    }

    setAlias(nickname); 
  }

  useEffect(() => {
    generateAllias()
  }, []);

  return (
    <>
      <div className="generator__page">
        <main className="main_content generator__content">
          <div className="main__heading">
            <h1 className="h1_heading">Generate Alias</h1>
          </div>

          <div className={`container__limit ${isMobile ? "" : "fit-content"}`}>
            <section className="generator__content--actions no-x-paddings">
              <textarea
                defaultValue={allias}
                name="password-content"
                className="generator__content--area"
                id="passwordContent"
                ref={areaElement}
                onClick={copyToClipBoard}
              ></textarea>
            </section>

            <div>
              <button
                id="btn"
                className="generator__content--btn mb2"
                onClick={generateAllias}
              >
                Generate alias
              </button>
              <hr className="--base-divider --bg-primary mb2" />
              <button
                id="btn"
                className="generator__content--btn --small-margin --secondary-btn"
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
}

export default AliasGenerator;