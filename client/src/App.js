import React, { useEffect, useState } from "react";

import TopNav from "./components/TopNav";
import NewData from "./components/NewData";
import TableData from "./components/TableData";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import image from "./image/GitHubIcon.png";

const App = () => {
    const [dataList, setDataList] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [userSearch, setUserSearch] = useState("");

    useEffect(() => {
        if (userSearch) {
            fetch(`/api/${userSearch}`)
                .then((res) => res.json())
                .then((data) => setDataList(data["sqlData"]));
        } else {
            fetch("/api")
                .then((res) => res.json())
                .then((data) => setDataList(data["sqlData"]));
        }
    }, [userSearch]);

    const deleteUser = (e) => {
        const userRow = e.target.parentElement.parentElement;
        const delId = userRow.children[2].innerText;
        fetch(`/delete/${delId}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.status !== 204) {
                alert("Server could not delete data");
            } else {
                fetch("/api")
                    .then((res) => res.json())
                    .then((data) => setDataList(data["sqlData"]));
            }
        });
    };

    document.title = "CRUD App";
    return (
        <>
            <TopNav image={image} />
            <Container className="py-4">
                <div className="d-flex align-items-baseline justify-content-between">
                    <Button
                        variant="dark"
                        className="mb-3 "
                        onClick={() => {
                            setShowAdd((prevVal) => !prevVal);
                        }}
                    >
                        Add New Data
                    </Button>
                    <div className="w-25 ms-5 input-group">
                        <FormControl
                            type="text"
                            placeholder="Search for a user"
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                        />
                        <Button
                            variant="dark"
                            onClick={() => {
                                setUserSearch("");
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
                {showAdd && (
                    <NewData
                        setShowAdd={setShowAdd}
                        setDataList={setDataList}
                    />
                )}
            </Container>
            <Container>
                <TableData data={dataList} deleteUser={deleteUser} />
            </Container>
        </>
    );
};

export default App;
