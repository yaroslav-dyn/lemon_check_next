import React, { useState, useRef } from 'react';
import Head from "next/head";
import useDeviceType from "@/services/useDeviceType";
import { copyToClipboardMethod } from "@/services/base.services";
import { useSnackbar } from "notistack";
import CONSTANTS from "@/services/constants";

const TextFormatter = () => {
  const mobileDevice = useDeviceType();
  const { enqueueSnackbar } = useSnackbar();
  const areaFormatedElement = useRef();

  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');

  // Function to remove formatting and excessive spaces
  const formatText = () => {
    // Remove HTML tags if any
    const textWithoutTags = inputText.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '');
    // Replace multiple spaces, tabs, newlines with a single space and trim
    const cleanedText = textWithoutTags.replace(/\s+/g, ' ').trim();
    setFormattedText(cleanedText);
  };

  // Function to copy formatted text to clipboard
  const copyToClipboard = () => {
    copyToClipboardMethod(areaFormatedElement);
    enqueueSnackbar("copied to clipboard", CONSTANTS.defualtSnakeConfig);
  };

  return (
    <>
      <Head>
        <title>LockBoxApp | Text Formatter - format you text</title>
        <meta
          name="description"
          content="Online text formatter and converter. Format, clean, and transform your text with ease."
        />
        <meta
          name="keywords"
          content="text formatter, text converter, online text tool, text transformation, line manipulation, text cleaner, format text"
        />
      </Head>

      {/* SECTION: Text formatter main */}
      <main className="main_content converter_content">

        <div
          className={`main__heading ${mobileDevice ? "--x-small-bm " : ""}`}
        >
          <div data-centered-text>

            <h1 className="h1_heading flex__grid justify-center --small-gap">
              Text <span className='--color-primary'>Formatter</span>
            </h1>

            <p className='slogan__text'>Paste your <span className='--color-primary'>text</span> below and
              &nbsp;<span className='--color-primary'>click</span> "Format" <br />
              to <span className='--color-primary'>remove</span> any formatting and <span className='--color-primary'>excessive spaces</span>.
            </p>
          </div>

        </div>

        <section className="container__limit">
          <h2>Original Text</h2>

          <textarea
            rows={mobileDevice ? 8 : 14}
            name='original_text_area'
            className={`generator__content--area ${mobileDevice ? 'mb2' : 'mb4'}`}
            value={inputText}
            onChange={(e) => (setInputText(e.target.value), formatText())}
            onBlur={formatText}
            placeholder="Paste your text here..."
          />

          {formattedText && (
            <div>
              <h2>Formatted Text</h2>
              <textarea
                ref={areaFormatedElement}
                name='formated_text_area'
                className='generator__content--area'
                rows={mobileDevice ? 8 : 14}
                value={formattedText}
                readOnly
              />
            </div>
          )}

          <div className='flex__grid justify-between gap-x-3 my4'>

            <button
              className="generator__content--btn auto_width --small-margin"
              onClick={formatText}>
              Format
            </button>

            {
              formattedText
                ? <button
                  className="generator__content--btn auto_width --secondary-btn --small-margin"
                  onClick={copyToClipboard}
                  disabled={!formattedText}>
                  Copy Formatted Text
                </button>
                : null
            }

          </div>
        </section>

      </main>
    </>
  );
};

export default TextFormatter;