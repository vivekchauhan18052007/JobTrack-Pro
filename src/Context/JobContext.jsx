import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useLocalStorage("jobs", []);
  const [profile, setProfile] = useLocalStorage("jobtrack-profile", {
    name: "",
    email: "",
    headline: "Frontend Developer",
    location: "",
    phone: "",
    about: "",
  });
  const [preferences, setPreferences] = useLocalStorage("jobtrack-preferences", {
    compactView: false,
    confirmDelete: true,
  });

  function addJob(job) {
    const newJob = {
      ...job,
      id: job.id || String(Date.now()),
      createdAt: job.createdAt || new Date().toISOString(),
      appliedDate: job.appliedDate || new Date().toISOString().slice(0, 10),
    };
    setJobs((oldJobs) => [newJob, ...oldJobs]);
  }

  function updateJob(id, updatedData) {
    setJobs((oldJobs) =>
      oldJobs.map((job) =>
        String(job.id) === String(id) ? { ...job, ...updatedData, id: job.id } : job
      )
    );
  }

  function deleteJob(id) {
    if (preferences.confirmDelete) {
      const confirmDelete = window.confirm("Are you sure you want to delete this application?");
      if (!confirmDelete) return false;
    }
    setJobs((oldJobs) => oldJobs.filter((job) => String(job.id) !== String(id)));
    return true;
  }

  function getJob(id) {
    return jobs.find((job) => String(job.id) === String(id));
  }

  const value = {
    jobs,
    setJobs,
    addJob,
    updateJob,
    deleteJob,
    getJob,
    profile,
    setProfile,
    preferences,
    setPreferences,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  return useContext(JobContext);
}
