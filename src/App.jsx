import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelect from "./components/NoProjectSelect";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });

  function handleAddTask(text){
    setProjectsState(prevState=>{
      const taskId=Math.random();
      const newTask ={
        text:text,
        projectId:prevState.selectedProjectId,
        id:taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    });
  }

  function handleDeleteTask(id){
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
         };
    });
  }



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
  

  //5. 프로젝트 삭제
  function handleDeleteProject(){
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
         };
    });
  }


  const selectedProejct =projectsState.projects.find(project=>project.id === projectsState.selectedProjectId);

  //console.log("selectedProejct ", selectedProejct);
  let content=selectedProejct &&  <SelectedProject   project={selectedProejct} onDelete={handleDeleteProject}  
       onAddTask={handleAddTask}  onDeleteTask={handleDeleteTask}  tasks={projectsState.tasks} />



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
          selectProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}


export default App;
