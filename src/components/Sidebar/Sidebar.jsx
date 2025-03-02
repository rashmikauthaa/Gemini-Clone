import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <aside className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
            <div className={`top ${extended ? '' : 'centered'}`}>
                <div className="menu" onClick={() => {
                    setExtended(prev => !prev);
                    console.log("Menu Clicked! Extended:", !extended); // Debugging
                }}>
                    <img src={assets.menu_icon} alt="Menu Icon" />
                </div>
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    <p className={`${extended ? 'block' : 'none'}`}>New Chat</p>
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p className="recent-entry-p">{item.slice(0, 18)} ...</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className={`bottom ${extended ? '' : 'centered'}`}>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon" />
                    <p className={`fade ${extended ? 'block' : 'none'}`}>Help</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History Icon" />
                    <p className={`fade ${extended ? 'block' : 'none'}`}>Activity</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings Icon" />
                    <p className={`fade ${extended ? 'block' : 'none'}`}>Settings</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;