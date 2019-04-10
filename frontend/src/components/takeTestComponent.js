import React, { Component } from 'react';
import axios from 'axios';
import Modal from "./modalComponent"
//import { Button } from 'reactstrap';

class TakeTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
          test: null,
          nq:-1,
          viewModal: true,
          total:0,
          cname:['','','','','',''],
          selected:[],
          score:0,
          testover:false
        };
    
        this.onLoadTest = this.onLoadTest.bind(this);
        this.checkAnswer =  this.checkAnswer.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    onLoadTest(){
        const token=localStorage.getItem("token");
        axios
        .get(`https://localhost:3443/tests/${this.props.testid}`,{ headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            this.setState({
                test:res.data[0].questions,
                viewModal:false,
                nq:0,
                total: Object.keys(res.data[0].questions).length,
                score:0
            })
        })
        .catch(err => {
            alert(err)
        });
    }
    checkAnswer(e){
        let elem = e.currentTarget;
        let updatedClassNames = this.state.cname;
        let answer = Number(elem.dataset.id);
        updatedClassNames[answer]='selected';

        let sel = this.state.selected;
        sel.push(answer);
        this.setState({
            cname:updatedClassNames,
            selected:sel
        })

    }
    nextQuestion(){
        var flag=true;
        let selected=this.state.selected;
        //alert(JSON.stringify(this.state.test[this.state.nq]))
        // eslint-disable-next-line array-callback-return
        this.state.test[this.state.nq].answers.map((answer,idx)=>{
            //alert(JSON.stringify(answer)+" "+answer.isCorrect+" ")
            if(answer.isCorrect !== selected.includes(idx)) flag=false;
        })
        var sc=0;
        if(flag) sc++;
        this.setState(()=> ({
            nq:this.state.nq+1,
            cname:['','','','','',''],
            score:this.state.score+sc,
            selected:[]
        }))
        if(this.state.nq===(this.state.total-1)){
            this.setState({
                viewModal:true,
                test:null,
                testover:true
            })
        }


    }
    render(){
        if(this.state.viewModal){
            return(
                <div>
                    <Modal  loadTest={this.onLoadTest} view={this.state.viewModal} testover={this.state.testover} score={this.state.score/this.state.total}/>
                </div>
                )
            }
            else{
                //console.log(JSON.stringify(this.state.test))
                return(
                    <div>
                        <div id="question">
                        <h4>Question {this.state.nq+1}/{this.state.total}: {this.state.test[this.state.nq].description} {"Multiple Answers:"+this.state.test[this.state.nq].isMultiple}</h4>
                        </div>
                        <div id="answers">
                            <ul>
                            {this.state.test[this.state.nq].answers.map((a,idx)=>(
                                <li onClick={this.checkAnswer} className={this.state.cname[idx]} data-id={idx}>{a.description}</li>
                            ))}
                            </ul>
                            <div id="submit">
                                    <button className="fancy-btn" onClick={this.nextQuestion} >{this.state.nq===(this.state.total-1) ? 'Finish quiz' : 'Next question'}</button>
                            </div>
                        </div>
                    </div>
                )
            }
    }
}
export default TakeTest;