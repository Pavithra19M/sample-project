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
import { BsQuestionCircle, BsExclamationTriangle } from "react-icons/bs";
import { messages } from "../config";
import AuthorTable from "./AuthorTable";

const UploadData = () => {
  const [authorName, setAuthorName] = useState([
    { label: "Select author name", value: "" },
  ]);
  const [authTable, setAuthTable] = useState([]);
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
  const [authErr, setAuthErr] = useState("");
  const [loanErr, setLoanErr] = useState("");
  const [vehicleErr, setVehicleErr] = useState("");
  const [authEntry, setAuthEntry] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(true);

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
        setAuthTable(res.data);
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

  const onAuthorTypeChange = (e) => {
    setAuthorData(e.target.value);
    if (e.target.value !== "") {
      setAuthErr("");
    }

    const selectedAuth = authTable.find(
      (auth) => auth.value === e.target.value
    );
    if (selectedAuth) {
      setAuthEntry(selectedAuth.authors);
    }
  };

  const onLoanTypeChange = (e) => {
    setLoanData(e.target.value);
    if (e.target.value !== "") {
      setLoanErr("");
    }
  };

  const onVehicleTypeChange = (e) => {
    setVehicleData(e.target.value);
    if (e.target.value !== "") {
      setVehicleErr("");
    }
  };

  // Function to generate a unique request ID
  const generateRequestId = () => {
    //return `req_${Date.now()}_${Math.random().toString(4,36).slice(2, 9)}`;
    return Date.now();
  };

  console.log("loanData", loanData);
  const navigateWidget = () => {
    if (loanData === "vehicle_loan") {
      setShowCommentBox(false);
      setShowUpload(false);
    } else {
      setShowCommentBox(true);
      setShowUpload(false);
    }
  };

  //nextHandler
  const nextBtnHandler = (e) => {
    e.preventDefault();
    if (authorData === "") {
      setAuthErr(messages.selectAuthorErr);
    }
    if (loanData === "") {
      setLoanErr(messages.selectLoanTypeErr);
    }
    if (loanData === "vehicle_loan") {
      if (vehicleData === "") {
        setVehicleErr(messages.selectVehicleTypeErr);
      } else if (authorData !== "" && loanData !== "" && vehicleData !== "") {
        // Generate request ID
        const requestId = generateRequestId();

        // Create request payload
        const payload = {
          requestId,
          authorData,
          loanData,
          vehicleData,
        };
        axios
          .post("http://localhost:3004/request", payload)
          .then((res) => {
            console.log("response", res.data);
            navigateWidget();
          })
          .catch((err) => console.log("err", err.message));
      }
    } else if (authorData !== "" && loanData !== "") {
      // Generate request ID
      const requestId = generateRequestId();

      // Create request payload
      const payload = {
        requestId,
        authorData,
        loanData,
      };
      axios
        .post("http://localhost:3004/request", payload)
        .then((res) => {
          console.log("response", res.data);
          navigateWidget();
        })
        .catch((err) => console.log("err", err.message));
    }
  };

  //to generateVehicleLoan
  const generateVehicleLoan = () => {
    return (
      <Row className="my-4">
        <Col md={6}>
          <Form>
            <Form.Label>Vechicle Type</Form.Label>
            {vehicleErr !== "" ? (
              <div style={{ color: "red" }}>
                <BsExclamationTriangle style={{ fontSize: "1.5rem" }} />
                &nbsp;{vehicleErr}
              </div>
            ) : (
              ""
            )}
            <Form.Control
              as="select"
              value={vehicleData}
              onChange={onVehicleTypeChange}
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

  return (
    <>
      {showUpload === true ? (
        <div
          className="uploadata-div1"
          style={{ minHeight: loanData === "vehicle_loan" ? "60vh" : "55vh" }}
        >
          <h4>Securitisation Portfolio File Upload</h4>
          <Row className="my-4">
            <Col md={6}>
              <Form>
                <Form.Label id="Author Name">Authorties name</Form.Label>
                {authErr !== "" ? (
                  <div style={{ color: "red" }}>
                    <BsExclamationTriangle style={{ fontSize: "1.5rem" }} />
                    &nbsp;{authErr}
                  </div>
                ) : (
                  ""
                )}
                <Form.Control
                  as="select"
                  value={authorData}
                  onChange={onAuthorTypeChange}
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

          {authEntry.length !== 0 && authorData.length !== 0 ? (
            <AuthorTable authEntry={authEntry} />
          ) : (
            ""
          )}

          <Row className="my-4">
            <Col md={6}>
              <Form>
                <Form.Label>Loan Type</Form.Label>
                {loanErr !== "" ? (
                  <div style={{ color: "red" }}>
                    <BsExclamationTriangle style={{ fontSize: "1.5rem" }} />
                    &nbsp;{loanErr}
                  </div>
                ) : (
                  ""
                )}
                <Form.Control
                  as="select"
                  value={loanData}
                  onChange={onLoanTypeChange}
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

          <Row>
            <Button
              variant="danger"
              className="mx-3 my-2"
              onClick={nextBtnHandler}
            >
              Next
            </Button>
          </Row>
        </div>
      ) : (
        <FileUpload showCommentBox={showCommentBox} />
      )}
    </>
  );
};

export default UploadData;
