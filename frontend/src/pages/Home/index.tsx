import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyIcon from "@/assets/icons/CopyIcon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { isValidURL } from "@/helper/utils";
import { toast } from "react-toastify";
import { generateURL } from "@/service/url";

const Home = () => {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState<string>("");
  const [urlValid, setURLValid] = useState(true);

  const handleChangeURL = e => {
    setURLValid(true);
    const value = e.target.value.trim();
    setURL(value);
  };

  const handleShortenURL = async () => {
    const valid = isValidURL(url);
    setURLValid(valid);
    if (!valid) {
      toast.error(`Invalid URL`);
    } else {
      try {
        const generatedURL = await generateURL(url);
        if (generatedURL) {
          setShortURL(generatedURL);
          setURL("");
        } else {
          throw new Error("Failed to generate short URL");
        }
      } catch (error) {
        toast.error("Too many requests, please try again later");
      }
    }
  };

  const handleCopy = () => {
    toast.success("URL copied successfully!");
  };

  return (
    <div className="flex flex-col px-20 py-10 gap-6 h-full">
      <div className="flex items-center gap-2">
        <h1 className="font-medium text-2xl text-gray-700">URL Shortener</h1>
        <CopyIcon stroke="black" height={18} width={18} />
      </div>
      <h2 className="font-medium text-xl text-gray-700">Enter the URL to shorten</h2>
      <span className="p-float-label">
        <InputText id="username" value={url} type="url" className={!urlValid && `border-red-500`} onChange={handleChangeURL} />
        <label htmlFor="username">URL</label>
      </span>
      <div>
        <Button label="Shorten" onClick={handleShortenURL} />
      </div>
      {shortURL && (
        <>
          <h2 className="font-medium text-xl text-green-700">Success! Here's your short URL:</h2>
          <div className="flex items-center gap-3">
            <span className="underline font-medium text-xl text-purple-700 cursor-pointer">{shortURL}</span>
            <CopyToClipboard text={shortURL} onCopy={handleCopy}>
              <Button
                label="Copy"
                outlined
                severity="help"
                size="small"
                icon={<CopyIcon stroke="#7E22CEFF" className="mr-1" />}
                iconPos="right"
              />
            </CopyToClipboard>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
