import React, { useEffect, useState } from "react";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";

import styles from "./app.module.css";
import Page3 from "./pages/page3";
import Page4 from "./pages/page4";
import Page5 from "./pages/page5";
import Page6 from "./pages/page6";
import Page7 from "./pages/page7";

function Main() {

    const [screen, setScreen] = useState(0);

    useEffect(() => {

        const i = setInterval(() => {
            setScreen(screen + 0.5);
            if (screen === 6) {
                clearInterval(i);
            }
        }, 2000);

        return () => {
            clearInterval(i);
        }


    }, [screen])

    return (<>

        <div className={styles.app}>
            <Page1 mounted={screen === 0} />
            <Page2 mounted={screen === 1} />
            <Page3 mounted={screen === 2} />
            <Page4 mounted={screen === 3} />
            <Page5 mounted={screen === 4} />
            <Page6 mounted={screen === 5} />
            <Page7 mounted={screen >= 6} />
        </div>
    </>)
}

export default Main;
