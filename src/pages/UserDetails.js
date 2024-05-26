import React, { useState, useEffect, createRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageTitle from '../elements/PageTitle';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserDetails = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [city, setCity] = useState("");
    const [stateAddress, setStateAddress] = useState("");
    const [countryAddress, setCountryAddress] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [customMessage, setCustomessage] = useState("");
    const formRef = createRef();
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (state?.totalPrice && state?.CustomMessage) {
            setTotalPrice(state.totalPrice);
            setCustomessage(state.CustomMessage);
        }
    }, [state?.totalPrice , state?.CustomMessage]);

    const buyAllOrders = async (e) => {
        e.preventDefault();

        if (email === "" || firstName === "" || city === "" || stateAddress === "" || countryAddress === "" || streetAddress === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all fields!',
            });
            return;
        }

        try {
            const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/signature`,
                {
                    Amount: totalPrice,
                    FirstName: firstName,
                    Email: email,
                    City: city,
                    StateAddress: stateAddress,
                    CountryAddress: countryAddress,
                    StreetAddress: streetAddress,
                    CustomMessage: customMessage,
                    CurrencyCode: "JMD",
                },
                {
                    headers: {
                        "Authorization": AuthStr,
                        'Accept': '*/*',
                    }
                }
            );
            if (response?.data?.status === "success") {
                const form = formRef.current;
                form.querySelector('input[name="TransactionId"]').value = response.data.TransactionId;
                form.querySelector('input[name="Amount"]').value = totalPrice;
                form.querySelector('input[name="Signature"]').value = response.data.Signature;
                form.querySelector('input[name="BillToAddress"]').value = streetAddress;
                form.querySelector('input[name="BillToState"]').value = stateAddress;   
                form.querySelector('input[name="BillToFirstName"]').value = firstName;  
                form.querySelector('input[name="BillToCity"]').value = city;    
                form.querySelector('input[name="BillToEmail"]').value = email;
                form.querySelector('input[name="BillToCountry"]').value = countryAddress;
                form.submit();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error generating pay signature!',
                });
            }
            return;
        } catch (error) {
            console.error("Error updating cart products:", error);
        }
    }

    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="User Details" parentTitle="User Details" />
                <section className="content-inner overflow-hidden">
                    <div className="container">
                        <form style={{ display: 'none' }} action='https://staging-lascopay-payment.myamberpay.com/gateway/v1/standard-checkout' method='POST' ref={formRef}>
                            <input type="hidden" name="TransactionId" />
                            <input type="hidden" name="Amount" />
                            <input type="hidden" name="Signature" />
                            <input type="hidden" name="BillToAddress" />
                            <input type="hidden" name="BillToCountry" />
                            <input type="hidden" name="BillToState" />
                            <input type="hidden" name="BillToFirstName" />
                            <input type="hidden" name="BillToCity" />
                            <input type="hidden" name="BillToEmail" />
                            <input type="hidden" name="CurrencyCode" value="JMD" />
                            <input type="hidden" name="ClientId" value="blackfusefitness_dev" />
                            <input type="hidden" name="AutoRedirect" value="Y" />
                            <input type="hidden" name="CardTokenize" value="Y" />
                            <button className="btn btn-primary shadow-primary btn-skew" type='submit'>Save</button>
                        </form>
                        <form onSubmit={buyAllOrders}>
                            <div className='row mb-5'>
                                <div className="col-lg-6">
                                    <div className="input-group input-line">
                                        <input
                                            value={firstName}
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="First Name"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-group input-line">
                                        <input
                                            value={email}
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-group input-line">
                                        <input
                                            value={streetAddress}
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Street"
                                            onChange={(e) => setStreetAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-group input-line">
                                        <input
                                            value={city}
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="City"
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-group input-line">
                                        <input
                                            value={stateAddress}
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="State"
                                            onChange={(e) => setStateAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-group input-line">
                                        <input
                                            value={countryAddress}
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Country"
                                            onChange={(e) => setCountryAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <button type='submit' className="btn btn-primary btn-sm mt-3">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
};

export default UserDetails;