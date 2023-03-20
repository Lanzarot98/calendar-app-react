import { configureStore } from "@reduxjs/toolkit"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { calendarApi } from "../../src/api"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authSlice } from "../../src/store"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser"



const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}


describe('Pruebas en useAuthStore', () => { 

    // si hay algo que necesito hacer en cada prueba, puedo hacer un beforeEach:
    beforeEach(() => localStorage.clear());
    
    test('Debe de regresar los valores por defecto', () => {  
    
        const mockStore = getMockStore( { ...initialState
            // status: 'checking', // 'authenticated', 'not-authenticated',
            // user: {},
            // errorMessage: undefined,
        } );

        // Renderizar el hook:
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        } );

        // console.log( result );
        expect( result.current ).toEqual({
            status:         'checking',
            user:           {},
            errorMessage:   undefined,
            checkAuthToken: expect.any(Function),
            startLogin:     expect.any(Function),
            startLogout:    expect.any(Function),
            startRegister:  expect.any(Function),
        });
    
    });

    test('startLogin debe de realizar el login correctamente', async () => { 
        
        // localStorage.clear(); // primero limpiar el localStorage para asegurarnos que estamos recibiendo lo que esperamos

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        } );

        // si queremos esperar y darle chance de que pueda recoger los datos debemos hacer async
        await act(async() => { // esperar que la promesa termine
            await result.current.startLogin( testUserCredentials );
        });
        
        const { errorMessage, status, user } = result.current;
        // console.log( result.current );
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '63e02bdd679531209723b3dd' }
        });

        // espero que me devuelva un token, y sabemos que todo lo que este en el localStorage es un string, por eso coloco que el tipo de dato es ese.
        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );

    });

    test('startLogin debe de fallar la autenticación',async () => {
        
        // localStorage.clear();
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        } );

        // si queremos esperar y darle chance de que pueda recoger los datos debemos hacer async
        await act(async() => { // esperar que la promesa termine
            await result.current.startLogin( {email: 'pruebaFalle@google.com', password: '123456'} );
        });

        const { errorMessage, status, user } = result.current;
        // console.log({ errorMessage, status, user });
        // console.log(localStorage.getItem('token')); // se espera null
        expect(localStorage.getItem('token')).toBe(null);
        // lo siguiente viene del backend por lo que si deciden cambiar el mensaje, tendría un error
        // podemos esperar un string si queremos que siempre pase, pero podemos dejarlo así mientras.
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Incorrect credentials',
            status: 'not-authenticated',
            user: {}
        });

        await waitFor( 
            () => expect( result.current.errorMessage ).toBe(undefined)
        );

    });

    test('startRegister debe de crear un usuario', async() => { 
        // localStorage.clear();
        const newUser = {email: 'prueba@google.com', password: '123456789', name: 'Test User 2'};
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        } );

        // esto se dispara cuando el calendarApi se dispare para hacer un post
        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: "ALGUN-ID",
                name: "Test User",
                token: "ALGUN-TOKEN"
            }
        });

        // si queremos esperar y darle chance de que pueda recoger los datos debemos hacer async
        await act(async() => { // esperar que la promesa termine
            await result.current.startRegister( newUser );
        });

        const { errorMessage, status, user } = result.current;

        // console.log({ errorMessage, status, user });
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: 'ALGUN-ID' }
        });

        spy.mockRestore(); // para destruir el espía por si acaso en otra prueba llegamos a usarlo

    });

    test('startRegister debe de fallar la creación', async() => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        } );

       
        // si queremos esperar y darle chance de que pueda recoger los datos debemos hacer async
        await act(async() => { // esperar que la promesa termine
            await result.current.startRegister( testUserCredentials );
        });

        const { errorMessage, status, user } = result.current;

        // console.log({ errorMessage, status, user });
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: "An user exist with that email",
            status: "not-authenticated",
            user: {}
        });

    });

    test('checkAuthToken debe de fallar si no hay token', async() => { 
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        } );

        // console.log('token', localStorage.getItem('token'));
       
        // si queremos esperar y darle chance de que pueda recoger los datos debemos hacer async
        await act(async() => { // esperar que la promesa termine
            await result.current.checkAuthToken( );
        });

        const {errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });

    });

    test('checkAuthToken debe de autenticar si hay token', async() => { 
        
        const { data } = await calendarApi.post('/auth', testUserCredentials);
        // console.log(data);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        } );

        // console.log('token', localStorage.getItem('token'));
       
        // si queremos esperar y darle chance de que pueda recoger los datos debemos hacer async
        await act(async() => { // esperar que la promesa termine
            await result.current.checkAuthToken( );
        });

        const {errorMessage, status, user } = result.current;
        // console.log({errorMessage, status, user });
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '63e02bdd679531209723b3dd' }
        });

    });

    test('startLogout debe cerrar sesión', () => { 

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        } );    
         
        act(() => {
             result.current.startLogout( );
        });

        const {errorMessage, status, user } = result.current;
        // console.log({errorMessage, status, user });
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });

    });
 

});
