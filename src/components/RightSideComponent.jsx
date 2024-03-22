import React from "react";

const RightSideComponent = () => {
  return (
    <div>
      <div className="instructions">
        <h2>Instructions</h2>
        <ul>
          <li>
            To search for any element, use <strong>Ctrl + F</strong>.
          </li>
          <li>For getting the path, double click on any element.</li>
          <li>
            Some API might not work because of CORS. Use{" "}
            <a
              href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf"
              style={{
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              Allow CORS
            </a>{" "}
            extension.
          </li>
        </ul>
      </div>
      <div className="famous-quote">
        <p>of the developer, for the developer, by the developer</p>
      </div>
    </div>
  );
};

export default RightSideComponent;
