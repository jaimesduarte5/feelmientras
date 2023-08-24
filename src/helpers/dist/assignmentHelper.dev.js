

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valAssignChanges = void 0;

var valAssignChanges = function valAssignChanges(courses, lps, dbCourses, dbLPs) {
  if (dbCourses.length === 0 && dbLPs.length === 0) {
    if (courses.length === 0 && lps.length === 0) {
      return {
        error: "Nothing has been selected and in DB there is nothing"
      };
    }

    var _dts = dataToSend(courses, lps);

    return _dts;
  }

  if (dbCourses.length === 0 && dbLPs.length > 0) {
    var _valLPList = lps.filter(function (item1) {
      return dbLPs.some(function (item2) {
        return item1.idLearningPlan === item2.idLearningPlan;
      });
    });

    if (_valLPList.length === lps.length && courses.length === 0 && lps.length === dbLPs.length) {
      return {
        error: "Nothing has been changed"
      };
    }

    var _dts2 = dataToSend(courses, lps);

    return _dts2;
  }

  if (dbLPs.length === 0 && dbCourses.length > 0) {
    var _valCList = courses.filter(function (item1) {
      return dbCourses.some(function (item2) {
        return item1.idCourse === item2.idCourse;
      });
    });

    if (_valCList.length === courses.length && lps.length === 0 && courses.length === dbCourses.length) {
      return {
        error: "Nothing has been changed"
      };
    }

    var _dts3 = dataToSend(courses, lps);

    return _dts3;
  }

  if (dbCourses.length > 0 && dbLPs.length > 0 && courses.length === 0 && lps.length === 0) {
    return [[null, null]];
  }

  var valCList = courses.filter(function (item1) {
    return dbCourses.some(function (item2) {
      return item1.idCourse === item2.idCourse;
    });
  });
  var valLPList = lps.filter(function (item1) {
    return dbLPs.some(function (item2) {
      return item1.idLearningPlan === item2.idLearningPlan;
    });
  });

  if (valLPList.length === lps.length && valCList.length === courses.length && lps.length === dbLPs.length && courses.length === dbCourses.length) {
    return {
      error: "Nothing has been changed and in DB it remains the same"
    };
  }

  var dts = dataToSend(courses, lps);
  return dts;
};

exports.valAssignChanges = valAssignChanges;

var dataToSend = function dataToSend(courses, lps) {
  var cArr = courses.length > 0 ? courses.map(function (course) {
    return [null, course.idCourse];
  }) : [];
  var lpArr = lps.length > 0 ? lps.map(function (lp) {
    return [lp.idLearningPlan, null];
  }) : [];
  var dts = cArr.concat(lpArr);
  return dts;
};