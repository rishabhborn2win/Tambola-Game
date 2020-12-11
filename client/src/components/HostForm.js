import {connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import {notifyFill} from '../actions/game'
const HostForm = ({notifyFill}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        notifyFill();
    }
    return (
        <div>
            <form action='/' onSubmit={(e) => onSubmit(e)}>
                <label for="host"></label>
                <input type="text" id="host" name="host"></input>
                <input type="submit" value="Create Game"></input>
            </form>
        </div>
    )
}

HostForm.prototype = {
    notifyFill: PropTypes.func.isRequired
}

export default connect(null, {notifyFill})(withRouter(HostForm));