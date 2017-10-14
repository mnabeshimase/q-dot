import React from 'react';
import ReactCountdown from 'react-countdown-clock';

export default class CustomerListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showTimer: false,

    }

  }

  render() {
    return (
      <div className="row panel-body">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <h3 >{this.props.queue.customer.name}</h3>
            </div>

              {this.props.readyId.includes(this.props.queue.customerId) ? <ReactCountdown  className="col-md-6" seconds={600} size={50} /> : console.log('Waiting')}

          </div>
            <div className="row">
              <p className="col-md-6"><i className="fa fa-mobile fa-fw" aria-hidden="true"></i> {this.props.queue.customer.mobile}</p>
              {this.props.queue.customer.email ? <p><i className="fa fa-envelope-o fa-fw" aria-hidden="true"></i> {this.props.queue.customer.email}</p> : null}
            </div>




            <div className="row">
              <p className="col-md-6"><i className="fa fa-users fa-fw" aria-hidden="true"></i> {this.props.queue.size}</p>
              <p><i className="fa fa-clock-o fa-fw" aria-hidden="true"></i> {this.props.queue.wait} mins</p>
            </div>
        </div>

        <div className="col-md-4 row">
          <button className="btn-primary btn-sm entry-button" data-dismiss="modal" onClick={() => this.props.showModal(this.props.queue)}><i className="fa fa-user-times fa-fw" aria-hidden="true"></i>Remove</button>
          <button className="btn-success btn-sm entry-button" onClick={() => this.props.notiCustomer(this.props.queue.id)}><i className="fa fa-bullhorn fa-fw" aria-hidden="true"></i>Ready </button>
        </div>
      </div>
    );
  }
};
