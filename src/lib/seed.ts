/*
  Re-export barrel — import from "@/lib/seed/<module>" when you only need
  part of the catalogue (e.g. auth pages should use seed/universities).
*/
export {
  universities,
  modules,
  microBuilds,
  advances,
  competencyLabels,
  snapshotCompetencies,
  advanceSourceLabels,
  disciplineLabels,
  getBuildBySlug,
  getModuleById,
  getModulesForUniversity,
  getBuildsForModuleCodes,
  getAdvancesForModuleCodes,
  getBuildsForDiscipline,
  getCoursesForUniversity,
} from "./seed/index";
