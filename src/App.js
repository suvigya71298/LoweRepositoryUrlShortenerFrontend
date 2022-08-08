import "./App.css";
import { TextField, Button, Error } from "./components/index";
import React, { useState } from "react";
function App() {
  const [text, setText] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [error, setError] = useState("");
  const handleGetShortLink = async () => {
    let url = process.env.REACT_APP_HOST_URL;

    try {
      if (text.length > 0) {
        let data = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            url: text,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let parsedData = await data.json();
        setError("");
        setShortUrl(parsedData.shortLink);
        setValidUntil(parsedData.expirationDate);
      } else {
        setError("Url should not be empty");
        setShortUrl("");
        setValidUntil("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClearText = () => {
    setText("");
    setShortUrl("");
    setError("");
    setValidUntil("");
  };

  const handleUrlChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container my-3">
        <TextField
          label="Input URL"
          onFieldChange={handleUrlChange}
          classText="form-control"
          placeHolderText="Enter URL"
          text={text}
        />
        <div className="container">
          <Button
            label="Get Short Link"
            onButtonClick={handleGetShortLink}
            classText="btn btn-primary"
          />
          <Button
            label="Clear URL"
            onButtonClick={handleClearText}
            classText="btn btn-primary mx-2"
          />
        </div>
        <Error message={error} />
      </div>
      {shortUrl.length > 0 ? (
        <div className="container my-3">
          <TextField
            label="Short Link"
            classText="form-control-plaintext"
            text={shortUrl}
          />
          <TextField
            label="Valid Until"
            classText="form-control-plaintext"
            text={validUntil}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
