import { createContext } from "react";
import runChat  from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState(""); // used to save input data(prompt)
    const [recentPrompt, setRecentPrompt] = useState(""); // on clicking on send button-> prompt is saved in this 
    const [prevPrompt, setPrevPrompt] = useState([]); // used to save all prompts and showed in recent tab as history
    const [showResult, setShowResult] = useState(false); // if true hide cards and show result
    const [loading, setLoading] = useState(false); // if true show loading spinner, then false once data is obtained
    const [resultData, setResultData] = useState(""); // used to display on webpage




    const onSent = async (prompt) => {
        await runChat(prompt);
    }

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
        input
    } // an object that holds state variables and functions which is shared across multiple components

    return (
        <Context.Provider value={{contextValue}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;