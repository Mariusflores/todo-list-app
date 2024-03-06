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
    }

    return (
        <>
            <Card style={{ margin: 0, width: '100%', padding: "0.001em" }}>
                <Card.Body>
                    <Form style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Container style={{display: "flex", flexDirection: "column"}}>
                        <Form.Text>Add an Objective!</Form.Text>
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
        </>
    );
}

export default App;
