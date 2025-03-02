import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState(""); // used to save input data(prompt)
    const [recentPrompt, setRecentPrompt] = useState(""); // on clicking send button -> prompt is saved here
    const [prevPrompt, setPrevPrompt] = useState([]); // used to save all prompts and show them in recent tab
    const [showResult, setShowResult] = useState(false); // if true, hide cards and show result
    const [loading, setLoading] = useState(false); // if true, show loading spinner
    const [resultData, setResultData] = useState(""); // used to display on webpage

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");

        newResponseArray.forEach((word, index) => {
            delayPara(index, word + " ");
        });

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        newChat,
    }; // an object that holds state variables and functions shared across multiple components

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;