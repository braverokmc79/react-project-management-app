import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelect from "./components/NoProjectSelect";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  //1.프로젝트 등록 화면 이동
  function handleStartAddProject() {
    //여기서 null 은 프로젝트를 새롭게 추가한다는 것.
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  //2.취소 버튼 클릭시 
  function handleCancelAddProject(){
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  //3.프로젝트 등록
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

  //4. 메뉴에서 프로젝트 선택시 id 값이 존재
  function handleSelectProject(id){
    setProjectsState((prevState) => {
      return {
      ...prevState,
         selectedProjectId: id,
      };
    });
  }

  const selectedProejct =projectsState.projects.find(project=>project.id === projectsState.selectedProjectId);

  console.log("selectedProejct ", selectedProejct);
  let content=selectedProejct &&  <SelectedProject   project={selectedProejct}  />



  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}  onCancel={handleCancelAddProject} />;

  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelect onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} 
          projects={projectsState.projects}  
          onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}


export default App;
