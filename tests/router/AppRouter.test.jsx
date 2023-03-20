import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))


describe('Pruebas en <AppRouter />', () => { 
    
    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => { 
        
        useAuthStore.mockReturnValue({
            // errorMessage: undefined,
            status: 'checking',
             checkAuthToken: mockCheckAuthToken
            // user: {}
        });

        render(<AppRouter/>);
        // screen.debug();
        expect( screen.getByText('Cargando...') ).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();

    });

    test('debe de mostrar el login en caso de nos estar autenticado', () => {   

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        const { container } = render(
            <MemoryRouter initialEntries={['/auth/algo']} >
                <AppRouter/>
            </MemoryRouter>
        );
        // screen.debug();
        expect( screen.getByText('Login') ).toBeTruthy();
        expect( container ).toMatchSnapshot();

    });
    
    test('debe de mostrar el calendario si estamos autenticados', () => {   

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        render(
            <MemoryRouter >
                <AppRouter/>
            </MemoryRouter>
        );
        // screen.debug();
        expect( screen.getByText('CalendarPage') ).toBeTruthy();
        

    });

});