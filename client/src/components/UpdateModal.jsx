import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UpdateModal = (props) => {
    const userdata = props.userdata;
    const onHide = props.onHide;

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const handleUpdate = (e) => {
        const updateBody = {
            newName: newName,
            newEmail: newEmail,
        };

        fetch(`/update/${userdata.id}`, {
            method: "PUT",
            body: JSON.stringify(updateBody),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => console.log(`${res.status} for update`));

        setNewName("");
        setNewEmail("");
    };

    return (
        <Modal centered {...props} backdrop="static" keyboard={false} size="lg">
            <Modal.Header className="d-flex justify-content-around">
                <Modal.Title className="text-center">
                    Updating data for S.no{" "}
                    <span className="text-muted">{userdata.s_no}</span>
                </Modal.Title>
                <Modal.Title>
                    User id-
                    <span className="font-monospace text-muted ">
                        {userdata.id}
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-grid">
                <Form method="PUT">
                    <Form.Group className="row">
                        <div className="col text-center">
                            <Form.Label>Enter new values below</Form.Label>
                        </div>
                        <div className="col text-center">
                            <Form.Label>Old information below</Form.Label>
                        </div>
                    </Form.Group>
                    <Form.Group className="row align-items-center mt-1 ">
                        <div className="col">
                            <Form.Control
                                type="text"
                                placeholder="Enter new name here"
                                value={newName}
                                onChange={(e) => {
                                    setNewName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col">
                            <Form.Label className="text-nowrap ">
                                {userdata.name}
                            </Form.Label>
                        </div>
                    </Form.Group>
                    <Form.Group className="row align-items-center my-3 ">
                        <div className="col">
                            <Form.Control
                                type="text"
                                placeholder="Enter new email here"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <Form.Label className="text-nowrap ">
                                {userdata.email}
                            </Form.Label>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-baseline">
                <div className="me-auto">
                    <span className="fw-light">
                        Leave the entries blank if you don't want to change any
                        data
                    </span>
                </div>
                <Button
                    variant="success"
                    onClick={(e) => {
                        handleUpdate(e);
                        onHide();
                    }}
                >
                    Update values
                </Button>
                <Button variant="danger" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default UpdateModal;
