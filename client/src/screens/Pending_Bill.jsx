import React, { useState,useEffect } from "react";
import "./screen.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import axios from "axios";
import { authContext } from "../contexts/cknContext";

function Pending_Bill(props) {
  const { pendingOrder, setPendingOrder,successOrder, setSuccessOrder,editItem, setEditItem ,URL} = React.useContext(authContext);

  const [data,setData]=useState([]);
  const [paymentMode, setPaymentMode] = useState(true);

  const getData=()=>{
    axios.get(`${URL}/getCknItemsByDateAndStatus?date=${new Date().toLocaleDateString()}&status=PENDING`).then(resp=>{
      console.log(resp.data);
      setData(resp.data.data);
      
    },err=>{
      console.log(err);
    })
  }
  useEffect(() => {
    getData();
  }, [pendingOrder]);

  const addData=(e,dt)=>{
    console.log(dt);
    const Id= dt._id;
    const data = {
      orderId:dt.orderId,
      orderNo:dt.orderNo,
      chai:dt.chai,
      chaiQuantity:dt.chaiQuantity,
      coffee:dt.coffee,
      coffeeQuantity:dt.coffeeQuantity,
      cigarette:dt.cigarette,
      cigaretteQuantity:dt.cigaretteQuantity,
      date:new Date().toLocaleDateString(),
      orderStatus:"success",
      paymentMode:paymentMode===true?"Online":"Offline",
      orderTotal:dt.orderTotal
    }
    axios.put(`${URL}/updateCknItems?id=${Id}`,data).then(resp=>{
      console.log(resp);
      if(resp.status===200){
      setPendingOrder(!pendingOrder);
      setSuccessOrder(!successOrder);
      // setData(resp.data);
    }
    },err=>{
      console.log(err);
    })
    // console.log(data);
  }
  const editData=(e,dt)=>{
    console.log(dt);
    const Id= dt._id;
    
    axios.get(`${URL}/getCknItemsById?id=${Id}`).then(resp=>{
      console.log(resp.data.data);
      if(resp.status===200){
        setEditItem(resp.data.data);
      // setPendingOrder(!pendingOrder);
      // setSuccessOrder(!successOrder);
      // setData(resp.data);
    }
    },err=>{
      console.log(err);
    })
    console.log(data);
  }
    return (
        <div>
            <section style={{overflowY:"auto",maxHeight:"44rem",padding:"1rem"}}>
            {data.length > 0 ? 
              
             data.map(dt=>
             ( <div className="card col-12 mt-1" style={{ borderBottom: "dashed" }}>
             <div className="text-center fs-6 ">
               <div className="mt-1">***********************************</div>
               <div>RECEIPT </div>
               <div className="mt-1">***********************************</div>
             </div>
             <div className="PS-3 fw-bold">
               <span className="">Order No. {dt.orderNo} </span>
               <span className=" ps-3">{new Date().toLocaleDateString()}</span>
               <span className="ps-3 ">{new Date().toLocaleTimeString()}</span>
             </div>
             <div style={{ borderBottom: "dashed" }}></div>
             <div className="row d-flex justify-content-around mt-3">
               <span className="text-start col-8" style={{ paddingLeft: "11%" }}>
                { `${dt.chaiQuantity} x Chai`}
               </span>
               <span className="col-4">{dt.chai} &#8377;</span>
             </div>
             <div className="row d-flex justify-content-around mt-3">
               <span className="text-start col-8" style={{ paddingLeft: "11%" }}>
               { `${dt.coffeeQuantity} x Coffee`}
               </span>
               <span className="col-4">{dt.coffee} &#8377;</span>
             </div>
           <div className="row d-flex justify-content-around mt-3">
               <span className="text-start col-8" style={{ paddingLeft: "11%" }}>
               { `${dt.cigaretteQuantity} x cigarette`}
               </span>
               <span className="col-4"> {dt.cigarette} &#8377;</span>
             </div>
             
             <div>------------------------------------</div>
             <div>
               <div className="d-flex mx-3 justify-content-between">
                 <span>TOTAL AMOUNT</span>
                 <span>{dt.orderTotal} &#8377;</span>
               </div>
               <div className="d-flex mx-3 justify-content-between">
                 <span className="">PAYMENT MODE</span>
                 
                 <span style={{cursor:"pointer"}}  onClick={(e)=>setPaymentMode(!paymentMode)}>{paymentMode===true?"Online":"Offline"}</span>
               </div>
             </div>
             <span className="mb-2">------------------------------------</span>
             <div>******* THANK YOU *******</div>
           <div className="d-flex justify-content-between">
           <button className="btn" onClick={(e)=>editData(e,dt)}>
           <ArrowCircleLeftIcon sx={{ fontSize: 35 }}  />
         </button>
           <button className="btn" onClick={(e)=>addData(e,dt)}>
             <ArrowCircleRightIcon sx={{ fontSize: 35 }}  />
           </button>
           </div>
             {/* <div className=""><span className="fs-3">*****</span><span>THANK YOU</span><span className="fs-3">*****</span></div>*/}
           </div>)
           ) 
          
          :""}
            </section>
        </div>
    );
}

export default Pending_Bill;