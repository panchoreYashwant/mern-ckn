import React from 'react'
import Pending_Bill from './Pending_Bill'
import Success_Order from './Success_Order'
import TakeOrder from './takeOrder'

export default function MainScreen() {
  return (
    <div className='mainScreen_Bg'>   
    <div className='row '>   
    <div className='col-lg-6 col-md-6'>   
      <TakeOrder ></TakeOrder>
    </div>
    <div className='col-lg-3 col-md-3'>   
      <Pending_Bill/>
    </div>
    <div className='col-lg-3 col-md-3'>   
      <Success_Order/>
    </div>
    </div>
    </div>
  )
}
