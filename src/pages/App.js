import React, { useState } from "react";
import logo from "../assets/img/logo.svg";
import "../assets/css/App.css";
import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Button,
  Form,
  Table,
  Badge
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  //add list to general
  const [newGenList, setNewGenList] = useState(null);
  const [genList, setGenList] = useState([]);
  const addNewGenList = () => {
    setGenList(oldArray => [
      ...oldArray,
      { list: `${newGenList}`, check: false }
    ]);
  };

  //delete list in general
  const deleteRow = e => {
    let array = [...genList]; // clone
    let index = e.currentTarget.value;
    array.splice(index, 1); //hapus sesuai index pada clone-nya
    setGenList(array); //set yang baru seperti clonenya
  };

  //update list in general (check or uncheck)
  const updateCheck = e => {
    let array = [...genList];
    let index = e.currentTarget.value;
    if (array[index].check) array[index].check = false;
    else array[index].check = true;
    setGenList(array);
  };

  // add new category
  const [newCategory, setNewCategory] = useState(null);
  const [category, setCategory] = useState([
    {
      cat: "General",
      data: [],
      checked: []
    }
  ]);
  const addCategory = () => {
    let array = [...category];
    let addNew = {
      cat: newCategory,
      data: [],
      checked: []
    };
    array.push(addNew);
    setCategory(array);
  };

  // add list to a category
  const [newList, setNewList] = useState(null);
  const [listTo, setListTo] = useState(0);
  const addNewList = () => {
    let array = [...category];
    let index = listTo;
    array[index].data.push(newList);
    array[index].checked.push(false);
    setCategory(array);
  };

  //update list in general (check or uncheck)
  const updateCheckList = e => {
    let array = [...category];
    let index = e.currentTarget.value.split("/");
    if (array[index[0]].checked[index[1]])
      array[index[0]].checked[index[1]] = false;
    else array[index[0]].checked[index[1]] = true;
    setCategory(array);
  };

  //delete list
  const deleteList = e => {
    let array = [...category]; // clone
    let index = e.currentTarget.value.split("/");

    array[index[0]].data.splice(index[1], 1); //hapus sesuai index pada clone-nya
    array[index[0]].checked.splice(index[1], 1);
    setCategory(array);
  };

  return (
    <Container>
      <Row id="header">
        <Col md={2}>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
        <Col md={10}>
          <h1>
            <b>TO DO LIST (With ReactJS)</b>
          </h1>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form>
            <Form.Group as={Row} controlId="category">
              <Col md="10">
                <Form.Control
                  onBlur={e => {
                    setNewCategory(e.currentTarget.value);
                  }}
                  placeholder="Add New Category ..."
                />
              </Col>
              <Col md="2">
                <Button
                  variant="info"
                  title="Add New Category"
                  onClick={addCategory}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col md="7">
                <Form.Control
                  placeholder="To Do ..."
                  onBlur={e => {
                    setNewList(e.currentTarget.value);
                  }}
                />
              </Col>
              <Col md="3">
                <Form.Control
                  as="select"
                  onChange={e => {
                    setListTo(e.currentTarget.value);
                  }}
                >
                  {category.map((item, index) => (
                    <option key={index} value={index}>
                      {item.cat}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md="2">
                <Button
                  variant="info"
                  title="Add New List"
                  onClick={addNewList}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form>
            <Form.Group as={Row} controlId="list">
              <Col md="10">
                <Form.Control
                  onBlur={e => {
                    setNewGenList(e.currentTarget.value);
                  }}
                  placeholder="Add List To General ..."
                />
              </Col>
              <Col md="2">
                <Button
                  variant="info"
                  title="Add List To General"
                  onClick={addNewGenList}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Accordion>
            {category.map((item, index) => (
              <Card key={index}>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                    {item.cat}
                  </Accordion.Toggle>
                  <Badge
                    variant={
                      index === 0
                        ? item.data.length + genList.length > 0
                          ? "primary"
                          : "secondary"
                        : item.data.length > 0
                        ? "primary"
                        : "secondary"
                    }
                  >
                    {index === 0
                      ? item.data.length + genList.length > 0
                        ? item.data.length + genList.length
                        : "0"
                      : item.data.length > 0
                      ? item.data.length
                      : "0"}
                  </Badge>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Row>
                      <Col md={12}>
                        <Table striped hover>
                          <tbody>
                            {item.data.length > 0
                              ? item.data.map((ite, idx) => (
                                  <tr key={index + "/" + idx}>
                                    <td
                                      align="center"
                                      valign="middle"
                                      width="5%"
                                    >
                                      <Form.Check
                                        custom
                                        defaultValue={index + "/" + idx}
                                        onClick={updateCheckList}
                                        id={`custom-${index + "/" + idx}`}
                                        label={``}
                                        defaultChecked={item.checked[idx]}
                                      />
                                    </td>
                                    <td valign="middle">
                                      {category[index].checked[idx] ? (
                                        <strike>{ite}</strike>
                                      ) : (
                                        ite
                                      )}
                                    </td>
                                    <td
                                      align="center"
                                      valign="middle"
                                      width="5%"
                                    >
                                      <Button
                                        variant="danger"
                                        title="Remove"
                                        value={index + "/" + idx}
                                        onClick={deleteList}
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              : ""}
                            {genList.map((item, index) => (
                              <tr key={index}>
                                <td align="center" valign="middle" width="5%">
                                  <Form.Check
                                    custom
                                    defaultValue={index}
                                    onClick={updateCheck}
                                    id={`custom-${index}`}
                                    label={``}
                                    defaultChecked={item.check}
                                  />
                                </td>
                                <td valign="middle">
                                  {item.check ? (
                                    <strike>{item.list}</strike>
                                  ) : (
                                    item.list
                                  )}
                                </td>
                                <td align="center" valign="middle" width="5%">
                                  <Button
                                    variant="danger"
                                    value={index}
                                    title="Remove"
                                    onClick={deleteRow}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
