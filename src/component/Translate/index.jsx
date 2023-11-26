import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { t } from "i18next";
const host = "https://localhost:7297/Translate";

const Translate = () => {
  const [selectTemplate, setSelectTemplate] = useState([]);
  const [input, setInput] = useState();
  const [inputKey, setInputKey] = useState();
  const [result, setResult] = useState();
  const [selectValue, setSelectValue] = useState();

  const fetchGetTemplate = () => {
    axios
      .get(`${host}?key=${inputKey}`)
      .then((res) => {
        console.log("res", res)
        setSelectTemplate(res.data);
      })
      .catch((error) => {
        console.log(error);
        setSelectTemplate([]);
      });
  };

  const handleChangeValueInput = (e) => {
    setInput(e.target.value);
  };

  const handleTranslate = () => {
    if (!input) return;
    axios
      .post(host, {
        text: [input],
        Token:inputKey,
        TemplateName:selectTemplate[0]?.template_name ?? ""
      })
      .then((res) => {
        setResult(res.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const handleGetTemplate = () =>{
    fetchGetTemplate();
  }



  return (
    <Box>
      <Box mt="50px" display="flex" alignItems={"center"} gap="50px">
        <Typography>{t('common.selectTemplate')}</Typography>
        <TextField placeholder="key" onChange={(e)=>{
            setInputKey(e.target.value)
        }}
        value={inputKey}
        ></TextField>
        <Button
          variant="contained"
          sx={{
            height: "56px",
          }}
          onClick={handleGetTemplate}
        >
          Get Template
        </Button>
        {selectTemplate?.map(item=>{
          return <Box>
              <Box> Source Language :  {item.source_language}</Box>
              <Box> Target Language :  {item.target_language}</Box>
              <Box> Template Name :  {item.template_name}</Box>
            </Box>
        })}
        <Box>
          <Typography>
            {selectValue && (
              <Box display="flex" alignItems="center" gap="10px">
                <Button
                  variant="contained"
                  sx={{
                    height: "56px",
                  }}
                >
                  {selectValue.source_language}
                </Button>
                <Typography>
                  <ArrowForwardIcon />
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    height: "56px",
                  }}
                >
                  {selectValue.target_language}
                </Button>
              </Box>
            )}
          </Typography>
        </Box>
      </Box>
      <Box mt="50px" display={"flex"} gap="50px" alignItems={"center"}>
        <TextField
          placeholder="text ...."
          multiline
          onChange={handleChangeValueInput}
          rows={15}
          maxRows={15}
          sx={{
            width: "40%",
          }}
        />
        <Button
          variant="contained"
          onClick={handleTranslate}
          sx={{
            height: "40px",
          }}
          disabled={!input}
        >
          {t('common.translate')}
        </Button>
        <TextField
          placeholder=""
          multiline
          rows={15}
          maxRows={15}
          value={result}
          readonly
          sx={{
            width: "40%",
            fontWeight: 700,
          }}
        />
      </Box>
    </Box>
  );
};

export default Translate;
