import React from "react";
import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import { Nav, Modal, Button, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form'

import { useLocalForEntries } from "../utils/localStorage";

const Notes = () => {

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    // state mgmt for the notebook entries.
    const [entryTitle, setTitleState] = useState('');
    const [entryText, setEntryTextState] = useState('');
    const [savedEntries, setSavedEntriesState] = useLocalForEntries('saved_entries', []);

    var currentdate = new Date();
    var datetime = (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear()

    // console.log(savedEntries);

    const handleInputChange = (e) => {
        let { target } = e;
        let inputType = target.name;
        let inputValue = target.value;
        console.log(inputValue);

        if (inputType === 'titleText') {
            setTitleState(inputValue);
        } else if (inputType === 'entryText') {
            setEntryTextState(inputValue);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        console.log(datetime);
        console.log(entryText);

        let entry = {
            date: datetime,
            title: entryTitle,
            entry: entryText
        };

        setSavedEntriesState([...savedEntries, entry]);
        setEntryTextState('');
    }
    console.log(savedEntries);
    // bindings for managing react-hook-form -- check out https://www.react-hook-form.com/api/useform/ to learn more.
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <>
            <Nav className="justify-content-center mb-5" activeKey="/home">
                <Nav.Item>
                    <Nav.Link as={Link} to={'/notebook'}><strong className="title">Notebook</strong></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to={'/home'}><em className="diction-nav">BakPak</em> </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="viewSaved" onClick={handleShow}><em className="diction-nav">Saved Entries</em></Nav.Link>
                </Nav.Item>
            </Nav>


            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title >Notebook Entries</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {savedEntries.map((entry) => {
                        return (
                            <>
                                <Nav.Link key={crypto.randomUUID()} className="entries"> <em>{entry.title}</em> | {entry.date}</Nav.Link> <br />
                            </>
                        )

                    })}

                </Offcanvas.Body>
            </Offcanvas>


            <input onClick={handleModalShow} value={'create new entry'} className="submit newPost"></input>

            {/* Bootstrap modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Notebook Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleFormSubmit}>
                        <label for="title">Title:</label><br />
                        <input
                            type="text"
                            name='titleText'
                            id="title"
                            value={entryTitle}
                            onChange={handleInputChange}
                        />
                        <label for="entry">Entry:</label><br />
                        <textarea
                            type="textarea"
                            name='entryText'
                            id="entry"
                            rows={12}
                            value={entryText}
                            onChange={handleInputChange}
                        />
                        <input
                            type="submit"
                            id="submit"
                            value='submit'
                            onClick={handleModalClose}
                        />

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

            {savedEntries.map((entry) => {
                return (
                    <>
                        <div key={crypto.randomUUID()} className="note-box">
                            <p className="date">{entry.date}</p>
                            <h3 >{entry.title}</h3>
                            <h4 className="notebook">{entry.entry}</h4>

                            {/* <div className="savebtn">save word</div> */}
                        </div>
                    </>
                )

            })}


            {/* 
            <div className="note-box">
                <p className="">2 April 2022 | 3:21pm</p>
                <h4 className="notebook">Dear Diary, if the frog smokes all the cigarettes, call Hiro down at the docks. He knows how to trade tuna cans for smokes.</h4>
            </div> */}
        </>
    )
}

export default Notes;