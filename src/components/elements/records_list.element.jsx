import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  getAllEncryptedPasswords,
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

//SECTION Component
const EncryptedPasswordManager = ({ isDarkTheme, mobileDevice }) => {
  const [searchString, setSearch] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  const cryptedInput = useRef([]);
  const { enqueueSnackbar } = useSnackbar();

  //SECTION: LOAD HOOK
  useEffect(() => {
    loadPasswords();
  }, []);

  const passwordsArray = useMemo(
    () =>
      passwords && searchString && searchString.length > 0
        ? passwords.filter((ps) => ps && ps.alias.includes(searchString))
        : passwords,
    [searchString, passwords]
  );

  //TODO: DEPRECATED
  // const action = (snackbarId) => (
  //   <>
  //     <button
  //       className="action__btn--text"
  //       onClick={() => {
  //         alert(`I belong to snackbar with id ${snackbarId}`);
  //       }}
  //     >
  //       Undo
  //     </button>
  //     <button
  //       className="action__btn--text"
  //       onClick={() => {
  //         closeSnackbar(snackbarId);
  //       }}
  //     >
  //       Dismiss
  //     </button>
  //   </>
  // );

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
    const allPasswords = await getAllEncryptedPasswords();
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
    <div className="password_manager__page">
      <div>
        <input
          className="w-100 p1 mb2 --search-style-input --color-base border-bottom --bcolor-base x2"
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
            <h2
              className={`${
                mobileDevice ? "--small-font" : ""
              } --color-primary center lato-regular --uppercase`}
            >
              No saved passwords found!
            </h2>
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
