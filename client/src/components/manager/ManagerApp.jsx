import React from 'react';
import CustomerList from './CustomerList.jsx';
import StatusSwitch from './StatusSwitch.jsx';
import AddToQueue from './AddToQueue.jsx';
import Nav from './Nav.jsx';
import ManagerAudit from './ManagerAudit.jsx';
import $ from 'jquery';
import io from 'socket.io-client';
import Modal from 'react-modal';


const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(204, 204, 204, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '300px',
    right: '300px',
    bottom: '100px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};

class ManagerApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      queues: undefined,
      restaurantInfo: {},
      input: '',
      messages: [],
      modalIsOpen: false,
      customerIdReady: []
    };

    // socket initialize
    this.socket = io();

    // dynamically update queue
    this.socket.on('update', () => {
      this.reloadData();
    });

    // listens for 'chat message' and add new messages to array
    this.socket.on('chat message', (message) => {
      let oldMessages = this.state.messages;
      this.setState({messages: oldMessages.concat(message)});
    });

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleGroupSize = this.handleGroupSize.bind(this);
    this.sendSMS = this.sendSMS.bind(this);
  }

  componentDidMount() {
    this.reloadData();
  }

  sendSMS(customerInfo){
    $.ajax({
      url: '/sendsms',
      method: 'POST',
      data: customerInfo,
      success: (data) => {
        console.log('SMS sent for ', customerInfo)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Naive implementation
  handleGroupSize(tableSize){
    let queue = this.state.queues;
    let results = this.state.customerIdReady;
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].size === tableSize && queue[i].size <= 2) {

        if (results.includes(queue[i].customerId)){
          console.log(queue[i].customerId, " already included in results")
        } else {
          results.push(queue[i].customerId);
          this.setState((state, props) => {
            return {
              customerIdReady: results
            }
          });
          return
       }
      }
      if (queue[i].size === tableSize) {
        if (results.includes(queue[i].customerId)){
          console.log(queue[i].customerId, " already included in results")
        } else {
          results.push(queue[i].customerId);
          this.setState((state, props) => {
            return {
              customerIdReady: results
            }
          });
          return;
      }
    }
  }
}

  openModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleOnChange(ev) {
    this.setState({ input: ev.target.value });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    this.socket.emit('chat message', { name: this.state.restaurantInfo.name, message: this.state.input });
    this.setState({ input: '' });
  }

  switchStatus() {
    $.ajax({
      url: '/api/restaurants?restaurantId=1&status=' + (this.state.restaurantInfo.status === 'Open' ? 'Closed' : 'Open'),
      method: 'PATCH',
      success: (data) => {
        this.reloadData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  notiCustomer(queueId) {
    this.socket.emit('noti customer', queueId);
  }

  addToQueue(customer) {
    customer.restaurantId = 1;
    $.ajax({
      method: 'POST',
      url: '/api/queues',
      data: JSON.stringify(customer),
      contentType: 'application/json',
      success: (data) => {
        this.reloadData();
      },
      failure: (error) => {
        console.log('something went wrong with the post request', error);
      }
    });
  }

  removeCustomer(queueId) {
    $.ajax({
      url: '/api/queues?queueId=' + queueId,
      method: 'PUT',
      success: (data) => {
        this.reloadData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  reloadData() {
    $.ajax({
      url: '/api/restaurants?restaurantId=1',
      success: (data) => {
        this.setState(
          {
            restaurantInfo: data,
            queues: data.queues
          });
        // report restaurantId to server socket
        this.socket.emit('manager report', this.state.restaurantInfo.id);
        let imageURL = `url(/${data.image})`;
        $('.jumbotron-billboard').css('background', imageURL);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    const messages = this.state.messages;
    const message = messages.map(item => {
      return (
        <div className='row'>
          <div >
            {`<${item.name}> : ${item.message}`}
          </div>
        </div>
      );
    });

    return (
      <div>
        <Nav check={this.openModal} status={this.state.restaurantInfo.status} switchStatus={this.switchStatus.bind(this)}/>
        <div className="jumbotron text-center jumbotron-billboard">
          <h1 id="grand-title">{this.state.restaurantInfo.name || 'Restaurant Name'}</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>Total groups in queue</h2>
              <div id="number-in-queue">{this.state.restaurantInfo.queues ? this.state.restaurantInfo.queues.length : '0'}</div>
              <h2>Approximate Wait Time</h2>
              <div id="number-in-queue">{this.state.restaurantInfo.total_wait}</div>
              <ManagerAudit />
            </div>
            <div className="col-md-6">

                <h3>Table Availability</h3>

                <div className="panel panel-default">
                    <button onClick={()=>{this.handleGroupSize(2)}} type="button" className="btn btn-primary btn-color btn-bg-color  col-xs-2">
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 2
                    </button>
                    <button onClick={()=>{this.handleGroupSize(3)}} type="button" className="btn btn-warning btn-color btn-bg-color  col-xs-2">
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 3
                    </button>
                    <button onClick={()=>{this.handleGroupSize(4)}} type="button" className="btn btn-success btn-color btn-bg-color  col-xs-2">
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 4
                    </button>
                    <button onClick={()=>{this.handleGroupSize(5)}} type="button" className="btn btn-danger btn-color btn-bg-color  col-xs-2">
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 5
                    </button>
                    <button onClick={()=>{this.handleGroupSize(6)}} type="button" className="btn btn-info btn-color btn-bg-color  col-xs-2">
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 6
                    </button>
                    <button onClick={()=>{this.handleGroupSize(7)}} type="button" className="btn btn-dark btn-color btn-bg-color  col-xs-2" style={{"marginRight": "0"}}>
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 7
                    </button>
                </div>
            </div>

            <div className="col-md-6">
              <br/>
              <CustomerList sendSMS={this.sendSMS} readyId={this.state.customerIdReady} queues={this.state.queues} addCustomer={this.addToQueue.bind(this)} removeCustomer={this.removeCustomer.bind(this)} notiCustomer={this.notiCustomer.bind(this)}/>
            </div>

          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.hideModal}
            style={modalStyles}
          >
            <div >
              {message}
            </div>
            <br/>
            <div className="input-group" style={{'position': 'absolute', 'bottom': '0', 'width': '90%'}}>
              <input type="text" className="form-control" placeholder="chat..." aria-label="chat..." onChange={this.handleOnChange} value={this.state.input}/>
              <span className="input-group-btn">
                <button className="btn btn-outline-primary" type="button" onClick={this.handleOnSubmit}>Send</button>
                <button className="btn btn-outline-primary" type="button" onClick={this.hideModal}>Close</button>
              </span>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ManagerApp;
