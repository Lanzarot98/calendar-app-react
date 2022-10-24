import { useCalendarStore, useUiStore } from "../../hooks"


export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    const { isDateModalOpen, closeDateModal } = useUiStore();
    
    const handleDelete = () => {
        startDeletingEvent();
    }
    // const isModalClose = () => {
    //     if (isDateModalOpen) {
    //         return false
    //     }
    // }

  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
            display: hasEventSelected && !isDateModalOpen ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt" ></i>
    </button>
  )
}
