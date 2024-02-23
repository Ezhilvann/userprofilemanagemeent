import { useEffect, useState } from "react";
import "../styles/Signup.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("email")===""){
      navigate("*");
      return;
  }
  },[])
  const [data, setData] = useState({
    email:localStorage.getItem("email"),
    firstname: "",
    lastname: "",
    organization: "",
    location: "",
    address: "",
    phone: "",
    dob: ""
  });
  const [Image, setImage] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(file.type)) {
      toast.error("Please select a JPG or PNG image.");
      return;
    }

    // Check file size (in bytes)
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      toast.error("Image size exceeds the limit of 2 MB.");
      return;
    }

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handledata = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlesubmit = async(e) => {
  
    e.preventDefault();
    const selectedDate = new Date(data.dob);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      toast.error("Please select a valid date of birth.");
      return;
    }
  
    if (Object.values(data).some(value => !value)) {
        toast.error('Please fill in all fields');
        return;
      }
      data.image = Image;
      console.log(data);
      try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/profile`,data
        )
        if(response.data.message){
          toast.success((await response).data.message)
          setTimeout(() => {
            navigate("/home")
          }, 1500);
        }
      }catch(err){
        console.log(err)
        toast.error("something went wrong try again later")
        return;
      }
    
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />

      <div class="container-xl px-4 mt-5 py-4">
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                <img
                  class="img-account-profile rounded-circle mb-2"
                  src={Image}
                  alt=""
                />
                <div class="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 2 MB
                </div>
                <label  class="btn btn-dark label">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }} // Hide the actual file input
                  />
                </label>
              </div>
                    <button classname="btn btn-danger p-3" onClick={()=>navigate("/login")}>
                    logout
                    </button>
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mb-4">
              <div class="card-header">Account Details</div>
              <div class="card-body">
                <form>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1 label" for="inputFirstName">
                        First name
                      </label>
                      <input
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        name="firstname"
                        value={data.firstname}
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
                        value={data.lastname}
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
                        value={data.organization}
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
                        value={data.location}
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
                      rows=""
                      placeholder="Enter your email address"
                      style={{ resize: "none" }}
                      name="address"
                      value={data.address}
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
                        value={data.phone}
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
                        value={data.dob}
                        onChange={handledata}
                      />
                    </div>
                  </div>

                  <button
                    class="btn btn-dark mt-3"
                    type="button"
                    onClick={handlesubmit}
                  >
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
