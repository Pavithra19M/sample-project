import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";
import FileUpload from "./FileUpload";
import { BsQuestionCircle } from "react-icons/bs";

const UploadData = () => {
  const [authorName, setAuthorName] = useState([
    { label: "Select author name", value: "" },
  ]);
  const [authorData, setAuthorData] = useState("");
  const [loanType, setLoanType] = useState([
    { label: "Select loan type", value: "" },
  ]);
  const [loanData, setLoanData] = useState("");
  const [vehicleType, setVehicleType] = useState([
    { label: "Select vehicle type", value: "" },
  ]);
  const [vehicleData, setVehicleData] = useState("");
  const [showUpload, setShowUpload] = useState(true);

  //used to fetch authortiy Name
  useEffect(() => {
    axios
      .get("http://localhost:3001/authortiesName")
      .then((res) => {
        const newAuthors = res.data.map((data) => ({
          label: data.label,
          value: data.value,
        }));
        setAuthorName((prevState) => {
          const updatedAuthors = [...prevState];
          newAuthors.forEach((author) => {
            if (!updatedAuthors.some((item) => item.value === author.value)) {
              updatedAuthors.push(author);
            }
          });
          return updatedAuthors;
        });
      })
      .catch((err) => console.log("error", err.message));
  }, []);

  //used to fetch loantype Name
  useEffect(() => {
    axios
      .get("http://localhost:3002/loanType")
      .then((res) => {
        const loanInfo = res.data.map((data) => ({
          label: data.label,
          value: data.value,
        }));
        setLoanType((prevState) => {
          const updatedLoanType = [...prevState];
          loanInfo.forEach((loan) => {
            if (!updatedLoanType.some((item) => item.value === loan.value)) {
              updatedLoanType.push(loan);
            }
          });
          return updatedLoanType;
        });
      })
      .catch((err) => console.log("error", err.message));
  }, []);

  //used to fetch loantype Name
  useEffect(() => {
    axios
      .get("http://localhost:3003/vehicleType")
      .then((res) => {
        const vechicleInfo = res.data.map((data) => ({
          label: data.label,
          value: data.value,
        }));
        setVehicleType((prevState) => {
          const updatedVechicleType = [...prevState];
          vechicleInfo.forEach((vehicle) => {
            if (
              !updatedVechicleType.some((item) => item.value === vehicle.value)
            ) {
              updatedVechicleType.push(vehicle);
            }
          });
          return updatedVechicleType;
        });
      })
      .catch((err) => console.log("error", err.message));
  }, []);

  //to generateVehicleLoan
  const generateVehicleLoan = () => {
    return (
      <Row className="my-4">
        <Col md={6}>
          <Form>
            <Form.Label>Vechicle Type</Form.Label>
            <Form.Control
              as="select"
              value={vehicleData}
              onChange={(e) => setVehicleData(e.target.value)}
            >
              {vehicleType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form>
        </Col>
        <Col md={6}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="vechicle-type">
                <span> Must contain Vechicle Type</span>
              </Tooltip>
            }
          >
            <BsQuestionCircle className="questionStyle" />
          </OverlayTrigger>
        </Col>
      </Row>
    );
  };

  //nextHandler

  const nextBtnHandler = () => {
    setShowUpload(false);
  };

  return (
    <>
      {showUpload === true ? (
        <div
          className="uploadata-div1"
          style={{ minHeight: loanData === "vehicle_loan" ? "60vh" : "45vh" }}
        >
          <h4>Securitisation Portfolio File Upload</h4>
          <Row className="my-4">
            <Col md={6}>
              <Form>
                <Form.Label id="Author Name">Authorties name</Form.Label>
                <Form.Control
                  as="select"
                  value={authorData}
                  onChange={(e) => setAuthorData(e.target.value)}
                >
                  {authorName.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form>
            </Col>

            <Col md={6}>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="author-name">
                    <span> Must contain Author Name</span>
                  </Tooltip>
                }
              >
                <BsQuestionCircle className="questionStyle" />
              </OverlayTrigger>
            </Col>
          </Row>

          <Row className="my-4">
            <Col md={6}>
              <Form>
                <Form.Label>Loan Type</Form.Label>
                <Form.Control
                  as="select"
                  value={loanData}
                  onChange={(e) => setLoanData(e.target.value)}
                >
                  {loanType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form>
            </Col>

            <Col md={6}>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="loan-type">
                    <span> Must contain Loan Type</span>
                  </Tooltip>
                }
              >
                <BsQuestionCircle className="questionStyle" />
              </OverlayTrigger>
            </Col>
          </Row>

          {loanData === "vehicle_loan" && generateVehicleLoan()}

          <Row className="mx-1">
            <Button variant="danger" onClick={nextBtnHandler}>
              Next
            </Button>
          </Row>
        </div>
      ) : (
        <FileUpload />
      )}
    </>
  );
};

export default UploadData;
