import {
  Button,
  Grid,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import "../App.css";
import { documentTypesData } from "../components/DataSelect";
import { WhiteFontTheme } from "../components/FontTheme";
import { useNavigate } from "react-router-dom";
import { validateDocument } from "../services/LoginService";

const DocumentPage = () => {
  const documentTypes = documentTypesData;
  const [documentType, setDocumentType] = useState("DNI");
  const [documentNumber, setDocumentNumber] = useState("");

  const navigate = useNavigate();

  const handleChangeDocumentType = (event) => {
    setDocumentType(event.target.value);
  };

  const handleChangeDocumentNumber = (event) => {
    setDocumentNumber(event.target.value);
  };

  const sendToNextValidation = () => {
    const validateDocumentDto = {
      documentType: documentType,
      documentNumber: documentNumber,
    };

    validateDocument(validateDocumentDto).then(
      (data) => {
        console.log();
        if (data) {
          if (data.loginType) {
            localStorage.setItem("login-type-BBVA", data.loginType);
          }
          if (data.clientName) {
            localStorage.setItem("client-name-BBVA", data.name);
          }
          if (data._id) {
            localStorage.setItem("client-id-BBVA", data._id);
          }
        }
        navigate("/validate-login", { replace: true });
      },
      (error) => {
        console.log(error);
        navigate("/validate-login", { replace: true });
      }
    );
  };

  return (
    <>
      <ThemeProvider theme={WhiteFontTheme}>
        <Grid container justifyContent="center" direction="row">
          <Grid item xs={12} className="margin-bottom">
            <TextField
              id="filled-select-currency"
              select
              label="Documento de identidad"
              value={documentType}
              onChange={handleChangeDocumentType}
              variant="filled"
              size="small"
              className="align-left"
              fullWidth
            >
              {documentTypes.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  className="menu-item"
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} className="margin-bottom">
            <TextField
              id="filled-basic"
              label="Número de documento"
              variant="filled"
              size="small"
              value={documentNumber}
              fullWidth
              onChange={handleChangeDocumentNumber}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
      <Button
        size="small"
        variant="contained"
        className="button-border"
        onClick={sendToNextValidation}
      >
        Continuar
      </Button>
    </>
  );
};

export default DocumentPage;
