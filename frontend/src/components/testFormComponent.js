import React, { Component } from 'react';
import axios from 'axios';
import {Button,Form,FormGroup,Label,Input,CustomInput} from "reactstrap";

class TestForm extends Component{

    constructor(props){
        super(props);

        this.state={
            questions:[
                {
                    name:"",
                    a1:{name:"",ans:false},
                    a2:{name:"",ans:false},
                    a3:{name:"",ans:false},
                    a4:{name:"",ans:false}
                }
            ]
        }
        this.handleAddQuestion=this.handleAddQuestion.bind(this);
        this.handleQuestionNameChange=this.handleQuestionNameChange.bind(this);
        this.handleRemoveQuestion=this.handleRemoveQuestion.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleAnswerChange=this.handleAnswerChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault()
        const token=localStorage.getItem("token");
        
        var message={
            "number":this.number.value,
            "description":this.description.value,
            "questions":[]
        }
        // eslint-disable-next-line array-callback-return
        this.state.questions.map((ques,idx)=>{
            message.questions.push({
                "description":ques.name,
                "isMultiple":false,
                "answers":[]
            })
            message.questions[idx].answers.push({
                "description":ques.a1.name,
                "isCorrect":ques.a1.ans
            })
            message.questions[idx].answers.push({
                "description":ques.a2.name,
                "isCorrect":ques.a2.ans
            })
            message.questions[idx].answers.push({
                "description":ques.a3.name,
                "isCorrect":ques.a3.ans
            })
            message.questions[idx].answers.push({
                "description":ques.a4.name,
                "isCorrect":ques.a4.ans
            })
        })
        
        alert(JSON.stringify(message))
        axios
        .post("https://localhost:3443/tests/",message,{ headers: { Authorization: `Bearer ${token}` }})
        .then(res => alert(res.data.status))
        .catch(err => alert(JSON.stringify(err.response)));

        document.getElementById("form").reset();
    }
    handleAddQuestion(){
        //alert(JSON.stringify(this.state))
        this.setState({
            questions: this.state.questions.concat([{
                name:"",
                a1:{name:"",ans:false},
                a2:{name:"",ans:false},
                a3:{name:"",ans:false},
                a4:{name:"",ans:false}
            }])
          });
    }
    handleRemoveQuestion(idx){
        this.setState({
            questions: this.state.questions.filter((s, sidx) => idx !== sidx)
          });
    }
    handleQuestionNameChange = idx => evt =>{
        const newQuestions = this.state.questions.map((question, sidx) => {
          if (idx !== sidx) return question;
          return { ...question, name: evt.target.value};
        });
        this.setState({ questions: newQuestions });
    };
    handleAnswerChange(idx,a,ch){
        //alert(JSON.stringify("hhhh",ch))
        const newQuestions = this.state.questions.map((question, sidx) => {
        if (idx !== sidx) return question;
        if(a===1){
            if(ch===1) return { ...question, a1: {name:this.a1.value,ans:!question.a1.ans}};
            return { ...question, a1: {name:this.a1.value,ans:question.a1.ans}};
        }
        if(a===2){
            if(ch===1) return { ...question, a2: {name:this.a2.value,ans:!question.a2.ans}};
            return { ...question, a2: {name:this.a2.value,ans:question.a2.ans}};
            }
        if(a===3){
            if(ch===1) return { ...question, a3: {name:this.a3.value,ans:!question.a3.ans}};
            return { ...question, a3: {name:this.a3.value,ans:question.a3.ans}};
        }
        else{
            if(ch===1) return { ...question, a4: {name:this.a4.value,ans:!question.a4.ans}};
            return { ...question, a4: {name:this.a4.value,ans:question.a4.ans}};
        }

        });
        this.setState({ questions: newQuestions });
    };
    
    render(){
        //alert("D");
        //alert(JSON.stringify(this.state.questions[0].answers))
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
                        <Input type="text" name="Question" placeholder={`Question #${idx + 1}`} value={question.name} 
                        onChange={this.handleQuestionNameChange(idx)}/>
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" name="Answer 1" placeholder="Answer 1" 
                        onChange={() => {this.handleAnswerChange(idx,1,0)}} innerRef={(input) => this.a1 = input}/>
                        <CustomInput type="switch" onChange={() => {this.handleAnswerChange(idx,1,1)}}/> Correct
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" name="Answer 2" placeholder="Answer 2"
                        onChange={() => {this.handleAnswerChange(idx,2,0)}} innerRef={(input) => this.a2 = input}/>
                        <CustomInput type="switch" onChange={() => {this.handleAnswerChange(idx,2,1)}}/> Correct
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" name="Answer 3" placeholder="Answer 3" 
                        onChange={() => {this.handleAnswerChange(idx,3,0)}} innerRef={(input) => this.a3 = input}/>
                        <CustomInput type="switch" onChange={() => {this.handleAnswerChange(idx,3,1)}}/> Correct
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" name="Answer 4" placeholder="Answer 4" 
                        onChange={() => {this.handleAnswerChange(idx,4,0)}} innerRef={(input) => this.a4 = input}/>
                        <CustomInput type="switch" onChange={() => {this.handleAnswerChange(idx,4,1)}}/> Correct
                        </FormGroup>
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