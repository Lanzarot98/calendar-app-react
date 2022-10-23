import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from "../";

import { getMessagesES, localizer } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

  const [language, setLanguage] = useState(false);

  const onChangeLanguage = () => {
    setLanguage( current => !current ); // cambiar el valor boolean
  }

  // custom hook
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({event, start, end, isSelected});

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '5px',
      opacity: 2,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal();
  }
  
  const onSelect = ( event ) => {
    console.log({ click: event })
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

  return (
    <>
      <Navbar onChangeLanguage={ onChangeLanguage }/>
      
      <div>
        <Calendar
          culture={ language && 'es'}
          messages = { language && getMessagesES() }
          localizer={ localizer }
          events={ events }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged }
          defaultView={ lastView }
        />

          <CalendarModal />
          <FabAddNew />
      </div>


    </>
  )
}
