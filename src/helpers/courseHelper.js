export const valCourse = (data) => {
  const errorForm = {
    idCampaign: { status: false, msj: "You need to select a campaign" },
    nameCourse: { status: false, msj: "The name of the course is required" },
    descCourse: { status: false, msj: "All courses required a description" },
    activities: { status: false, msj: "All courses required a description" },
    nameActivity: {
      status: false,
      msj: "The name of the arctivity is requiered",
    },
    descActivity: {
      status: false,
      msj: "The  arctivity is requiered a description",
    },
    urlActivity: { status: false, msj: "Need to load a resource" },
  };
  let error = false;
  if (!data.idCampaign) {
    errorForm.idCampaign.status = true;
    error = true;
  }
  if (!data.nameCourse) {
    errorForm.nameCourse.status = true;
    error = true;
  }
  if (!data.descCourse) {
    errorForm.descCourse.status = true;
    error = true;
  }
  if (data.activities.length < 1) {
    errorForm.activities.status = true;
    error = true;
  }

  return { errorForm, error };
};

// funcion para validar los campos de la creacion de actividades
export const valActivity = (data) => {
  const errorForm = {
    idCampaign: { status: false, msj: "You need to select a campaign" },
    nameCourse: { status: false, msj: "The name of the course is required" },
    descCourse: { status: false, msj: "All courses required a description" },
    activities: { status: false, msj: "All courses required a description" },
    nameActivity: {
      status: false,
      msj: "The name of the arctivity is requiered",
    },
    descActivity: {
      status: false,
      msj: "The  arctivity is requiered a description",
    },
    urlActivity: { status: false, msj: "Need to load a resource" },
  };

  let error = false;

  if (!data.nameActivity) {
    errorForm.nameActivity.status = true;
    error = true;
  }
  if (!data.descActivity) {
    errorForm.descActivity.status = true;
    error = true;
  }
  if (!data.urlActivity) {
    errorForm.urlActivity.status = true;
    error = true;
  }

  return { errorForm, error };
};
// funcion para validar los campos de la creacion de Simulaciones para AINesting
export const valSimulation = (data) => {
  const errorForm = {
    simName: {
      status: false,
      msj: "The name of the simulation is required",
    },
    simDesc: { status: false, msj: "Required a description" },
  };

  let error = false;

  if (!data.simName) {
    errorForm.simName.status = true;
    error = true;
  }
  if (!data.simDesc) {
    errorForm.simDesc.status = true;
    error = true;
  }

  return { errorForm, error };
};
