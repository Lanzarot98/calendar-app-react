import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { store, uiSlice } from "../../src/store";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Pruebas en useUiStore', () => { 
    
    test('Debe regresar los valores por defecto', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: false })

        // renderizar el hook:
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
        
        // console.log( result );
        expect( result.current ).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        })

    });

    test('openDateModal debe de colocar true en el isDateModalOpen', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: false })

        // renderizar el hook:
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
        
        const { /*isDateModalOpen,*/ openDateModal } = result.current; // no serviría tomar el isDateModalOpen tener cuidado con este tipo de desestructuración
        // por lo que se recomienda tomar valores primitivos

        act( () => {
            openDateModal();
        });

        console.log({result: result.current/*, isDateModalOpen*/ }); // 
        expect( result.current.isDateModalOpen ).toBeTruthy();

    })
 
});