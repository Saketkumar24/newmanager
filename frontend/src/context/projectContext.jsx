import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
    const [token, setToken] = useState("");

    const getToken = async () => {
        const token = localStorage.getItem("token");
        setToken(token);
    };


    const value = {

    };

    return (
        <ProjectContext.Provider value={value}>{props.children}</ProjectContext.Provider>
    );
};

export default ProjectContextProvider;