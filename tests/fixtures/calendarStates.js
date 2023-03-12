// cómo espero que mis eventos sean grabados:
export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: "Luis's birthday",
        notes: 'Some Note'
    },
    {
        id: '2',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00'),
        title: "Melissa's birthday",
        notes: 'Some Note of Melissa'
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [ ],
    activeEvent: null
};

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ], // el objetivo de esparcirlos es romper las referencias por si se hace alguna modificación o eliminación
    activeEvent: null
};

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ], // el objetivo de esparcirlos es romper las referencias por si se hace alguna modificación o eliminación
    activeEvent: { ...events[0] }
}