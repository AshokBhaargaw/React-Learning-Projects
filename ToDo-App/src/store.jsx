import { createContext, useContext, useReducer, useEffect, act } from "react";

export const store = createContext();

export const StoreProvider = ({ children }) => {
    const initialValue = JSON.parse(localStorage.getItem('tasks')) || [
        // { this is only dommy data, so I can userstand easily 
        //    tID: 123,    
        //    tText: "Roti jim lo",
        //    tDone: false,
        // },
    ];

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'addTask':
                return [action.payload, ...state]

            case 'removeTask':
                return state.filter(task => task.tID !== action.payload)

            case 'updateTask':
                return state.map(task => task.tID === action.payload.id ? { ...task, tText: action.payload.text } : task)

            case 'toggleDone':
                return state.map(task => task.tID === action.payload.id ? { ...task, tDone: action.payload.done } : task)

            case 'toggleAllDone':
                return state.map(task => ({ ...task, tDone: action.payload }));

            case 'clearComplated':
                return state.filter(task => task.tDone == false)

            default:
                return state;
        }
    }, initialValue)


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state))
    }, [state])

    return <store.Provider value={{ state, dispatch }} > {children} </store.Provider>
}

export const useTodo = () => useContext(store) 