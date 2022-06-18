import RowData from "../components/RowData";

const TableData = (props) => {
    let dataList = props.data;

    return (
        <>
            <div className="bg-dark text-light my-2 rounded rounded-4 shadow text-center">
                <div className="d-flex justify-content-around align-items-center">
                    <h3 className="col-1">S no.</h3>
                    <h3 className="col-1">Name</h3>
                    <h3 className="col-1 ">Id</h3>
                    <h3 className="col-2">Email</h3>
                    <h3 className="col-1 me-4">Actions</h3>
                </div>
            </div>
            <div className="d-grid">
                {dataList.map((e) => (
                    <RowData
                        key={e.s_no}
                        userdata={e}
                        updateUser={props.updateUser}
                        deleteUser={props.deleteUser}
                        showModal={props.showModal}
                        setShowModal={props.setShowModal}
                    />
                ))}
            </div>
        </>
    );
};
export default TableData;
