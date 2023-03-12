import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser";


describe('Pruebas en authSlice', () => {

    test('should de regresar el estado inicial', () => { 

        expect( authSlice.getInitialState() ).toEqual( initialState );
    
    });

    test('debe de realizar un login', () => { 
        
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        // console.log( state );
        expect( state ).toEqual({ 
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
         
    });

    test('debe de realizar el logout', () => { 
        
        const state = authSlice.reducer( authenticatedState, onLogout( ) );
        // console.log( state );
        expect( state ).toEqual({ 
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
         
    });
    
    test('debe de mandar el mensaje de error', () => { 
        const errorMessage = 'Credenciales no válidas'
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        // console.log( state );
        expect( state ).toEqual({ 
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
         
    });
    
    test('debe de limpiar el mensaje de error', () => { 
        const errorMessage = 'Credenciales no válidas'
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        // console.log( state );
        const newState = authSlice.reducer( state, clearErrorMessage() )
        expect( newState.errorMessage ).toBe( undefined );
         
    });
    
    test('debe de estar en checking si realizo un login o logout', () => { 
        let state = authSlice.reducer( authenticatedState, onLogin( testUserCredentials ) );
        // console.log( state );
        state = authSlice.reducer( state, onChecking(  ) );
        expect( state ).toEqual( initialState );
         
    });
})
