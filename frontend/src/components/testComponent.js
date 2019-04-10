import React, { Component } from 'react';
import axios from 'axios';
import {Button,Form,FormGroup,Label,Input} from "reactstrap";
import {Fade, Stagger } from 'react-animation-components';
import {Redirect} from 'react-router-dom';


function RenderAnswer({answer}){
    if(answer.isCorrect) return <div className="text-success">{answer.description}</div>
    else return <div className="text-danger">{answer.description}</div>
}


function RenderAnswers({answers}){

        var answerList = answers.map(answer => {
            //alert(JSON.stringify(answer.isCorrect ))
            return (
                <Stagger in>
                    <Fade in>
                    <li key={answer.id} >
                        <div>
                            <RenderAnswer answer={answer}/>
                        </div>
                    </li>
                    </Fade>
                </Stagger>
            );
        });
        return (
            <div>
                <ol>
                    {answerList}
                </ol>
            </div>
        );
}
function RenderQuestions({questions}){
    var questionList = questions.map(question => {
        return (
            <Stagger in>
                <Fade in>
                <li key={question.id} >
                    {question.description}
                    <RenderAnswers answers={question.answers}/>
                </li>
                </Fade>
            </Stagger>
        );
    });
    return (
        <div>
            <ul>
                {questionList}
            </ul>
        </div>
    );
}


class Test extends Component{

    constructor(props){
        super(props)

        this.state={
            redirect:false,
            testnum:null
        }
        this.view=this.view.bind(this);
        this.giveTest= this.giveTest.bind(this);
    }
    

    view(event){
        event.preventDefault();
        const token=localStorage.getItem("token");
        axios
        .get(`https://localhost:3443/tests`,{ headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            alert(JSON.stringify(res.data))
        })
        .catch(err => {
            alert(JSON.stringify(err))
        });
    }
    giveTest(event){
        event.preventDefault();
        /*
        const token=localStorage.getItem("token");
        axios
        .get(`https://localhost:3443/tests/${this.test_num.value}`,{ headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            //alert(JSON.stringify(res.data))
            this.setState(() => ({
                data: res,
                viewOn:true 
              }));
        })
        .catch(err => {
            alert("ERRROR",JSON.stringify(err))
        });
        */
        this.setState({
            redirect:true,
            testnum:this.test_num.value
        })
       
    }

    render(){
        let url = window.location.pathname;
        if(this.state.redirect){
            return(
                <Redirect to={`${url}/${this.state.testnum}`}/>
            )
        }
        
        const Test=(test)=>{
            if(this.state.viewOn){
                //alert(JSON.stringify(test.test.data))
                //console.log(JSON.stringify(test.test.data[0]))
                return(
                    <div>
                        <h1>{test.test.data[0].description}</h1>
                        <h4>Questions:</h4>
                        <RenderQuestions questions={test.test.data[0].questions}/>
                    </div>
                )
            }
            else{
                return(
                    <div></div>
                )
            }
        }
        return(
            <div>
                <Form onSubmit={this.giveTest}>
                    <FormGroup>
                        <Label for="exampleEmail">Test Number</Label>
                        <Input type="number" name="testnumber" id="testNumber" placeholder="Test number" 
                            innerRef={(input) => this.test_num = input} />
                    </FormGroup>
                    <br/>
                    <Button outline color="info">Give Test</Button>
                </Form>
                <Test test={this.state.data} />
                <br/>
                <Button outline color="info" onClick={this.view}>View all defined tests</Button>
            </div>
        )
    }

}
export default Test;