import React from 'react';
import ReactCountdown from 'react-countdown-clock';

export default class CustomerListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changeHtml: false,
      render: false,
      showTimer: false
    }
    this.checkStateForRender = this.checkStateForRender.bind(this);
    this.customerTimeUp = this.customerTimeUp.bind(this);
  }

  componentWillMount() {
    this.checkStateForRender();
  }

  customerTimeUp() {
    this.setState({
      changeHtml: true
    })
  }

// sendSMS={this.props.sendSMS}

  checkStateForRender() {
    if (this.state.render === false) {
      this.setState({
        render: true,
        showTimer: true
      });

    } else {
      //do nothing
    }

  }
  render() {

let timer = null;
for (var i = 0; i < this.props.readyId.length; i++) {
  if (this.props.readyId[i] === this.props.queue.customerId){
    timer = <ReactCountdown  className="col-md-6" seconds={5} size={40} onComplete={()=>{this.customerTimeUp()}}/>
    this.props.notiCustomer(this.props.queue.id);
    this.props.sendSMS(this.props.queue);
  } else {
  // do nothing
  }
}
    return (
      <div className="row panel-body">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">

              {this.state.changeHtml ?
                <h3 style={{"color":"red", "textAlign": "left", "verticalAlign": "top"}}>{this.props.queue.customer.name}</h3> :
                <h3 style={{"textAlign": "left", "verticalAlign": "top"}}>{this.props.queue.customer.name}</h3>}

            </div>

              {this.state.showTimer ? timer : console.log('do nothing')}

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
          <button className="btn-success btn-sm entry-button" onClick={() => {this.props.notiCustomer(this.props.queue.id); this.props.sendSMS(this.props.queue); }}><i className="fa fa-bullhorn fa-fw" aria-hidden="true"></i>Ready </button>
        </div>
      </div>
    );
  }
};
