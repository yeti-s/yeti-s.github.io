import React from "react";
import MiniBox from "./MiniBox";

const style = {
    wrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    level_box: {
        width: 35,
        backgroundColor: 'yellow'
    }
}

const TestInfo = ({url, level, solved}) => {
    return (
        <div style={style.wrapper} href={url}>
            <MiniBox color="warning" text={`Lv. ${level}`}/>
            <MiniBox color={solved ? "info" : "error"} text={solved ? 'sol':'unsol'}/>
        </div>
    )
}

export default TestInfo