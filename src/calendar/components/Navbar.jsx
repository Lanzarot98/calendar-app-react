import { useAuthStore } from "../../hooks"


export const Navbar = ({ onChangeLanguage }) => {

  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>

        <button
          className="btn btn-outline-primary"
          onClick={ onChangeLanguage }
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Change language</span>
        </button>

        <button 
          className="btn btn-outline-danger"
          onClick={ startLogout }
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Exit</span>
        </button>
    </div>
  )
}
