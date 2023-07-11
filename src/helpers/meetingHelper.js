export const valMeeting = (data) => {
  let minDate = new Date();
  let meetDate = new Date([data.dateMeet, data.hourIniMeet]);

  let endMeet = new Date([data.dateMeet, data.hourEndMeet]);

  const errorForm = {
    meetName: { status: false, msj: "The name of the meeting is required" },
    meetDescription: {
      status: false,
      msj: "All meeting require a description",
    },
    dateMeet: { status: false, msj: "You need a to schedule the meeting" },
    hourIniMeet: { status: false, msj: "Start time missing" },
    hourEndMeet: { status: false, msj: "End time missing" },
    urlImgMeet: { status: false, msj: "The Image of the meeting is required" },
    urlMeet: { status: false, msj: "Add the url meeting" },
  };

  let error = false;
  if (!data.meetName) {
    errorForm.meetName.status = true;
    error = true;
  }
  if (!data.meetDescription) {
    errorForm.meetDescription.status = true;
    error = true;
  }
  if (!data.dateMeet) {
    errorForm.dateMeet.status = true;
    error = true;
  }
  if (!data.hourIniMeet) {
    errorForm.hourIniMeet.status = true;
    error = true;
  }
  if (!data.hourEndMeet) {
    errorForm.hourEndMeet.status = true;
    error = true;
  }
  if (!data.urlImgMeet) {
    errorForm.urlImgMeet.status = true;
    error = true;
  }
  if (!data.urlMeet) {
    errorForm.urlMeet.status = true;
    error = true;
  }
  if (!isValidUrl(data.urlMeet)) {
    errorForm.urlMeet.status = true;
    errorForm.urlMeet.msj = "You need a valid url https://...";
    error = true;
  }
  if (meetDate < minDate) {
    errorForm.dateMeet.status = true;
    errorForm.dateMeet.msj = "Error in the chosen date";
    error = true;
  }
  if (endMeet < meetDate) {
    errorForm.hourEndMeet.status = true;
    errorForm.hourEndMeet.msj = "Choose a later end time";
    error = true;
  }

  return { errorForm, error };
};

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
