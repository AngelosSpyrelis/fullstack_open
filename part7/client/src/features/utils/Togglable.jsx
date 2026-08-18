import { useState, useImperativeHandle } from 'react';

const Toggleable = ({ children, ref }) => {

    const [isOpen, setOpenStatus] = useState(false);

    const openButtonStyle = { display: (isOpen)? 'none': '' };
    const closeButtonStyle = { display: (!isOpen)? 'none': '' };

    const toggleDisplay = (event) => {
        const target = event.target.closest('.toggleable-button');
        if(!target){ return; }
        if(target.dataset.action === 'open'){
            setOpenStatus(true);
        }
        else{
            setOpenStatus(false);
        }
        return;
    };

    useImperativeHandle(ref, () => {
        return { setOpenStatus };
    });

    return(
        <div onClick={ toggleDisplay }>
            <button data-action="open" className="toggleable-button" style={ openButtonStyle }>Add Blog</button>
            <div style={ closeButtonStyle }>
                { children }
                <button data-action="close" className="toggleable-button" >Cancel</button>
            </div>
        </div>
    );
};

export default Toggleable;