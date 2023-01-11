import React, { useState,useEffect } from "react";
import "./screen.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import axios from "axios";
import { authContext } from "../contexts/cknContext";
export default function TakeOrder() {
  const { pendingOrder, setPendingOrder,editItem, setEditItem,URL } = React.useContext(authContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState(true);
  const [orderNumber, setOrderNumber] = useState(1);
  const [orderId, setOrderId] = useState(0);
  const [chai, setChai] = useState(false);
  const [chaiAmount, setChaiAmount] = useState(0);
  const [chaiQuantity, setChaiQuantity] = useState(0);
  const [coffee, setCoffee] = useState(false);
  const [coffeeAmount, setCoffeeAmount] = useState(0);
  const [coffeeQuantity, setCoffeeQuantity] = useState(0);
  const [cigarette, setcigarette] = useState(false);
  const [cigaretteAmount, setcigaretteAmount] = useState(0);
  const [cigaretteQuantity, setcigaretteQuantity] = useState(0);
  const chaiItem = [10, 12, 15];
  const coffeeItem = [20, 25, 60];
  const cigaretteItem = [8, 10, 12, 15, 20];
  const orders=()=>{
    axios.get(`${URL}/getCknItemsByDate?date=${new Date().toLocaleDateString()}`).then(resp=>{
      const orderNo= parseInt(resp.data.dataLength) + 1;
      setOrderNumber(orderNo);
    },err=>{
      console.log(err);
    });

    axios.get(`${URL}/getCknItems`).then(resp=>{
      const orderNum= parseInt(resp.data.dataLength) + 1;
      setOrderId(orderNum);
    },err=>{
      console.log(err);
    })
  }
  useEffect(() => {
    orders();
  }, [1]);
  const addAmount = (e) => {
    const { name, value } = e.target;
    if (name === "chaiAmount") {
      if (chai === true) {
        const chai = parseInt(chaiAmount) - parseInt(value);
        setChaiQuantity(chaiQuantity - 1);
        setChaiAmount(chai);
      } else {
        const chai = parseInt(chaiAmount) + parseInt(value);
        setChaiQuantity(chaiQuantity + 1);
        setChaiAmount(chai);
      }
    } else if (name === "coffeeAmount") {
      if (coffee === true) {
        const coffee = parseInt(coffeeAmount) - parseInt(value);
        setCoffeeQuantity(coffeeQuantity - 1);
        setCoffeeAmount(coffee);
      } else {
        const coffee = parseInt(coffeeAmount) + parseInt(value);
        setCoffeeQuantity(coffeeQuantity + 1);
        setCoffeeAmount(coffee);
      }
    } else if (name === "cigaretteAmount") {
      if (cigarette === true) {
        const cigarette = parseInt(cigaretteAmount) - parseInt(value);
        setcigaretteQuantity(cigaretteQuantity - 1);
        setcigaretteAmount(cigarette);
      } else {
        const cigarette = parseInt(cigaretteAmount) + parseInt(value);
        setcigaretteQuantity(cigaretteQuantity + 1);
        setcigaretteAmount(cigarette);
      }
    }
  };
  useEffect(() => {
    let total = parseInt(chaiAmount) + parseInt(coffeeAmount) + parseInt(cigaretteAmount) ;
    setTotalAmount(total);
  }, [chaiAmount,coffeeAmount,cigaretteAmount]);

  useEffect(() => {
    if(editItem.length > 0){
      setOrderNumber(editItem[0].orderNo)
      setcigaretteQuantity(editItem[0].cigaretteQuantity)
      setcigaretteAmount(editItem[0].cigarette);
      setcigarette(false);
      setCoffeeQuantity(editItem[0].coffeeQuantity);
      setCoffeeAmount(editItem[0].coffee);
      setCoffee(false);
      setChaiQuantity(editItem[0].chaiQuantity);
      setChaiAmount(editItem[0].chai);
      setChai(false);
      // setTotalAmount(editItem[0].orderTotal);
    }
  }, [editItem]);

  const addData=()=>{
    const data = {
      orderId:orderId,
      orderNo:orderNumber,
      chai:chaiAmount,
      chaiQuantity:chaiQuantity,
      coffee:coffeeAmount,
      coffeeQuantity:coffeeQuantity,
      cigarette:cigaretteAmount,
      cigaretteQuantity:cigaretteQuantity,
      date:new Date().toLocaleDateString(),
      orderStatus:"PENDING",
      paymentMode:paymentMode===true?"Online":"Offline",
      orderTotal:totalAmount
    }
    if(totalAmount >0){axios.post(`${URL}/setCknItems`,data).then(resp=>{
      if(resp.status===200){setcigaretteQuantity(0);
      setcigaretteAmount(0);
      setcigarette(false);
      setCoffeeQuantity(0);
      setCoffeeAmount(0);
      setCoffee(false);
      setChaiQuantity(0);
      setChaiAmount(0);
      setChai(false);
      setTotalAmount(0);
      setPendingOrder(!pendingOrder);
      orders();
    }
    },err=>{
      console.log(err);
    })}
    else{alert("please add something")}
    // console.log(data);
  }
  const editData=(e,dt)=>{
    console.log(dt);
    const Id= editItem[0]._id;
    const data = {
      orderId:editItem[0].orderId,
      orderNo:editItem[0].orderNo,
      chai:chaiAmount,
      chaiQuantity:chaiQuantity,
      coffee:coffeeAmount,
      coffeeQuantity:coffeeQuantity,
      cigarette:cigaretteAmount,
      cigaretteQuantity:cigaretteQuantity,
      date:new Date().toLocaleDateString(),
      orderStatus:"PENDING",
      paymentMode:paymentMode===true?"Online":"Offline",
      orderTotal:totalAmount
    }
    axios.put(`${URL}/updateCknItems?id=${Id}`,data).then(resp=>{
      console.log(resp);
      if(resp.status===200){
      setPendingOrder(!pendingOrder);
      setEditItem([]);
      setcigaretteAmount(0);
      setcigarette(false);
      setCoffeeQuantity(0);
      setCoffeeAmount(0);
      setCoffee(false);
      setChaiQuantity(0);
      setChaiAmount(0);
      setChai(false);
      setTotalAmount(0);
      orders();

      // setSuccessOrder(!successOrder);
      // setData(resp.data);
    }
    },err=>{
      console.log(err);
    })
    // console.log(data);
  }
  
  return (
    <div className="mt-5 ps-2">
      <div className="row">
        <div className="col-6 ">
          <div className="row">
            <div className="col-5 tea">
              <div
                className="borderRound logo_card"
                onClick={(e) => setChai(!chai)}
              >
                <h6 style={{ marginTop: "0.4rem" }}>C</h6>
              </div>
              <img src="/images/item.png" className="itemImage"></img>

              <div className="logo_item_card">
                {chaiItem.map((c) => (
                  <input
                    type="button"
                    className="borderRound logo_item_card"
                    name="chaiAmount"
                    onClick={(e) => addAmount(e)}
                    id="chai"
                    value={c}
                  />
                ))}
              </div>
            </div>
            <div className="col-5 coffee">
              <div
                className="borderRound logo_card"
                onClick={(e) => setCoffee(!coffee)}
              >
                <h6 style={{ marginTop: "0.4rem" }}>C</h6>
              </div>
              <img src="/images/item.png" className="itemImage"></img>

              <div className="logo_item_card">
                {coffeeItem.map((c) => (
                  <input
                    type="button"
                    className="borderRound logo_item_card"
                    name="coffeeAmount"
                    onClick={(e) => addAmount(e)}
                    id="coffee"
                    value={c}
                  />
                ))}
              </div>
            </div>
            <div className="col-5 tea">
              <div
                className="borderRound logo_card"
                onClick={(e) => setcigarette(!cigarette)}
              >
                <h6 style={{ marginTop: "0.4rem" }}>C</h6>
              </div>
              <img src="/images/item.png" className="itemImage"></img>

              <div className="logo_item_card">
                {cigaretteItem.map((c) => (
                  <input
                    type="button"
                    className="borderRound logo_item_card"
                    name="cigaretteAmount"
                    onClick={(e) => addAmount(e)}
                    id="cigarette"
                    value={c}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="retro-pane bg-glass ">
          <div className="pt-4   d-flex justify-content-evenly ">
          <button className="rounded-3  border-danger ">10</button>
          <button className="rounded-3  border-danger">12</button>
          <button className="rounded-3 p-1 border-danger">15</button>
          
   
          
          </div>
             </div>
        </div>

        
        <div className="card col-5" style={{ borderBottom: "dashed" }}>
        <div className="text-center fs-6 ">
          <div className="mt-1">***********************************</div>
          <div>RECEIPT </div>
          <div className="mt-1">***********************************</div>
        </div>
        <div className="PS-3 fw-bold">
          <span className="">Order No. {orderNumber} </span>
          <span className=" ps-3">{new Date().toLocaleDateString()}</span>
          <span className="ps-3 ">{new Date().toLocaleTimeString()}</span>
        </div>
        <div style={{ borderBottom: "dashed" }}></div>
        {chaiQuantity >0 ?<div className="row d-flex justify-content-around mt-3">
          <span className="text-start col-8" style={{ paddingLeft: "11%" }}>
           { `${chaiQuantity} x Chai`}
          </span>
          <span className="col-4">{chaiAmount} &#8377;</span>
        </div>:""}
       {coffeeQuantity >0 ? <div className="row d-flex justify-content-around mt-3">
          <span className="text-start col-8" style={{ paddingLeft: "11%" }}>
          { `${coffeeQuantity} x Coffee`}
          </span>
          <span className="col-4">{coffeeAmount} &#8377;</span>
        </div>: ""}
      { cigaretteQuantity >0? <div className="row d-flex justify-content-around mt-3">
          <span className="text-start col-8" style={{ paddingLeft: "11%" }}>
          { `${cigaretteQuantity} x cigarette`}
          </span>
          <span className="col-4"> {cigaretteAmount} &#8377;</span>
        </div>:""}
        
        <div>------------------------------------</div>
        <div>
          <div className="d-flex mx-3 justify-content-between">
            <span>TOTAL AMOUNT</span>
            <span>{totalAmount} &#8377;</span>
          </div>
          <div className="d-flex mx-3 justify-content-between">
            <span className="">PAYMENT MODE</span>
            
            <span style={{cursor:"pointer"}}  onClick={(e)=>setPaymentMode(!paymentMode)}>{paymentMode===true?"Online":"Offline"}</span>
          </div>
        </div>
        <span className="mb-2">------------------------------------</span>
        <div>******* THANK YOU *******</div>
      <div className="d-flex justify-content-between">
      <button className="btn">
      <ArrowCircleLeftIcon sx={{ fontSize: 35 }}  />
    </button>
      {editItem.length > 0 ?<button className="btn" onClick={(e)=>editData(e)}>
        <ArrowCircleRightIcon sx={{ fontSize: 35 }}  />
      </button>:<button className="btn" onClick={(e)=>addData(e)}>
      <ArrowCircleRightIcon sx={{ fontSize: 35 }}  />
    </button>}
      </div>
        {/* <div className=""><span className="fs-3">*****</span><span>THANK YOU</span><span className="fs-3">*****</span></div>*/}
      </div>
      </div>
    </div>
  );
}
