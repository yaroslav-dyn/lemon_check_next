
import React, { useState, useRef } from 'react';
import { copyToClipboardMethod } from '@/services/base.services'
import { isMobile } from "react-device-detect";

const AliasGenerator = () => {
  const areaElement = useRef();
  const [allias, setAllias] = useState('');

  const copyToClipBoard = () => {
    copyToClipboardMethod(areaElement);
  }

  const generateAllias = () => {
    // Create a random string of letters, numbers, and symbols.
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]:'\",.<>/?";
    let nickname = '';
    for (var i = 0; i < 10; i++) {
      nickname += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    setAllias(nickname);
  }

  return (
    <>
      <div className="generator__page">
        <main className="main_content generator__content">
          <div className="main__heading">
            <h1 className="h1_heading">Generate Allias</h1>
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
                className="generator__content--btn"
                onClick={generateAllias}
              >
                Generate allias
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AliasGenerator;