import React, { useEffect, useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";
import Footer from "./Footer";

const NewProject = ({ onAdd , onCancel}) => {
  const modal=useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle=title.current.value;
    const enteredDescription=description.current.value;
    const enteredDueDate=dueDate.current.value;
    
    //유효성 체크
    if(enteredTitle.trim()==='' || enteredDescription.trim()==='' || enteredDueDate.trim()===''){
      modal.current.open();

      return;
    }

    if(enteredDescription.length>=50){
      return;
    }

    const inputData={
      title:enteredTitle,
      description:enteredDescription,
      dueDate:enteredDueDate
    }
    onAdd(inputData);
  }

  return (
    <>
      <Modal  ref={modal} buttonCaption="확인">
        <h2 className="text-xl font-bold text-stone-700 my-4">메시지!</h2>
        <p className='text-stone-600 mb-4'>잘못된 값을 입력 하였습니다. </p>
        <p className='text-stone-600 mb-4'>모든 입력 필드에 유효한 값을 입력했는지 확인하세요.</p>
      </Modal>

    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-50 px-6 py-2 bg-stone-500  hover:bg-stone-950  rounded-md" onClick={onCancel}>
            취소
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 bg-stone-800 text-stone-50 hover:bg-stone-950  rounded-md"
            onClick={handleSave}
          >
            저장
          </button>
        </li>
      </menu>

      <div>
        <Input ref={title} label="제목(15글자 미만)" />
        <Input ref={description} label="내용(50글자미만)" textarea />
        <Input type="date"  ref={dueDate} label="마감일" />
      </div>


      <Footer  />
    </div>
    </>
  );
};

export default NewProject;
