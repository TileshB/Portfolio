import React from 'react';

const Languages = ({open, section}) => {
    let content;

    if (section == "3D"){
        content = (
            <div>
                <img className="lang-icon" src="" alt=""/>
                <img className="lang-icon" src="" alt=""/>
            </div>
        )
    }
    return <div className={`lang ${open} ${section}`}>
        <h3>Some of the tools/programs I'm familiar with:</h3>
        {content}
    </div>
};

export default Languages