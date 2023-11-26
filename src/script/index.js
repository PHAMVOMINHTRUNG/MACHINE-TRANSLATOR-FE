import axios from "axios";
import https from "https";
import { readFile } from 'fs/promises';
import fs from 'fs';

const host = 'https://localhost:7297/'

const instance = axios.create({
  https: {
    checkServerIdentity: (host, cert) => {},
  },
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});


const createJsonFile = async(data) => {

  const readJson = JSON.parse(await readFile("src/locales/en.json", "utf8"));
  const commonData = readJson.common
  const obj= {common:{}}
  const keys = [];

  for(const key in commonData){
    keys.push(key);
  }

  for(let i = 0;i<data.length;i++){
    obj.common[keys[i]] = data[i]
  }

  fs.writeFile("src/locales/vi.json", JSON.stringify(obj), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("JSON file created successfully");
  });
};

const fetchLanguage = async () => {
  const readJson = JSON.parse(await readFile("src/locales/en.json", "utf8"));
  instance
    .post(`${host}Translate`, {
      text: Object.values(readJson.common)
    })
    .then((response) => {
      console.log("response", response.data);
      createJsonFile(response.data);
    })
    .catch((err) => console.log("err", err));
};
fetchLanguage();