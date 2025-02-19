import React from 'react';
import { Tab, Tabs, Container } from 'react-bootstrap';
import UploadData from './UploadData';
import UploadHistory from './UploadHistory';

const ActiveCustomer = () => {
  return (
    <Container>
      <div className='active-div1'>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Upload data">
            <UploadData />
          </Tab>
          <Tab eventKey="profile" title="Upload history">
            <UploadHistory />
          </Tab>
        </Tabs>
      </div>
    </Container>
  )
}

export default ActiveCustomer