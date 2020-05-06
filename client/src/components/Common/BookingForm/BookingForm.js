import React, { Component } from 'react'
import Calender from '../../../Images/calendar_icon.png'
import Clock from '../../../Images/clock_icon.png'
import RoomIcon from '../../../Images/room_icon.png'
import './bookingForm.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Popup from './Popup'
class BookingForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId : 3,
      date: '2020-05-23T11:00:00.000Z',
      roomId:  5,
      room_name : 'Moscow' ,
      toggelReminder: false ,
      showPopup : false
    }
  }

  handelChange = (e) => {
    const name = e.target.name
    const value =e.target.value
    this.setState({[name]: value})
  }
  handelChecked = ()=> {
      this.setState({toggelReminder : !this.state.toggelReminder })
  }

   handelSubmit =(e) => {
      e.preventDefault();
      const formData = this.state
      axios.post( '/api/booking', formData)
      .then(response => {if(response.status===200){
        console.log( 'res :',response)
       return this.setState({showPopup : !this.state.showPopup})}
      // else  alert('A small error happend in the server in this booking operation!! try again !!')
      })
      .catch(err => console.log(err))
   }

  render () {
    return (
      <div>
        <div className="date_info_continer__div">
          <div className="date_info__div">
            <img src={Calender} alt='calender' />
            <h4>{this.state.date.slice(0,10)}</h4>
          </div>
          <div className="date_info__div">
            <img src={Clock} alt='clock' />
            <h4>{this.state.date.slice(11,16)}</h4>
          </div>
          <div className="date_info__div">
            <img src={RoomIcon} alt='room' />
            <h4>{this.state.room_name}</h4>
          </div>
        </div>
        <form className="booking_form">
          <p>Please re-fill the following fileds to complete your booking process:</p>
          <hr className="label_line"/>
          <input type="text" name="name" onChange={this.handelChange} placeholder="Your Name" />
          <input type="text" name="title" onChange={this.handelChange} placeholder="Event Title" />
          <input type="text" name="description" onChange={this.handelChange} placeholder="Event Description" />
          <input type="text" name="notes" onChange={this.handelChange} placeholder=" Notes" />
          <div className="remind_me_input__div">
            <label htmlFor="reminder" className="radio_input"><input type="radio" onClick={this.handelChecked} checked={this.state.reminder} />Remind me</label>
          </div>
          <div className="buttons_continer">
            <Link to='/' className='text-link'>
            <button className="back_button" >Back</button>
            </Link>
            <button type='submit' onClick={this.handelSubmit} className="book_button">Book</button>
          </div>
        </form>
        {this.state.showPopup ?  
          <Popup room={this.state.room_name} />  
            : null  
        }  
      </div>
    )
  }
}

export default BookingForm