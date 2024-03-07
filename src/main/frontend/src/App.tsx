import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import {Form, Card, Container, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";


function App() {
    const priorities = ['LOW', 'MEDIUM', 'HIGH'];
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');

    const [objectives, setObjectives] = useState([])
    useEffect(() => {
        // Initialize the datepicker when the component mounts
        $('#datepicker').datepicker({
            format: 'yyyy-mm-dd', // You can adjust the date format
            autoclose: true,
        });

        // Update the state when the date changes
        $('#datepicker').on('changeDate', (e: any) => {
            setDueDate(e.target.value);
        });
    }, []);


    async function handleSubmit() {

        try {
            await axios.post("http://localhost:8080/api/todolist", {
                description: description,
                priority: priority,
                deadline: dueDate
            })
        }catch (error){
            console.error("Error adding objective")
        }
        fetchObjectives();

    }


    useEffect(() => {
        fetchObjectives();
    }, []); // Initial fetch on component mount

    const fetchObjectives = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/todolist");
            setObjectives(response.data);
        } catch (error) {
            console.error("Error fetching from server", error);
        }
    };

    console.log(objectives);


    async function deleteObjective(id) {
        try {
            await axios.delete("http://localhost:8080/api/todolist/" + id)
        }catch (error){
            console.error("error deleting objective")
        }
        fetchObjectives();
    }

    return (
        <>
            <Card bg={"dark"} text={"white"} style={{ margin: 0, width: '100%', padding: "0.001em" }}>
                <Card.Body>
                    <Form style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Container style={{display: "flex", flexDirection: "column"}}>
                        <Form.Text style={{color: "white"}}>Add an Objective!</Form.Text>
                        <Form.Control
                            type={'text'}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter objective"
                        />
                        </Container>
                        <Container style={{display: "flex", flexDirection: "column"}}>
                        <Form.Label>Set priority</Form.Label>
                        <Form.Select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Select Priority</option>
                            {priorities.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </Form.Select>
                        </Container>
                        <Container style={{display: "flex", flexDirection: "column"}}>
                        <Form.Label>Due Date</Form.Label>
                        <Container style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control
                            type="text"
                            id="datepicker"
                            value={dueDate}
                            placeholder="Select a date"
                            readOnly // Make the input read-only to prevent direct text input
                        />
                            <i className="bi bi-calendar"></i>
                        </Container>
                        </Container>
                    </Form>
                    <Button style={{marginTop: '1em'}} variant={"secondary"} className={"btn-lg"} onClick={handleSubmit}>Submit</Button>
                </Card.Body>
            </Card>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "1200px", margin: "auto", marginTop: "2rem" }}>
                {objectives.map((obj) => (
                    <div key={obj.id} style={{ flex: "0 0 48%", margin: "0.5rem" }}>
                        <Container>
                            <Card bg={"dark"} text={"white"} style={{ width: "100%" }}>
                                <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                                    <Card.Title>
                                        {obj.description}
                                    </Card.Title>
                                    <Card.Text>
                                        {obj.priority}
                                    </Card.Text>
                                    <Card.Text>
                                        {obj.deadline}
                                    </Card.Text>
                                    <div className={"button-icon"} onClick={() => deleteObjective(obj.id)}>
                                        <i className="bi bi-x"></i>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Container>
                    </div>
                ))}
            </div>





        </>
    );
}

export default App;
