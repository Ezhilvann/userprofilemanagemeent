import { useEffect, useState } from "react";
import "../styles/Signup.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Load from "./Load";
function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if(localStorage.getItem("email")==null){
      //  alert("hello")
        navigate("*");
        return;
    }else{
        fetchdata();
    }
  }, []);
  const fetchdata = async () => {
    try {
      const users = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          params: {
            email: localStorage.getItem("email"),
          },
        }
      );
      if (users.status === 200) {
        // console.log(users.data)
        setData(users.data);

        console.log(data);
        setloading(false); // Set loading to false after data is fetched
        return;
      } else {
        toast.error("something went wrong try again later");
      }
    } catch (err) {
      toast.error("something went wrong try again later");
      console.log(err);
      return;
    }
  };
  const handleedit = () => {
    const edit = window.confirm("Are you want to edit the profile");
    if (edit) {
      navigate("/editdata");
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Load />
          </div>
        ) : (
          <>
            <div class="container-xl px-4 mt-5 py-4">
              <div class="row">
                <div class="col-xl-4">
                  <div class="card mb-4 mb-xl-0">
                    <div class="card-header">Profile Picture</div>
                    <div class="card-body text-center">
                      <img
                        class="img-account-profile rounded-circle mb-2"
                        src={data[0].image}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="col-xl-8">
                  <div class="card mb-4">
                    <div class="card-header">Account Details</div>
                    <div class="card-body">
                      <form>
                        <div class="row gx-3 mb-3">
                          <div class="col-md-6">
                            <label class="small mb-1" for="inputFirstName">
                              First name
                            </label>
                            <input
                              class="form-control"
                              id="inputFirstName"
                              type="text"
                              name="firstname"
                              value={data[0].firstname}
                              placeholder="Enter your first name"
                              autoComplete="off"
                            />
                          </div>
                          <div class="col-md-6">
                            <label class="small mb-1" for="inputLastName">
                              Last name
                            </label>
                            <input
                              class="form-control"
                              id="inputLastName"
                              type="text"
                              placeholder="Enter your last name"
                              name="lastname"
                              value={data[0].lastname}
                            />
                          </div>
                        </div>
                        <div class="row gx-3 mb-3">
                          <div class="col-md-6">
                            <label class="small mb-1" for="inputOrgName">
                              Organization name
                            </label>
                            <input
                              class="form-control"
                              id="inputOrgName"
                              type="text"
                              placeholder="Enter your organization name"
                              name="organization"
                              value={data[0].organization}
                            />
                          </div>
                          <div class="col-md-6">
                            <label class="small mb-1" for="inputLocation">
                              Location
                            </label>
                            <input
                              class="form-control"
                              id="inputLocation"
                              type="text"
                              placeholder="Enter your location"
                              name="location"
                              value={data[0].location}
                            />
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="small mb-1" for="address">
                            Current address
                          </label>
                          <textarea
                            class="form-control"
                            id="address"
                            type="text-area"
                            rows=""
                            placeholder="Enter your email address"
                            style={{ resize: "none" }}
                            name="address"
                            value={data[0].address}
                          />
                        </div>
                        <div class="row gx-3 mb-3">
                          <div class="col-md-6">
                            <label class="small mb-1" for="inputPhone">
                              Phone number
                            </label>
                            <input
                              class="form-control"
                              id="inputPhone"
                              type="number"
                              placeholder="Enter your phone number"
                              name="phone"
                              value={data[0].phone}
                            />
                          </div>

                          <div class="col-md-6">
                            <label class="small mb-1" for="inputBirthday">
                              Birthday
                            </label>
                            <input
                              class="form-control"
                              id="inputBirthday"
                              type="text"
                              placeholder="Enter your birthday"
                              name="dob"
                              value={data[0].dob}
                            />
                          </div>
                        </div>

                        <button
                          class="btn btn-danger mt-3"
                          type="button"
                          onClick={handleedit}
                        >
                          Edit profile
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
}

export default Home;
