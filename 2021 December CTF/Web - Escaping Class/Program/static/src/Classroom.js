import React, { useState, useRef } from "react";
import Axios from "axios";
import Editor from "@monaco-editor/react";

import styles from "./app.module.css";

function Classroom() {

    const editorRef = useRef(null);
    const [compilerOutput, setOutput] = useState("");
    const [isRunning, setRunning] = useState(false);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor; 
    }

    function run() {
        let code = editorRef.current.getValue();
        if (isRunning) { return; }
        setRunning(true);
        Axios.post(`/compiler`, {
            code
        }).then(({ data }) => {
            console.log(data);
            setOutput(data.substring(8));
        }).finally(() => {
            setRunning(false);
        });
    }

    return (<>
        <div className={styles.app} style={{ padding: 0, width: '100vw' }}>
            <div className={styles.editor}>
                <span>NodeJS Javascript (pssp this is a clue! :O)</span>
                <Editor
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    language="javascript" />
            </div>
            <div className={styles.compilerHolder}>
                <div className={styles.teacher}>
                    <img src="/assets/teacher.jpg" />
                    <h1>MAKE ME A HELLO WORLD PROGRAM</h1>
                </div>
                <div className={styles.compiler}>
                    <span>Super awesome Javascript compiler<br />&gt;</span>
                    <button onClick={run}>{isRunning ? "Running..." : "Run"}</button>
                    {compilerOutput.split("\n").map((c) => <span>{c}</span>)}
                </div>
            </div>
        </div>
    </>);
}

export default Classroom;