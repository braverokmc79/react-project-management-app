import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelect from "./components/NoProjectSelect";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    //여기서 null 은 프로젝트를 새롭게 추가한다는 것.
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }


  function handleAddProject(projectData){
    setProjectsState(prevState=>{
      const proejctId=Math.random();
      const newProject ={
        ...projectData,
        id:proejctId
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });

  }

  console.log("projectsState ", projectsState);


  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelect onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject}  projects={projectsState.projects}   />
      {content}
    </main>
  );
}


export default App;
