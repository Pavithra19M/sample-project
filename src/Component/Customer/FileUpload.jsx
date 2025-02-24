import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Table,
  Button,
} from "react-bootstrap";
import { BsQuestionCircle, BsExclamationTriangle } from "react-icons/bs";
import { messages } from "../config";

const FileUpload = ({ showCommentBox }) => {
  const [comments, setComments] = useState("");
  const [commentErr, setCommentErr] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const commentsRegx = /^[a-zA-Z0-9\r\n+&''_()@.!#$%]*$/;

  const changeCommentsHandler = (value) => {
    setComments(value);
    if (value !== "" && !commentsRegx.test(value)) {
      setCommentErr(messages.commentErr);
    } else {
      setCommentErr("");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
      name: file.name,
      lastModified: new Date(file.lastModified).toLocaleString(),
      type: file.type,
    }));
    setSelectedFile((prevState) => [...prevState, ...fileData]);
  };

  return (
    <>
      <div className="uploadata-div1">
        <h4>Securitisation Portfolio File Upload</h4>
        {showCommentBox ? (
          <Row className="my-4">
            <Col md={6}>
              <Form>
                <Form.Group controlId="comments">
                  <Form.Label>Comments</Form.Label>
                  {commentErr ? (
                    <div style={{ color: "red" }}>
                      <BsExclamationTriangle /> {commentErr}
                    </div>
                  ) : (
                    ""
                  )}
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comments}
                    onChange={({ target }) => {
                      changeCommentsHandler(target.value);
                    }}
                    placeholder="Enter comments(maxmimum 255 characters)"
                    maxLength={255}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md={6}>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="comments">
                    <span> Please check your comments</span>
                  </Tooltip>
                }
              >
                <BsQuestionCircle className="questionStyle" />
              </OverlayTrigger>
            </Col>
          </Row>
        ) : (
          ""
        )}

        <Row className="my-4">
          <Col md={6}>
            <Form>
              <Form.Group>
                <Form.Label htmlFor="exampleFormControlFile1">
                  Upload Files
                </Form.Label>
                <Form.Control
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                />
              </Form.Group>
              {selectedFile.length !== 0 && (
                <Table className="my-4" striped>
                  <thead>
                    <tr>
                      <th>File Type</th>
                      <th>File Name</th>
                      <th>Upload Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFile.map((file, index) => (
                      <tr key={index}>
                        <td style={{ textTransform: "capitalize" }}>
                          {file.type}
                        </td>
                        <td>{file.name}</td>
                        <td>{file.lastModified}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Form>
          </Col>
          <Col md={6}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="comments">
                  <span> Please check your files</span>
                </Tooltip>
              }
            >
              <BsQuestionCircle className="questionStyle" />
            </OverlayTrigger>
          </Col>
        </Row>

        <Row>
          <Button variant="danger" className="mx-2 my-2">
            Submit
          </Button>
        </Row>
      </div>
    </>
  );
};

export default FileUpload;
