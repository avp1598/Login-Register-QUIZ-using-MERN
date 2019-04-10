import React, { Component } from 'react';
import axios from 'axios';
import {Button,Form,FormGroup,Label,Input,CustomInput} from "reactstrap";

class TestForm extends Component{

    constructor(props){
        super(props);

        this.state={
            questions:[
                {   
                    isMultiple:false,
                    description:"",
                    answers:[
                        {description:"",isCorrect:false}
                    ]
                }
            ]
        }
        this.handleAddQuestion=this.handleAddQuestion.bind(this);
        this.handleQuestionNameChange=this.handleQuestionNameChange.bind(this);
        this.handleRemoveQuestion=this.handleRemoveQuestion.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleAnswerChange=this.handleAnswerChange.bind(this);
        this.handleAddAnswer=this.handleAddAnswer.bind(this);
        this.handleRemoveAnswer=this.handleRemoveAnswer.bind(this);
        this.handleMultipleChange=this.handleMultipleChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        //alert(JSON.stringify(this.state.questions));
        const token=localStorage.getItem("token");
        var message={
            "number":this.number.value,
            "description":this.description.value,
            "questions":this.state.questions
        }
        // eslint-disable-next-line array-callback-return
        //alert(JSON.stringify(message))
        axios
        .post("https://localhost:3443/tests/",message,{ headers: { Authorization: `Bearer ${token}` }})
        .then(res => alert(res.data.status))
        .catch(err => alert(JSON.stringify(err.response)));
        document.getElementById("form").reset();
        this.setState({
            questions:[
                {   
                    isMultiple:false,
                    description:"",
                    answers:[
                        {description:"",isCorrect:false}
                    ]
                }
            ]
        })
    }
    handleAddQuestion(){
        //alert(JSON.stringify(this.state))
        this.setState({
            questions: this.state.questions.concat([{
                isMultiple:false,
                description:"",
                answers:[
                    {description:"",isCorrect:false}
                ]
            }
            ])
        })
    }
    handleRemoveQuestion(idx){
        this.setState({
            questions: this.state.questions.filter((s, sidx) => idx !== sidx)
          });
    }
    handleQuestionNameChange = idx => evt =>{
        const newQuestions = this.state.questions.map((question, sidx) => {
          if (idx !== sidx) return question;
          return { ...question, description: evt.target.value};
        });
        this.setState({ questions: newQuestions });
    };
    handleAnswerChange(idx,idxa,ch){
        const newQuestions=this.state.questions;
        newQuestions[idx].answers[idxa].description=this.answer.value;
        if(ch===1) newQuestions[idx].answers[idxa].isCorrect=!newQuestions[idx].answers[idxa].isCorrect
        this.setState({ questions: newQuestions });
    };
    handleRemoveAnswer(idx,idxa){
        const newQuestions=this.state.questions;
        newQuestions[idx].answers.splice(idxa,1)
        this.setState({ questions: newQuestions });
    }
    handleAddAnswer(idx){
        //alert(JSON.stringify(this.state))
        const newQuestions=this.state.questions;
        newQuestions[idx].answers.push({
            description:"",
            isCorrect:false
        })
        this.setState({ questions: newQuestions });
    }
    handleMultipleChange(idx){
        const newQuestions=this.state.questions;
        newQuestions[idx].isMultiple=!this.state.questions[idx].isMultiple;
        this.setState({ questions: newQuestions });
    }
    
    
    render(){
        //alert("D");
        //alert(JSON.stringify(this.state))
        return(
            <div className="col-sm-6">
                <Form onSubmit={this.handleSubmit} id="form">
                    <h4>Add New Tests</h4>
                    <FormGroup>
                        <Label>Test description</Label>
                        <Input type="text" innerRef={(input) => this.description = input}/>
                        <Label>Test Number</Label>
                        <Input type="number" innerRef={(input) => this.number = input}/>
                    </FormGroup>
                    {this.state.questions.map((question,idx) => (
                        <div>
                        <FormGroup>
                        <Label>Question</Label>
                        <Input type="text" name="Question" placeholder={`Question #${idx + 1}`}
                        onChange={this.handleQuestionNameChange(idx)}/>
                        isMultiple <CustomInput type="switch" onChange={() => {this.handleMultipleChange(idx)}} />
                        </FormGroup>
                        {question.answers.map((answer,idxa) => (
                            <div>
                            <Input type="text" name="Answer" placeholder="Answer"
                            onChange={() => {this.handleAnswerChange(idx,idxa,0)}} innerRef={(input) => this.answer = input}/>
                            <CustomInput type="switch" onChange={() => {this.handleAnswerChange(idx,idxa,1)}} />
                            <Button onClick={() => {this.handleRemoveAnswer(idx,idxa)}} outline color="danger">-</Button>
                            </div>
                        ))}
                        <Button onClick={() => {this.handleAddAnswer(idx)}} outline color="info">Add Answer + </Button>

                        <Button onClick={() => {this.handleRemoveQuestion(idx)}} outline color="danger">-</Button>
                        </div>
                    ))}
                    <Button onClick={this.handleAddQuestion} outline color="info">Add Question + </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default TestForm;