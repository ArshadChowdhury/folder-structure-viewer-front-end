import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import UseModal from "./components/UseModal";
import "./App.css";

const App = () => {
  const [folders, setFolders] = useState<any[]>([]);
  const [folderName, setFolderName] = useState<any>("");
  const { isOpen, toggle } = UseModal();

  useEffect(() => {
    const handleFolderList = async () => {
      await axios
        .get("http://localhost:3000/")
        .then((res) => setFolders(res.data.folders))
        .catch((err) => console.log(err));
    };
    handleFolderList();
  }, [folderName]);

  const addFolder = () => {
    axios
      .post("http://localhost:3000/create-folder", {
        folder_name: folderName,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location.reload()
  };

  const submitAndClose = () => {
    toggle();
    addFolder();
  };

  const getValue = (e: any) => {
    setFolderName(e.target.value);
  };

  return (
    <>
      <div className="background">
        <div className="card">
          <div className="root">
            Root
            <button className="add-btn" onClick={toggle}>
              Add Folder
            </button>
            <div className="child-elems">
              <ul>
                {folders.map((folder) => (
                  <li className="folders" key={folder._id}>
                    {folder.folderName}
                    <Modal isOpen={isOpen} toggle={toggle}>
                      <h1>Create a folder</h1> <br />
                      <form onSubmit={submitAndClose}>
                        <label>Folder Name </label>
                        <input type="text" onChange={(e) => getValue(e)} />
                        <div className="buttons">
                        <button className="add-btn" onClick={submitAndClose} type="submit">
                          Add Folder
                        </button>
                        <button className="add-btn" onClick={toggle} type="button">
                          Close
                        </button>
                        </div>
                      </form>
                    </Modal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
