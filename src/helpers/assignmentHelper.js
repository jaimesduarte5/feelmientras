export const valAssignChanges = (courses, lps, dbCourses, dbLPs) => {
  if (dbCourses.length === 0 && dbLPs.length === 0) {
    if (courses.length === 0 && lps.length === 0) {
      return { error: "no selecciono nada y en db no hay nada" };
    }
    const dts = dataToSend(courses, lps);
    return dts;
  }

  if (dbCourses.length === 0 && dbLPs.length > 0) {
    const valLPList = lps.filter((item1) =>
      dbLPs.some((item2) => item1.idLearningPlan === item2.idLearningPlan)
    );
    if (
      valLPList.length === lps.length &&
      courses.length === 0 &&
      lps.length === dbLPs.length
    ) {
      return { error: "no se cambio nada" };
    }
    const dts = dataToSend(courses, lps);
    return dts;
  }

  if (dbLPs.length === 0 && dbCourses.length > 0) {
    const valCList = courses.filter((item1) =>
      dbCourses.some((item2) => item1.idCourse === item2.idCourse)
    );
    if (
      valCList.length === courses.length &&
      lps.length === 0 &&
      courses.length === dbCourses.length
    ) {
      return { error: "no se cambio nada" };
    }
    const dts = dataToSend(courses, lps);
    return dts;
  }

  if (
    dbCourses.length > 0 &&
    dbLPs.length > 0 &&
    courses.length === 0 &&
    lps.length === 0
  ) {
    return [[null, null]];
  }

  const valCList = courses.filter((item1) =>
    dbCourses.some((item2) => item1.idCourse === item2.idCourse)
  );

  const valLPList = lps.filter((item1) =>
    dbLPs.some((item2) => item1.idLearningPlan === item2.idLearningPlan)
  );

  if (
    valLPList.length === lps.length &&
    valCList.length === courses.length &&
    lps.length === dbLPs.length &&
    courses.length === dbCourses.length
  ) {
    return { error: "no se cambio nada, sigue igual que en db" };
  }

  const dts = dataToSend(courses, lps);
  return dts;
};

const dataToSend = (courses, lps) => {
  const cArr =
    courses.length > 0
      ? courses.map((course) => {
          return [null, course.idCourse];
        })
      : [];
  const lpArr =
    lps.length > 0
      ? lps.map((lp) => {
          return [lp.idLearningPlan, null];
        })
      : [];
  const dts = cArr.concat(lpArr);
  return dts;
};
