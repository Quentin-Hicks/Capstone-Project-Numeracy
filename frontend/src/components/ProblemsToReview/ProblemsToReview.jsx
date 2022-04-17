import "./ProblemsToReview.css"
import React, { useEffect, useState } from 'react'
import Modal from "../../components/Modal/Modal";
import axios from "axios"

const ProblemsToReview = ({submittedProblems}, {problems}) => {

    const [isOpen, setIsOpen] = useState(false)

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [hints, setHints] = useState('')
    const [resources, setResources] = useState('')
    const [answer, setAnswer] = useState('')
    const [liveStatus, setLiveStatus] = useState('')

    const [changedProblem, setChangedProblem] = useState('')

    function handleUpdate(e){
        e.preventDefault()
        let updatedProblem = {
            title: title,
            content: content,
            hints: hints,
            answer: answer,
            resources: resources,
            live_status: liveStatus
        }
        setChangedProblem(updatedProblem)
        console.log('Problem Updated To: ', updatedProblem)
        updateProblem(updatedProblem, id)
    }

    async function updateProblem(problem, problemId){
        let response = await axios.put(`http://127.0.0.1:8000/api/problems/${problemId}/`, problem)
        // console.log(response.data)
      }

    function problemInReview(id, title, content, hints, resources, answer, liveStatus){
        setId(id)
        setTitle(title)
        setContent(content)
        setHints(hints)
        setResources(resources)
        setAnswer(answer)
        setLiveStatus(liveStatus)
    }

    function problemCardData(){
        return (
            <div className="wrapper">
                {/* <h1>Collection Page</h1> */}
                {submittedProblems.map((problem) => {
                    return (
                        <div className="card" key={problem.id} 
                        onClick={() => problemInReview(
                            problem.id,
                            problem.title,
                            problem.content,
                            problem.hints,
                            problem.resources,
                            problem.answer,
                            problem.live_status
                        )}>
                            <div className="card_body">
                                {/* Reminder: remove img src element */}
                                {/* <img src="images/math-equation.jpg" className='card_image'/> */}
                                <h2 className="card_title">{problem.title}</h2>
                                {/* <b className="card_details">{problem.content}</b> */}
                            </div>
                            <button onClick={() => setIsOpen(true)} className="card_btn">Review</button>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            {problemCardData()}
            
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div>
                    <form className="modal-form">
                    <label>Title</label>
                    <p>
                        <input 
                            type="text"
                            required='required'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </p>
                    <label>Content</label>
                    <p>
                        <input 
                            type="text"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </p>
                    <label>Hints</label>
                    <p>
                        <input 
                            type="text"
                            required
                            value={hints}
                            onChange={(e) => setHints(e.target.value)}
                        />
                    </p>
                    <label>Resources</label>
                    <p>
                        <input 
                            type="text"
                            required
                            value={resources}
                            onChange={(e) => setResources(e.target.value)}
                        />
                    </p>
                    <label>Answer</label>
                    <p>
                        <input 
                            type="text"
                            required
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </p>
                    <label className="go-live">Go Live</label>
                    <p className="modal-live">
                        <input 
                            type="checkbox"
                            name="golive"
                            required
                            onChange={(e) => setLiveStatus(e.target.checked)}
                        />
                    </p>
                    </form>
                </div>
                <button className="update-btn" onClick={handleUpdate}>Update</button>
            </Modal>
        </div>
    )
}

export default ProblemsToReview