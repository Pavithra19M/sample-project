import React from "react";
import {
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";

const AuthorTable = ({ authEntry }) => {
  return (
    <Container>
      <Row className="my-3">
        <Col md={6}>
          <Table>
            <thead>
              <tr>
                <th>Auth Name</th>
                <th>Series Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {authEntry &&
                authEntry.map((entries) => (
                  <tr key={entries.authorId}>
                    <td>{entries.authorName}</td>
                    <td>{entries.series}</td>
                    <td>{entries.Address}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="author-name">
                <span>
                  {" "}
                  Please make sure Author name, Series name and Address are
                  correctly populated as displayed in their corresponding fileds
                  of the Template{" "}
                </span>
              </Tooltip>
            }
          >
            <BsQuestionCircle className="questionStyle" />
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorTable;
