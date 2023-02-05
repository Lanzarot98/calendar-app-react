import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar ); // viene de la carpeta store el archivo calendarSlice

    const { user } = useSelector( state => state.auth ); // viene de la carpeta store el archivo authSlice

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo Update

        try {
            
            if( calendarEvent.id ) {
                // actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
    
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }
            // creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            // console.log({data});
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) )
        } catch (error) {
           console.log(error);
           Swal.fire('Failed to save', error.response.data.msg,'error');
        }

    }

    const startDeletingEvent = async() => {
        // Todo: llevar al backend

        try {
            
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() )

        } catch (error) {
            console.log(error);
            Swal.fire('Failed to delete', error.response.data.msg,'error');
        }

    }

    const startLoadingEvents = async() => {
        try {
            
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.events );
            dispatch( onLoadEvents( events ) );
            console.log({data});
            console.log(events);


        } catch (error) {
            console.log('Error Cargando Eventos');
            console.log(error)
        }
    }

    return {
        // propiedades:
        activeEvent,
        events,
        hasEventSelected: !!activeEvent?.id, //si es null regresa falso, si tiene un objeto regresa true

        // métodos:
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
