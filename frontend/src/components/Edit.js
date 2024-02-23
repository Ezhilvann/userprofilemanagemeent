import { useState, useEffect } from "react";
import "../styles/Signup.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Load from "./Load";
function Edit() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if(localStorage.getItem("email")===""){
        navigate("*");
        return;
    }
    fetchdata();
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
        setData(users.data);

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
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file format
      const allowedFormats = ["image/jpeg", "image/png"];
      if (!allowedFormats.includes(file.type)) {
        toast.error("Please choose a valid image format (JPG or PNG).");
        return;
      }

      // Check file size
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxSize) {
        toast.error("Please choose an image smaller than 2 MB.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        // Assuming you want to update the 'image' property under data[0] with the data URL
        setData((prevData) => ({
          ...prevData,
          [0]: {
            ...prevData[0],
            image: reader.result,
          },
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handledata = (e) => {
    const { name, value } = e.target;

    // Use the callback form of setState to correctly update nested state
    setData((prevData) => ({
      ...prevData,
      [0]: {
        ...prevData[0],
        [name]: value,
      },
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const selectedDate = new Date(data[0].dob);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      toast.error("Please select a valid date of birth.");
      return;
    }
    if (
      data[0].firstname == "" ||
      data[0].lastname == "" ||
      data[0].organization == "" ||
      data[0].location == "" ||
      data[0].address == "" ||
      data[0].phone == "" ||
      data[0].dob == ""
    ) {
      toast.error("Please fill in all fields");
      return;
    } else {
      try {
        const update_data = await axios.post(
          `${process.env.REACT_APP_API_URL}/editdata`,
          data[0]
        );
        if (update_data.data.message) {
          toast.success("Profile Updated successfully");
          setTimeout(() => {
            navigate("/home");
          }, 1500);
          return;
        } else {
          toast.error("Something went wrong try again later");
          return;
        }
      } catch (err) {
        toast.error("Something went wrong try again later");
        console.log(err);
        return;
      }
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
            {" "}
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
                      <div class="small font-italic text-muted mb-4">
                        JPG or PNG no larger than 2 MB
                      </div>
                      <label class="btn btn-dark label">
                        Choose File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }} // Hide the actual file input
                        />
                      </label>
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
                            <label
                              class="small mb-1 label"
                              for="inputFirstName"
                            >
                              First name
                            </label>
                            <input
                              class="form-control"
                              id="inputFirstName"
                              type="text"
                              name="firstname"
                              value={data[0].firstname}
                              onChange={handledata}
                              placeholder="Enter your first name"
                              autoComplete="off"
                            />
                          </div>
                          <div class="col-md-6">
                            <label class="small mb-1 label" for="inputLastName">
                              Last name
                            </label>
                            <input
                              class="form-control"
                              id="inputLastName"
                              type="text"
                              placeholder="Enter your last name"
                              name="lastname"
                              value={data[0].lastname}
                              onChange={handledata}
                            />
                          </div>
                        </div>
                        <div class="row gx-3 mb-3">
                          <div class="col-md-6">
                            <label class="small mb-1 label" for="inputOrgName">
                              Organization name
                            </label>
                            <input
                              class="form-control"
                              id="inputOrgName"
                              type="text"
                              placeholder="Enter your organization name"
                              name="organization"
                              value={data[0].organization}
                              onChange={handledata}
                            />
                          </div>
                          <div class="col-md-6">
                            <label class="small mb-1 label" for="inputLocation">
                              Location
                            </label>
                            <input
                              class="form-control"
                              id="inputLocation"
                              type="text"
                              placeholder="Enter your location"
                              name="location"
                              value={data[0].location}
                              onChange={handledata}
                            />
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="small mb-1 label" for="address">
                            Current address
                          </label>
                          <textarea
                            class="form-control"
                            id="address"
                            type="text-area"
                            rows="3"
                            placeholder="Enter your email address"
                            style={{ resize: "none" }}
                            name="address"
                            value={data[0].address}
                            onChange={handledata}
                          />
                        </div>
                        <div class="row gx-3 mb-3">
                          <div class="col-md-6">
                            <label class="small mb-1 label" for="inputPhone">
                              Phone number
                            </label>
                            <input
                              class="form-control"
                              id="inputPhone"
                              type="number"
                              placeholder="Enter your phone number"
                              name="phone"
                              value={data[0].phone}
                              onChange={handledata}
                            />
                          </div>

                          <div class="col-md-6">
                            <label class="small mb-1 label" for="inputBirthday">
                              Birthday
                            </label>
                            <input
                              class="form-control"
                              id="inputBirthday"
                              type="date"
                              placeholder="Enter your birthday"
                              name="dob"
                              value={data[0].dob}
                              onChange={handledata}
                            />
                          </div>
                        </div>

                        <button
                          class="btn btn-danger mt-3"
                          type="button"
                          onClick={handlesubmit}
                        >
                          Update changes
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

export default Edit;
