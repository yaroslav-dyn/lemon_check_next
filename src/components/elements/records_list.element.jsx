import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  getAllEncryptedPasswords,
  getSortedEncryptedPasswords,
  deleteEncryptedPassword,
  importRecordsFromCSV,
} from "@/services/db.servise";
import DeleteIconlement from "@/components/elements/delete_icon.elment";
import CopyToClipBoardElement from "@/components/elements/copy_clipboard.element";
import FileInpuElement from "@/components/elements/input_file.element";
import Preloader from "@/components/elements/loading.element";
import {
  copyToClipboardMethod,
  jsonToCsv,
  downloadFile,
  debounce,
} from "@/services/base.services";
import { useSnackbar } from "notistack";
import CONSTANTS from "@/services/constants";

const infoIcon = "/assets/img/icons8-question-mark-48.png";

//SECTION Component
const EncryptedPasswordManager = ({
  isDarkTheme,
  mobileDevice,
  InstructionTooltip,
}) => {
  const [searchString, setSearch] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  const [tooltipState, setTooltipState] = useState(false);
  const cryptedInput = useRef([]);
  const { enqueueSnackbar } = useSnackbar();

  //SECTION: LOAD HOOK
  useEffect(() => {
    loadPasswords();
  }, []);

  const passwordsArray = useMemo(
    () =>
      passwords && searchString && searchString.length > 0
        ? passwords.filter((ps) => ps && ps.alias.toLowerCase().includes(searchString))
        : passwords,
    [searchString, passwords]
  );

  const copyToClipBoard = (index) => {
    if (!cryptedInput || !cryptedInput?.current) {
      return;
    }
    enqueueSnackbar("copied to clipboard", {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 1200,
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
    });
    const selectedRef = { current: cryptedInput.current[index] };
    copyToClipboardMethod(selectedRef);
  };

  const loadPasswords = async () => {
    setLoadingState(true);
    const allPasswords = await getSortedEncryptedPasswords();
    setPasswords(allPasswords);
    setLoadingState(false);
  };

  const handleDelete = async (id, alias) => {
    const acceptdeleting = confirm(`You realy wan\'t to delete: ${alias}`);
    if (!acceptdeleting) return;
    try {
      await deleteEncryptedPassword(id);
      loadPasswords();
    } catch (error) {}
  };

  const saveToFile = () => {
    const dataToFile = passwords;
    const fileContent = jsonToCsv(dataToFile);
    fileContent &&
      downloadFile(fileContent, `records-${Date.now()}` + ".csv", "text/csv");
  };

  const handleFileLoad = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await importRecordsFromCSV(file);
        enqueueSnackbar("Records imported successfully!", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 2200,
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
        });
        loadPasswords();
      } catch (error) {
        enqueueSnackbar(`Import failed: ${error}`, {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 2200,
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
        });
      }
    }
  };
  // const onSeach = (str) => {
  //   debounce()
  // setSearch(str)
  // }

  const onSeach = useCallback(
    debounce((value) => {
      setSearch(value);
      setLoadingState(false);
    }, 400),
    []
  );

  return (
    <div className="password_manager__page relative">
      {/*NOTE: Instruction tooltip */}
      <div className="left">
        <h2
          className={`inline-block flex__grid justify-left items-center ${
            tooltipState ? "open__tooltip --color-primary" : ""
          } ${!mobileDevice ? "cursor-pointer-screen" : ""}`}
          onClick={() => {
            let toolpState = tooltipState;
            setTooltipState((toolpState = !toolpState));
          }}
        >
          <div
            className={`instruction_info_icon mr0.5 ${
              tooltipState ? "active" : ""
            }`}
          >
            <img
              className={`${isDarkTheme ? "--dark-theme" : "--light-theme"}`}
              src={infoIcon}
              width={30}
            />
          </div>
          <span className="">Important Notice</span>
        </h2>
        {tooltipState && (
          <div className="absolute">
            <InstructionTooltip>
              <>
                <strong>Experimental Feature</strong>
                {/* <p>
                  This feature for saving encrypted passwords is experimental
                  and should not be used as a primary or long-term password
                  storage solution. Data is saved locally using IndexedDB, a
                  browser-based storage system that depends on your device and
                  browser settings. Browser Cache and Storage Risks: While
                  IndexedDB is not typically affected by clearing the browser
                  cache, it can be erased if you clear "Cookies and Site Data"
                  in your browser settings. Additionally, some mobile browsers
                  may clear this data automatically if device storage runs low.
                  Data Backup: To avoid accidental data loss, it is recommended
                  to periodically back up your saved records by exporting them
                  as a CSV file. Security Note: For secure password management,
                  consider using a dedicated, secure password manager. This
                  feature is not intended as a replacement for
                  professional-grade password storage solutions.
                </p> */}
                <p>
                 <strong> Experimental Feature</strong> This feature for saving encrypted
                  passwords is experimental and should not be used as a primary
                  or long-term password storage solution. Data is saved locally
                  using IndexedDB, a browser-based storage system that depends
                  on your device and browser settings.
                </p>
                <p>
                  <strong>Browser Cache and Storage Risks</strong>: While IndexedDB is not
                  typically affected by clearing the browser cache, it can be
                  erased if you clear "Cookies and Site Data" in your browser
                  settings. Additionally, some mobile browsers may clear this
                  data automatically if device storage runs low.
                </p>
                <p>
                  <strong>Data Backup and Restoration</strong>: To avoid accidental data loss, it
                  is recommended to periodically back up your saved records by
                  exporting them as a CSV file. You can restore records if
                  needed by importing the CSV file back into the app. This helps
                  ensure continuity in case of browser data clearing or
                  switching devices.
                </p>
                <p>
                 <strong> Security Note</strong>: For secure password management, consider using
                  a dedicated, secure password manager. This feature is not
                  intended as a replacement for professional-grade password
                  storage solutions.
                </p>
              </>
            </InstructionTooltip>
          </div>
        )}
      </div>

      <div>
        <input
          className="w-100 p1 mb2 --search-style-input --color-base border-bottom --bcolor-base x2 --radius-none"
          type="text"
          onChange={(e) => {
            setLoadingState(true);
            onSeach(e.target.value);
          }}
          placeholder="Search by alias"
        />
      </div>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="--color-base border --base-radius p1">
          <div className="records__list py1 p1 border-bottom --small-font lato-bold">
            <div className="left-align --color-base">
              <span>#</span>
            </div>
            <div className="left-align --color-base">
              <span>Alias</span>
            </div>
            <div className="left-align --color-base">
              <span>Encrypted String</span>
            </div>
            <div className="right-align --color-base">
              <span>Action</span>
            </div>
          </div>
          {passwordsArray.length > 0 ? (
            passwordsArray.map((record, index) => (
              <div
                className="records__list records__list__body items-center --small-font lato-thin py2"
                key={record.alias}
              >
                <div className="left-align">
                  <span>{index + 1}</span>
                </div>
                <span className="left-align">
                  <span> {record.alias}</span>
                </span>
                <div className="center">
                  <div>
                    <input
                      className={`--no_style-input --color-base flex-1 ${
                        mobileDevice ? "w-auto" : "w-100"
                      }`}
                      ref={(ref) => (cryptedInput.current[index] = ref)}
                      defaultValue={record.encryptedString}
                    />
                  </div>
                </div>
                <div>
                  <div className="right-align flex__grid justify-end items-center">
                    <div onClick={() => copyToClipBoard(index)}>
                      <CopyToClipBoardElement
                        className={`${
                          !mobileDevice ? "cursor-pointer-screen w-auto" : ""
                        }`}
                        color={
                          isDarkTheme
                            ? CONSTANTS.dark.colorPrimary
                            : CONSTANTS.light.colorPrimary
                        }
                      />
                    </div>
                    <button
                      className="action__btn--text --color-primary"
                      onClick={() => handleDelete(record.id, record.alias)}
                    >
                      <DeleteIconlement
                        color={
                          isDarkTheme
                            ? CONSTANTS.dark.colorPrimary
                            : CONSTANTS.light.colorPrimary
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3
              className={`${
                mobileDevice ? "--small-font" : ""
              } --color-primary center lato-regular --uppercase`}
            >
              No saved passwords found!
            </h3>
          )}
        </div>
      )}
      <div className="ps__manager__actions flex__grid justify-end items-start --small-gap mt3">
        <FileInpuElement
          labelClasses="--limit-width --secondary-btn lato-light"
          handleFileLoad={handleFileLoad}
          mobileDevice={mobileDevice}
          accept=".csv"
          slug="records"
          title="Import CSV"
        />
        <button
          id="btn"
          className="action__btn --limit-width --primary-btn lato-light"
          onClick={() => saveToFile()}
        >
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default EncryptedPasswordManager;
