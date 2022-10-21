

export const Navbar = ({ onChangeLanguage }) => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            Luis Miguel
        </span>

        <button
          className="btn btn-outline-primary"
          onClick={ onChangeLanguage }
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Change language</span>
        </button>

        <button className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt"></i>
            <span>Exit</span>
        </button>
    </div>
  )
}
