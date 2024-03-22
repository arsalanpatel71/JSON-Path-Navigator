import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const JsonViewer = ({ data }) => {
  const [collapsed, setCollapsed] = useState({});
  const [currentPath, setCurrentPath] = useState("");
  const [copied, setCopied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleCollapse = (key) => {
    setCollapsed((prevCollapsed) => ({
      ...prevCollapsed,
      [key]: !prevCollapsed[key],
    }));
  };
  const handleDoubleClick = (path) => {
    console.log(path);
    setCurrentPath(path);
    setCopied(false);
    setDialogOpen(true);
  };
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const renderJson = (data, path = "root", parentPath = "") => {
    return Object.keys(data).map((key, index) => {
      const isCollapsible = typeof data[key] === "object" && data[key] !== null;
      const keyPath = Array.isArray(data) ? `[${key}]` : `.${key}`;
      const newPath = `${parentPath}${keyPath}`;

      return (
        <div
          key={newPath}
          className={`line ${isCollapsible ? "collapsible" : ""}`}
        >
          {isCollapsible && (
            <span
              className={`collapse-icon`}
              onClick={() => toggleCollapse(newPath)}
            >
              {collapsed[newPath] ? (
                <span
                  style={{
                    transform: "scale(0.8, 0.8)",
                    display: "inline-block",
                    transformOrigin: "center",
                  }}
                >
                  ▶
                </span>
              ) : (
                "▼"
              )}{" "}
            </span>
          )}
          <span
            className="key"
            onDoubleClick={() => handleDoubleClick(newPath)}
          >
            {key}:
          </span>
          {isCollapsible ? (
            !collapsed[newPath] && (
              <div className="nested">
                {renderJson(data[key], newPath, newPath)}
              </div>
            )
          ) : (
            <span className="value">{JSON.stringify(data[key])}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="json-viewer">
      {" "}
      <div className="path-copy-container">
        <TextField
          fullWidth
          type="text"
          value={currentPath}
          placeholder="Json Path"
          onChange={(e) => setCurrentPath(e.target.value)}
          onClick={(e) => e.target.select()}
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            height: 56,
            "& .MuiInputBase-root": {
              height: "100%",
            },
            width: "55vw",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        />
        <Button
          variant="contained"
          onClick={copyToClipboard}
          sx={{
            backgroundColor: "black",
            color: "white",
            boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.5)",

            height: 56,
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          className={copied ? "copied" : ""}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>{" "}
      </div>
      <div
        style={{
          overflowY: "auto",
          height: "calc(100% - 76px)",
          width: "100%",
          border: "2px solid black",
          padding: "30px",
        }}
      >
        {renderJson(data)}
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Copy JSON Path</DialogTitle>
        <DialogContent
          sx={{
            "&::-webkit-scrollbar": {
              width: "1px",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 5px grey",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "darkgrey",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#14161a",
            },
            overflowX: "auto",
          }}
        >
          <TextField
            fullWidth
            type="text"
            value={currentPath}
            placeholder="Json Path"
            onChange={(e) => setCurrentPath(e.target.value)}
            onClick={(e) => e.target.select()}
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              height: 56,
              "& .MuiInputBase-root": {
                height: "100%",
              },
              width: "55vw",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              copyToClipboard();
              handleCloseDialog();
            }}
            sx={{
              backgroundColor: "black",
              color: "white",
              boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.5)",
              height: 56,
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JsonViewer;
