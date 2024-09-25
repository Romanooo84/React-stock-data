import css from '../styles/Contact.module.css'
import picture from '../pictures/student-roman-small.jpg'

export const Contact = () => {
    return (
        <div className={css.mainDiv}>
            <div className={css.itsMe} >
                <div className={css.adressPicture}>
                    <img  alt='Roman Pisarski React Java Script Css Html developer' src={picture}></img>
                    <div className={css.namePhoneEmail}>
                        <div className={css.namePhoneEmailPart}>
                            <p className={css.namePhoneEmailParagraph}>Name: </p>
                            <p className={css.namePhoneEmailParagraph}>Roman Pisarski</p>
                        </div>
                        <div className={css.namePhoneEmailPart}>
                            <p className={css.namePhoneEmailParagraph}>Phone:</p>
                            <a className={css.namePhoneEmailParagraph} href="tel:+48504707289">504-707-289</a>
                        </div>
                        <div className={css.namePhoneEmailPart}>
                            <p className={css.namePhoneEmailParagraph}>Email:</p>
                            <a className={css.namePhoneEmailParagraph} href="mailto:pisarski.roman@gmail.com">pisarski.roman@gmail.com</a>
                        </div>
                    </div>  
                </div>
                <div className={css.about}>
                    <div className={css.aboutElement}>
                        <h1>Skills:</h1>
                        <ul>
                            <li>Knowledge of English - good</li>
                            <li>Advanced computer skills</li>
                            <li>Excellent knowledge of Microsoft Office suite (Excel)</li>
                            <li>HTML+CSS (decorations, flexbox, responsiveness)</li>
                            <li>JavaScript (variables, functions, arrays, event handling, DOM, asynchronous operations, CRUD)</li>
                            <li>React (hooks, routing, API integration, basic Redux)</li>
                            <li>Node.js (console handling, Express, MongoDB, Email, Docker)</li>
                            <li>Basic knowledge of electronics and digital systems (ATTiny family microprocessors)</li>
                            <li>Category B driver's license</li>
                            <li>Ability to work under stress</li>
                            <li>Quick decision-making under time pressure</li>
                            <li>Teamwork skills</li>
                            <li>Strong interpersonal skills</li>
                            <li>Conflict-free</li>
                            <li>Creative</li>
                            <li>Committed to work</li>
                        </ul>
                    </div>

                    <div className={css.aboutElement}>
                        <h1>Hobby:</h1>
                        <ul>
                            <li>Automotive</li>
                            <li>Photography</li>
                            <li>Skiing</li>
                            <li>Smart Home technology</li>
                            <li>Electronics (microprocessors, basic programming in C)</li>
                            <li>Electrical engineering and energy (photovoltaics and energy storage)</li>
                            <li>Woodworking</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={css.about}>
            <div className={css.aboutElement}>
                    <h1>Education:</h1>
                        <ul>
                            <li><h3>2004-2009</h3></li>
                            <div>
                                <p>Master's Degree, Military University of Technology</p>
                                <p>Field of Study: Mechanics and Machine Construction</p>
                                <p>Specialization: Vehicle Operation Engineering and Diagnostics</p>
                            </div>
                            <li><h3>1999-2004</h3></li>
                            <div>
                                <p>Telecommunications Technical School</p>
                                <p>Field of Study: Telecommunication Systems</p>
                            </div>
                        </ul>
                </div>
                <div className={css.aboutElement}>
                    <h1>Courses:</h1>
                        <ul>
                            <li><h3>2018-2019</h3></li>
                            <p>Sales and Team Management (Certified BMW Manager)</p>
                            <li><h3>2023-2024</h3></li>
                            <p>Fullstack Developer (HTML+CSS, JavaScript, React, Node.js)</p>
                        </ul>
                </div>
                <div className={css.aboutElement}>
                    <h1>Work Experience:</h1>
                        <ul>
                            <li><h3>01.06.2021 – Present</h3></li>
                            <p>Carrefour Express (Wrzeciono 41)</p>
                            <p>Position: Store Manager</p>
                       
                            <li><h3>02.01.2017 – 31.05.2021</h3></li>
                            <p>Inchcape Motor Polska Authorized BMW, MINI, and BMW Motorrad Service</p>
                            <p>Position: Parts and Accessories Department Manager</p>
                     
                        
                            <li><h3>01.04.2015 – 31.12.2016</h3></li>
                            <p>Inchcape Motor Polska Authorized BMW, MINI, and BMW Motorrad Service</p>
                            <p>Position: Parts and Accessories Department Coordinator</p>
                     
                      
                            <li><h3>01.08.2012 – 31.03.2015</h3></li>
                            <p>Inchcape Motor Polska Authorized BMW, MINI, and BMW Motorrad Service</p>
                            <p>Position: Parts and Accessories Advisor</p>
                 
                     
                             <li><h3>01.08.2012 – 31.03.2015</h3></li>
                            <p>ASO Mercedes-Benz Zbigniew Nowakowski</p>
                            <p>Position: Spare Parts Specialist</p>

                    </ul>
            </div>
        </div>
    </div>
    )
}