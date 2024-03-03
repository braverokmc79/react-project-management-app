import React, { useEffect, useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

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


    const inputData={
      title:enteredTitle,
      description:enteredDescription,
      dueDate:enteredDueDate
    }
    onAdd(inputData);
  }

  return (
    <>
      <Modal  ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className='text-stone-600 mb-4'>Ooops ...looks like you forgot to ener a value. </p>
        <p className='text-stone-600 mb-4'>Please mak sure you provide a valid value for every input field.</p>
      </Modal>

    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
            Cancel
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 bg-stone-800 text-stone-50 hover:bg-stone-950  rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </li>
      </menu>

      <div>
        <Input ref={title} label="Title" />
        <Input ref={description} label="Description" textarea />
        <Input type="date"  ref={dueDate} label="Due Date" />
      </div>
    </div>
    </>
  );
};

export default NewProject;
