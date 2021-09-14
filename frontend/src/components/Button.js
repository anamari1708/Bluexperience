import React from 'react';
import '../css/Button.css'

const STYLES =['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large' ];

export const Button = props => {
    const checkButtonStyle= STYLES.includes(props.buttonStyle) ? props.buttonStyle : STYLES[0]; 
    const checkButtonSize= SIZES.includes(props.buttonSize) ? props.buttonSize : STYLES[0]; //ako je buttonSize u ovome, postavi tu, a ako je nema, postavi na ovu prvu

    //sve sta stavimo unutar button-a bit ce renderano na taj nacin 
    return (
            <button 
                className={`btn ${checkButtonSize} ${checkButtonStyle}`}
                onClick={props.onClick}
                type={props.type}
            >
                {props.children} 
            </button>
    )
}