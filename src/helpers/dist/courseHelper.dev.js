

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valActivity = exports.valCourse = void 0;

var valCourse = function valCourse(data) {
  var errorForm = {
    idCampaign: {
      status: false,
      msj: "You need to select a campaign"
    },
    nameCourse: {
      status: false,
      msj: "The name of the course is required"
    },
    descCourse: {
      status: false,
      msj: "All courses required a description"
    },
    activities: {
      status: false,
      msj: "All courses required a description"
    },
    nameActivity: {
      status: false,
      msj: "The name of the arctivity is required"
    },
    descActivity: {
      status: false,
      msj: "The  arctivity is required a description"
    },
    urlActivity: {
      status: false,
      msj: "Need to load a resource"
    }
  };
  var error = false;

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

  return {
    errorForm: errorForm,
    error: error
  };
}; // funcion para validar los campos de la creacion de actividades


exports.valCourse = valCourse;

var valActivity = function valActivity(data) {
  var errorForm = {
    idCampaign: {
      status: false,
      msj: "You need to select a campaign"
    },
    nameCourse: {
      status: false,
      msj: "The name of the course is required"
    },
    descCourse: {
      status: false,
      msj: "All courses required a description"
    },
    activities: {
      status: false,
      msj: "All courses required a description"
    },
    nameActivity: {
      status: false,
      msj: "The name of the arctivity is required"
    },
    descActivity: {
      status: false,
      msj: "The  arctivity is required a description"
    },
    urlActivity: {
      status: false,
      msj: "Need to load a resource"
    }
  };
  var error = false;

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

  return {
    errorForm: errorForm,
    error: error
  };
};

exports.valActivity = valActivity;