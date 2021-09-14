import React from "react";

function Popup(props){
    return( props.trigger ) ? (
        <div className="popup">
            <div className="popup-inner">
                <button type="button" className="btn-close btn-popup-close x-btn " onClick={() => props.setTrigger(false)}></button>
                { props.children }</div>
            </div>
    ) : "";
}

export default Popup