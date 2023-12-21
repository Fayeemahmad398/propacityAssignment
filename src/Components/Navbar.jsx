/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "../Style/navbar.css"
import logo from "../assets/keepimg.jpg"
import { CiGrid41 } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";


function Navbar({ searchTerm, setSearchTerm, isGrid, setGrid }) {


    console.log(searchTerm)
    return (
        <div className="navbar">
            <div className="img-box"><img src={logo} alt="" />
                <h2>Keep</h2>
            </div>
            <div className="input-box">
                <input type="text" placeholder="Search by title or note" onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} />
                <CiSearch className="icon-search" />

            </div  >
            <div >

                {
                    !isGrid ? (<CiGrid2H onClick={() => setGrid(true)} className="icons-grids" />) : (<CiGrid41 onClick={() => setGrid(false)} className="icons-grids" />)

                }
            </div>


        </div >
    )
}
export default Navbar