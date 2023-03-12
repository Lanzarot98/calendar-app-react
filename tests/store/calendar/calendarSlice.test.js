import { calendarSlice, onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../../../src/store"
import { calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('Pruebas en calendarSlice', () => { 
    
    test('should de regresar el estado por defecto', () => { 
        
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
     
    });

    test('onSetActiveEvent debe activar el evento', () => { 
    
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        // console.log( calendarWithEventsState );
        // console.log( state );
        expect( state.activeEvent ).toEqual( events[0] ); // que el evento activo que selecciono sea el mismo que al que le estoy pasando en la función.
    
    });
    
    test('onAddNewEvent debe añadir el evento', () => { 
        // añado un evento y luego si realizo el método
        const newEvent = {
            id: '3', // debe ser un id diferente
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: "Luis's birthday!!",
            notes: 'Some Note!!'
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        // console.log(state);
        // expect( state.events[2] ).toEqual( newEvent ); // puede ser así
        expect( state.events ).toEqual([ ...events, newEvent ]); // esparzo los eventos (los que llevo creados inicialmente) coma más el nuevo evento es como un [1,2,3] el ",3" es el nuevo evento que añadí
        
    });
    
    test('onUpdateEvent debe actualizar el evento', () => { 
        // añado un evento y luego si realizo el método
        const updatedEvent = {
            id: '1', // debe ser un id diferente
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: "Luis's birthday updated",
            notes: 'Some Note updated'
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
        console.log(state);
        expect( state.events ).toContain( updatedEvent );
        
    });

});