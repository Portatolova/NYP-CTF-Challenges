import React, { useEffect, useRef, useState } from "react"
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import QuillCursors from 'quill-cursors';
import ReactQuill, { Quill } from "react-quill";
import { v4 } from "uuid";

Quill.register('modules/cursors', QuillCursors)

export default function App() {

  const quill = useRef();
  const [id, setID] = useState("")

  useEffect(() => {

    if (id === "" || id.length < 5) {
      setID(v4());
      return;
    }

    const editor = quill.current.getEditor();

    let toolbars = Array.from(document.getElementsByClassName("ql-toolbar"));

    for (let i = 0; i < toolbars.length - 1; i++) {
      toolbars[i].remove()
    }


    // 
    //  NOTE: USE FIREFOX WHEN SOLVING THIS CHALLENGE, CHROME OR OTHER CHROMIUM BROWSERS SEEM TO HAVE ISSUES
    //
    const ydoc = new Y.Doc()
    const provider = new WebrtcProvider(id, ydoc, { password: "lmao", signaling: ["wss://quillyjs-stun.nypinfsecctf.tk"] })
    const ytext = ydoc.getText('quill')

    const binding = new QuillBinding(ytext, editor, provider.awareness)

    /*
    // Define user name and user name
    // Check the quill-cursors package on how to change the way cursors are rendered
    provider.awareness.setLocalStateField('user', {
      name: 'Typing Jimmy',
      color: 'blue'
    })
    */

    provider.connect()

    return () => {
      ydoc.destroy();
    }

  }, [quill, id]);

	return (<>
    <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
      Your Room ID is:
      <input type="text" value={id} onChange={(e) => setID(e.target.value)} style={{ marginLeft: 20, marginRight: 20, width: 400, outline: "none" }} />
      <span>(Paste your ID directly, deleting the entire textfield will not work)</span>
    </div>
		<ReactQuill style={{ height: "calc(100vh - 110px)" }} ref={quill} />
	</>);
}
