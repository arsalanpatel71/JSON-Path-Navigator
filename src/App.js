/* global chrome */

import React, { useEffect, useState } from "react";
import JsonViewer from "./components/JsonViewer";
import "./App.css";
import RightSideComponent from "./components/RightSideComponent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
function App() {
  const [jsonData, setJsonData] = useState(null);
  const [jsonUrl, setJsonUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error("Could not fetch data:", error);
    }
  };

  const handleGoClick = () => {
    fetchData(jsonUrl);
  };

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "70%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            placeholder="Enter JSON URL"
            type="text"
            variant="outlined"
            value={jsonUrl}
            onChange={(e) => setJsonUrl(e.target.value)}
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              height: 56,
              "& .MuiInputBase-root": {
                height: "100%",
              },
              width: "55vw",
              marginRight: "10px",
            }}
          />
          <Button
            variant="contained"
            onClick={handleGoClick}
            sx={{
              backgroundColor: "black",
              color: "white",
              boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.5)",
              borderRadius: "5px",
              height: 56,
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Go
          </Button>
        </div>
        <div
          style={{
            overflowY: "auto",
            height: "calc(100vh - 120px)",
          }}
        >
          {jsonData && <JsonViewer data={jsonData} searchTerm={searchTerm} />}
        </div>
      </div>
      <div style={{ width: "30%", height: "100vh", overflowY: "auto" }}>
        <RightSideComponent
          setSearchTerm={setSearchTerm}
          style={{ width: "30%" }}
        />
      </div>
    </div>
  );
}

export default App;
