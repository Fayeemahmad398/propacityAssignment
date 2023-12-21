/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Box, Modal, } from "@mui/material";
import { useEffect, useState } from "react"
import { IoColorPaletteOutline } from "react-icons/io5";

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


    const [ArrOfNotes, setArrOfNotes] = useState([]);

    const [newNote, setNewNote] = useState({ title: "", note: "", color: "" });



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
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
        if (newNote.title && newNote.note) {
            setArrOfNotes([newNote, ...ArrOfNotes]);
            localStorage.setItem("allNotes", JSON.stringify([newNote, ...ArrOfNotes,]));
            setNewNote({ title: "", note: "", color: "" });
            setformInputIsOpen(false);
        }

    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("allNotes"))) {
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
    { console.log(editeColorOfIndex, newNote) }
    return (
        <div className="main">
            <div >
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
                        <div>

                            <IoColorPaletteOutline onClick={() => setColorIsOpenForAssign(true)} />

                            <button onClick={(e) => {

                                handleAddNote(e);
                            }
                            }>add note</button>
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
                        return <div className="one-note" style={{ background: `${info.color}` }}>
                            <div>
                                <div>Title:{info.title}</div>
                                <div>Note:{info.note}</div>
                            </div>

                            <div>

                                <IoColorPaletteOutline onClick={(e) => handleModalColor(e, index)} />

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
            {/* //deleter */}
            <Modal
                open={FormOfDeleteIsOpen}
                onClose={handleCloseModalOfDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1>Hello</h1>
                    <button onClick={DeleteNote}>yes</button>
                    <button onClick={NoNeedToDeleteNote}>No</button>

                </Box>
            </Modal>
            {/* changes edite */}
            <Modal
                open={FormOfEditeIsOpen}
                onClose={handleCloseModalOfEdite}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <input type="text" value={editeObj?.title} placeholder="Title" onChange={(e) => setEditeObj({ ...editeObj, title: e.target.value })} />
                    <input type="text" placeholder="Note" value={editeObj?.note} onChange={(e) => setEditeObj({ ...editeObj, note: e.target.value })} />
                    <button onClick={handleSaveChanges} >Save changes</button>
                    <button onClick={handleCloseModalOfEdite}>cancel</button>
                </Box>

            </Modal>


            {/* picker of each */}
            <Modal
                open={ColorIsOpen}
                onClose={handleCloseModalOfColor}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} open={ColorIsOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>


                        {
                            arrOfColor.map((col) => {
                                return <div style={{ background: `${col}`, height: "20px", width: "20px", borderRadius: "10px" }}
                                    onClick={(e) => handleColorChange(e, col)}
                                >

                                </div>
                            })
                        }
                    </div>

                </Box>

            </Modal>





            {/* form color change */}
            <Modal
                open={ColorIsOpenForAssign}
                onClose={handleCloseModalOfColorAssign}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >



                {/* Color picker for Assign color first time */}
                <Box sx={style}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        {
                            arrOfColor.map((col) => {
                                return <div style={{ background: `${col}`, height: "20px", width: "20px", borderRadius: "10px" }}
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
