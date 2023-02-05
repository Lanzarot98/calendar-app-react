import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo Update
        if( calendarEvent._id ) {
            // actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            // console.log({data});

            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) )
        }

    }

    const startDeletingEvent = () => {
        // Todo: llevar al backend
        dispatch( onDeleteEvent() )
    }

    const startLoadingEvents = async() => {
        try {
            
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.events );
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
        hasEventSelected: !!activeEvent?._id, //si es null regresa falso, si tiene un objeto regresa true

        // métodos:
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
