import React, { useState } from "react";
import JsonViewer from "./components/JsonViewer";
import RightSideComponent from "./components/RightSideComponent";
import ShimmerUI from "./components/ShimmerUI ";
import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [jsonUrl, setJsonUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sampleUrl =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error("Could not fetch data:", error);
      setError(error.toString());
      setJsonData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoClick = () => {
    fetchData(jsonUrl);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
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
      {isLoading && <ShimmerUI />}
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
          {!jsonData && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "40px",
                width: "60vw",
                marginTop: "10px",
              }}
            >
              <span>Sample URL:</span>
              <span>{sampleUrl}</span>
              <IconButton
                onClick={copyToClipboard}
                size="small"
                sx={{
                  backgroundColor: copied ? "white" : "default",
                  color: copied ? "black" : "inherit",
                  "&:hover": {
                    backgroundColor: copied ? "#eee" : "default",
                  },
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div
          style={{
            overflowY: "auto",
            height: "calc(100vh - 120px)",
          }}
        >
          {error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : isLoading ? (
            <ShimmerUI /> // Render the ShimmerUI while loading
          ) : jsonData ? (
            <JsonViewer data={jsonData} searchTerm={searchTerm} />
          ) : null}
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
