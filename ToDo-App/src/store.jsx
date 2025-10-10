import { createContext, useContext, useReducer, useEffect } from "react";

export const store = createContext();

export const StoreProvider = ({ children }) => {
    const initialValue = JSON.parse(localStorage.getItem('tasks')) || [
        // {
        //    tID: 123,    this is only dommy data, so I can userstand easily 
        //    tText: "Roti jim lo",
        //    tDone: false,
        // },
    ];

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'addTask':
                return [action.payload, ...state]

            case 'removeTask':
                return state.filter((task) => action.payload !== task.tID ? state : null)

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