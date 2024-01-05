import React, { useState } from 'react';
import './Home.css';



const Home = () => {

    const [birthdate, setBirthDate] = useState('');
    const [age, setAge] = useState(0);

    const ageCalculate = () => {
        const today = new Date();
        const dob = new Date(birthdate);

        let currentage = today.getFullYear() - dob.getFullYear();
        let monthDif = today.getMonth() - dob.getMonth();
        if (monthDif < 0 || (monthDif === 0 && today.getDate() < dob.getDate())) {
            currentage--;
        }
        setAge(currentage);
    }

    const resetValue = () => {
        setBirthDate('');
        setAge(0);
    }

    return (
        <>
            <div className="row mt-5">
                <div className="col-lg-6 offset-lg-3">
                    <div className="d-flex justify-content-center-align-items-center">
                        <div className='container'>
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">AgeCalculator</div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <div>
                                                <input type="date" name="birthdate" value={birthdate}
                                                    onChange={(e) => { setBirthDate(e.target.value) }} className='form-control' />
                                            </div>
                                            <div className='d-flex justify-content-between  mt-4'>
                                                <button className='btn btn-info' onClick={ageCalculate}>Calculate</button>
                                                <button className='btn btn-success' onClick={resetValue}>Reset</button>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className=''>
                                                <strong>{age > 0 ? age : ''}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;