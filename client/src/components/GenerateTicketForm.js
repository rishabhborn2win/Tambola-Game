import React from 'react'

const GenerateTicketForm = () => {
    const [formData, setFormData] = useState({
        playername: "",
        noOfTickets
      });
      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    return (
        <div>
           <Fragment>
      <Heading text="Generate Ticket" />
      {/* <span class="text-span">Join Game Form:-</span> */}
      <div className="container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="form-input-group">
            <label class="omrs-input-underlined">
              <input
                className="input-fields"
                placeholder="Player Name"
                type="text"
                id="playername"
                name="playername"
                onChange={(e) => onChange(e)}
              ></input>
            </label>
          </div>
          <div class="omrs-input-group">
            <label class="omrs-input-underlined">
              <input
                className="input-fields"
                placeholder="No. Of Tickets"
                type="text"
                id="noOfTickets"
                name="noOfTickets"
                onChange={(e) => onChange(e)}
              ></input>
            </label>
          </div>
          <input
            type="submit"
            value="Generate"
            className="btn-lg btn-primary float-right"
          ></input>
        </form>
      </div>
    </Fragment>
        </div>
    )
}

export default GenerateTicketForm;
