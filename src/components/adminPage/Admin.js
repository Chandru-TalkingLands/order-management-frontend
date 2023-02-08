import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import "../adminPage/admin.css";
import "./admin.css";

const Admin = () => {
  const [plots, setplots] = useState();
  const [logs,setlogs] = useState();
  const [statusCount, setstatusCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleStatusChange = (e, plots) => {
    const id = plots._id;
    axios
      .patch(`http://localhost:4000/plots/${id}`, { status: e.target.value })
      .then((data) => {
        setstatusCount(statusCount + 1);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

 const handleModalOpen = (data) =>{
    const id = data._id
    axios.get(`http://localhost:4000/plots/logs/${id}`)
    .then((res)=>{
        console.log(res)
        setlogs(res.data)
        onOpen()
    })
    .catch((err)=>{
        console.log(err)
    })
 } 

  return (
    <div className="plots-container">
      <div className="plots-item-container">
        {plots &&
          plots.length > 0 &&
          plots.map((plots) => {
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
                <h2>
                  <span>Status : </span>
                  {plots.status}
                </h2>

                <div className="admin-footer">
                  <select onChange={(e) => handleStatusChange(e, plots)}>
                    <option value="" selected hidden>
                      Change Status
                    </option>
                    <option value="Sold">Sold</option>
                    <option value="Booked">Booked</option>
                    <option value="Cancell">Cancell</option>
                  </select>

                  <p onClick={()=>{handleModalOpen(plots)}}>Transaction</p>
                </div>

                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  className="hello-modal"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>
                        {
                            logs && logs.length > 0&& logs.map(data=>{
                                console.log(data)
                                return(
                                    <div>
                                        <ul>
                                            <li>{data.info}</li>
                                        </ul>
                                    </div>
                                )
                            }
                            )

                        }
</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Admin;
