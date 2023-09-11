import { valEmail } from "./usersHelper";

export const validateFormViewer = (viewer) => {
  let error = false;
  let msg = "";
  const { name, lastname, email, password, country, idCampaign, rol, tpToken } =
    viewer;
  if (rol === "Viewer") {
    if ([name, lastname, email, country, idCampaign].includes("")) {
      error = true;
      msg = "All fields are required";
    }

    if (password || !tpToken) {
      if (password.length < 8 || password.length > 15) {
        error = true;
        msg = "The password must contain between 8 to 15 characters";
      }
    }
  } else {
    if ([name, email, country].includes("")) {
      error = true;
      msg = "All fields are required";
    }
  }
  if (valEmail(email)) {
    error = true;
    msg = "Please use only teleperformance email";
  }

  return { error, msg };
};
