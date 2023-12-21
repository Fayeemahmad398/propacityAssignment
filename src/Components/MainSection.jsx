/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Box, Modal, } from "@mui/material";
import { useEffect, useState } from "react"
import { IoColorPaletteOutline } from "react-icons/io5";
import { toast } from "react-toastify";


function MainSection({ isGrid, searchTerm }) {
    const arrOfColor = ["#e2f6d3", "#fff8b8", "#d3bfdb", "#a142f4", "#b4ddd3", "#9971ed"];
    const [formInputIsOpen, setformInputIsOpen] = useState(false);
    const [FormOfDeleteIsOpen, setFormOfDeleteIsOpen] = useState(false);
    const [FormOfEditeIsOpen, setFormOfEditeIsOpen] = useState(false);
    const [ColorIsOpen, setColorIsOpen] = useState(false);
    const [ColorIsOpenForAssign, setColorIsOpenForAssign] = useState(false);
    const [deletedIndex, setDeletedIndex] = useState(null);
    const [editeIndex, setEditeIndex] = useState(null);
    const [editeObj, setEditeObj] = useState(null);
    const [editeColorOfIndex, setediteColorOfIndex] = useState(null);


    const [ArrOfNotes, setArrOfNotes] = useState([{ title: "default-1", note: "default 1", color: "" }, { title: "default-2", note: "default 2", color: "" }]);

    const [newNote, setNewNote] = useState({ title: "", note: "", color: "" });



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid yellow',
        boxShadow: 24,
        borderRadius: "5px",

        p: 4,
    };



    function handleClose(e) {
        e.preventDefault();
        setformInputIsOpen(false);
        setNewNote({ note: "", title: "", color: "" });

    }

    function handleFocus() {
        setformInputIsOpen(true);

    }

    function handleTitle(e) {
        setNewNote({ ...newNote, title: e.target.value });
    }
    function handleNote(e) {
        setNewNote({ ...newNote, note: e.target.value });

    }

    function handleAddNote(e) {
        e.preventDefault();
        if (newNote.title || newNote.note) {
            setArrOfNotes([newNote, ...ArrOfNotes]);
            localStorage.setItem("allNotes", JSON.stringify([newNote, ...ArrOfNotes,]));
            setNewNote({ title: "", note: "", color: "" });
            setformInputIsOpen(false);
        } else {
            toast.warn("Please fill title or note atleast");

        }

    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("allNotes"))?.length > 0) {
            setArrOfNotes(JSON.parse(localStorage.getItem("allNotes")))
        } else {
            localStorage.setItem("allNotes", JSON.stringify(ArrOfNotes))
        }
    }, []);



    useEffect(() => {
        let CopyData = JSON.parse(localStorage.getItem("allNotes"));

        setArrOfNotes(CopyData.filter((obj) => {
            return obj.title.toLowerCase().includes(searchTerm) || obj.note.toLowerCase().includes(searchTerm)
        }))
    }, [searchTerm])



    function DeleteNote() {
        ArrOfNotes.splice(deletedIndex, 1);
        setArrOfNotes([...ArrOfNotes]);
        localStorage.setItem("allNotes", JSON.stringify([...ArrOfNotes]));
        setFormOfDeleteIsOpen(false)

    }



    function handleModalOfDelete(index) {
        setFormOfDeleteIsOpen(true);
        setDeletedIndex(index);


    }


    function handleCloseModalOfDelete() {
        setFormOfDeleteIsOpen(false);


    }

    function NoNeedToDeleteNote() {
        setDeletedIndex(null);
        setFormOfDeleteIsOpen(false)

    }


    function handleEditeNote(e, index, info) {
        setFormOfEditeIsOpen(true);
        setEditeIndex(index);
        setEditeObj(info);

    }

    function handleSaveChanges() {
        ArrOfNotes.splice(editeIndex, 1, editeObj);
        setArrOfNotes([...ArrOfNotes]);
        setEditeIndex(null)
        localStorage.setItem("allNotes", JSON.stringify([...ArrOfNotes]));
        setFormOfEditeIsOpen(false);

    }


    function handleCloseModalOfEdite() {
        setFormOfEditeIsOpen(false);
    }



    function handleModalColor(e, index) {
        setediteColorOfIndex(index);
        setColorIsOpen(true);

    }

    function handleCloseModalOfColor() {
        setColorIsOpen(false);
        setediteColorOfIndex(null);

    }
    function handleColorChange(e, col) {

        ArrOfNotes[editeColorOfIndex]["color"] = col;

        setArrOfNotes([...ArrOfNotes]);
        localStorage.setItem("allNotes", JSON.stringify([...ArrOfNotes]));



    }

    function handleCloseModalOfColorAssign() {
        setColorIsOpenForAssign(false)
    }
    return (
        <div className="main">
            <div className="form-box">
                <form action="" className="form" style={{ background: `${newNote.color}` }}>
                    {
                        formInputIsOpen &&
                        <input type="text" placeholder="Title" onChange={(e) => {

                            handleTitle(e)
                        }

                        } value={newNote.title} />
                    }
                    <input type="text" placeholder="Take a note" onFocus={handleFocus} onChange={(e) => {

                        handleNote(e)
                    }} value={newNote.note} />

                    {
                        // form picker
                        formInputIsOpen &&
                        <div className="add-close-btns">
                            <IoColorPaletteOutline onClick={() => setColorIsOpenForAssign(true)} className="color-picker" />

                            <button onClick={(e) => {

                                handleAddNote(e);
                            }
                            } >+</button>
                            <button onClick={(e) => {
                                handleClose(e);
                            }
                            }>close</button>
                        </div>
                    }
                </form>

            </div>


            <div className={!isGrid ? "all-notes" : "all-notesGird"}>
                {
                    ArrOfNotes.map((info, index) => {
                        return <div className="one-note" style={{ background: `${info.color}`, }}>
                            <div className="title-note">
                                <div>{info.title}</div>
                                <div>{info.note}</div>
                            </div>

                            <div className="btns-delete-edite">

                                <IoColorPaletteOutline onClick={(e) => handleModalColor(e, index)} className="color-picker" />

                                <button onClick={(e) => { handleEditeNote(e, index, info) }}>edite</button>
                                <button onClick={() => {
                                    console.log(index);
                                    handleModalOfDelete(index)
                                }}>delete</button>


                            </div>
                        </div>


                    })
                }

            </div>

            {/* Modal for Delete permission of note */}
            <Modal
                open={FormOfDeleteIsOpen}
                onClose={handleCloseModalOfDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="delete-modal">
                    <h4 style={{ margin: "5px" }}>Are you sure ? You want to delete this note !</h4>
                    <button onClick={DeleteNote}>yes</button>
                    <button onClick={NoNeedToDeleteNote}>No</button>

                </Box>
            </Modal>


            {/* Modal for  edite note */}

            <Modal
                open={FormOfEditeIsOpen}
                onClose={handleCloseModalOfEdite}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} className="edite-input modal-edite-delete">
                    <input className="edite-input" type="text" value={editeObj?.title} placeholder="Title" onChange={(e) => setEditeObj({ ...editeObj, title: e.target.value })} />
                    <input className="edite-input" type="text" placeholder="Note" value={editeObj?.note} onChange={(e) => setEditeObj({ ...editeObj, note: e.target.value })} />
                    <button onClick={handleSaveChanges} className="save-changes" >Save changes</button>
                    <button onClick={handleCloseModalOfEdite}>cancel</button>
                </Box>

            </Modal>


            {/* modal for edite-color for each note */}
            <Modal
                open={ColorIsOpen}
                onClose={handleCloseModalOfColor}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} open={ColorIsOpen}
                className="color-picker-box"
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>


                        {
                            arrOfColor.map((col) => {
                                return <div style={{ background: `${col}`, height: "20px", width: "20px", borderRadius: "10px", cursor: "pointer" }}
                                    onClick={(e) => handleColorChange(e, col)}
                                >

                                </div>
                            })
                        }
                    </div>

                </Box>

            </Modal>

            {/* Modal for Assign color to note firstTime*/}
            <Modal
                open={ColorIsOpenForAssign}
                onClose={handleCloseModalOfColorAssign}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >



                {/* Color picker for Assign color first time */}
                <Box sx={style} className="color-picker-box"
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <div className="color-picker-box">
                        {
                            arrOfColor.map((col) => {
                                return <div style={{ background: `${col}`, height: "23px", width: "23px", borderRadius: "12px", border: "2px solid yellow", cursor: "pointer" }}
                                    onClick={() => {
                                        console.log("changepicker")
                                        setNewNote({ ...newNote, color: col })
                                    }} >


                                </div>
                            })
                        }
                    </div>

                </Box>

            </Modal>

        </div >
    )
}

export default MainSection
