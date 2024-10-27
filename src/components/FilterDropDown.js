import React, { useEffect, useRef, useState } from "react";
import "../scss/FilterDropDown.css";

const FilterDropDown = ({
  totalPosts,
  setSearchArray,
  setSearchData,
  searchData,
  shutFilterDropDown,
  onHandleClose,
  containerRef,
  setCurrentPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState("Select");
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select");
  const orgRef = useRef(null);
  const statusRef = useRef(null);

  const handleClickOutside = (event) => {
    if (orgRef?.current && !orgRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (statusRef?.current && !statusRef?.current.contains(event.target)) {
      setIsOpen1(false);
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

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { organization, username, email, date, phonenumber, status } =
    searchData;

  const statusOptions = [
    { label: "active", value: "active" },
    { label: "inactive", value: "inactive" },
    { label: "blacklisted", value: "blacklisted" },
    { label: "pending", value: "pending" },
  ];

  useEffect(() => {
    const uniqueOptions = Array.from(
      new Set(totalPosts.map((post) => post.organization))
    ).map((organization) => ({
      label: organization,
      value: organization,
    }));

    setOptions(uniqueOptions);
  }, [totalPosts]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !event.target.classList.contains("filter-icon")
      ) {
        onHandleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [containerRef, onHandleClose]);

  const handleSelectOption = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    setIsOpen(false);
    setSearchTerm("");
    setSearchData({
      ...searchData,
      organization: value.toLowerCase() === "select" ? "" : value.toLowerCase(),
    });
  };

  const handleSelectOption1 = (value) => {
    setSelectedOption1(value);
    setIsOpen1(false);
    setSearchData({
      ...searchData,
      status: value.toLowerCase() === "select" ? "" : value.toLowerCase(),
    });
  };

  const handleDate = (e) => {
    const dateInput = document.querySelector(".custom-date-input");
    dateInput.click();
  };

  const handleDateValue = (e) => {
    setSearchData({
      ...searchData,
      date: e.target.value,
    });
  };

  const onReset = () => {
    setSelectedOption("Select");
    setSelectedOption1("Select");
    setSearchArray([]);
    setSearchTerm("");
    setSearchData({
      ...searchData,
      username: "",
      email: "",
      date: "",
      phonenumber: "",
    });
  };

  function searchElements(searchObj, elements) {
    const filteredElements = elements.filter((element) => {
      for (const key in searchObj) {
        if (
          searchObj.hasOwnProperty(key) &&
          element.hasOwnProperty(key) &&
          element[key].toLowerCase() === searchObj[key].toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    });

    // Remove duplicates based on unique key values
    const uniqueElements = Array.from(
      new Set(filteredElements.map(JSON.stringify))
    ).map(JSON.parse);

    return uniqueElements;
  }

  function searchElements2(searchObj, elements) {
    const filteredElements = elements.filter((element) => {
      let matchingCount = 0;
      for (const key in searchObj) {
        if (
          searchObj.hasOwnProperty(key) &&
          element.hasOwnProperty(key) &&
          element[key].toLowerCase() === searchObj[key].toLowerCase()
        ) {
          matchingCount++;
        }
      }
      return matchingCount >= 2; // Modify the number of matching key-value pairs as per your requirement
    });

    // Remove duplicates based on unique key values
    const uniqueElements = Array.from(
      new Set(filteredElements.map(JSON.stringify))
    ).map(JSON.parse);

    return uniqueElements;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const filteredPosts = totalPosts.filter((post) => {
      return Object.keys(searchData).every((key) => {
        if (searchData[key] !== "") {
          if (key === "status") {
            // For status, ensure it matches exactly (case-insensitive)
            return (
              post.status &&
              post.status.toLowerCase() === searchData.status.toLowerCase()
            );
          } else {
            // For other fields, use case-insensitive partial matching
            return (
              post[key] &&
              post[key]
                .toString()
                .toLowerCase()
                .includes(searchData[key].toString().toLowerCase())
            );
          }
        }
        return true; // If searchData field is empty, include all posts for that field
      });
    });

    // Check if filteredPosts has the same length as totalPosts
    const result =
      filteredPosts.length === totalPosts.length ? [] : filteredPosts;

    setCurrentPage(1);
    setSearchArray(result);

    // if (totalPosts.length > 1 && searchData) {
    //   let count = 0;
    //   for (let obj in searchData) {
    //     if (searchData.hasOwnProperty(obj)) {
    //       count++;
    //       const value = searchData[obj];
    //       if (!value) {
    //         cond.push(true);
    //       }
    //     }
    //   }

    //   if (cond.length === count) {
    //     setSearchArray([]);
    //   } else {
    //     if (count - cond.length === 1) {
    //       setSearchArray(searchElements(searchData, totalPosts));
    //     } else {
    //       setSearchArray(searchElements2(searchData, totalPosts));
    //     }
    //   }
    // }
    // shutFilterDropDown();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="filter-dropdown-container"
      ref={containerRef}
    >
      <div className="label">
        <label>Organization</label>
        <div className={`custom-select ${isOpen ? "open" : ""}`}>
          <div
            className={`custom-select__selected  custom-org ${
              selectedOption !== "Select" ? "selected" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <input
              type="text"
              className="custom-select__search"
              placeholder="Select"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6">
                <path
                  d="M11.0571 3.99378C11.8982 3.15269 13.1594 4.45644 12.3182 5.25487L7.56747 10.0056C7.23115 10.3841 6.6427 10.3841 6.30638 10.0056L1.63989 5.38129C0.840915 4.5402 2.10255 3.27906 2.9431 4.1202L6.93688 8.11398L11.0571 3.99378Z"
                  fill="#213F7D"
                />
              </g>
            </svg>
          </div>
          {isOpen && (
            <div className="custom-select__dropdown" ref={orgRef}>
              <ul className="custom-select__options">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      className="custom-select__option"
                      onClick={() => {
                        handleSelectOption(option.value);
                        setSearchTerm(option.value);
                      }}
                    >
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className="custom-select__option--no-results">
                    No results found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="label">
        <label>Username</label>
        <input
          type="text"
          placeholder="User"
          onChange={(e) => {
            setSearchData({
              ...searchData,
              username: e.target.value,
            });
          }}
          value={username}
        />
      </div>
      <div className="label">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id=""
          placeholder="Email"
          onChange={(e) => {
            setSearchData({
              ...searchData,
              email: e.target.value,
            });
          }}
          value={email}
        />
      </div>
      <div className="label">
        <label htmlFor="date">Date</label>
        <div className="input">
          <input
            type="date"
            name="date"
            className="custom-date-input"
            placeholder="Date"
            onChange={handleDateValue}
          />
          {!date && <div className="placeholder">Date</div>}
        </div>
        <svg
          onClick={handleDate}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9919 2.16002H12.7037V0.768152C12.7037 0.560024 12.5437 0.400024 12.3356 0.400024H10.6562C10.4481 0.400024 10.2881 0.560024 10.2881 0.768152V2.16002H5.7118V0.768152C5.7118 0.560024 5.5518 0.400024 5.34367 0.400024H3.66367C3.45554 0.400024 3.29554 0.560024 3.29554 0.768152V2.16002H1.00802C0.816149 2.16002 0.639893 2.32002 0.639893 2.52815V15.2482C0.639893 15.4563 0.799893 15.6163 1.00802 15.6163H14.9917C15.1836 15.6163 15.3598 15.4563 15.3598 15.2482V2.52815C15.3598 2.32002 15.1836 2.16002 14.9917 2.16002H14.9919ZM11.0082 1.13628H11.9682V3.24812H11.0082V1.13628ZM4.01637 1.13628H4.97637V3.24812H4.01637V1.13628ZM14.6239 14.8638H1.37637V5.5038H14.6245L14.6239 14.8638Z"
            fill="#545F7D"
          />
        </svg>
      </div>
      <div className="label">
        <label htmlFor="number">Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          onChange={(e) => {
            setSearchData({
              ...searchData,
              phonenumber: e.target.value,
            });
          }}
          value={phonenumber}
        />
      </div>
      <div className="label">
        <label htmlFor="status">Status</label>
        <div
          className={`custom-select ${isOpen1 ? "open" : ""}`}
          ref={statusRef}
        >
          <div
            className={`custom-select__selected ${
              selectedOption1 !== "Select" ? "selected" : ""
            }`}
            onClick={() => setIsOpen1(!isOpen1)}
          >
            {!status ? selectedOption1 : status}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6">
                <path
                  d="M11.0571 3.99378C11.8982 3.15269 13.1594 4.45644 12.3182 5.25487L7.56747 10.0056C7.23115 10.3841 6.6427 10.3841 6.30638 10.0056L1.63989 5.38129C0.840915 4.5402 2.10255 3.27906 2.9431 4.1202L6.93688 8.11398L11.0571 3.99378Z"
                  fill="#213F7D"
                />
              </g>
            </svg>
          </div>
          <ul className="custom-select__options">
            {statusOptions.map((option, index) => (
              <li
                key={index}
                className="custom-select__option"
                onClick={() => handleSelectOption1(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="actions">
        <button type="reset" onClick={onReset}>
          Reset
        </button>
        <button className="filter">Filter</button>
      </div>
    </form>
  );
};

export default FilterDropDown;
