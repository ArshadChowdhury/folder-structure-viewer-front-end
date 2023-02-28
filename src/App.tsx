import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [folders, setFolders] = useState<any[]>([]);
  const [folderName, setFolderName] = useState<string>("");

  useEffect(() => {
    const handleFolderList = async () => {
      await axios
        .get("http://localhost:3000/")
        .then((res) => setFolders(res.data.folders))
        .catch((err) => console.log(err));
    };
    handleFolderList();
  }, []);

  const addFolder = () => {
      axios.post('http://localhost:3000/create-folder', {
        folderName: folderName
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  return (
    <>
      <div className="background">
        <div className="card">
          <div className="root">
            Root
            <div className="child-elems">
              <ul>
                {folders.map((folder) => (
                  <li className="folders" key={folder._id}>
                    {folder.folderName}
                    <button className="add-btn" onClick={addFolder}>
                      Add Folder
                    </button>
                    <form>
                      <label>Folder Name :</label>
                      <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                      />
                    </form>
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
