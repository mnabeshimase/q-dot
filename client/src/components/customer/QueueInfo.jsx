import React from 'react';
import { Link } from 'react-router-dom';
import CustomerNav from './CustomerNav.jsx';
import CustomerBanner from './CustomerBanner.jsx';
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
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    margin: '0 auto'
  }
};

export default class QueueInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCustomer: {
        restaurant: {
          name: ''
        }
      },
      ready: false,
      messages: [],
      input: '',
      modalIsOpen: false
    };
    // socket initialize
    this.socket = io();
    // dynamically update if table is ready
    this.socket.on('noti', (message) => {
      console.log(message);
      this.setState({ ready: true });
    });

    this.socket.on('chat message', (message) => {

      let oldMessages = this.state.messages;
      this.setState({messages: oldMessages.concat(message)});
    });

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.getCurrentCustomerId();
  }

  openModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  hideModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  handleOnChange(ev) {
    this.setState({ input: ev.target.value });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    this.socket.emit('chat message', { name: `<Customer:${this.state.currentCustomer.name}>`, message: this.state.input });

    this.setState({ input: '' });
  }

  getCurrentCustomerId() {
    let windowUrl = window.location.href;
    let id = windowUrl.slice(-1);

    $.ajax({
      method: 'GET',
      url: `/queues?queueId=${id}`,
      success: (data) => {
        console.log('successfully grabbed queue data for customer', data);
        this.setState({ currentCustomer: data });
        // report queueId to server socket
        this.socket.emit('customer report', id);
      },
      failure: (error) => {
        console.log('failed to grab queue data for customer', error);
      }
    });
  }
  removeFromQueue() {
    let windowUrl = window.location.href;
    let id = windowUrl.slice(-1);
    $.ajax({
      method: 'DELETE',
      url: `/queues?queueId=${id}`,
      success: (data) => {
        // report queueId to server socket
        this.socket.emit('customer report', id);
        window.location.replace(`/`);
      },
      failure: (error) => {
        console.log('failed to remove customer from queue', error);
      }
    });
  }

  render() {
    const messages = this.state.messages;
    const message = messages.map(item => {
      return (
        <div className='row'>
          <div >
            <span style={{'font-weight': 'bold'}}>{item.name}</span> <span>{item.message}</span>
          </div>
        </div>
      );
    });

    return (
      <div className="customer-queue-info-container">
        <CustomerBanner customer={this.state.currentCustomer}/>
        <h5>YOUR QUEUE NUMBER IS</h5>
        {
          this.state.ready
            ? <h3 className="ready-noti">Your table is ready!</h3>
            : <div className="queue-position-display">
              <span className="position-number">{this.state.currentCustomer.position}</span>
              <h6>your approximate wait time is:</h6>
              <span className="wait-time-indicator">{this.state.currentCustomer.wait}</span>
              <p className="groups-in-front-indicator">There are currently {this.state.currentCustomer.queueInFrontCount} groups in front of you</p>
            </div>
        }
        <div>
          <button className="btn btn-outline-primary" onClick={this.openModal}>Chat</button>
          <div>
          <button className="btn btn-outline-primary" onClick={this.removeFromQueue}>Cancel reservation</button>
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
                <button className="btn btn-outline-primary" type="button" onClick={this.handleOnSubmit} style={{'margin': '0 15px 20px 0'}}>Send</button>
                <button className="btn btn-outline-primary" type="button" onClick={this.hideModal} style={{'margin': '0 0 20px 0'}}>Close</button>
              </span>

            </div>
          </Modal>
        </div>

        <br/>
      </div>
    );
  }
}
