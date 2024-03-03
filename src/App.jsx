import { useEffect, useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelect from "./components/NoProjectSelect";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import Footer from "./components/Footer";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });


  useEffect(() => {
   const getData= localStorage.getItem("projectsState");
   
   if(getData && getData!==undefined){
    console.log(JSON.parse(getData));
    setProjectsState(JSON.parse(getData));
   }


  },[]);

   //작업 추가
  function handleAddTask(text){
    const taskId=Math.random();
    const newTask ={
      text:text,
      projectId:projectsState.selectedProjectId,
      id:taskId
    };

    const inputData={
      ...projectsState,
      tasks: [newTask, ...projectsState.tasks]
    }
    setProjectsState(inputData);

    localStorage.setItem("projectsState",JSON.stringify(inputData));
  }

  //작업 삭제
  function handleDeleteTask(id){
    const inputData={
      ...projectsState,
      tasks: projectsState.tasks.filter((task) => task.id !== id)
    }
    setProjectsState(inputData);

    localStorage.setItem("projectsState",JSON.stringify(inputData));
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
    const proejctId=Math.random();
    const newProject ={
      ...projectData,
      id:proejctId
    };
    const inputData={
      ...projectsState,
      selectedProjectId: undefined,
      projects: [...projectsState.projects, newProject]
    }

    setProjectsState(inputData);

    localStorage.setItem("projectsState",JSON.stringify(inputData));

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
    const inputData={
      ...projectsState,
      selectedProjectId:undefined,
      projects: projectsState.projects.filter((project) => project.id !== projectsState.selectedProjectId)

    }

    setProjectsState(inputData);
    localStorage.setItem("projectsState",JSON.stringify(inputData));
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
    <>
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} 
          projects={projectsState.projects}  
          onSelectProject={handleSelectProject}
          selectProjectId={projectsState.selectedProjectId}
      />
      {content}

    
    </main>
   
   
    </>
  );
}


export default App;
