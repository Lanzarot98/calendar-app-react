import { fireEvent, render, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useUiStore } from "../../../src/hooks/useUiStore";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
// import { store } from "../../../src/store";

// jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUiStore');

describe('Pruebas en <FabDelete />', () => { 
    
    const mockStartDeletingEvent = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks()
        jest.clearAllTimers() // si quisiéramos limpiar los intervalos
    });

    test('should de mostrar el componente correctamente', () => { 
    
        // jest.fn().mockReturnValue
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });
        useUiStore.mockReturnValue({
            isDateModalOpen: false
        });


        render(<FabDelete />);
        // screen.debug();
        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');
    });
    
    test('debe de mostrar el botón si hay un evento activo', () => { 
    
        // jest.fn().mockReturnValue
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });
        useUiStore.mockReturnValue({
            isDateModalOpen: false
        });


        render(<FabDelete />);
        // screen.debug();
        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        expect( btn.style.display ).toBe('');
    });
    
    test('debe de llamar el startDeletingEvent si hay evento activo', () => { 
    
        // jest.fn().mockReturnValue
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });
        useUiStore.mockReturnValue({
            isDateModalOpen: false
        });


        render(<FabDelete />);
        // screen.debug();
        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalledWith()
    });

})