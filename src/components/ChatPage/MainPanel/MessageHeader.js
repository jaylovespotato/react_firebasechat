import {MdFavorite} from 'react-icons/md'
import React from 'react'
import { Accordion, Card, Col, Container, FormControl, Image, InputGroup, Row, useAccordionToggle } from 'react-bootstrap'
import { FaLock } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'



function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <button
        type="button"
        style={{ padding: '0.1rem 1rem',
            border: '.1rem solid #ececec',
            borderRadius: '.1rem',
            // marginBottom: '.1rem',
            margin:'.3rem .3rem'
        }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }


function MessageHeader(props) {
    return (
        <div style={{
            width: '100%',
            height: '170px',
            border: '.2rem solid #ececec',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem'
        }}>
            
        <Container>
            <Row>
                <Col><h2><FaLock />ChatRoomName <MdFavorite /> </h2></Col> 
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <AiOutlineSearch />
                        </InputGroup.Text>
                        <FormControl
                            onChange = {props.handleSearchChange}
                            placeholder="Search Messages"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <div style = {{ display : 'flex', justifyContent: 'flex-end'}}>
                    <p>
                        <Image src=""/>{" "}user name
                    </p>
                </div>
            </Row>
            <Row>
                <Col>
                    <Accordion>
                        <Card>
                            <Card.Header style={{padding: '0 1rem'}}>
                                <CustomToggle eventKey="0">Click me!</CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>Hello! I'm the body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
                <Col>
                    <Accordion>
                        <Card>
                            <Card.Header style={{padding: '0 1rem'}}>
                                <CustomToggle eventKey="0">Click me!</CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>Hello! I'm the body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>

        </Container>
        </div>
    )
}

export default MessageHeader
