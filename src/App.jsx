import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelect from "./components/NoProjectSelect";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject(cancel) {
    //여기서 null 은 프로젝트를 새롭게 추가한다는 것.
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: cancel? undefined:null,
      };
    });
  }

  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onStartAddProject={handleStartAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelect onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}


export default App;
