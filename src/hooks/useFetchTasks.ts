import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/context/AppContext";
import { config } from "@/config/config";
import axios from "axios";

export const useFetchTasks = () => {
  const { setLoading, setTasks, setErrorMessage } = useContext(AppContext);
  const [filter, setFilter] = useState<string>("A");

  const generateURL = useCallback(() => {
    let tasksURL = `${config.apiURL}/tasks`;
    switch (filter) {
      case "C":
        tasksURL += "?isCompleted=true";
        break;
      case "P":
        tasksURL += "?isCompleted=false";
      default:
        break;
    }
    return tasksURL;
  }, [filter]);

  useEffect(() => {
    (async () => {
      setErrorMessage("");
      setLoading(true);
      try {
        const resp = await axios.get(generateURL());
        setTasks(resp.data);
      } catch {
        setTasks([]);
        setErrorMessage("Error cargando la lista de tareas⚠️");
      }
      setLoading(false);
    })();
  }, [filter, generateURL, setErrorMessage, setLoading, setTasks]);

  return {
    filter,
    setFilter,
  };
};
