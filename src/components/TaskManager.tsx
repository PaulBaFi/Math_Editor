import React, { useState, useEffect, useRef } from "react";
import {
  arrows,
  fractions,
  doubleStruck,
  greekAlphabet,
  arithmeticOperators,
  relationalOperators,
  logicalOperators,
  setSymbols,
  mathGroupingSymbols,
  algebraSymbols,
  geometrySymbols,
  logicSymbols,
  numberTheorySymbols,
} from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faEraser,
  faPalette,
  faHighlighter,
  faLink,
  faLinkSlash,
  faListOl,
  faListUl,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faIndent,
  faFont,
  faTextHeight,
  faHeading,
  faPlus,
  faEdit,
  faTrash,
  faArrowUpFromBracket,
  faCircleInfo,
  faXmark,
  faSave,
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import "@/styles/client.css";
import Split from "react-split";

interface Task {
  id: number;
  title: string;
  content: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: "", isError: false });
  const [activeTab, setActiveTab] = useState("∓");
  const [secondTaskId, setSecondTaskId] = useState<number | null>(null);
  const [secondTaskContent, setSecondTaskContent] = useState("");
  const [splitExpanded, setSplitExpanded] = useState(true);
  const [isGreaterThanMd, setIsGreaterThanMd] = useState(false);

  const taskListRef = useRef<HTMLUListElement>(null);
  const taskTitleEditorRef = useRef<HTMLInputElement>(null);
  const taskContentEditorRef = useRef<HTMLDivElement>(null);
  const secondTaskEditorRef = useRef<HTMLDivElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsGreaterThanMd(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const newTask: Task = { id: Date.now(), title: newTaskTitle, content: "" };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTaskTitle("");
  };

  const editTask = (id: number) => {
    setCurrentTaskId(id);
    const task = tasks.find((t) => t.id === id);
    if (task && taskTitleEditorRef.current && taskContentEditorRef.current) {
      taskTitleEditorRef.current.value = task.title;
      taskContentEditorRef.current.innerHTML = task.content || "";
    }
  };

  const saveEdit = () => {
    if (currentTaskId === null) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return {
          ...task,
          title: taskTitleEditorRef.current?.value || "",
          content: taskContentEditorRef.current?.innerHTML || "",
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    showMessage("Tarea guardada");
  };

  const deleteTask = () => {
    if (taskToDelete === null) return;

    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskToDelete(null);
    deleteDialogRef.current?.close();
  };

  const showMessage = (message: string, isError = false) => {
    setSaveMessage({ text: message, isError });
    setTimeout(() => setSaveMessage({ text: "", isError: false }), 3000);
  };

  const execCmd = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value || "");
  };

  const createLink = () => {
    const url = prompt("Ingresa la URL del enlace:", "http://");
    if (url) {
      execCmd("createLink", url);
    }
  };

  const insertMathSymbol = (symbol: string) => {
    const editor = taskContentEditorRef.current;
    if (editor) {
      const range = document.getSelection()?.getRangeAt(0);
      if (range) {
        range.deleteContents();
        range.insertNode(document.createTextNode(symbol));
      }
      editor.focus();
    }
  };

  const updateTaskTitle = () => {
    if (currentTaskId === null) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return { ...task, title: taskTitleEditorRef.current?.value || "" };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const openSecondTask = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const taskId = Number(event.target.value);
    setSecondTaskId(taskId);
    if (taskId) {
      const selectedTask = tasks.find((t) => t.id === taskId);
      if (selectedTask) {
        setSecondTaskContent(selectedTask.content);
      }
    } else {
      setSecondTaskContent("");
    }
  };

  const saveSecondTask = () => {
    if (secondTaskId === null) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === secondTaskId) {
        return {
          ...task,
          content: secondTaskEditorRef.current?.innerHTML || "",
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    showMessage("Segunda tarea guardada");
  };

  const exportContentAsImage = () => {
    const editor = taskContentEditorRef.current;
    if (editor) {
      html2canvas(editor).then((canvas) => {
        const link = document.createElement("a");
        link.download = "sin titulo.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <>
      <dialog ref={deleteDialogRef} className="bg-white rounded-md shadow-lg">
        <div className="text-sm p-5 text-zinc-800">
          <h3 className="font-semibold">Eliminar Tarea</h3>
          <hr className="my-3" />
          <p>
            ¿Estás seguro de que quieres{" "}
            <span className="font-semibold">eliminar</span> esta tarea?
          </p>
          <div className="mt-8 flex justify-end gap-1">
            <button
              className="cursor-pointer border-none py-1 px-2 rounded-md bg-brands-medium"
              onClick={() => deleteDialogRef.current?.close()}
            >
              Cancelar
            </button>
            <button
              className="cursor-pointer border-none py-1 px-2 rounded-md bg-primary text-white"
              onClick={deleteTask}
            >
              Eliminar
            </button>
          </div>
        </div>
      </dialog>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] p-3 pt-14 md:pt-3 gap-3 min-h-screen w-full text-zinc-800 bg-brands-medium">
        <nav
          className={`absolute left-0 top-0 z-10 md:relative flex flex-col justify-between bg-brands-medium transition-all h-full pr-1 pb-3 ${
            splitExpanded ? "w-[250px] p-3" : "w-0 md:w-7 p-0"
          }`}
        >
          <button
            title={`${splitExpanded ? "Ocultar" : "Mostrar"} el menú lateral`}
            onClick={() => setSplitExpanded((toggle) => !toggle)}
            className={`text-zinc-800 bg-brands-light hover:bg-zinc-200 w-8  px-2 py-1 rounded-md space-x-2 
            ${splitExpanded ? "m-0 mb-8" : "mt-3 ml-3 md:m-0 md:mb-8"}`}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={`${splitExpanded ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          <div
            className={`relative flex w-full gap-1 ${splitExpanded ? "flex" : "hidden"}`}
          >
            <input
              title="Ingresa el nombre de la nueva tarea"
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Nueva tarea"
              className="py-1 px-2 rounded-md w-full"
            />
            <button
              title="Añadir nueva tarea"
              onClick={addTask}
              className="bg-primary text-white px-2 py-1 rounded-md"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {showAlert && (
              <div
                style={{ color: "red", marginTop: "10px" }}
                className="absolute top-7 w-full leading-4 text-sm flex items-center bg-brands-medium"
              >
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="py-1 px-2 rounded-full "
                />
                <p>Ingresa un nombre para la tarea.</p>
              </div>
            )}
          </div>
          <div className={`my-10 h-full ${splitExpanded ? "block" : "hidden"}`}>
            <h2 className="text-lg font-semibold">Historial de Tareas</h2>
            <ul ref={taskListRef} className="mt-3 overflow-auto">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  data-id={task.id}
                  className="flex justify-between items-center px-1 rounded-md hover:bg-zinc-200"
                >
                  <span className="whitespace-nowrap max-w-48 text-sm overflow-hidden text-ellipsis">
                    {task.title}
                  </span>
                  <div>
                    <button
                      title="Mostrar y editar tarea"
                      onClick={() => editTask(task.id)}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-800"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      title="Eliminar tarea"
                      onClick={() => {
                        setTaskToDelete(task.id);
                        deleteDialogRef.current?.showModal();
                      }}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-800"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            title="Exportar tarea como PNG"
            onClick={exportContentAsImage}
            className={`bg-primary text-white px-2 py-1 rounded-md space-x-2 ${splitExpanded ? "block" : "hidden"}`}
          >
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <span>Exportar</span>
          </button>
        </nav>

        <Split
          className="Split flex w-full h-full"
          sizes={isGreaterThanMd ? [75, 25] : [100, 0]}
          minSize={0}
          expandToMin={true}
          gutterSize={12}
          gutterAlign="center"
          direction="horizontal"
          cursor="col-resize"
        >
          <main className="overflow-hidden flex flex-col gap-3 h-full max-h-screen">
            {/* Text Keyboard */}
            <div className="flex flex-wrap p-3 text-sm bg-brands-light overflow-auto max-h-28 md:max-h-32">
              <button
                onClick={() => execCmd("bold")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faBold} />
              </button>
              <button
                onClick={() => execCmd("italic")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faItalic} />
              </button>
              <button
                onClick={() => execCmd("underline")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faUnderline} />
              </button>
              <button
                onClick={() => execCmd("strikeThrough")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faStrikethrough} />
              </button>
              <button
                onClick={() => execCmd("removeFormat")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faEraser} />
              </button>
              <button
                onClick={createLink}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faLink} />
              </button>
              <button
                onClick={() => execCmd("unlink")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faLinkSlash} />
              </button>
              <button
                onClick={() => execCmd("insertOrderedList")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faListOl} />
              </button>
              <button
                onClick={() => execCmd("insertUnorderedList")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faListUl} />
              </button>
              <button
                onClick={() => execCmd("justifyLeft")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faAlignLeft} />
              </button>
              <button
                onClick={() => execCmd("justifyCenter")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faAlignCenter} />
              </button>
              <button
                onClick={() => execCmd("justifyRight")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faAlignRight} />
              </button>
              <button
                onClick={() => execCmd("justifyFull")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faAlignJustify} />
              </button>
              <button
                onClick={() => execCmd("indent")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon icon={faIndent} />
              </button>
              <button
                onClick={() => execCmd("outdent")}
                className="w-8 p-1 rounded hover:bg-brands-medium"
              >
                <FontAwesomeIcon
                  icon={faIndent}
                  style={{ transform: "rotate(180deg)" }}
                />
              </button>
              <label
                htmlFor="foreColor"
                className="flex items-center p-1 gap-2"
              >
                <FontAwesomeIcon icon={faPalette} />
                <input
                  id="foreColor"
                  type="color"
                  onChange={(e) => execCmd("foreColor", e.target.value)}
                  title="Color de texto"
                  className="rounded-md border-none"
                />
              </label>
              <label
                htmlFor="backColor"
                className="flex items-center p-1 gap-2"
              >
                <FontAwesomeIcon icon={faHighlighter} />{" "}
                <input
                  id="backColor"
                  type="color"
                  onChange={(e) => execCmd("backColor", e.target.value)}
                  title="Resaltar texto"
                />
              </label>
              <label htmlFor="fontName" className="flex items-center p-1 gap-2">
                <FontAwesomeIcon icon={faFont} />{" "}
                <select
                  id="fontName"
                  onChange={(e) => execCmd("fontName", e.target.value)}
                  className="rounded bg-brands-light p-1"
                >
                  <option value=""> — Fuente — </option>
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </label>

              <label htmlFor="fontSize" className="flex items-center p-1 gap-2">
                <FontAwesomeIcon icon={faTextHeight} />{" "}
                <select
                  id="fontSize"
                  onChange={(e) => execCmd("fontSize", e.target.value)}
                  className="rounded bg-brands-light p-1"
                >
                  <option value=""> — Tamaño — </option>
                  <option value="1">Pequeño</option>
                  <option value="2">Normal</option>
                  <option value="3">Grande</option>
                  <option value="4">Más grande</option>
                  <option value="5">Muy grande</option>
                  <option value="6">Enorme</option>
                  <option value="7">Gigante</option>
                </select>
              </label>

              <label
                htmlFor="formatBlock"
                className="flex items-center p-1 gap-2"
              >
                <FontAwesomeIcon icon={faHeading} />{" "}
                <select
                  id="formatBlock"
                  onChange={(e) => execCmd("formatBlock", e.target.value)}
                  className="rounded bg-brands-light p-1"
                >
                  <option value=""> — Formato — </option>
                  <option value="h1">Título 1</option>
                  <option value="h2">Título 2</option>
                  <option value="h3">Título 3</option>
                  <option value="p">Párrafo</option>
                </select>
              </label>
            </div>
            {/* Editor */}
            <div className="relative bg-brands-light h-full p-3 overflow-auto">
              {/* Alert */}
              <div className="absolute top-[15px] right-3 text-sm">
                {saveMessage.text && (
                  <div
                    style={{ color: saveMessage.isError ? "red" : "gray" }}
                    className="bg-brands-light"
                  >
                    {saveMessage.text}
                  </div>
                )}
              </div>
              <input
                ref={taskTitleEditorRef}
                type="text"
                placeholder="Editar título de la tarea"
                onChange={updateTaskTitle}
                className="outline-none text-sm text-zinc-500 w-full"
              />
              <hr className="w-full my-3" />
              <div
                ref={taskContentEditorRef}
                contentEditable
                onInput={saveEdit}
                className="h-auto overflow-y-auto overflow-x-hidden outline-none"
              />
            </div>
            {/* Toolbar */}
            <div
              id="toolbar"
              className="flex flex-col max-h-80 w-full gap-3 bg-brands-light p-3"
            >
              <div className="tabs flex gap-2 bg-brands-medium p-1 rounded-md">
                {["∓", "∈", "|x|", "𝔹", "Ψ", "½"].map((tab) => (
                  <div
                    key={tab}
                    className={`tab ${activeTab === tab ? "active" : ""} cursor-pointer py-1 px-3 rounded-md font-semibold`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              <div
                className={`tab-content ${activeTab === "∓" ? "active" : ""} bg-brands-medium p-1 rounded-md min-h-20`}
              >
                <div className="h-full min-w-96 w-auto flex flex-wrap whitespace-nowrap overflow-x-auto">
                  <div className="grid grid-cols-3 w-fit h-fit">
                    {arithmeticOperators.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="separator"></div>
                  <div className="grid grid-cols-2 w-fit h-fit">
                    {relationalOperators.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="separator"></div>
                  <div className="grid grid-cols-4 w-fit h-fit">
                    {geometrySymbols.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`tab-content ${activeTab === "∈" ? "active" : ""} bg-brands-medium p-1 rounded-md min-h-20`}
              >
                <div className="h-full min-w-96 w-auto flex flex-wrap whitespace-nowrap overflow-x-auto">
                  <div className="grid grid-cols-4 w-fit h-fit">
                    {arrows.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="separator"></div>
                  <div className="grid grid-cols-3 w-fit h-fit">
                    {setSymbols.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="separator"></div>
                  <div className="grid grid-cols-3 w-fit h-fit">
                    {logicalOperators.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`tab-content ${activeTab === "|x|" ? "active" : ""} bg-brands-medium p-1 rounded-md min-h-20`}
              >
                <div className="h-full min-w-96 w-auto flex flex-wrap whitespace-nowrap overflow-x-auto">
                  <div className="grid grid-cols-3 w-fit h-fit">
                    {algebraSymbols.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="separator"></div>
                  <div className="grid grid-cols-3 w-fit h-fit">
                    {logicalOperators.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="separator"></div>
                  <div className="grid grid-cols-2 w-fit h-fit">
                    {mathGroupingSymbols.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`tab-content ${activeTab === "𝔹" ? "active" : ""} bg-brands-medium p-1 rounded-md min-h-20`}
              >
                <div className="h-full min-w-96 w-auto flex flex-wrap whitespace-nowrap overflow-x-auto">
                  <div className="grid grid-cols-7 w-fit h-fit">
                    {doubleStruck.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`tab-content ${activeTab === "Ψ" ? "active" : ""} bg-brands-medium p-1 rounded-md min-h-20`}
              >
                <div className="h-full min-w-96 w-auto flex flex-wrap whitespace-nowrap overflow-x-auto">
                  <div className="grid grid-cols-8 w-fit h-fit">
                    {greekAlphabet.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`tab-content ${activeTab === "½" ? "active" : ""} bg-brands-medium p-1 rounded-md min-h-20`}
              >
                <div className="h-full w-full flex">
                  <div className="grid grid-cols-6 w-fit h-fit">
                    {fractions.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="separator"></div>
                  <div className="grid grid-cols-2 w-fit h-fit">
                    {numberTheorySymbols.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="separator"></div>
                  <div className="grid grid-cols-2 w-fit h-fit">
                    {logicSymbols.map((key, index) => (
                      <button
                        key={index}
                        title={key.title}
                        onClick={() => insertMathSymbol(`${key.symbol}`)}
                        className="py-1 w-10 font-medium rounded hover:bg-brands-light"
                      >
                        {key.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Split
            className="flex flex-col max-h-screen"
            sizes={[50, 50]}
            minSize={0}
            expandToMin={true}
            gutterSize={12}
            gutterAlign="center"
            direction="vertical"
            cursor="row-resize"
          >
            {/* Second View */}
            <div className="flex flex-col bg-brands-light overflow-auto">
              <div
                id="secondTaskContainer"
                style={{
                  display: secondTaskId ? "block" : "none",
                }}
                className="grid grid-rows-[auto_1fr_auto] h-full p-3 overflow-auto"
              >
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-sm text-zinc-400">
                    {tasks.find((t) => t.id === secondTaskId)?.title}
                  </h3>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setSecondTaskId(null);
                      setSecondTaskContent("");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-zinc-400 hover:text-zinc-800"
                    />
                  </span>
                </div>
                <div
                  ref={secondTaskEditorRef}
                  contentEditable
                  onInput={(e) =>
                    setSecondTaskContent(e.currentTarget.innerHTML)
                  }
                  dangerouslySetInnerHTML={{ __html: secondTaskContent }}
                  className="outline-none mb-3"
                />
                <button
                  onClick={saveSecondTask}
                  className="bg-primary text-white px-2 py-1 rounded-md space-x-2"
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span>Guardar</span>
                </button>
              </div>

              <div className="p-3">
                <h3 className="text-sm text-zinc-400">
                  Seleccionar otra tarea
                </h3>
                <select
                  onChange={openSecondTask}
                  value={secondTaskId || ""}
                  className="bg-brands-medium rounded-md py-1 px-2 w-full text-sm cursor-pointer mt-1"
                >
                  <option value="">— Seleccionar tarea —</option>
                  {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Integrations */}
            <div className="flex flex-col gap-3 bg-brands-light overflow-hidden">
              <a
                href="https://www.geogebra.org/classic?lang=es"
                target="_blank"
                className="group w-fit flex items-center gap-1 text-lg font-bold h-fit px-3 pt-3"
              >
                <h3>Ver en Geogebra</h3>
                <FontAwesomeIcon
                  icon={faLink}
                  style={{ width: 25 }}
                  className="text-zinc-400 group-hover:text-zinc-800"
                />
              </a>
              <iframe
                src="https://www.geogebra.org/classic/uqhkvuyb?embed"
                width="100%"
                height="100%"
                title="Geogebra simulator"
                className="p-1"
              ></iframe>
            </div>
          </Split>
        </Split>
      </div>
    </>
  );
}
