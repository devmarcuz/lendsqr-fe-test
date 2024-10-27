import React, { useEffect, useRef, useState } from "react";
import FilterDropDown from "./FilterDropDown";
import UserRowMenu from "./UserRowMenu";
import { useNavigate } from "react-router-dom";
import { shortenEmail } from "../utils/data";

const UserTableList = ({
  currentPosts,
  currentPage,
  totalPosts,
  setTotalPosts,
  searchArray,
  setSearchArray,
  setCurrentPage,
}) => {
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [filterDropDown5, setFilterDropDown5] = useState(false);
  const [filterDropDown6, setFilterDropDown6] = useState(false);
  const [filterDropDown2, setFilterDropDown2] = useState(false);
  const [filterDropDown3, setFilterDropDown3] = useState(false);
  const [filterDropDown4, setFilterDropDown4] = useState(false);

  const containerRef = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef5 = useRef(null);
  const containerRef3 = useRef(null);
  const containerRef4 = useRef(null);
  const containerRef6 = useRef(null);

  const handleClickOutside = (event) => {
    if (
      containerRef?.current &&
      !containerRef?.current.contains(event.target)
    ) {
      setFilterDropDown(false);
    }
    if (
      containerRef2?.current &&
      !containerRef2?.current.contains(event.target)
    ) {
      setFilterDropDown2(false);
    }
    if (
      containerRef5?.current &&
      !containerRef5?.current.contains(event.target)
    ) {
      setFilterDropDown5(false);
    }
    if (
      containerRef3?.current &&
      !containerRef3?.current.contains(event.target)
    ) {
      setFilterDropDown3(false);
    }
    if (
      containerRef4?.current &&
      !containerRef4?.current.contains(event.target)
    ) {
      setFilterDropDown4(false);
    }
    if (
      containerRef6?.current &&
      !containerRef6?.current.contains(event.target)
    ) {
      setFilterDropDown6(false);
    }
  };

  useEffect(() => {
    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [searchData, setSearchData] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phonenumber: "",
    status: "",
  });

  const toggleRowMenu = (index) => {
    let rowMenu = false;
    const rowMenuElement = document.querySelectorAll(".row-menu");
    Array.from(rowMenuElement).forEach((element) => {
      if (
        element.id === `menu_${index}` &&
        element.classList.contains("show")
      ) {
        element.classList.remove("show");
        rowMenu = true;
      }

      if (element.id === `menu_${index}` && !rowMenu) {
        element.classList.add("show");
      } else {
        element.classList.remove("show");
      }
    });
  };

  useEffect(() => {
    function activate() {
      const parentUser = document.querySelectorAll(
        ".table-container .status-wrap"
      );

      if (currentPosts && currentPage) {
        Array.from(parentUser).forEach((userTag) => {
          if (userTag.textContent.toLowerCase() === "inactive") {
            userTag.classList.add("inactive");
            userTag.classList.remove("pending");
            userTag.classList.remove("blacklisted");
          } else if (userTag.textContent.toLowerCase() === "pending") {
            userTag.classList.add("pending");
            userTag.classList.remove("blacklisted");
            userTag.classList.remove("inactive");
          } else if (userTag.textContent.toLowerCase() === "blacklisted") {
            userTag.classList.add("blacklisted");
            userTag.classList.remove("inactive");
            userTag.classList.remove("pending");
          } else {
            userTag.classList.remove("inactive");
            userTag.classList.remove("pending");
            userTag.classList.remove("blacklisted");
          }
        });
      }
    }
    activate();
  }, [currentPosts, currentPage, searchArray]);

  function truncateString(str, num) {
    if (str?.length <= num) {
      return str;
    } else {
      return str.slice(0, num) + "...";
    }
  }

  const handleClose = (index) => {
    // shutFilterDropDown();
    // toggleRowMenu(index);
  };

  useEffect(() => {
    console.log(searchArray);
  }, [searchArray]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="organization">
              <div
                className="wrap"
                onClick={() => setFilterDropDown(!filterDropDown)}
              >
                <p>organization</p>
                <div>
                  <img src="/svgs/filter-results-button.svg" alt="" />
                </div>
              </div>
              {filterDropDown && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setCurrentPage={setCurrentPage}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  containerRef={containerRef}
                  // shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                />
              )}
            </th>
            <th className="username">
              <div
                className="wrap"
                onClick={() => setFilterDropDown2(!filterDropDown2)}
              >
                <p>username</p>
                <div>
                  <img src="/svgs/filter-results-button.svg" alt="" />
                </div>
              </div>
              {filterDropDown2 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setCurrentPage={setCurrentPage}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  // shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                  containerRef={containerRef2}
                />
              )}
            </th>
            <th className="email">
              <div
                className="wrap"
                onClick={() => setFilterDropDown3(!filterDropDown3)}
              >
                <p>email</p>
                <div>
                  <img src="/svgs/filter-results-button.svg" alt="" />
                </div>
              </div>
              {filterDropDown3 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setCurrentPage={setCurrentPage}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  // shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                  containerRef={containerRef3}
                />
              )}
            </th>
            <th className="phonenumber">
              <div
                className="wrap"
                onClick={() => setFilterDropDown4(!filterDropDown4)}
              >
                <p>phone number</p>
                <div>
                  <img src="/svgs/filter-results-button.svg" alt="" />
                </div>
              </div>
              {filterDropDown4 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setCurrentPage={setCurrentPage}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  // shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                  containerRef={containerRef4}
                />
              )}
            </th>
            <th className="datejoined">
              <div
                className="wrap"
                onClick={() => setFilterDropDown5(!filterDropDown5)}
              >
                <p>date joined</p>
                <div>
                  <img src="/svgs/filter-results-button.svg" alt="" />
                </div>
              </div>
              {filterDropDown5 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setCurrentPage={setCurrentPage}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  // shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                  containerRef={containerRef5}
                />
              )}
            </th>
            <th className="status">
              <div
                className="wrap"
                onClick={() => setFilterDropDown6(!filterDropDown6)}
              >
                <p>status</p>
                <div>
                  <img src="/svgs/filter-results-button.svg" alt="" />
                </div>
              </div>
              {filterDropDown6 && (
                <FilterDropDown
                  totalPosts={totalPosts}
                  setCurrentPage={setCurrentPage}
                  setTotalPosts={setTotalPosts}
                  setSearchArray={setSearchArray}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  // shutFilterDropDown={shutFilterDropDown}
                  onHandleClose={handleClose}
                  containerRef={containerRef6}
                />
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {currentPosts.map((dt, index) => (
            <tr key={index}>
              <td data-label="ID" className="organization">
                {truncateString(dt?.organization, 18)}
              </td>
              <td data-label="ID" className="username">
                {truncateString(dt?.username, 14)}
              </td>
              <td data-label="ID" className="email">
                {shortenEmail(dt?.email)}
              </td>
              <td data-label="ID" className="phonenumber">
                {dt?.phonenumber}
              </td>
              <td data-label="ID" className="datejoined">
                {dt?.datejoined}
              </td>
              <td data-label="ID" className="status">
                <div className="status-wrap ">{dt?.status}</div>
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => toggleRowMenu(index)}
                  className="icon-menu-svg"
                >
                  <path
                    d="M1.99992 4.1111C2.92214 4.1111 3.66658 3.36666 3.66658 2.44444C3.66658 1.52222 2.92214 0.777771 1.99992 0.777771C1.0777 0.777771 0.333252 1.52222 0.333252 2.44444C0.333252 3.36666 1.0777 4.1111 1.99992 4.1111ZM1.99992 6.33333C1.0777 6.33333 0.333252 7.07777 0.333252 7.99999C0.333252 8.92221 1.0777 9.66666 1.99992 9.66666C2.92214 9.66666 3.66658 8.92221 3.66658 7.99999C3.66658 7.07777 2.92214 6.33333 1.99992 6.33333ZM1.99992 11.8889C1.0777 11.8889 0.333252 12.6333 0.333252 13.5555C0.333252 14.4778 1.0777 15.2222 1.99992 15.2222C2.92214 15.2222 3.66658 14.4778 3.66658 13.5555C3.66658 12.6333 2.92214 11.8889 1.99992 11.8889Z"
                    fill="#545F7D"
                  />
                </svg>
                <UserRowMenu
                  index={index}
                  user={dt}
                  toggleRowMenu={toggleRowMenu}
                  totalPosts={totalPosts}
                  onHandleClose={handleClose}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableList;
