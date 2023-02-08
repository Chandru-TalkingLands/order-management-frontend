import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToast } from '@chakra-ui/react'
import "./user.css";

const User = () => {
  const toast = useToast()
  const [plots, setplots] = useState();
  const [statusCount,setstatusCount] = useState(0)
  const [userAmount,setuserAmount] = useState()

  const handleStatus = (plots,BookCancel)=>{
    const id = plots._id
    if(userAmount){
      axios.patch(`http://localhost:4000/plots/${id}`,{status:BookCancel,amount:userAmount})
      .then((data)=>{
          setstatusCount(statusCount+1)
          console.log(data)
          toast({
            title: `${BookCancel} Sucessfull !.`,
            description: "Explore plots",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
  
      })
      .catch((err)=>{
          console.log(err)
      })
    }

  }

  const handlePriceChange = (e,id)=>{
    if(plots && plots.length > 0){
      if (plots._id == id){
    let amount = e.target.value
        setuserAmount(amount)
      }
    }
    
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/plots")
      .then((res) => {
        console.log(res);
        setplots(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [statusCount]);

  return (
    <div className="plots-container">
      {/* <h1>All products</h1> */}

      <div className="plots-item-container">
        {plots &&
          plots.length > 0 &&
          plots.map((plots) => {
            const status =
              plots.status == "Booked"
                ? "Cancell"
                : plots.status == "Cancell"
                ? "BookNow"
                : "Not Available";
                const BookCancel = plots.status == "Booked" ? "Cancell" : "Booked"
                const statusClassName =  plots.status == "Sold" ? "preventBook" : plots.status == "Booked" ? "greyClick" : "greenClick"
            return (
              <div className="plots-cards">
                <div
                  style={{ backgroundImage: `url(${plots.image})` }}
                  className="plots-cards-img-container"

                />
                <div className="plots-footer">
                  <h6>
                    <span>Facing:</span>
                    {plots.facing}
                  </h6>
                  <h6>
                    <span>Place:</span>
                    {plots.place}
                  </h6>
                </div>
                <h2>
                  <span>Plot : </span>
                  {plots.title}
                </h2>
                <h2>
                  <span>Price : </span>
                  {plots.price}per Sqft
                </h2>
                <h2>
                  <span>Area : </span>
                  {plots.area} Sqft{" "}
                </h2>

                <input type="number" value={userAmount} onChange={(e)=>handlePriceChange(e,plots._id)}/>
                <p className={statusClassName} onClick={()=>handleStatus(plots,BookCancel)}>{status}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default User;
