import React from "react";

const theme = {
    'warning': {
        color: '#ffffff',
        borderColor: '#ffeb9d',
        backgroundColor: '#fdd510'
    },
    'error': {
        color: '#ffffff',
        borderColor: '#ffeb9d',
        backgroundColor: '#ff0909'
    },
    'info': {
        color: '#ffffff',
        borderColor: '#ffeb9d',
        backgroundColor: '#107afd'
    }
}

const MiniBox = ({color, text}) => {
    const style = {
        backgroundColor: color,
        color: theme[color].color,
        borderColor: theme[color].borderColor,
        backgroundColor: theme[color].backgroundColor,
        width: 65,
        height: 27,
        border: '1px solid',
        borderRadius: '1rem',
        textAlign: 'center',
        margin: '0px 4px 0px 4px',
        fontFamily: `"IBM Plex Sans",-apple-system,BlinkMacSystemFont,sans-serif`
    }

    return <div style={style}>{text}</div>
}

export default MiniBox