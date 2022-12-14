import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMesage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';




export default class App extends Component {
    
    gotService = new GotService();
    
    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch(){
        console.log('error');
        this.setState({
            error:true
        })
    }

    toggleRandomChar =()=>{
        this.setState((state)=>{
            return{
                showRandomChar: !state.showRandomChar
            }
        });
    };


    

    render(){
        const char = this.state.showRandomChar ? <RandomChar/>: null;
        
        if(this.state.error){
            return <ErrorMessage/>
        }


        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button
                                onClick={this.toggleRandomChar}>toggleRandomChar</button>
                            </Col>
                        </Row>
                       <CharacterPage/>
                       <Row>
                            <Col md='6'>
                                <ItemList 
                                    onItemSelected={this.onItemSelected}
                                    getData={this.gotService.getAllBooks}
                                    renderItem={(item)=> item.name}/>
                            </Col>
                            <Col md='6'>
                                <CharDetails charId={this.state.selectedChar}/>
                            </Col>
                        </Row>
                       <Row>
                            <Col md='6'>
                                <ItemList 
                                    onItemSelected={this.onItemSelected} 
                                    getData={this.gotService.getAllHouses}
                                    renderItem={(item)=> item.name}/>
                            </Col>
                            <Col md='6'>
                                <CharDetails charId={this.state.selectedChar}/>
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/' component={()=><h1>Welcome!</h1>}/>
                        <Route path='/' component={()=><h1>sdfsdf</h1>}/>
                    </Container>
                </div>
            </Router> 
        );
    }
};

