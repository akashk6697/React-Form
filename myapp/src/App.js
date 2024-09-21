// Filename - App.js
// It contains the Form, its Structure
// and Basic Form Functionalities

import "./App.css";
import { React, useState,useEffect } from "react";

function App() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("male");
    const [subjects, setSubjects] = useState({
        english: true,
        maths: false,
        physics: false,
    });
    const [resume, setResume] = useState("");
    const [url, setUrl] = useState();
    const [selectedOption, setSelectedOption] =
        useState("");
    const [about, setAbout] = useState("");
    const [message, setMessage] = useState(""); // For displaying success/error messages
    const [errors, setErrors] = useState({}); // For form validation errors

    // Validation function
    const validateForm = () => {
        let formErrors = {};
        if (!firstName) formErrors.firstName = "First Name is required";
        if (!lastName) formErrors.lastName = "Last Name is required";
        if (!email) formErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email address is invalid";
        if (!contact) formErrors.contact = "Contact is required";
        else if (!/^\d{10}$/.test(contact)) formErrors.contact = "Contact must be a 10-digit number";
        if (!url) formErrors.url = "URL is required";
        else if (!/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(url)) formErrors.url = "URL is invalid";
        if (!resume) formErrors.resume = "Resume is required";
        if (!selectedOption) formErrors.selectedOption = "Please select an option";
        if (!about) formErrors.about = "About section cannot be empty";
        return formErrors;
    };
    useEffect(() => {
        const storedFormData = localStorage.getItem("formData");
        if (storedFormData) {
            const parsedData = JSON.parse(storedFormData);
            setFirstName(parsedData.firstName || "");
            setLastName(parsedData.lastName || "");
            setEmail(parsedData.email || "");
            setContact(parsedData.contact || "");
            setGender(parsedData.gender || "male");
            setSubjects(parsedData.subjects || { english: true, maths: false, physics: false });
            setResume(parsedData.resume || null);
            setUrl(parsedData.url || "");
            setSelectedOption(parsedData.selectedOption || "");
            setAbout(parsedData.about || "");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
           
        const formData = {
            firstName,
            lastName,
            email,
            contact,
            gender,
            selectedOption,
            subjects,
            resume,
            url,
            about,
        };

        // Store form data in localStorage
        localStorage.setItem("formData", JSON.stringify(formData));
        setErrors(formErrors); // Set validation errors
        console.log(
            firstName,
            lastName,
            email,
            contact,
            gender,
            selectedOption,
            subjects,
            resume,
            url,
            about
        );
        // Add your form submission logic here
    };

    const handleSubjectChange = (sub) => {
        setSubjects((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };
    const handleReset = () => {
        // Reset all state variables here
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setGender("male");
        setSubjects({
            english: true,
            maths: false,
            physics: false,
        });
        setResume("");
        setUrl("");
        setSelectedOption("");
        setAbout("");
        setMessage(""); // Clear the message after reset
        setErrors({}); // Clear form errors

             // Clear localStorage data
             localStorage.removeItem("formData");
    };

    return (
        <div className="App">
            <h1>Form in React</h1>
            <fieldset>
                <form action="#" method="get">
                
                    <label htmlFor="firstname">
                        First Name*
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        placeholder="Enter First Name"
                        required
                    />
                      {errors.firstName && <p className="error">{errors.firstName}</p>}
                      
                    <label htmlFor="lastname">Last Name*</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        placeholder="Enter Last Name"
                        required
                    />
                      {errors.lastName && <p className="error">{errors.lastName}</p>}

                    <label htmlFor="email">Enter Email* </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter email"
                        required
                    />
                     {errors.email && <p className="error">{errors.email}</p>}
                    <label htmlFor="tel">Contact*</label>
                    <input
                        type="tel"
                        name="contact"
                        id="contact"
                        value={contact}
                        onChange={(e) =>
                            setContact(e.target.value)
                        }
                        placeholder="Enter Mobile number"
                        required
                    />
                      {errors.contact && <p className="error">{errors.contact}</p>}
                    <label htmlFor="gender">Gender*</label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        id="male"
                        checked={gender === "male"}
                        onChange={(e) =>
                            setGender(e.target.value)
                        }
                    />
                    Male
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        id="female"
                        checked={gender === "female"}
                        onChange={(e) =>
                            setGender(e.target.value)
                        }
                    />
                    Female
                    <input
                        type="radio"
                        name="gender"
                        value="other"
                        id="other"
                        checked={gender === "other"}
                        onChange={(e) =>
                            setGender(e.target.value)
                        }
                    />
                    Other
                    <label htmlFor="lang">
                        Your best Subject
                    </label>
                    <input
                        type="checkbox"
                        name="lang"
                        id="english"
                        checked={subjects.english === true}
                        onChange={(e) =>
                            handleSubjectChange("english")
                        }
                    />
                    English
                    <input
                        type="checkbox"
                        name="lang"
                        id="maths"
                        checked={subjects.maths === true}
                        onChange={(e) =>
                            handleSubjectChange("maths")
                        }
                    />
                    Maths
                    <input
                        type="checkbox"
                        name="lang"
                        id="physics"
                        checked={subjects.physics === true}
                        onChange={(e) =>
                            handleSubjectChange("physics")
                        }
                    />
                    Physics
                    <label htmlFor="file">Upload Resume*</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={(e) =>
                            setResume(e.target.files[0])
                        }
                        placeholder="Enter Upload File"
                        required
                    />
                      {errors.resume && <p className="error">{errors.resume}</p>}
                    <label htmlFor="url">Enter URL*</label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        onChange={(e) =>
                            setUrl(e.target.value)
                        }
                        placeholder="Enter url"
                        required
                    />
                       {errors.url && <p className="error">{errors.url}</p>}
                    <label>Select your choice</label>
                    <select
                        name="select"
                        id="select"
                        value={selectedOption}
                        onChange={(e) =>
                            setSelectedOption(
                                e.target.value
                            )
                        }
                    >
                        <option
                            value=""
                            disabled
                            defaultValue={selectedOption === ""}
                        >
                            Select your Ans
                        </option>
                        <optgroup label="Beginers">
                            <option value="1">HTML</option>
                            <option value="2">CSS</option>
                            <option value="3">
                                JavaScript
                            </option>
                        </optgroup>
                        <optgroup label="Advance">
                            <option value="4">React</option>
                            <option value="5">Node</option>
                            <option value="6">
                                Express
                            </option>
                            <option value="t">
                                MongoDB
                            </option>
                        </optgroup>
                    </select>
                    {errors.selectedOption && <p className="error">{errors.selectedOption}</p>}

                    <label htmlFor="about">About</label>
                    <textarea
                        name="about"
                        id="about"
                        cols="30"
                        rows="10"
                        onChange={(e) =>
                            setAbout(e.target.value)
                        }
                        placeholder="About your self"
                        required
                    ></textarea>
                       {errors.about && <p className="error">{errors.about}</p>}
                    <button
                        type="reset"
                        value="reset"
                        onClick={() => handleReset()}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        value="Submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </button>
                </form>
                {message && <p>{message}</p>} {/* Display success or error message */}
            </fieldset>
        </div>
    );
}

export default App;