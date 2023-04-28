import { useState } from "react";

import UpdateModal from "./UpdateModal";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const RowData = (props) => {
    const userdata = props.userdata;
    const deleteUser = props.deleteUser;

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <UpdateModal
                show={modalShow}
                userdata={userdata}
                onHide={() => {
                    setModalShow(false);
                }}
            />
            <Row className="shadow-sm rounded rounded-3s d-flex justify-content-around align-items-baseline my-2 py-1">
                <Col>
                    <span className="ps-5 mx-5">{userdata.s_no}</span>
                </Col>
                <Col>
                    <span className="ms-5">{userdata.name}</span>
                </Col>
                <Col className="border-dark">
                    <h5 className="ms-4">{userdata.id}</h5>
                </Col>
                <Col>
                    <span> {userdata.email}</span>
                </Col>
                <Col className="d-flex justify-content-around me-3">
                    <Button
                        className=""
                        onClick={() => {
                            setModalShow((value) => !value);
                        }}
                    >
                        Update
                    </Button>
                    <Button variant="danger" onClick={deleteUser}>
                        Delete
                    </Button>
                </Col>
            </Row>
        </>
    );
};
export default RowData;
