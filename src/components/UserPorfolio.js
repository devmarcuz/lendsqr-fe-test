import React from "react";

const UserPorfolio = ({ user }) => (
  <div className="user-portfolio">
    <div className="information">
      <h3>Personal Information</h3>
      <div className="details">
        <div className="detail">
          <div className="head">Full Name</div>
          <p>{user.username}</p>
        </div>
        <div className="detail">
          <div className="head">Phone Number</div>
          <p>{user.phonenumber}</p>
        </div>
        <div className="detail">
          <div className="head">Email Address</div>
          <p>{user.email && user.email.split("@")[0].split(".")[0]}@gmail.com</p>
        </div>
        <div className="detail">
          <div className="head">BVN</div>
          <p>{user.bvn}</p>
        </div>
        <div className="detail">
          <div className="head">Gender</div>
          <p>{user.gender}</p>
        </div>
        <div className="detail">
          <div className="head">Marital Status</div>
          <p>{user.maritalstatus}</p>
        </div>
        <div className="detail">
          <div className="head">Children</div>
          <p>{user.children}</p>
        </div>
        <div className="detail">
          <div className="head">Type of Residence</div>
          <p>{user.typeofresidence}</p>
        </div>
        {/* <div className="detail">
          <div className="head">Full Name</div>
          <p>Grace Effiom</p>
        </div> */}
      </div>
    </div>
    <div className="information">
      <h3>Education and Employment</h3>
      <div className="details">
        <div className="detail">
          <div className="head">Level of Education</div>
          <p>{user.levelofeducaion}</p>
        </div>
        <div className="detail">
          <div className="head">Employment Status</div>
          <p>{user.employmentstatus}</p>
        </div>
        <div className="detail">
          <div className="head">Sector of Employment</div>
          <p>{user.sectorofemployment}</p>
        </div>
        <div className="detail">
          <div className="head">Duration of Employment</div>
          <p>{user.durationofemployment}</p>
        </div>
        <div className="detail">
          <div className="head">Office Email</div>
          <p>{user.username?.split(" ")[0].toLowerCase() + "@lendsqr.com"}</p>
        </div>
        <div className="detail">
          <div className="head">Monthly Income</div>
          <p>
            <span>N</span>
            {user.income}.00
            {/* <span>N</span>200,000.00 - <span>N</span>400,000.00 */}
          </p>
        </div>
        <div className="detail">
          <div className="head">Loan Repayment</div>
          <p>{user.loanrepayment}</p>
        </div>
      </div>
    </div>
    <div className="information">
      <h3>Socials</h3>
      <div className="details">
        <div className="detail">
          <div className="head">Twitter</div>
          <p>
            @
            {user.username?.split(" ")[0].toLowerCase() +
              "_" +
              user.username?.split(" ")[1].toLowerCase()}
          </p>
        </div>
        <div className="detail">
          <div className="head">Facebook</div>
          <p>{user.username}</p>
        </div>
        <div className="detail">
          <div className="head">Instagram</div>
          <p>
            @
            {user.username?.split(" ")[0].toLowerCase() +
              "_" +
              user.username?.split(" ")[1].toLowerCase()}
          </p>
        </div>
      </div>
    </div>
    <div className="information">
      <h3>Guarantor</h3>
      <div className="details">
        <div className="detail">
          <div className="head">Full Name</div>
          <p>{user.guarantorName}</p>
        </div>
        <div className="detail">
          <div className="head">Phone Number</div>
          <p>{user.guarantorPhone}</p>
        </div>
        <div className="detail">
          <div className="head">Email Address</div>
          <p>
            {user.guarantorName?.split(" ")[0].toLowerCase() + "@gmail.com"}
          </p>
        </div>
        <div className="detail">
          <div className="head">Relationship</div>
          <p>{user.guarantorStatus}</p>
        </div>
      </div>
    </div>
  </div>
);

export default UserPorfolio;
